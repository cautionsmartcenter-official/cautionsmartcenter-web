import {
  type WarrantyItem,
  createWarrantyShareMessage,
  copyTextToClipboard,
  getWarrantyViewUrl,
  encodeWarrantyPayload
} from './warrantyStorage';

const KAKAO_KEY_STORAGE = 'caution_kakao_js_key';
export const DEFAULT_KAKAO_JS_KEY = '152595fa743ee259e0884cf17e26d66b';

// 기본 환경변수 또는 로컬스토리지에서 카카오 JS 키 가져오기
export const getKakaoKey = (): string => {
  if (typeof window === 'undefined') return DEFAULT_KAKAO_JS_KEY;
  return localStorage.getItem(KAKAO_KEY_STORAGE) || (import.meta as any).env?.VITE_KAKAO_JS_KEY || DEFAULT_KAKAO_JS_KEY;
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

export const PRODUCTION_URL = 'https://cautionsmartcenter-web.vercel.app';

// 고객용 공개 링크: item을 넘기면 보증서 정보(d=)를 담아 고객 폰에서도 바로 조회·등록 가능
export const getPublicWarrantyViewUrl = (warrantyNo: string, item?: WarrantyItem): string => {
  const data = item ? `&d=${encodeWarrantyPayload(item)}` : '';
  return `${PRODUCTION_URL}/#warranty?no=${encodeURIComponent(warrantyNo)}${data}`;
};

// 카카오 '글 메시지' 템플릿용 안내문구 (카카오 제한: 최대 200자)
export const createKakaoTextMessage = (item: WarrantyItem): string => {
  const text = `[코션스마트센터] PPS 시공 보증서 발급 안내

안녕하세요, ${item.customerName} 고객님.
시공을 맡겨주셔서 진심으로 감사드립니다.

■ 차량 : ${item.carPlate}
■ 보증 : ${item.issueDate}부터 ${item.warrantyPeriodYears || 6}년
■ 번호 : ${item.warrantyNo}

아래 버튼에서 보증서(PDF)를 꼭 다운로드해 보관해 주세요.
문의 031-705-1888`;
  return text.length > 200 ? `${text.slice(0, 199)}…` : text;
};

// ②단계: 카드 다음에 이어서 보내는 안내문구(글 메시지 + 보증서 버튼)
// ※ 브라우저 팝업 차단 때문에 반드시 버튼 클릭으로 실행되어야 함
export const sendKakaoWarrantyText = (item: WarrantyItem): { success: boolean; message: string } => {
  const viewUrl = getPublicWarrantyViewUrl(item.warrantyNo, item);
  const kakao = typeof window !== 'undefined' ? (window as any).Kakao : null;
  if (kakao && !kakao.isInitialized()) initKakao();
  if (!kakao || !kakao.isInitialized() || !kakao.Share) {
    return { success: false, message: '카카오 연결이 준비되지 않았습니다. [안내문구 전체 복사] 후 붙여넣기 해주세요.' };
  }
  try {
    kakao.Share.sendDefault({
      objectType: 'text',
      text: createKakaoTextMessage(item),
      link: { mobileWebUrl: viewUrl, webUrl: viewUrl },
      buttonTitle: '전자 보증서 확인하기'
    });
    return { success: true, message: '안내문구 전송 창이 열렸습니다. 카드를 보낸 같은 고객을 선택해 주세요.' };
  } catch (err) {
    console.warn('Kakao text share failed:', err);
    return { success: false, message: '안내문구 전송에 실패했습니다. [안내문구 전체 복사] 후 붙여넣기 해주세요.' };
  }
};

// 카카오톡 보증서 공유 실행
export const sendKakaoWarranty = async (
  item: WarrantyItem
): Promise<{ success: boolean; method: 'kakao_sdk' | 'web_share' | 'clipboard'; message: string }> => {
  const viewUrl = getPublicWarrantyViewUrl(item.warrantyNo, item);
  // 안내문구 속 링크를 고객이 열 수 있는 공식 주소(보증서 정보 포함)로 통일
  const shareMessage = createWarrantyShareMessage(item)
    .split(getWarrantyViewUrl(item.warrantyNo, item))
    .join(viewUrl);
  const imageUrl = `${PRODUCTION_URL}/images/warranty/warranty_front.png`;

  // 0. 스마트폰: 전체 안내문구를 그대로 카톡으로 먼저 보내기 (문구 + 보증서 링크가 한 번에 전송됨)
  //    카카오 카드(SDK)는 글자 수 제한 때문에 긴 안내문구를 담을 수 없어, 모바일에서는 문구 전송을 우선함
  const isMobileDevice =
    typeof navigator !== 'undefined' &&
    (/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 1 && /Mac/i.test(navigator.platform)));

  if (isMobileDevice && typeof navigator !== 'undefined' && (navigator as any).share) {
    try {
      // url을 따로 넣으면 일부 기기에서 문구가 빠지고 링크만 가므로, 링크가 들어간 전체 문구를 text로만 전달
      await navigator.share({ text: shareMessage });
      return {
        success: true,
        method: 'web_share',
        message: '공유 창에서 [카카오톡]을 선택하면 안내문구와 보증서 링크가 함께 전달됩니다.'
      };
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        return { success: false, method: 'web_share', message: '공유를 취소했습니다.' };
      }
      console.warn('Web Share (mobile) failed, trying Kakao SDK:', err);
    }
  }

  // 1. 카카오 공식 SDK 공유 (주로 PC) — 카드 전송 + 전체 안내문구 자동 복사
  const kakao = typeof window !== 'undefined' ? (window as any).Kakao : null;
  if (kakao) {
    if (!kakao.isInitialized()) {
      initKakao();
    }
  }

  if (kakao && kakao.isInitialized && kakao.isInitialized() && kakao.Share) {
    // ⚠️ 카카오 공유 팝업이 열리면 포커스가 넘어가 복사가 막히므로, 팝업 열기 "직전"에 전체 안내문구 복사를 시작
    const copyPromise = copyTextToClipboard(shareMessage).catch(() => false);

    const ppsType = [
      item.hasClearPps ? `투명PPS(${item.clearPpsDetail || '전체'})` : '',
      item.hasColorPps ? `컬러PPS(${item.colorPpsDetail || '전체'})` : ''
    ].filter(Boolean).join(', ') || '독일 정품 CARDIP PPS';
    const cut = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

    try {
      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '[코션스마트센터] PPS 시공 보증서 발급 안내',
          description: `${item.customerName} 고객님, PPS 시공 보증서가 정상 발급되었습니다.`,
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: viewUrl,
            webUrl: viewUrl
          }
        },
        itemContent: {
          profileText: '코션스마트센터 · 독일 CARDIP 정품',
          items: [
            { item: '차량번호', itemOp: cut(`${item.carPlate} (${item.carModel})`, 25) },
            { item: '시공내역', itemOp: cut(ppsType, 25) },
            { item: '보증기간', itemOp: cut(`${item.issueDate}부터 ${item.warrantyPeriodYears || 6}년`, 25) },
            { item: '보증번호', itemOp: cut(item.warrantyNo, 25) }
          ]
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

      const copied = await copyPromise;
      return {
        success: true,
        method: 'kakao_sdk',
        message: copied
          ? '① 카드를 보낸 뒤 ② [안내문구 이어서 보내기] 버튼을 눌러 같은 고객을 선택해 주세요.'
          : '① 카드를 보낸 뒤 ② [안내문구 이어서 보내기] 버튼을 눌러 같은 고객을 선택해 주세요.'
      };
    } catch (err) {
      console.warn('Kakao.Share.sendDefault failed, trying fallback:', err);
    }
  }

  // 2. 모바일 기기의 브라우저 시스템 공유(Web Share API) 시도 (모바일 카카오톡으로 바로 전달 가능)
  if (typeof navigator !== 'undefined' && (navigator as any).share) {
    try {
      await navigator.share({
        text: shareMessage
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
