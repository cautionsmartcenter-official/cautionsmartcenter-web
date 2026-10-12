// 관리자 전용 API: 보증서 서버 등록(publish) / 알림톡 발송 / 삭제 / 연동 상태 확인
// POST /api/warranty   헤더: x-admin-key: <ADMIN_PASSWORD>
//   { action: 'status' }
//   { action: 'publish', warranty: {...}, send?: boolean }
//   { action: 'delete', token: string }
import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'node:crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { isAdminRequest } from './_lib/auth.js';
import { getDb, isFirebaseConfigured, WARRANTY_COLLECTION } from './_lib/firebase.js';
import { alimtalkConfigStatus, getSiteUrl, sendWarrantyAlimtalk } from './_lib/solapi.js';
import { isEmailConfigured, sendWarrantyEmail, SENDER_EMAIL } from './_lib/email.js';

const TOKEN_RE = /^[A-Za-z0-9_-]{20,64}$/;
const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

function sanitizeWarranty(input: any) {
  return {
    warrantyNo: str(input?.warrantyNo, 60),
    customerName: str(input?.customerName, 60),
    customerPhone: str(input?.customerPhone, 30),
    customerEmail: str(input?.customerEmail, 100),
    customerAddress: str(input?.customerAddress, 200),
    carModel: str(input?.carModel, 100),
    carPlate: str(input?.carPlate, 30),
    carColor: str(input?.carColor, 60),
    vin: str(input?.vin, 40),
    hasClearPps: Boolean(input?.hasClearPps),
    clearPpsDetail: str(input?.clearPpsDetail, 100),
    hasColorPps: Boolean(input?.hasColorPps),
    colorPpsDetail: str(input?.colorPpsDetail, 100),
    price: str(input?.price, 30),
    issueDate: str(input?.issueDate, 20),
    warrantyPeriodYears: Math.min(Math.max(Number(input?.warrantyPeriodYears) || 6, 1), 20),
    issuedBy: str(input?.issuedBy, 60) || '(주) 코션스마트센터',
    status: ['active', 'expired', 'cancelled'].includes(input?.status) ? input.status : 'active'
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST 요청만 허용됩니다.' });
  }
  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ error: '서버 설정 누락: ADMIN_PASSWORD 환경변수가 없습니다.' });
  }
  if (!isAdminRequest(req.headers['x-admin-key'])) {
    return res.status(401).json({ error: '관리자 인증 실패: 비밀번호를 확인하고 다시 로그인해 주세요.' });
  }

  const body = (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body) || {};
  const action = body.action;

  try {
    // ── 연동 상태 확인 ──
    if (action === 'status') {
      let firestoreOk = false;
      let firestoreError = '';
      if (isFirebaseConfigured()) {
        try {
          await getDb().collection(WARRANTY_COLLECTION).limit(1).get();
          firestoreOk = true;
        } catch (e: any) {
          firestoreError = e?.message || String(e);
        }
      }
      return res.status(200).json({
        ok: true,
        siteUrl: getSiteUrl(),
        firestore: { configured: isFirebaseConfigured(), ok: firestoreOk, error: firestoreError },
        alimtalk: alimtalkConfigStatus(),
        email: {
          configured: isEmailConfigured(),
          sender: SENDER_EMAIL
        }
      });
    }

    // ── 단독 이메일 발송 액션 ──
    if (action === 'send_email') {
      const w = sanitizeWarranty(body.warranty);
      if (!w.customerEmail || !w.customerEmail.includes('@')) {
        return res.status(400).json({ error: '유효한 고객 이메일 주소가 없습니다.' });
      }
      const token = str(body.warranty?.viewToken, 64);
      const siteUrl = getSiteUrl();
      const viewUrl = siteUrl && token ? `${siteUrl}/w/${token}` : '';
      const emailResult = await sendWarrantyEmail(w, viewUrl);

      if (token && isFirebaseConfigured()) {
        await getDb().collection(WARRANTY_COLLECTION).doc(token).set(
          {
            emailStatus: emailResult.success ? 'sent' : 'failed',
            emailMessage: emailResult.message,
            emailAt: FieldValue.serverTimestamp()
          },
          { merge: true }
        );
      }
      return res.status(200).json({ ok: emailResult.success, email: emailResult });
    }

    // ── 서버 등록 + (선택) 알림톡 & 이메일 발송 ──
    if (action === 'publish') {
      const w = sanitizeWarranty(body.warranty);
      if (!w.warrantyNo || !w.customerName || !w.customerPhone || !w.carPlate) {
        return res.status(400).json({ error: '보증번호, 고객명, 연락처, 차량번호는 필수입니다.' });
      }

      const givenToken = str(body.warranty?.viewToken, 64);
      const token = TOKEN_RE.test(givenToken) ? givenToken : crypto.randomBytes(18).toString('base64url');

      const db = getDb();
      const ref = db.collection(WARRANTY_COLLECTION).doc(token);
      await ref.set({ ...w, updatedAt: FieldValue.serverTimestamp() }, { merge: true });

      const siteUrl = getSiteUrl();
      const viewUrl = siteUrl ? `${siteUrl}/w/${token}` : '';

      let alimtalk: { success: boolean; message: string } | null = null;
      let email: { success: boolean; message: string } | null = null;

      // 알림톡 발송
      if (body.send === true) {
        alimtalk = await sendWarrantyAlimtalk(w, token);
        await ref.set(
          {
            alimtalkStatus: alimtalk.success ? 'sent' : 'failed',
            alimtalkMessage: alimtalk.message,
            alimtalkAt: FieldValue.serverTimestamp()
          },
          { merge: true }
        );
      }

      // 이메일 발송 (이메일이 있고 발송 요청된 경우 또는 자동 발송 설정)
      if (body.sendEmail === true && w.customerEmail && w.customerEmail.includes('@')) {
        email = await sendWarrantyEmail(w, viewUrl);
        await ref.set(
          {
            emailStatus: email.success ? 'sent' : 'failed',
            emailMessage: email.message,
            emailAt: FieldValue.serverTimestamp()
          },
          { merge: true }
        );
      }

      return res.status(200).json({ ok: true, token, viewUrl, alimtalk, email });
    }

    // ── 서버에서 삭제 ──
    if (action === 'delete') {
      const token = str(body.token, 64);
      if (!TOKEN_RE.test(token)) return res.status(400).json({ error: '잘못된 토큰입니다.' });
      await getDb().collection(WARRANTY_COLLECTION).doc(token).delete();
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: `알 수 없는 action: ${action}` });
  } catch (err: any) {
    console.error('[api/warranty]', err);
    return res.status(500).json({ error: err?.message || '서버 오류' });
  }
}
