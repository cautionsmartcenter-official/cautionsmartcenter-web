export interface WarrantyItem {
  id: string;
  warrantyNo: string; // e.g. CSC-2026-001
  createdAt: string; // ISO string

  // 고객 정보
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress?: string;

  // 차량 정보
  carModel: string;
  carPlate: string;
  carColor?: string;
  vin?: string; // 차대번호 (알면 적고 모르면 패스)

  // 제품 및 시공 정보
  hasClearPps: boolean;
  clearPpsDetail?: string; // e.g. 전체, 앞범퍼, 생활보호 등
  hasColorPps: boolean;
  colorPpsDetail?: string; // e.g. 사틴 블랙, 본넷 등
  price: string; // 시공가격 (원) e.g. 5,500,000 (VAT 별도)
  issueDate: string; // 시공일자 YYYY-MM-DD
  warrantyPeriodYears: number; // 기본 6년

  // 발급점
  issuedBy: string; // 기본: (주) 코션스마트센터

  // 관리용
  status: 'active' | 'expired' | 'cancelled';
  notes?: string;

  // 서버(고객 열람용) 동기화 및 카카오 알림톡/이메일 발송 기록
  viewToken?: string; // 고객 열람 링크용 무작위 토큰 (/w/<토큰>)
  alimtalkStatus?: 'sent' | 'failed';
  alimtalkMessage?: string;
  alimtalkAt?: string; // ISO string
  emailStatus?: 'sent' | 'failed';
  emailMessage?: string;
  emailAt?: string; // ISO string
}

// ── 엑셀 영구 보존 대장용 인터페이스 ──
export interface ArchiveWarrantyItem extends WarrantyItem {
  isDeletedFromScreen?: boolean; // 관리자 화면 목록에서 삭제 여부
  deletedAt?: string;            // 삭제 일시 (ISO String)
  archivedAt?: string;           // 아카이브 등록 일시
}

const STORAGE_KEY = 'caution_warranty_db';
const ARCHIVE_STORAGE_KEY = 'caution_warranty_archive_db'; // 엑셀 대장 영구 보관소 (화면에서 삭제해도 절대 안 지워짐)

// 보증서 일련번호 자동 생성 함수: CSC-YYYY-MMDD-순번
export const generateWarrantyNo = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `CSC-${year}-${month}${day}-${randomSuffix}`;
};

/**
 * 가격 문자열 또는 숫자를 3자리 단위 콤마 형식(예: 10,000,000)으로 변환합니다.
 */
export const formatPriceWithCommas = (val?: string | number): string => {
  if (val === undefined || val === null) return '';
  const numOnly = String(val).replace(/[^0-9]/g, '');
  if (!numOnly) return '';
  return Number(numOnly).toLocaleString('ko-KR');
};

// 보증서 목록 조회 (이전 더미 데이터 자동 정리)
export const getWarranties = (): WarrantyItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    
    // 이전 더미 시드 데이터(war-seed-) 자동 삭제 정리
    const cleaned = parsed.filter((item: WarrantyItem) => !item.id?.startsWith('war-seed-'));
    if (cleaned.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    }
    return cleaned;
  } catch (err) {
    console.error('Error fetching warranties:', err);
    return [];
  }
};

/**
 * 엑셀 대장용 영구 아카이브 데이터 조회
 * - 기존 메인 DB(caution_warranty_db)에 등록된 항목 중 아카이브에 아직 누락된 것이 있다면 자동으로 합쳐서 영구 보존합니다.
 */
export const getArchiveWarranties = (): ArchiveWarrantyItem[] => {
  try {
    const rawArchive = localStorage.getItem(ARCHIVE_STORAGE_KEY);
    let archiveList: ArchiveWarrantyItem[] = [];
    if (rawArchive) {
      const parsed = JSON.parse(rawArchive);
      if (Array.isArray(parsed)) {
        archiveList = parsed;
      }
    }

    // 메인 DB에 있는 항목들을 가져와서 아카이브에 없으면 자동 편입
    const mainList = getWarranties();
    let isArchiveUpdated = false;

    for (const item of mainList) {
      const existsIndex = archiveList.findIndex(
        (a) => a.id === item.id || a.warrantyNo === item.warrantyNo
      );
      if (existsIndex === -1) {
        archiveList.unshift({
          ...item,
          isDeletedFromScreen: false,
          archivedAt: item.createdAt || new Date().toISOString()
        });
        isArchiveUpdated = true;
      } else {
        // 아카이브에 이미 있고 화면에도 살아있는 경우 상태 동기화
        if (archiveList[existsIndex].isDeletedFromScreen) {
          archiveList[existsIndex].isDeletedFromScreen = false;
          delete archiveList[existsIndex].deletedAt;
          isArchiveUpdated = true;
        }
      }
    }

    if (isArchiveUpdated) {
      localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(archiveList));
    }

    return archiveList;
  } catch (err) {
    console.error('Error fetching archive warranties:', err);
    return [];
  }
};

