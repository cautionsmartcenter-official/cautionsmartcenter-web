/**
 * 차량 시공/작업 사진 전송 데이터 스토리지 및 링크 인코딩
 * - 고객 차량의 작업 단계별 사진을 저장하고 모바일 웹 앨범 링크를 생성합니다.
 */

export interface WorkPhotoItem {
  id: string;
  createdAt: string; // ISO String
  warrantyId?: string;
  warrantyNo?: string;
  customerName: string;
  customerPhone: string;
  carModel: string;
  carPlate: string;
  stage: string; // e.g. "1단계: 디테일링 세척 및 탈지", "2단계: 필름 시공 진행 중", "3단계: 정밀 마감 및 건조", "4단계: 최종 시공 완료"
  message?: string;
  photos: string[]; // base64 또는 이미지 URL
  sendMethod?: 'solapi' | 'kakao' | 'link';
  sentAt?: string;
}

const STORAGE_KEY = 'caution_work_photos_db';

// 작업 사진 목록 조회
export const getWorkPhotos = (): WorkPhotoItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (e) {
    console.error('Failed to get work photos:', e);
    return [];
  }
};

// 단건 조회
export const getWorkPhotoById = (id: string): WorkPhotoItem | null => {
  const list = getWorkPhotos();
  return list.find((item) => item.id === id) || null;
};

// 신규 작업 사진 저장
export const saveWorkPhoto = (data: Omit<WorkPhotoItem, 'id' | 'createdAt'>): WorkPhotoItem => {
  const list = getWorkPhotos();
  const newItem: WorkPhotoItem = {
    ...data,
    id: `wp-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    createdAt: new Date().toISOString()
  };

  const updated = [newItem, ...list.slice(0, 49)]; // 최근 50건 유지
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Storage quota exceeded, removing older items:', err);
    // 사진 데이터 용량 초과 시 과거 사진 데이터 정리 후 재시도
    const trimmed = [newItem, ...list.slice(0, 10)];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch (e) {
      console.error('Failed to save work photo:', e);
    }
  }

  return newItem;
};

// 작업 사진 삭제
export const deleteWorkPhoto = (id: string): boolean => {
  const list = getWorkPhotos();
  const updated = list.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch {
    return false;
  }
};

/**
 * 브라우저 캔버스를 이용한 이미지 자동 리사이즈 및 압축 (최대 폭/높이 1280px, JPEG 0.8 품질)
 * - 스마트폰 카메라의 5~10MB 원본을 수백 KB로 압축하여 빠른 전송과 저장을 지원합니다.
 */
export const compressImageFile = (file: File, maxWidth = 1280, maxHeight = 1280, quality = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve(e.target?.result as string);
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const PUBLIC_SITE_URL = 'https://cautionsmartcenter.com';

/**
 * 고객 모바일 시공 현황 앨범 열람 URL 생성
 */
export const getWorkPhotoViewUrl = (item: WorkPhotoItem): string => {
  if (typeof window === 'undefined') return '';
  const isLocal = /localhost|127\.0\.0\.1|192\.168\./.test(window.location.hostname);
  const base = isLocal ? `${PUBLIC_SITE_URL}/` : `${window.location.origin}${window.location.pathname}`;

  // 모바일 링크 파라미터 (id, 고객명, 차량번호, 차종, 작업단계 등)
  const params = new URLSearchParams({
    id: item.id,
    name: item.customerName,
    plate: item.carPlate,
    model: item.carModel,
    stage: item.stage
  });

  return `${base}#work-status?${params.toString()}`;
};

/**
 * 고객 전송용 작업 현황 안내 문구 생성
 */
export const createWorkPhotoShareMessage = (item: WorkPhotoItem): string => {
  const viewUrl = getWorkPhotoViewUrl(item);

  return `[코션스마트센터] 🚗 시공 진행 현황 안내

안녕하세요, ${item.customerName} 고객님!
(주)코션스마트센터에서 고객님의 소중한 차량 시공 현황을 안내해 드립니다.

■ 차종 : ${item.carModel} (${item.carPlate})
■ 진행단계 : ${item.stage}
${item.message ? `■ 작업안내 : ${item.message}\n` : ''}
시공 장인들의 정밀한 공정으로 꼼꼼하게 작업이 진행되고 있습니다.
아래 링크를 터치하시면 실시간 작업 현장 사진을 고화질로 확인하실 수 있습니다.

📸 시공 사진 확인하기:
${viewUrl}

*문의전화: 031-705-1888
*코션스마트센터 판교 본점`;
};
