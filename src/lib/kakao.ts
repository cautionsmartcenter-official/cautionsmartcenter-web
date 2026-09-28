import { type WarrantyItem, getWarrantyViewUrl, createWarrantyShareMessage } from './warrantyStorage';

const KAKAO_KEY_STORAGE = 'caution_kakao_js_key';

// 기본 환경변수 또는 로컬스토리지에서 카카오 JS 키 가져오기
export const getKakaoKey = (): string => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(KAKAO_KEY_STORAGE) || (import.meta as any).env?.VITE_KAKAO_JS_KEY || '';
};

// 카카오 JS 키 저장
export const setKakaoKey = (key: string): boolean => {
  if (typeof window === 'undefined') return false;
  const cleanKey = key.trim();
  localStorage.setItem(KAKAO_KEY_STORAGE, cleanKey);
  if (cleanKey) {
    return initKakao(cleanKey);
  }
  return false;
};

// 카카오 SDK 초기화 상태 확인
export const isKakaoReady = (): boolean => {
  if (typeof window === 'undefined') return false;
  const kakao = (window as any).Kakao;
  return Boolean(kakao && kakao.isInitialized && kakao.isInitialized());
};

// 카카오 SDK 초기화 실행
export const initKakao = (customKey?: string): boolean => {
  if (typeof window === 'undefined') return false;
  const kakao = (window as any).Kakao;
  if (!kakao) return false;

  const keyToUse = (customKey || getKakaoKey()).trim();
  if (!keyToUse) return false;

  try {
    if (!kakao.isInitialized()) {
      kakao.init(keyToUse);
    }
    return kakao.isInitialized();
  } catch (err) {
    console.error('Failed to init Kakao SDK:', err);
    return false;
  }
};

// 카카오톡 보증서 공유 실행
export const sendKakaoWarranty = async (
  item: WarrantyItem
): Promise<{ success: boolean; method: 'kakao_sdk' | 'web_share' | 'clipboard'; message: string }> => {
  const viewUrl = getWarrantyViewUrl(item.warrantyNo);
  const shareMessage = createWarrantyShareMessage(item);

  // 1. 카카오 공식 SDK 공유 시도
  const kakao = typeof window !== 'undefined' ? (window as any).Kakao : null;
  if (kakao && (!kakao.isInitialized() && getKakaoKey())) {
    initKakao();
  }

  if (kakao && kakao.isInitialized && kakao.isInitialized() && kakao.Share) {
    try {
      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '[코션스마트센터] PPS 시공 보증서 발급 안내',
          description: `${item.customerName} 고객님 (${item.carPlate} / ${item.carModel})\nPPS 시공 보증서가 정상 발급되었습니다.`,
          imageUrl: `${window.location.origin}/images/warranty/warranty_front.png`,
          link: {
            mobileWebUrl: viewUrl,
            webUrl: viewUrl
          }
        },
        buttons: [
          {
            title: '전자 보증서 확인하기',
            link: {
              mobileWebUrl: viewUrl,
              webUrl: viewUrl
            }
          }
        ]
      });

      return {
        success: true,
        method: 'kakao_sdk',
        message: '카카오톡 공유 창이 열렸습니다. 고객 또는 대화방을 선택해 주세요.'
      };
    } catch (err) {
      console.warn('Kakao.Share.sendDefault failed, trying fallback:', err);
    }
  }

  // 2. 모바일 기기의 브라우저 시스템 공유(Web Share API) 시도 (모바일 카카오톡으로 바로 전달 가능)
  if (typeof navigator !== 'undefined' && (navigator as any).share) {
    try {
      await navigator.share({
        title: '[코션스마트센터] PPS 시공 보증서',
        text: shareMessage,
        url: viewUrl
      });
      return {
        success: true,
        method: 'web_share',
        message: '스마트폰 공유 창에서 [카카오톡]을 선택하시면 고객님께 바로 전달됩니다.'
      };
    } catch (err: any) {
      // 사용자가 공유창 취소한 경우는 제외하고 클립보드로 폴백
      if (err.name !== 'AbortError') {
        console.warn('Web Share failed, falling back to clipboard:', err);
      }
    }
  }

  // 3. 기본 클립보드 복사 폴백
  try {
    await navigator.clipboard.writeText(shareMessage);
    return {
      success: true,
      method: 'clipboard',
      message: '보증서 발송 안내 문구가 복사되었습니다! 고객 카카오톡 대화방에 붙여넣기(Ctrl+V) 해주세요.'
    };
  } catch (err) {
    return {
      success: false,
      method: 'clipboard',
      message: '복사에 실패했습니다. 수동으로 복사해 주세요.'
    };
  }
};