/**
 * 영구 엑셀 대장 아카이브에 보증서 저장/갱신 (화면 삭제 여부 플래그 지원)
 */
export const saveToArchive = (item: WarrantyItem, isDeleted = false, deletedAt?: string): void => {
  try {
    const rawArchive = localStorage.getItem(ARCHIVE_STORAGE_KEY);
    let archiveList: ArchiveWarrantyItem[] = rawArchive ? JSON.parse(rawArchive) : [];
    if (!Array.isArray(archiveList)) archiveList = [];

    const existingIndex = archiveList.findIndex(
      (a) => a.id === item.id || a.warrantyNo === item.warrantyNo
    );

    const archiveEntry: ArchiveWarrantyItem = {
      ...(existingIndex !== -1 ? archiveList[existingIndex] : {}),
      ...item,
      isDeletedFromScreen: isDeleted,
      deletedAt: isDeleted ? (deletedAt || new Date().toISOString()) : undefined,
      archivedAt: existingIndex !== -1 && archiveList[existingIndex].archivedAt 
        ? archiveList[existingIndex].archivedAt 
        : (item.createdAt || new Date().toISOString())
    };

    if (existingIndex !== -1) {
      archiveList[existingIndex] = archiveEntry;
    } else {
      archiveList.unshift(archiveEntry);
    }

    localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(archiveList));
  } catch (err) {
    console.error('Failed to save warranty to archive:', err);
  }
};

