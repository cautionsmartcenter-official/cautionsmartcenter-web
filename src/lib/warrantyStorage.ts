export interface WarrantyItem {
  id: string;
  warrantyNo: string; // e.g. CSC-2026-001
  createdAt: string; // ISO string

  // 고객 정보
  customerName: string;
  customerPhone: string;
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

  // 서버(고객 열람용) 동기화 및 카카오 알림톡 발송 기록
  viewToken?: string; // 고객 열람 링크용 무작위 토큰 (/w/<토큰>)
  alimtalkStatus?: 'sent' | 'failed';
  alimtalkMessage?: string;
  alimtalkAt?: string; // ISO string
}

const STORAGE_KEY = 'caution_warranty_db';

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

// 전체 보증서 내역 삭제 / 초기화
export const clearAllWarranties = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } catch (err) {
    console.error('Error clearing warranties:', err);
  }
};

// 단건 조회 (ID 또는 보증번호)
export const getWarrantyById = (idOrNo: string): WarrantyItem | null => {
  const list = getWarranties();
  const decoded = decodeURIComponent(idOrNo).trim();
  return list.find((w) => w.id === decoded || w.warrantyNo === decoded) || null;
};

// 보증서 신규 저장
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
  return newItem;
};

// 보증서 수정
export const updateWarranty = (id: string, updates: Partial<WarrantyItem>): WarrantyItem | null => {
  const list = getWarranties();
  const index = list.findIndex((w) => w.id === id);
  if (index === -1) return null;

  list[index] = { ...list[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return list[index];
};

// 보증서 삭제
export const deleteWarranty = (id: string): boolean => {
  const list = getWarranties();
  const updated = list.filter((w) => w.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return true;
};

// CSV 다운로드 (엑셀 호환)
export const exportWarrantiesToCSV = () => {
  const data = getWarranties();
  if (data.length === 0) {
    alert('저장된 보증서 내역이 없습니다.');
    return;
  }

  const headers = [
    '보증번호',
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
    '상태',
    '메모'
  ];

  const rows = data.map((item) => [
    `"${item.warrantyNo}"`,
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
    `"${item.status === 'active' ? '유효' : item.status === 'expired' ? '만료' : '취소'}"`,
    `"${(item.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `코션스마트센터_전자보증서_대장_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 보증서 열람 URL 생성 함수
export const getWarrantyViewUrl = (warrantyNo: string): string => {
  const origin = window.location.origin;
  const pathname = window.location.pathname;
  return `${origin}${pathname}#warranty?no=${encodeURIComponent(warrantyNo)}`;
};

// 카카오톡/문자 전송 메시지 생성 함수
export const createWarrantyShareMessage = (item: WarrantyItem): string => {
  const ppsType = [
    item.hasClearPps ? `투명PPS(${item.clearPpsDetail || '전체'})` : '',
    item.hasColorPps ? `컬러PPS(${item.colorPpsDetail || '전체'})` : ''
  ].filter(Boolean).join(', ') || '독일 정품 CARDIP PPS';

  return `[코션스마트센터] PPS 시공 보증서 발급 안내

안녕하세요, ${item.customerName} 고객님.

(주)코션스마트센터를 믿고 차량 시공을 맡겨주셔서 진심으로 감사드립니다.

고객님의 차량에 PPS 시공 보증서가 정상 발급되었습니다.

■ 차량번호 : ${item.carPlate} (${item.carModel})
■ 시공내역 : ${ppsType}
■ 보증기간 : 시공일(${item.issueDate})로부터 ${item.warrantyPeriodYears}년
■ 보증번호 : ${item.warrantyNo}

📎 함께 보내드린 정품 보증서 이미지를 꼭 저장해 두세요.
(이미지를 길게 눌러 [저장]하시면 사진첩에 보관됩니다. 사고·보험 처리 시 제출용으로 사용하실 수 있습니다.)

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
    const scale = 2; // 레티나 2배율 고해상도 (1446 x 2048)
    const width = 723 * scale;
    const height = 1024 * scale;

    // 1. 앞면 (상세)
    const frontImg = await loadImage('/images/warranty/warranty_front.png');
    const canvasFront = document.createElement('canvas');
    canvasFront.width = width;
    canvasFront.height = height;
    const ctxFront = canvasFront.getContext('2d');
    if (!ctxFront) return null;

    // 원본 서식 그리기
    ctxFront.drawImage(frontImg, 0, 0, width, height);

    // 텍스트 그리기 헬퍼
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
      const fontName = isMono ? 'monospace, Courier, sans-serif' : 'Pretendard, -apple-system, sans-serif';
      ctxFront.font = `${isBold ? 'bold ' : 'normal '}${fontSize * scale}px ${fontName}`;
      ctxFront.fillText(text, (xPct / 100) * width, (yPct / 100) * height);
    };

    // 고객정보
    drawFrontText(item.customerName, 20.0, 43.4, 13);
    drawFrontText(item.customerPhone, 20.0, 46.6, 12, true, true);
    drawFrontText(item.customerAddress || '-', 20.0, 50.2, 11, false);

    // 보증서 정보
    drawFrontText(item.warrantyNo, 67.0, 43.8, 12.5, true, true);
    drawFrontText(item.issueDate, 67.0, 46.8, 12.5, true, true);

    // 차량정보
    drawFrontText(item.carModel, 20.5, 60.4, 13, true);
    drawFrontText(item.carColor || '-', 20.5, 63.4, 13, true);
    drawFrontText(item.carPlate, 62.0, 60.4, 14, true);
    drawFrontText(item.vin?.trim() || '-', 62.0, 63.4, 12, true, true);

    // 제품 및 시공가격 (괄호 정중앙 정렬)
    const clearText = item.hasClearPps ? (item.clearPpsDetail || '전체') : '-';
    const colorText = item.hasColorPps ? (item.colorPpsDetail || '전체') : '-';

    ctxFront.textAlign = 'center';
    drawFrontText(clearText, 53.0, 72.3, 11.5, true, false, '#b91c1c');
    drawFrontText(colorText, 78.9, 72.3, 11.5, true, false, '#b91c1c');
    ctxFront.textAlign = 'left';

    if (item.price) {
      ctxFront.textAlign = 'right';
      drawFrontText(`${formatPriceWithCommas(item.price)} 원`, 70.0, 77.4, 14, true, true);
      ctxFront.textAlign = 'left';
    }

    // 2. 뒷면 (약관)
    const backImg = await loadImage('/images/warranty/warranty_back.png');
    const canvasBack = document.createElement('canvas');
    canvasBack.width = width;
    canvasBack.height = height;
    const ctxBack = canvasBack.getContext('2d');
    if (!ctxBack) return null;

    // 원본 서식 그리기
    ctxBack.drawImage(backImg, 0, 0, width, height);

    // 보증기간이 6년(기본)과 다를 때 오버레이 처리
    if (item.warrantyPeriodYears && item.warrantyPeriodYears !== 6) {
      ctxBack.fillStyle = '#ffffff';
      const maskX = (38.6 / 100) * width;
      const maskY = (29.1 / 100) * height;
      const maskW = (2.5 / 100) * width;
      const maskH = (1.8 / 100) * height;
      ctxBack.fillRect(maskX, maskY, maskW, maskH);

      ctxBack.fillStyle = '#111827';
      ctxBack.textBaseline = 'middle';
      ctxBack.textAlign = 'center';
      ctxBack.font = `bold ${12 * scale}px monospace, Courier, sans-serif`;
      ctxBack.fillText(String(item.warrantyPeriodYears), maskX + maskW / 2, maskY + maskH / 2);
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
    pdf.save(`코션스마트센터_정품보증서_${cleanName}_${cleanPlate}.pdf`);

    return true;
  } catch (err) {
    console.error('Failed to generate warranty PDF:', err);
    return false;
  }
};

// 고해상도 PNG 이미지 2장(1면 상세 + 2면 약관) 개별 다운로드 함수
export const downloadWarrantyImage = async (item: WarrantyItem): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  try {
    const canvases = await renderWarrantyCanvases(item);
    if (!canvases) return false;

    const cleanName = (item.customerName || '고객').replace(/[^a-zA-Z0-9가-힣]/g, '');
    const cleanPlate = (item.carPlate || '차량').replace(/[^a-zA-Z0-9가-힣]/g, '');

    // 1페이지 다운로드
    await downloadCanvas(canvases.canvasFront, `코션스마트센터_정품보증서_1면_상세_${cleanName}_${cleanPlate}.png`);

    // 브라우저 팝업/다운로드 블로킹 방지를 위해 300ms 텀
    await new Promise((r) => setTimeout(r, 300));

    // 2페이지 다운로드
    await downloadCanvas(canvases.canvasBack, `코션스마트센터_정품보증서_2면_약관_${cleanName}_${cleanPlate}.png`);

    return true;
  } catch (err) {
    console.error('Failed to download warranty images:', err);
    return false;
  }
};
