// 관리자 인증: 요청 헤더 x-admin-key 를 Vercel 환경변수 ADMIN_PASSWORD 와 비교합니다.
import crypto from 'node:crypto';

export function isAdminRequest(headerValue: string | string[] | undefined): boolean {
  const expected = process.env.ADMIN_PASSWORD || '';
  const given = Array.isArray(headerValue) ? headerValue[0] : headerValue || '';
  if (!expected || !given) return false;

  const a = Buffer.from(expected);
  const b = Buffer.from(given);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