// 전체 보증서 내역 화면에서 비우기 / 초기화 (화면 목록만 비우고 엑셀 대장에는 영구 보존!)
export const clearAllWarranties = (): void => {
  try {
    const list = getWarranties();
    const deletedTime = new Date().toISOString();
    // 기존 활성 데이터들을 엑셀 대장에 '화면삭제' 상태로 안전하게 보관 처리
    list.forEach((item) => {
      saveToArchive(item, true, deletedTime);
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } catch (err) {
    console.error('Error clearing warranties:', err);
  }
};

// ── 링크에 보증서 정보 담기 (d= 파라미터) ──
// 관리자 PC에만 저장된 보증서를 고객 폰에서도 확인할 수 있도록, 카톡/문자 링크에 정보를 함께 담습니다.
// (서버 api/warranty.ts 의 buildWarrantyViewUrl 과 동일한 형식, 주소·메모는 제외)
export const encodeWarrantyPayload = (w: WarrantyItem): string => {
  const payload = {
    no: w.warrantyNo || '',
    name: w.customerName || '',
    phone: w.customerPhone || '',
    plate: w.carPlate || '',
    model: w.carModel || '',
    color: w.carColor || '',
    vin: w.vin || '',
    date: w.issueDate || '',
    years: w.warrantyPeriodYears || 6,
    c: w.hasClearPps ? 1 : 0,
    cd: w.clearPpsDetail || '',
    k: w.hasColorPps ? 1 : 0,
    kd: w.colorPpsDetail || '',
    p: w.price || '',
    by: w.issuedBy || '(주) 코션스마트센터'
  };
  const bytes = new TextEncoder().encode(JSON.stringify(payload));
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const decodeWarrantyPayload = (encoded: string): WarrantyItem | null => {
  try {
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const bin = atob(base64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const p = JSON.parse(new TextDecoder('utf-8').decode(bytes));
    if (!p || !p.no || !p.name || !p.plate) return null;
    return {
      id: `recv-${p.no}`,
      warrantyNo: p.no,
      createdAt: p.date || new Date().toISOString(),
      customerName: p.name,
      customerPhone: p.phone || '',
      carModel: p.model || '',
      carPlate: p.plate || '',
      carColor: p.color || '',
      vin: p.vin || '',
      hasClearPps: Boolean(p.c),
      clearPpsDetail: p.cd || '',
      hasColorPps: Boolean(p.k),
      colorPpsDetail: p.kd || '',
      price: p.p || '',
      issueDate: p.date || '',
      warrantyPeriodYears: Number(p.years) || 6,
      issuedBy: p.by || '(주) 코션스마트센터',
      status: 'active'
    };
  } catch {
    return null;
  }
};

// ── 고객 폰에 '받은 보증서' 보관 (관리자 목록과 별도) ──
const RECEIVED_KEY = 'caution_received_warranties';

export const getReceivedWarranties = (): WarrantyItem[] => {
  try {
    const raw = localStorage.getItem(RECEIVED_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
};

export const cacheReceivedWarranty = (item: WarrantyItem): void => {
  try {
    const list = getReceivedWarranties().filter((w) => w.warrantyNo !== item.warrantyNo);
    list.unshift(item);
    localStorage.setItem(RECEIVED_KEY, JSON.stringify(list.slice(0, 50)));
  } catch (err) {
    console.error('Failed to cache received warranty:', err);
  }
};

// 이 기기에서 알 수 있는 모든 보증서 (관리자 등록분 + 링크로 받은 것 + 엑셀 영구대장 보관분), 보증번호 기준 중복 제거
export const getAllKnownWarranties = (): WarrantyItem[] => {
  const map = new Map<string, WarrantyItem>();
  [...getArchiveWarranties(), ...getReceivedWarranties(), ...getWarranties()].forEach((w) => map.set(w.warrantyNo, w));
  return Array.from(map.values());
};

// 단건 조회 (ID 또는 보증번호) - 화면 목록 -> 고객 수신함 -> 영구 대장 순으로 탐색
export const getWarrantyById = (idOrNo: string): WarrantyItem | null => {
  const decoded = decodeURIComponent(idOrNo).trim();
  
  // 1. 관리자 화면 활성 목록
  const activeList = getWarranties();
  const foundActive = activeList.find((w) => w.id === decoded || w.warrantyNo === decoded);
  if (foundActive) return foundActive;

  // 2. 고객 수신함
  const receivedList = getReceivedWarranties();
  const foundReceived = receivedList.find((w) => w.id === decoded || w.warrantyNo === decoded);
  if (foundReceived) return foundReceived;

  // 3. 엑셀 영구 보존 대장 (화면에서 삭제된 건이라도 조회 가능)
  const archiveList = getArchiveWarranties();
  return archiveList.find((w) => w.id === decoded || w.warrantyNo === decoded) || null;
};

// 보증서 신규 저장 (화면 활성 DB 및 엑셀 영구 대장 아카이브 동시 보존)
export const saveWarranty = (data: Omit<WarrantyItem, 'id' | 'createdAt'>): WarrantyItem => {
  const list = getWarranties();
  const newItem: WarrantyItem = {
    ...data,
    id: `war-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    createdAt: new Date().toISOString(),
    warrantyNo: data.warrantyNo?.trim() || generateWarrantyNo(),
    issuedBy: data.issuedBy || '(주) 코션스마트센터',
    warrantyPeriodYears: data.warrantyPeriodYears || 6,
    status: data.status || 'active'
  };

  const updated = [newItem, ...list];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  // 엑셀 영구 대장 아카이브에도 즉시 영구 등록
  saveToArchive(newItem, false);

  return newItem;
};

// 보증서 수정 (화면 활성 DB 및 엑셀 영구 대장 아카이브 동시 반영)
export const updateWarranty = (id: string, updates: Partial<WarrantyItem>): WarrantyItem | null => {
  const list = getWarranties();
  const index = list.findIndex((w) => w.id === id);
  if (index === -1) return null;

  list[index] = { ...list[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

  // 엑셀 영구 대장 아카이브에도 최신 내용 동기화
  saveToArchive(list[index], false);

  return list[index];
};

// 보증서 삭제 (화면 목록에서는 즉시 제거하되, 엑셀 대장에는 삭제일시와 함께 영구 보존!)
export const deleteWarranty = (id: string): boolean => {
  const list = getWarranties();
  const target = list.find((w) => w.id === id);
  
  if (target) {
    // 엑셀 영구 대장 아카이브에는 삭제 일시를 달아서 영구 보존
    saveToArchive(target, true, new Date().toISOString());
  }

  const updated = list.filter((w) => w.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return true;
};

// CSV 다운로드 (엑셀 호환 - 화면에서 삭제된 보증서도 영구 대장에 모두 포함되어 출력)
export const exportWarrantiesToCSV = () => {
  // 영구 보존 아카이브 대장을 기준으로 조회 (화면에서 삭제된 이력까지 100% 누적 보관)
  const data = getArchiveWarranties();
  if (data.length === 0) {
    alert('저장된 보증서 대장 내역이 없습니다.');
    return;
  }

  const headers = [
    '보증번호',
    '대장보관상태',
    '발급일자',
    '고객명',
    '연락처',
    '주소',
    '차종',
    '차량번호',
    '차량색상',
    '차대번호',
    '투명PPS',
    '컬러PPS',
    '시공가격(VAT별도)',
    '보증기간(년)',
    '시공점',
    '보증효력',
    '삭제일시(대장보관)',
    '메모'
  ];

  const rows = data.map((item) => {
    const storageStatus = item.isDeletedFromScreen ? '화면삭제(대장영구보관)' : '화면등록중(정상)';
    const warrantyStatus = item.status === 'active' ? '유효' : item.status === 'expired' ? '만료' : '취소';
    const deletedDate = item.deletedAt ? item.deletedAt.replace('T', ' ').slice(0, 19) : '-';

    return [
      `"${item.warrantyNo}"`,
      `"${storageStatus}"`,
      `"${item.issueDate}"`,
      `"${item.customerName}"`,
      `"${item.customerPhone}"`,
      `"${item.customerAddress || ''}"`,
      `"${item.carModel}"`,
      `"${item.carPlate}"`,
      `"${item.carColor || ''}"`,
      `"${item.vin || ''}"`,
      `"${item.hasClearPps ? `적용(${item.clearPpsDetail || '전체'})` : '미적용'}"`,
      `"${item.hasColorPps ? `적용(${item.colorPpsDetail || '전체'})` : '미적용'}"`,
      `"${item.price}"`,
      `"${item.warrantyPeriodYears}년"`,
      `"${item.issuedBy}"`,
      `"${warrantyStatus}"`,
      `"${deletedDate}"`,
      `"${(item.notes || '').replace(/"/g, '""')}"`
    ];
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `코션스마트센터_전자보증서_누적대장_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 보증서 열람 URL 생성 함수
// - item을 넘기면 링크에 보증서 정보(d=)를 함께 담아, 고객 폰에서도 바로 확인·등록할 수 있습니다.
// - 내 PC(localhost)에서 만든 링크는 고객이 열 수 없으므로 공식 사이트 주소를 사용합니다.
const PUBLIC_SITE_URL = 'https://cautionsmartcenter.com';
export const getWarrantyViewUrl = (warrantyNo: string, item?: WarrantyItem): string => {
  const isLocal = /localhost|127\.0\.0\.1|192\.168\./.test(window.location.hostname);
  const base = isLocal ? `${PUBLIC_SITE_URL}/` : `${window.location.origin}${window.location.pathname}`;
  const data = item ? `&d=${encodeWarrantyPayload(item)}` : '';
  return `${base}#warranty?no=${encodeURIComponent(warrantyNo)}${data}`;
};

// 카카오톡/문자 전송 메시지 생성 함수
export const createWarrantyShareMessage = (item: WarrantyItem): string => {
  const ppsType = [
    item.hasClearPps ? `투명PPS(${item.clearPpsDetail || '전체'})` : '',
    item.hasColorPps ? `컬러PPS(${item.colorPpsDetail || '전체'})` : ''
  ].filter(Boolean).join(', ') || '독일 정품 CARDIP PPS';

  const viewUrl = getWarrantyViewUrl(item.warrantyNo, item);

  return `[코션스마트센터] PPS 시공 보증서 발급 안내

안녕하세요, ${item.customerName} 고객님.

(주)코션스마트센터를 믿고 차량 시공을 맡겨주셔서 진심으로 감사드립니다.

고객님의 차량에 PPS 시공 보증서가 정상 발급되었습니다.

■ 차    종 : ${item.carModel}
■ 차량번호 : ${item.carPlate}
■ 시공내역 : ${ppsType}
■ 보증기간 : 시공일(${item.issueDate})로부터 ${item.warrantyPeriodYears}년
■ 보증번호 : ${item.warrantyNo}

◇ 함께 보내드린 정품 보증서(PDF)를 꼭 [다운로드]하여 보관해 주세요.
(PDF 파일은 화면을 길게 눌러서 저장되지 않으므로, 첨부파일의 [다운로드] 또는 [저장] 버튼을 눌러 보관해 두시면 사고·보험 처리 시 공식 제출용으로 사용하실 수 있습니다.)

🔗 모바일 전자보증서 바로 확인:
${viewUrl}

*본 보증서는 독일 CARDIP 공식 수입원인 (주)코션스마트센터에서 발급한 정품 보증서입니다.
*문의전화: 031-705-1888`;
};

// 클립보드 복사 함수 (최신 API + 구형 브라우저 textarea execCommand 완벽 폴백)
export const copyTextToClipboard = async (text: string): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  // 1. 최신 navigator.clipboard 시도 (https 또는 localhost 지원 환경)
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('navigator.clipboard.writeText failed, using fallback textarea:', err);
    }
  }

  // 2. Fallback: 임시 textarea 생성 후 document.execCommand('copy') 실행
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Fallback execCommand copy failed:', err);
    return false;
  }
};

