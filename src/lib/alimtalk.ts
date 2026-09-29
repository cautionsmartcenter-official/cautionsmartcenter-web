import { type WarrantyItem, getWarrantyViewUrl } from './warrantyStorage';

const ALIMTALK_CONFIG_KEY = 'caution_solapi_alimtalk_config';

export interface AlimtalkConfig {
  apiKey: string;
  apiSecret: string;
  pfId: string; // 카카오 채널 발신프로필 ID (PFID)
  templateId: string; // 승인된 알림톡 템플릿 ID
  senderPhone: string; // 발신번호 (코션스마트센터 대표번호)
  autoSmsFallback: boolean; // 알림톡 실패 시 문자로 자동 대체 발송
}

// 기본 설정 가져오기
export const getAlimtalkConfig = (): AlimtalkConfig => {
  if (typeof window === 'undefined') {
    return {
      apiKey: '',
      apiSecret: '',
      pfId: '',
      templateId: '',
      senderPhone: '',
      autoSmsFallback: true
    };
  }

  try {
    const raw = localStorage.getItem(ALIMTALK_CONFIG_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse alimtalk config:', e);
  }

  return {
    apiKey: '',
    apiSecret: '',
    pfId: '',
    templateId: '',
    senderPhone: '',
    autoSmsFallback: true
  };
};

// 설정 저장
export const saveAlimtalkConfig = (config: AlimtalkConfig): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ALIMTALK_CONFIG_KEY, JSON.stringify(config));
};

// 설정 완료 여부 확인
export const isAlimtalkConfigured = (): boolean => {
  const cfg = getAlimtalkConfig();
  return Boolean(cfg.apiKey && cfg.apiSecret && cfg.pfId);
};

// Solapi v4 HMAC-SHA256 인증 헤더 생성 (Web Crypto API 사용)
async function generateSolapiAuthHeader(apiKey: string, apiSecret: string): Promise<string> {
  const date = new Date().toISOString();
  // 16바이트 랜덤 salt
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

// 전화번호 정규화 (숫자만 추출)
export const sanitizePhoneNumber = (phone: string): string => {
  return phone.replace(/[^0-9]/g, '');
};

// 공식 알림톡 템플릿 표준 본문 생성
export const generateAlimtalkBody = (item: WarrantyItem, viewUrl: string): string => {
  const services = [];
  if (item.hasClearPps) services.push('투명PPS');
  if (item.hasColorPps) services.push(`컬러PPS(${item.colorPpsDetail || '커스텀'})`);
  const serviceText = services.join(', ') || 'PPS 시공';

  return `[코션스마트센터] PPS 시공 보증서 발급 안내

안녕하세요, ${item.customerName} 고객님.
(주)코션스마트센터를 믿고 차량 시공을 맡겨주셔서 진심으로 감사드립니다.

고객님의 차량에 PPS 시공 보증서가 정상 발급되었습니다.

■ 차량번호 : ${item.carPlate} (${item.carModel})
■ 시공내역 : ${serviceText}
■ 보증기간 : 시공일(${item.issueDate})로부터 ${item.warrantyPeriodYears}년
■ 보증번호 : ${item.warrantyNo}

아래 링크를 터치하시면 고객님의 공식 전자 보증서를 언제든 확인 및 보관하실 수 있습니다.
▶ 전자 보증서 바로 확인하기:
${viewUrl}`;
};

export interface SendAlimtalkResult {
  success: boolean;
  messageId?: string;
  statusCode?: string;
  errorMessage?: string;
}

// 솔라피를 통한 고객 번호 다이렉트 알림톡 발송
export const sendDirectAlimtalk = async (
  item: WarrantyItem,
  customConfig?: AlimtalkConfig
): Promise<SendAlimtalkResult> => {
  const config = customConfig || getAlimtalkConfig();

  if (!config.apiKey || !config.apiSecret) {
    return {
      success: false,
      errorMessage: '솔라피 API Key와 API Secret이 설정되지 않았습니다. [연동 설정]에서 입력해 주세요.'
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
      errorMessage: '발신 번호(코션스마트센터 대표번호)가 설정되지 않았습니다. [연동 설정]에서 등록해 주세요.'
    };
  }

  const viewUrl = getWarrantyViewUrl(item.warrantyNo);
  const textBody = generateAlimtalkBody(item, viewUrl);

  try {
    const authHeader = await generateSolapiAuthHeader(config.apiKey, config.apiSecret);

    // 카카오 알림톡 옵션 구성
    const kakaoOptions: any = {
      pfId: config.pfId.trim(),
      disableSms: !config.autoSmsFallback
    };

    if (config.templateId) {
      kakaoOptions.templateId = config.templateId.trim();
      kakaoOptions.variables = {
        '#{고객명}': item.customerName,
        '#{차량번호}': item.carPlate,
        '#{차종}': item.carModel,
        '#{시공내역}': item.hasClearPps ? '투명PPS' : '컬러PPS',
        '#{보증기간}': `시공일(${item.issueDate})로부터 ${item.warrantyPeriodYears}년`,
        '#{보증번호}': item.warrantyNo,
        '#{보증서링크}': viewUrl
      };
      // 버튼 링크
      kakaoOptions.buttons = [
        {
          buttonType: 'WL',
          buttonName: '전자 보증서 바로 확인하기',
          linkMo: viewUrl,
          linkPc: viewUrl
        }
      ];
    }

    const payload = {
      message: {
        to: recipientPhone,
        from: senderPhone,
        text: textBody,
        kakaoOptions: kakaoOptions
      }
    };

    const response = await fetch('https://api.solapi.com/messages/v4/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      const errDetail = result.message || result.error || JSON.stringify(result);
      console.error('Solapi send failed:', result);
      return {
        success: false,
        statusCode: String(response.status),
        errorMessage: `발송 실패 (${response.status}): ${errDetail}`
      };
    }

    return {
      success: true,
      messageId: result.messageId || result.groupId,
      statusCode: '200'
    };
  } catch (err: any) {
    console.error('Solapi exception:', err);
    return {
      success: false,
      errorMessage: `발송 통신 오류: ${err.message || '네트워크 연결 상태를 확인해 주세요.'}`
    };
  }
};
