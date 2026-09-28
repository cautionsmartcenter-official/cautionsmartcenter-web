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
}

const STORAGE_KEY = 'caution_warranty_db';

// 초기 샘플 시드 데이터
const SEED_WARRANTIES: WarrantyItem[] = [
  {
    id: 'war-seed-01',
    warrantyNo: 'CSC-2026-0315-01',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 13).toISOString(),
    customerName: '홍길동',
    customerPhone: '010-1234-5678',
    customerAddress: '경기도 성남시 분당구 판교역로 120',
    carModel: '포르쉐 911 카레라 4 GTS',
    carPlate: '123가 4567',
    carColor: '크레용 (Crayon)',
    vin: 'WP0AB2A97NS123456',
    hasClearPps: true,
    clearPpsDetail: '전체 (Full Body)',
    hasColorPps: false,
    colorPpsDetail: '',
    price: '7,500,000',
    issueDate: '2026-03-15',
    warrantyPeriodYears: 6,
    issuedBy: '(주) 코션스마트센터',
    status: 'active',
    notes: '신차 출고 즉시 입고. 250um 정품 CARDIP PPS 완벽 시공 및 6년 보증 발급'
  },
  {
    id: 'war-seed-02',
    warrantyNo: 'CSC-2026-0320-02',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
    customerName: '이서진',
    customerPhone: '010-9876-5432',
    customerAddress: '서울특별시 서초구 반포대로',
    carModel: '메르세데스-마이바흐 S580',
    carPlate: '77나 8899',
    carColor: '옵시디언 블랙',
    vin: '', // 패스
    hasClearPps: false,
    clearPpsDetail: '',
    hasColorPps: true,
    colorPpsDetail: '사틴 프로즌 다크 실버 전체',
    price: '9,200,000',
    issueDate: '2026-03-20',
    warrantyPeriodYears: 6,
    issuedBy: '(주) 코션스마트센터',
    status: 'active',
    notes: 'CARDIP 컬러PPS 특허 박리 도장 시공. 추후 본드 자국 없는 100% 무손상 박리 안내 완료'
  }
];

// 보증서 일련번호 자동 생성 함수: CSC-YYYY-MMDD-순번
export const generateWarrantyNo = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `CSC-${year}-${month}${day}-${randomSuffix}`;
};

// 보증서 목록 조회
export const getWarranties = (): WarrantyItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_WARRANTIES));
      return SEED_WARRANTIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_WARRANTIES;
  } catch (err) {
    console.error('Error fetching warranties:', err);
    return SEED_WARRANTIES;
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
  const viewUrl = getWarrantyViewUrl(item.warrantyNo);
  const ppsType = [
    item.hasClearPps ? `투명PPS(${item.clearPpsDetail || '전체'})` : '',
    item.hasColorPps ? `컬러PPS(${item.colorPpsDetail || '전체'})` : ''
  ].filter(Boolean).join(', ') || '독일 정품 CARDIP PPS';

  return `[코션스마트센터] 공식 전자 품질 보증서 발급 안내

안녕하세요, ${item.customerName} 고객님.
(주)코션스마트센터를 믿고 차량 시공을 맡겨주셔서 진심으로 감사드립니다.
고객님의 차량에 독일 CARDIP® 공식 정품 시공 보증서가 정상 발급되었습니다.

■ 차량번호 : ${item.carPlate} (${item.carModel})
■ 시공내역 : ${ppsType}
■ 보증기간 : 시공일(${item.issueDate})로부터 ${item.warrantyPeriodYears}년
■ 보증번호 : ${item.warrantyNo}

아래 링크를 터치하시면 고객님의 공식 전자 보증서(정품 인증 및 사후 관리 요령)를 언제든 확인 및 보관하실 수 있습니다.

▶ 전자 보증서 바로 확인하기:
${viewUrl}

*본 보증서는 독일 CARDIP 공식 수입원인 (주)코션스마트센터에서 발급한 정품 보증서입니다.
*문의전화: 031-705-1888`;
};