// 이미지 로드 헬퍼 함수
const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
};

// 캔버스를 이미지 파일(PNG)로 다운로드하는 헬퍼
const downloadCanvas = (canvas: HTMLCanvasElement, filename: string): Promise<boolean> => {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return resolve(false);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => {
        URL.revokeObjectURL(url);
        resolve(true);
      }, 100);
    }, 'image/png');
  });
};

// ─────────────────────────────────────────────
// 보증서 캔버스 생성 및 PDF / 이미지 다운로드 함수
// ─────────────────────────────────────────────

/**
 * 보증서 1면(상세) 및 2면(약관)의 고화질 캔버스를 렌더링하여 반환
 */
export const renderWarrantyCanvases = async (
  item: WarrantyItem
): Promise<{ canvasFront: HTMLCanvasElement; canvasBack: HTMLCanvasElement } | null> => {
  if (typeof window === 'undefined') return null;

  try {
    // 1. 앞면 (상세) 초고해상도 로드 (2482 x 3510, A4 300DPI 표준 규격)
    const frontImg = await loadImage('/images/warranty/warranty_front.png');
    const width = frontImg.naturalWidth || 2482;
    const height = frontImg.naturalHeight || 3510;
    const fontScale = width / 723; // 기존 723px 레이아웃 기준 스케일 팩터

    const canvasFront = document.createElement('canvas');
    canvasFront.width = width;
    canvasFront.height = height;
    const ctxFront = canvasFront.getContext('2d');
    if (!ctxFront) return null;

    ctxFront.imageSmoothingEnabled = true;
    ctxFront.imageSmoothingQuality = 'high';

    // 원본 서식 그리기
    ctxFront.drawImage(frontImg, 0, 0, width, height);

    // 텍스트 그리기 헬퍼 (모니터 100% 화면 및 모바일에서도 글씨가 시원하고 선명하게 보이도록 최적화)
    ctxFront.textBaseline = 'middle';
    const drawFrontText = (
      text: string,
      xPct: number,
      yPct: number,
      fontSize: number,
      isBold = true,
      isMono = false,
      color = '#111827'
    ) => {
      ctxFront.fillStyle = color;
      const fontName = isMono 
        ? '"Space Mono", monospace, "Courier New", sans-serif' 
        : '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif';
      ctxFront.font = `${isBold ? '800 ' : '600 '}${fontSize * fontScale}px ${fontName}`;
      ctxFront.fillText(text, (xPct / 100) * width, (yPct / 100) * height);
    };

    // 고객정보 (폰트 크기 및 굵기 강화로 가독성 극대화)
    drawFrontText(item.customerName, 20.0, 43.0, 14.5, true);
    drawFrontText(item.customerPhone, 20.0, 45.9, 13.5, true, true);
    drawFrontText(item.customerAddress || '-', 20.0, 49.3, 12.5, false);

    // 보증서 정보
    drawFrontText(item.warrantyNo, 66.5, 43.1, 14.0, true, true);
    drawFrontText(item.issueDate, 66.5, 46.1, 14.0, true, true);

    // 차량정보
    drawFrontText(item.carModel, 20.0, 59.8, 14.5, true);
    drawFrontText(item.carColor || '-', 20.0, 62.8, 14.5, true);
    drawFrontText(item.carPlate, 61.5, 59.8, 15.5, true);
    drawFrontText(item.vin?.trim() || '-', 61.5, 62.8, 13.0, true, true);

    // 제품 및 시공가격 (괄호 정중앙 정렬)
    const clearText = item.hasClearPps ? (item.clearPpsDetail || '전체') : '-';
    const colorText = item.hasColorPps ? (item.colorPpsDetail || '전체') : '-';

    ctxFront.textAlign = 'center';
    drawFrontText(clearText, 53.5, 71.8, 13.0, true, false, '#b91c1c');
    drawFrontText(colorText, 79.0, 71.8, 13.0, true, false, '#b91c1c');
    ctxFront.textAlign = 'left';

    if (item.price) {
      ctxFront.textAlign = 'right';
      drawFrontText(`${formatPriceWithCommas(item.price)} 원`, 69.5, 76.5, 16.0, true, true);
      ctxFront.textAlign = 'left';
    }

    // 2. 뒷면 (약관) 초고해상도 로드
    const backImg = await loadImage('/images/warranty/warranty_back.png');
    const canvasBack = document.createElement('canvas');
    canvasBack.width = width;
    canvasBack.height = height;
    const ctxBack = canvasBack.getContext('2d');
    if (!ctxBack) return null;

    ctxBack.imageSmoothingEnabled = true;
    ctxBack.imageSmoothingQuality = 'high';

    // 원본 서식 그리기
    ctxBack.drawImage(backImg, 0, 0, width, height);

    // 보증기간이 6년(기본)과 다를 때 오버레이 처리
    if (item.warrantyPeriodYears && item.warrantyPeriodYears !== 6) {
      ctxBack.fillStyle = '#ffffff';
      const maskX = (35.8 / 100) * width;
      const maskY = (27.2 / 100) * height;
      const maskW = (5.0 / 100) * width;
      const maskH = (2.4 / 100) * height;
      ctxBack.fillRect(maskX, maskY, maskW, maskH);

      ctxBack.fillStyle = '#111827';
      ctxBack.textBaseline = 'middle';
      ctxBack.textAlign = 'center';
      ctxBack.font = `bold ${13 * fontScale}px monospace, Courier, sans-serif`;
      ctxBack.fillText(String(item.warrantyPeriodYears), (38.3 / 100) * width, (28.5 / 100) * height);
    }

    return { canvasFront, canvasBack };
  } catch (err) {
    console.error('Failed to render warranty canvases:', err);
    return null;
  }
};

