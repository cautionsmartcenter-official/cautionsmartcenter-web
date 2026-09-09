export interface ConsultationItem {
  id: string;
  createdAt: string; // ISO string
  name: string;
  phone: string;
  email: string;
  brand: string;
  model: string;
  codeName: string;
  customModel?: string;
  service: string;
  message: string;
  status: 'new' | 'contacted' | 'quoted' | 'reserved' | 'completed' | 'cancelled';
  notes: string;
  isRead: boolean;
}

const STORAGE_KEY = 'caution_consultations_db';

// 초기 샘플 데이터 (비어있을 때 관리자 페이지가 정상 작동함을 보여주기 위한 기본 데이터)
const SEED_DATA: ConsultationItem[] = [
  {
    id: 'seed-01',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45분 전
    name: '김민수',
    phone: '010-9876-5432',
    email: 'minsu.kim@example.com',
    brand: 'mercedes-benz',
    model: 'S-Class (S클래스 / 마이바흐)',
    codeName: 'W223 (7세대 후기형/마이바흐)',
    service: '투명PPS',
    message: '신차 출고 후 본넷 및 앞범퍼 생활보호패키지 투명 PPS 전체 시공 견적 문의드립니다. 주말 입고 가능한지 확인 부탁드립니다.',
    status: 'new',
    notes: '031 유선 통화 전 카카오톡으로 시공 부위 사진 수신 예정',
    isRead: false,
  },
  {
    id: 'seed-02',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3시간 전
    name: '박준혁',
    phone: '010-3344-7788',
    email: 'junhyuk@example.com',
    brand: 'porsche',
    model: '911 (카레라 / GT3 / 타르가)',
    codeName: '992.2 (현행 후기형)',
    service: '컬러PPS',
    message: '순정 화이트 바디에 사틴 프로즌 그레이 컬러PPS 전체 랩핑 스프레이 시공 비용 및 소요 일정 문의합니다.',
    status: 'contacted',
    notes: '유선 1차 상담 완료. 이번 주 토요일 실차 방문 견적 예약',
    isRead: true,
  }
];

export const getConsultations = (): ConsultationItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // 최초 실행 시 샘플 시드 데이터 저장
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
      return SEED_DATA;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load consultations from storage:', err);
    return SEED_DATA;
  }
};

export const saveConsultation = (
  item: Omit<ConsultationItem, 'id' | 'createdAt' | 'status' | 'notes' | 'isRead'>
): ConsultationItem => {
  const current = getConsultations();
  const newItem: ConsultationItem = {
    ...item,
    id: 'cs-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
    status: 'new',
    notes: '',
    isRead: false,
  };

  const updated = [newItem, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save consultation to storage:', err);
  }

  return newItem;
};

export const updateConsultationStatus = (
  id: string,
  status: ConsultationItem['status']
): void => {
  const current = getConsultations();
  const updated = current.map((item) =>
    item.id === id ? { ...item, status, isRead: true } : item
  );
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update consultation status:', err);
  }
};

export const updateConsultationNotes = (id: string, notes: string): void => {
  const current = getConsultations();
  const updated = current.map((item) =>
    item.id === id ? { ...item, notes } : item
  );
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update consultation notes:', err);
  }
};

export const deleteConsultation = (id: string): void => {
  const current = getConsultations();
  const updated = current.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete consultation:', err);
  }
};

export const exportConsultationsToCSV = (): void => {
  const list = getConsultations();
  if (list.length === 0) {
    alert('내보낼 상담 데이터가 없습니다.');
    return;
  }

  const headers = [
    '접수일시',
    '고객명',
    '연락처',
    '이메일',
    '차량제조사',
    '모델명',
    '섀시코드명',
    '관심서비스',
    '진행상태',
    '문의내용',
    '관리자메모'
  ];

  const rows = list.map((item) => {
    const dateStr = new Date(item.createdAt).toLocaleString('ko-KR');
    const vehicle = item.customModel || `${item.brand} ${item.model}`;
    const cleanMsg = (item.message || '').replace(/"/g, '""').replace(/\n/g, ' ');
    const cleanNotes = (item.notes || '').replace(/"/g, '""').replace(/\n/g, ' ');

    return [
      `"${dateStr}"`,
      `"${item.name}"`,
      `"${item.phone}"`,
      `"${item.email}"`,
      `"${item.brand}"`,
      `"${vehicle}"`,
      `"${item.codeName}"`,
      `"${item.service}"`,
      `"${item.status}"`,
      `"${cleanMsg}"`,
      `"${cleanNotes}"`
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `코션스마트센터_상담신청목록_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
