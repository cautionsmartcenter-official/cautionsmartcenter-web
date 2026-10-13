import { getAlimtalkConfig, sanitizePhoneNumber } from './alimtalk';
import { type WorkPhotoItem, createWorkPhotoShareMessage } from './workPhotoStorage';

// Solapi v4 HMAC-SHA256 인증 헤더 생성
async function generateSolapiAuthHeader(apiKey: string, apiSecret: string): Promise<string> {
  const date = new Date().toISOString();
  const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  const dataToSign = date + salt;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(apiSecret.trim()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, enc.encode(dataToSign));
  const signature = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return `HMAC-SHA256 apiKey=${apiKey.trim()}, date=${date}, salt=${salt}, signature=${signature}`;
}

/**
 * 솔라피 스토리지에 이미지 업로드 (MMS용 fileId 획득)
 */
async function uploadImageToSolapi(dataUrl: string, apiKey: string, apiSecret: string): Promise<string | null> {
  try {
    const authHeader = await generateSolapiAuthHeader(apiKey, apiSecret);
    const base64Data = dataUrl.split(',')[1];
    if (!base64Data) return null;

    const payload = {
      file: base64Data,
      type: 'MMS',
      name: `work_photo_${Date.now()}.jpg`
    };

    const res = await fetch('https://api.solapi.com/storage/v1/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      console.warn('Solapi file upload failed:', await res.text());
      return null;
    }

    const data = await res.json();
    return data.fileId || null;
  } catch (err) {
    console.warn('Solapi file upload exception:', err);
    return null;
  }
}

export interface SendWorkPhotoResult {
  success: boolean;
  messageId?: string;
  errorMessage?: string;
  method?: 'MMS' | 'LMS';
}

/**
 * 솔라피를 통한 고객 작업사진 전송 (MMS 또는 고화질 웹앨범 LMS)
 */
export const sendWorkPhotoViaSolapi = async (item: WorkPhotoItem): Promise<SendWorkPhotoResult> => {
  const config = getAlimtalkConfig();

  if (!config.apiKey || !config.apiSecret) {
    return {
      success: false,
      errorMessage: '솔라피 API Key와 API Secret이 설정되지 않았습니다. 관리자 페이지의 [카카오톡 설정]에서 입력해 주세요.'
    };
  }

  const recipientPhone = sanitizePhoneNumber(item.customerPhone);
  if (!recipientPhone || recipientPhone.length < 10) {
    return {
      success: false,
      errorMessage: `고객 전화번호(${item.customerPhone})가 올바르지 않습니다.`
    };
  }

  const senderPhone = sanitizePhoneNumber(config.senderPhone);
  if (!senderPhone) {
    return {
      success: false,
      errorMessage: '발신 번호가 설정되지 않았습니다. 관리자 페이지의 [카카오톡 설정]에서 대표번호를 입력해 주세요.'
    };
  }

  const textBody = createWorkPhotoShareMessage(item);

  try {
    const authHeader = await generateSolapiAuthHeader(config.apiKey, config.apiSecret);

    // 대표 사진 1장이 있으면 MMS 이미지 업로드 시도
    let imageId: string | null = null;
    if (item.photos && item.photos.length > 0 && item.photos[0].startsWith('data:image')) {
      imageId = await uploadImageToSolapi(item.photos[0], config.apiKey, config.apiSecret);
    }

    const messageType = imageId ? 'MMS' : 'LMS';

    const messagePayload: any = {
      to: recipientPhone,
      from: senderPhone,
      text: textBody,
      type: messageType,
      subject: `[코션스마트센터] ${item.carModel} 시공 진행 현황`
    };

    if (imageId) {
      messagePayload.imageId = imageId;
    }

    const res = await fetch('https://api.solapi.com/messages/v4/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader
      },
      body: JSON.stringify({ message: messagePayload })
    });

    const result = await res.json();

    if (!res.ok) {
      const errDetail = result.message || result.error || JSON.stringify(result);
      return {
        success: false,
        errorMessage: `발송 실패 (${res.status}): ${errDetail}`
      };
    }

    return {
      success: true,
      messageId: result.messageId || result.groupId,
      method: messageType
    };
  } catch (err: any) {
    return {
      success: false,
      errorMessage: `발송 통신 오류: ${err.message || '네트워크 상태를 확인해 주세요.'}`
    };
  }
};