/**
 * 정품 보증서 1면(상세) + 2면(약관)을 하나의 완성된 PDF(총 2페이지) 파일로 생성하여 다운로드
 */
export const downloadWarrantyPdf = async (item: WarrantyItem): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  try {
    const canvases = await renderWarrantyCanvases(item);
    if (!canvases) return false;

    const { jsPDF } = await import('jspdf');
    // A4 규격 세로(210 x 297 mm)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // 1페이지 (앞면 상세)
    const frontDataUrl = canvases.canvasFront.toDataURL('image/jpeg', 0.95);
    pdf.addImage(frontDataUrl, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');

    // 2페이지 (뒷면 약관)
    pdf.addPage('a4', 'portrait');
    const backDataUrl = canvases.canvasBack.toDataURL('image/jpeg', 0.95);
    pdf.addImage(backDataUrl, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');

    const cleanName = (item.customerName || '고객').replace(/[^a-zA-Z0-9가-힣]/g, '');
    const cleanPlate = (item.carPlate || '차량').replace(/[^a-zA-Z0-9가-힣]/g, '');
    const fileName = `코션스마트센터_정품보증서_${cleanName}_${cleanPlate}.pdf`;

    const blob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);

    return true;
  } catch (err) {
    console.error('Failed to generate warranty PDF:', err);
    return false;
  }
};

