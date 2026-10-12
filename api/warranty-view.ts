// 고객용 공개 API: 알림톡 [보증서 보기] 링크로 들어온 고객에게 보증서를 보여줍니다.
// GET /api/warranty-view?t=<토큰>
// - 추측이 불가능한 긴 무작위 토큰으로만 조회되며, 전화번호는 가운데를 가리고 주소·메모는 내보내지 않습니다.
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb, WARRANTY_COLLECTION } from './_lib/firebase.js';

const TOKEN_RE = /^[A-Za-z0-9_-]{20,64}$/;

function maskPhone(phone: string): string {
  const d = (phone || '').replace(/[^0-9]/g, '');
  if (d.length === 11) return `${d.slice(0, 3)}-****-${d.slice(7)}`;
  if (d.length === 10) return `${d.slice(0, 3)}-***-${d.slice(6)}`;
  return '***';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'GET 요청만 허용됩니다.' });
  }
  const token = typeof req.query.t === 'string' ? req.query.t : '';
  if (!TOKEN_RE.test(token)) {
    return res.status(400).json({ error: '보증서 주소가 올바르지 않습니다.' });
  }

  try {
    const snap = await getDb().collection(WARRANTY_COLLECTION).doc(token).get();
    if (!snap.exists) {
      return res.status(404).json({ error: '보증서를 찾을 수 없습니다. 코션스마트센터(031-705-1888)로 문의해 주세요.' });
    }
    const d = snap.data() || {};
    res.setHeader('Cache-Control', 'private, no-store');
    return res.status(200).json({
      ok: true,
      warranty: {
        id: token,
        viewToken: token,
        warrantyNo: d.warrantyNo,
        createdAt: '',
        customerName: d.customerName,
        customerPhone: maskPhone(d.customerPhone),
        carModel: d.carModel,
        carPlate: d.carPlate,
        carColor: d.carColor || '',
        vin: d.vin || '',
        hasClearPps: Boolean(d.hasClearPps),
        clearPpsDetail: d.clearPpsDetail || '',
        hasColorPps: Boolean(d.hasColorPps),
        colorPpsDetail: d.colorPpsDetail || '',
        price: d.price || '',
        issueDate: d.issueDate,
        warrantyPeriodYears: d.warrantyPeriodYears || 6,
        issuedBy: d.issuedBy || '(주) 코션스마트센터',
        status: d.status || 'active'
      }
    });
  } catch (err: any) {
    console.error('[api/warranty-view]', err);
    return res.status(500).json({ error: '일시적인 오류입니다. 잠시 후 다시 시도해 주세요.' });
  }
}
