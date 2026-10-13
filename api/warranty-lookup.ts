// 고객용 API: 차량번호 + 본인확인(연락처 전체/뒷4자리 또는 보증번호)으로 보증서 조회
// POST /api/warranty-lookup  { plate, verify }
// - 차량번호만으로는 절대 조회되지 않으며, 본인확인 정보가 일치할 때만 보증서를 돌려줍니다.
// - 서버 DB(Firestore)가 연결되어 있어야 동작합니다. (FIREBASE_SERVICE_ACCOUNT)
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb, isFirebaseConfigured, WARRANTY_COLLECTION } from './_lib/firebase.js';

const clean = (v: unknown, max = 40) =>
  typeof v === 'string' ? v.replace(/\s+/g, '').slice(0, max) : '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST 요청만 허용됩니다.' });
  }
  if (!isFirebaseConfigured()) {
    return res.status(503).json({ error: '서버 보증서 저장소가 아직 연결되지 않았습니다.' });
  }

  const body = (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body) || {};
  const plate = clean(body.plate, 20);
  const verify = clean(body.verify, 40).replace(/[^0-9a-zA-Z]/g, '').toLowerCase();
  if (!plate || verify.length < 4) {
    return res.status(400).json({ error: '차량번호와 연락처(또는 보증번호)를 입력해 주세요.' });
  }

  try {
    const col = getDb().collection(WARRANTY_COLLECTION);
    // 정규화된 차량번호(carPlateKey) 우선, 예전 데이터는 원본 carPlate 로 조회
    let snap = await col.where('carPlateKey', '==', plate).limit(10).get();
    if (snap.empty) snap = await col.where('carPlate', '==', plate).limit(10).get();

    const doc = snap.docs.find((d) => {
      const w = d.data() || {};
      const phone = String(w.customerPhone || '').replace(/[^0-9]/g, '');
      const no = String(w.warrantyNo || '').replace(/[^0-9a-zA-Z]/g, '').toLowerCase();
      return (phone && (phone === verify || phone.slice(-4) === verify)) || (no && no === verify);
    });

    if (!doc) {
      return res.status(404).json({ error: '일치하는 보증서를 찾지 못했습니다.' });
    }

    const d = doc.data() || {};
    return res.status(200).json({
      ok: true,
      warranty: {
        id: `recv-${d.warrantyNo}`,
        viewToken: doc.id,
        warrantyNo: d.warrantyNo,
        createdAt: d.issueDate || '',
        customerName: d.customerName,
        customerPhone: d.customerPhone, // 본인 확인을 통과한 경우에만 반환
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
    console.error('[api/warranty-lookup]', err);
    return res.status(500).json({ error: '일시적인 오류입니다. 잠시 후 다시 시도해 주세요.' });
  }
}
