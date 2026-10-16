// 솔라피(Solapi) 카카오 알림톡 발송 - 서버 전용
// 비밀키는 Vercel 환경변수에만 저장되며 브라우저로 절대 내려가지 않습니다.
import crypto from 'node:crypto';

export interface WarrantyForMessage {
  customerName: string;
  customerPhone: string;
  carModel: string;
  carPlate: string;
  hasClearPps: boolean;
  clearPpsDetail?: string;
  hasColorPps: boolean;
  colorPpsDetail?: string;
  issueDate: string;
  warrantyPeriodYears: number;
  warrantyNo: string;
}

const env = (name: string) => (process.env[name] || '').trim();

export function getSiteUrl(): string {
  const envUrl = env('SITE_URL');
  if (envUrl) return envUrl.replace(/\/+$/, '');
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'https://cautionsmartcenter.com';
}

export function alimtalkConfigStatus() {
  return {
    SOLAPI_API_KEY: Boolean(env('SOLAPI_API_KEY')),
    SOLAPI_API_SECRET: Boolean(env('SOLAPI_API_SECRET')),
    SOLAPI_PFID: Boolean(env('SOLAPI_PFID')),
    SOLAPI_TEMPLATE_ID: Boolean(env('SOLAPI_TEMPLATE_ID')),
    SOLAPI_SENDER_PHONE: Boolean(env('SOLAPI_SENDER_PHONE')),
    SITE_URL: Boolean(getSiteUrl())
  };
}

export function isAlimtalkReady(): boolean {
  return Object.values(alimtalkConfigStatus()).every(Boolean);
}

function buildAuthHeader(apiKey: string, apiSecret: string): string {
  const date = new Date().toISOString();
  const salt = crypto.randomBytes(16).toString('hex');
  const signature = crypto.createHmac('sha256', apiSecret).update(date + salt).digest('hex');
  return `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`;
}

const onlyDigits = (v: string) => (v || '').replace(/[^0-9]/g, '');

export function buildServiceText(w: WarrantyForMessage): string {
  return (
    [
      w.hasClearPps ? `투명PPS(${w.clearPpsDetail || '전체'})` : '',
      w.hasColorPps ? `컬러PPS(${w.colorPpsDetail || '전체'})` : ''
    ]
      .filter(Boolean)
      .join(', ') || '독일 정품 CARDIP PPS'
  );
}

export interface AlimtalkResult {
  success: boolean;
  message: string;
  messageId?: string;
}

// 승인된 템플릿 변수 이름과 정확히 일치해야 합니다. (관리자 화면의 [템플릿 신청 문구 복사] 참고)
export async function sendWarrantyAlimtalk(w: WarrantyForMessage, viewToken: string): Promise<AlimtalkResult> {
  if (!isAlimtalkReady()) {
    const missing = Object.entries(alimtalkConfigStatus())
      .filter(([, ok]) => !ok)
      .map(([k]) => k)
      .join(', ');
    return { success: false, message: `알림톡 설정이 완료되지 않았습니다. 누락: ${missing}` };
  }

  const to = onlyDigits(w.customerPhone);
  if (to.length < 10) {
    return { success: false, message: `고객 전화번호(${w.customerPhone})가 올바르지 않습니다.` };
  }

  const payload = {
    message: {
      to,
      from: onlyDigits(env('SOLAPI_SENDER_PHONE')),
      kakaoOptions: {
        pfId: env('SOLAPI_PFID'),
        templateId: env('SOLAPI_TEMPLATE_ID'),
        // 카톡 수신 실패 시 문자 대체 발송 (SOLAPI_DISABLE_SMS=true 로 끌 수 있음)
        disableSms: env('SOLAPI_DISABLE_SMS') === 'true',
        variables: {
          '#{고객명}': w.customerName,
          '#{차량번호}': w.carPlate,
          '#{차종}': w.carModel,
          '#{시공내역}': buildServiceText(w),
          '#{보증기간}': `시공일(${w.issueDate})로부터 ${w.warrantyPeriodYears}년`,
          '#{보증번호}': w.warrantyNo,
          '#{토큰}': viewToken
        }
      }
    }
  };

  try {
    const res = await fetch('https://api.solapi.com/messages/v4/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: buildAuthHeader(env('SOLAPI_API_KEY'), env('SOLAPI_API_SECRET'))
      },
      body: JSON.stringify(payload)
    });
    const data: any = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        message: `솔라피 발송 실패 (${res.status}): ${data.errorMessage || data.message || JSON.stringify(data)}`
      };
    }
    // statusCode 2000 = 정상 접수
    if (data.statusCode && String(data.statusCode) !== '2000') {
      return { success: false, message: `솔라피 접수 거절 (${data.statusCode}): ${data.statusMessage || ''}` };
    }
    return { success: true, message: '알림톡 발송 접수 완료', messageId: data.messageId || data.groupId };
  } catch (err: any) {
    return { success: false, message: `솔라피 통신 오류: ${err?.message || err}` };
  }
}
