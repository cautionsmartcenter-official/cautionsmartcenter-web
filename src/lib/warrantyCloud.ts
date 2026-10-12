// 브라우저 ↔ 서버(Vercel 함수) 연결 모듈
// - 보증서를 서버에 등록하고, 카카오 알림톡을 서버에서 발송합니다.
// - 비밀키는 서버에만 있으며, 브라우저는 관리자 비밀번호(x-admin-key)만 보냅니다.
import type { WarrantyItem } from './warrantyStorage';

const ADMIN_KEY_STORAGE = 'caution_admin_key';
const AUTO_ALIMTALK_STORAGE = 'caution_auto_alimtalk';
const AUTO_EMAIL_STORAGE = 'caution_auto_email';

export const setAdminKey = (key: string) => sessionStorage.setItem(ADMIN_KEY_STORAGE, key);
export const getAdminKey = () => sessionStorage.getItem(ADMIN_KEY_STORAGE) || '';
export const clearAdminKey = () => sessionStorage.removeItem(ADMIN_KEY_STORAGE);

// 보증서 발급 시 알림톡 자동 발송 여부 (기본 ON)
export const isAutoAlimtalkEnabled = () => localStorage.getItem(AUTO_ALIMTALK_STORAGE) !== 'off';
export const setAutoAlimtalkEnabled = (on: boolean) =>
  localStorage.setItem(AUTO_ALIMTALK_STORAGE, on ? 'on' : 'off');

// 보증서 발급 시 이메일 자동 발송 여부 (기본 ON)
export const isAutoEmailEnabled = () => localStorage.getItem(AUTO_EMAIL_STORAGE) !== 'off';
export const setAutoEmailEnabled = (on: boolean) =>
  localStorage.setItem(AUTO_EMAIL_STORAGE, on ? 'on' : 'off');

export class ServerUnavailableError extends Error {}

async function parseJson(res: Response) {
  const type = res.headers.get('content-type') || '';
  if (!type.includes('application/json')) {
    // 로컬 개발 서버(npm run dev)에는 서버 함수가 없어 HTML이 돌아옵니다.
    throw new ServerUnavailableError(
      '서버 기능은 인터넷 배포(Vercel) 후에 동작합니다. 지금은 로컬 작업 모드입니다.'
    );
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || `서버 오류 (${res.status})`);
  return data;
}

async function adminCall(body: Record<string, unknown>, key = getAdminKey()) {
  let res: Response;
  try {
    res = await fetch('/api/warranty', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': key },
      body: JSON.stringify(body)
    });
  } catch {
    throw new ServerUnavailableError('서버에 연결할 수 없습니다. 인터넷 연결을 확인해 주세요.');
  }
  return parseJson(res);
}

export interface CloudStatus {
  siteUrl: string;
  firestore: { configured: boolean; ok: boolean; error: string };
  alimtalk: Record<string, boolean>;
  email?: { configured: boolean; sender: string };
}

/** 관리자 비밀번호를 서버에 확인 (배포 환경). 서버가 없으면 ServerUnavailableError */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  try {
    await adminCall({ action: 'status' }, password);
    return true;
  } catch (e) {
    if (e instanceof ServerUnavailableError) throw e;
    // 배포 직후 서버에 ADMIN_PASSWORD가 아직 없으면 로컬 확인으로 넘김
    if (e instanceof Error && e.message.includes('ADMIN_PASSWORD')) {
      throw new ServerUnavailableError(e.message);
    }
    return false;
  }
}

export async function getCloudStatus(): Promise<CloudStatus> {
  return adminCall({ action: 'status' });
}

export interface PublishResult {
  token: string;
  viewUrl: string;
  alimtalk: { success: boolean; message: string } | null;
  email: { success: boolean; message: string } | null;
}

/** 보증서를 서버에 등록(또는 갱신)하고, 알림톡/이메일 발송 */
export async function publishWarranty(
  item: WarrantyItem,
  sendAlimtalk: boolean,
  sendEmail = true
): Promise<PublishResult> {
  return adminCall({ action: 'publish', warranty: item, send: sendAlimtalk, sendEmail });
}

/** 고객에게 보증서 이메일 단독 발송 */
export async function sendWarrantyEmailOnly(
  item: WarrantyItem
): Promise<{ ok: boolean; email: { success: boolean; message: string } }> {
  return adminCall({ action: 'send_email', warranty: item });
}

export async function deleteCloudWarranty(token: string): Promise<void> {
  await adminCall({ action: 'delete', token });
}

/** 고객용: 토큰으로 보증서 조회 */
export async function fetchPublicWarranty(token: string): Promise<WarrantyItem> {
  let res: Response;
  try {
    res = await fetch(`/api/warranty-view?t=${encodeURIComponent(token)}`);
  } catch {
    throw new Error('인터넷 연결을 확인해 주세요.');
  }
  const data = await parseJson(res);
  return data.warranty as WarrantyItem;
}