/**
 * 보증서 1면(상세) + 2면(약관)을 1장의 초고화질 통합 PNG 이미지로 결합하여 다운로드
 * 스마트폰 사진첩 및 PC 모니터에서 확대해도 글씨가 매우 또렷하게 보이도록 2000px 와이드 규격으로 결합
 */
export const downloadWarrantyImage = async (item: WarrantyItem): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  try {
    const canvases = await renderWarrantyCanvases(item);
    if (!canvases) return false;

    const { canvasFront, canvasBack } = canvases;

    // 모바일 갤러리 및 PC 이미지 뷰어에서 100% 튕김 없이 가장 선명하게 열리는 2000px 와이드 규격
    const targetWidth = 2000;
    const scale = targetWidth / canvasFront.width;
    const frontHeight = Math.round(canvasFront.height * scale);
    const backHeight = Math.round(canvasBack.height * scale);
    const totalHeight = frontHeight + backHeight;

    const combinedCanvas = document.createElement('canvas');
    combinedCanvas.width = targetWidth;
    combinedCanvas.height = totalHeight;

    const ctx = combinedCanvas.getContext('2d');
    if (!ctx) return false;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, targetWidth, totalHeight);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1면 (상세) 그리기
    ctx.drawImage(canvasFront, 0, 0, targetWidth, frontHeight);

    // 2면 (약관) 그리기
    ctx.drawImage(canvasBack, 0, frontHeight, targetWidth, backHeight);

    const cleanName = (item.customerName || '고객').replace(/[^a-zA-Z0-9가-힣]/g, '');
    const cleanPlate = (item.carPlate || '차량').replace(/[^a-zA-Z0-9가-힣]/g, '');
    const fileName = `코션스마트센터_정품보증서_통합본_${cleanName}_${cleanPlate}.png`;

    await downloadCanvas(combinedCanvas, fileName);
    return true;
  } catch (err) {
    console.error('Failed to download combined warranty image:', err);
    return false;
  }
};

