// 서버 전용 Firebase(Firestore) 연결
// - 고객 개인정보는 브라우저가 직접 읽지 못하고, 이 서버 함수를 통해서만 접근합니다.
// - Vercel 환경변수 FIREBASE_SERVICE_ACCOUNT 에 서비스 계정 JSON(또는 base64)을 넣어야 합니다.
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

export const isFirebaseConfigured = (): boolean => Boolean(process.env.FIREBASE_SERVICE_ACCOUNT);

export function getDb(): Firestore {
  if (!getApps().length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!raw) {
      throw new Error('서버 설정 누락: FIREBASE_SERVICE_ACCOUNT 환경변수가 없습니다.');
    }
    const json = raw.trim().startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8');
    const serviceAccount = JSON.parse(json);
    initializeApp({ credential: cert(serviceAccount) });
  }
  return getFirestore();
}

export const WARRANTY_COLLECTION = 'warranties';