/**
 * 외부 웹 UI(Talk with Us, 헤더, 배경 등)를 100% 배제하고
 * 오직 [보증서]와 [보증조건 및 관리안내] 페이지만 A4 규격으로 인쇄하는 독립 iframe 출력 함수
 * @param item 보증서 데이터
 * @param target 'both' (보증서+관리안내 2장) | 'front' (보증서만 1장) | 'back' (관리안내만 1장)
 */
export const printWarrantyDirect = async (
  item: WarrantyItem,
  target: 'both' | 'front' | 'back' = 'both'
): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  try {
    const canvases = await renderWarrantyCanvases(item);
    if (!canvases) return false;

    const frontDataUrl = canvases.canvasFront.toDataURL('image/jpeg', 0.96);
    const backDataUrl = canvases.canvasBack.toDataURL('image/jpeg', 0.96);

    // 기존 iframe이 있다면 정리
    const oldIframe = document.getElementById('warranty-print-iframe');
    if (oldIframe) {
      oldIframe.remove();
    }

    const iframe = document.createElement('iframe');
    iframe.id = 'warranty-print-iframe';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return false;

    let pagesHtml = '';
    if (target === 'both' || target === 'front') {
      pagesHtml += `<div class="print-page"><img src="${frontDataUrl}" alt="독일 CARDIP 정품 품질 보증서" /></div>`;
    }
    if (target === 'both' || target === 'back') {
      pagesHtml += `<div class="print-page"><img src="${backDataUrl}" alt="PPS 시공 보증 조건 및 관리안내" /></div>`;
    }

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="utf-8">
        <title>독일 CARDIP 정품 품질 보증서_${item.customerName || '고객'}</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 0mm;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          html, body {
            width: 210mm;
            margin: 0;
            padding: 0;
            background: #ffffff;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-page {
            width: 210mm;
            height: 297mm;
            max-width: 210mm;
            max-height: 297mm;
            margin: 0;
            padding: 0;
            overflow: hidden;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .print-page:not(:last-child) {
            page-break-after: always;
            break-after: page;
          }
          .print-page img {
            width: 210mm;
            height: 297mm;
            display: block;
            object-fit: fill;
            image-rendering: -webkit-optimize-contrast;
          }
        </style>
      </head>
      <body>
        ${pagesHtml}
      </body>
      </html>
    `);
    doc.close();

    // 이미지 로드 및 렌더링 준비 후 인쇄 창 호출
    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch (e) {
        console.error('Direct print failed:', e);
      }
      // 3초 후 iframe 정리
      setTimeout(() => {
        iframe.remove();
      }, 3000);
    }, 400);

    return true;
  } catch (err) {
    console.error('Failed to run printWarrantyDirect:', err);
    return false;
  }
};

