export interface ScheduleItem {
  id: string;
  createdAt: string; // ISO string

  // 차량 식별 정보 (달력 핵심 식별자)
  carPlate: string; // 차량번호 (예: 12가 3456, 340고 8821)
  carModel: string; // 차종 (예: 제네시스 G80, 포르쉐 911 GT3)
  carColor?: string; // 차량 색상

  // 고객 정보
  customerName: string; // 고객명
  customerPhone: string; // 연락처

  // 일정 정보
  date: string; // 시공/입고 날짜 YYYY-MM-DD
  time: string; // 입고 시간 (예: 09:30, 14:00)
  deliveryDate?: string; // 출고 예정일 YYYY-MM-DD
  deliveryTime?: string; // 출고 예정 시간 (예: 18:00)

  // 시공 항목 및 상태
  serviceType: string; // 예: 투명 PPS (전체), 컬러 PPS, 사고수리, 광택 & 유리막
  status: 'reserved' | 'in_progress' | 'completed' | 'cancelled';
  // reserved: 입고 예약 대기
  // in_progress: 차량 입고 후 시공 진행중
  // completed: 시공 완료 및 출고
  // cancelled: 예약 취소

  // 작업 메모 및 특이사항
  notes?: string; // 예: 스톤칩 터치업 후 시공, 앞범퍼 재도장 이력 확인

  // 연계 정보
  consultationId?: string; // 온라인 상담 접수 연계 ID
  warrantyIssued?: boolean; // 보증서 발급 완료 여부
}

const STORAGE_KEY = 'caution_schedules_db';

// 2026년 9월 ~ 10월 현실적인 초기 시공 일정 샘플 데이터
const SEED_SCHEDULES: ScheduleItem[] = [
  {
    id: 'sch-202609-01',
    createdAt: new Date('2026-09-28T09:00:00').toISOString(),
    carPlate: '340고 8821',
    carModel: '포르쉐 911 카레라 4S',
    carColor: '크레용 (Crayon)',
    customerName: '박준혁',
    customerPhone: '010-3344-7788',
    date: '2026-09-30',
    time: '10:00',
    deliveryDate: '2026-10-02',
    deliveryTime: '18:00',
    serviceType: '컬러PPS (사틴 프로즌 그레이)',
    status: 'in_progress',
    notes: '전체 스프레이 랩핑 시공. 휠 및 라이트류 완벽 마스킹 요망',
  },
  {
    id: 'sch-202609-02',
    createdAt: new Date('2026-09-29T11:00:00').toISOString(),
    carPlate: '12가 3456',
    carModel: '제네시스 G80 세단',
    carColor: '우유니 화이트',
    customerName: '김민수',
    customerPhone: '010-9876-5432',
    date: '2026-09-30',
    time: '14:30',
    deliveryDate: '2026-10-01',
    deliveryTime: '17:00',
    serviceType: '투명PPS (본넷 + 프론트 패키지)',
    status: 'reserved',
    notes: '신차 출고 후 즉시 입고. 스톤칩 보호 목적',
  },
  {
    id: 'sch-202610-01',
    createdAt: new Date('2026-09-29T15:00:00').toISOString(),
    carPlate: '77허 9182',
    carModel: '메르세데스-벤츠 S580 4MATIC',
    carColor: '옵시디언 블랙',
    customerName: '이성훈',
    customerPhone: '010-5566-1212',
    date: '2026-10-02',
    time: '09:30',
    deliveryDate: '2026-10-04',
    deliveryTime: '16:00',
    serviceType: '투명PPS (전체 바디 보호)',
    status: 'reserved',
    notes: '마이바흐 그릴 부위 추가 마스킹. 출고 시 정품 보증서 발급 요청',
  },
  {
    id: 'sch-202610-02',
    createdAt: new Date('2026-09-27T10:00:00').toISOString(),
    carPlate: '05나 4432',
    carModel: 'BMW M4 컴페티션 쿠페',
    carColor: '토론토 레드',
    customerName: '최원석',
    customerPhone: '010-8899-7711',
    date: '2026-10-05',
    time: '11:00',
    deliveryDate: '2026-10-07',
    deliveryTime: '19:00',
    serviceType: '컬러PPS (사틴 매트 블랙 루프 & 카본)',
    status: 'reserved',
    notes: '루프 카본 질감 살리면서 바디 전체 사틴 처리',
  },
  {
    id: 'sch-202610-03',
    createdAt: new Date('2026-09-26T14:00:00').toISOString(),
    carPlate: '119도 5544',
    carModel: '아우디 RS e-tron GT',
    carColor: '케모라 그레이',
    customerName: '정유진',
    customerPhone: '010-2233-4455',
    date: '2026-10-08',
    time: '13:00',
    deliveryDate: '2026-10-09',
    deliveryTime: '18:00',
    serviceType: '광택 & 프리미엄 유리막 코팅',
    status: 'reserved',
    notes: '전기차 전용 도장면 열처리 코팅 시공',
  },
  {
    id: 'sch-202609-00',
    createdAt: new Date('2026-09-25T10:00:00').toISOString(),
    carPlate: '58조 1004',
    carModel: '테슬라 모델 Y 롱레인지',
    carColor: '펄 화이트',
    customerName: '강태우',
    customerPhone: '010-4455-6677',
    date: '2026-09-28',
    time: '09:00',
    deliveryDate: '2026-09-29',
    deliveryTime: '18:00',
    serviceType: '투명PPS (앞범퍼 + 생활보호)',
    status: 'completed',
    notes: '시공 완료 후 출고 완료됨. 정품 보증서 카카오톡 발송 완료',
    warrantyIssued: true,
  }
];

// 일정 목록 가져오기
export const getSchedules = (): ScheduleItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_SCHEDULES));
      return SEED_SCHEDULES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [];
    }
    return parsed;
  } catch (err) {
    console.error('Failed to load schedules from storage:', err);
    return SEED_SCHEDULES;
  }
};

// 새 일정 저장
export const saveSchedule = (
  item: Omit<ScheduleItem, 'id' | 'createdAt'>
): ScheduleItem => {
  const current = getSchedules();
  const newItem: ScheduleItem = {
    ...item,
    id: `sch-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
    createdAt: new Date().toISOString(),
  };

  const updated = [newItem, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save schedule:', err);
  }
  return newItem;
};

// 일정 업데이트
export const updateSchedule = (
  id: string,
  updates: Partial<Omit<ScheduleItem, 'id' | 'createdAt'>>
): ScheduleItem | null => {
  const current = getSchedules();
  let targetItem: ScheduleItem | null = null;

  const updated = current.map((item) => {
    if (item.id === id) {
      targetItem = { ...item, ...updates };
      return targetItem;
    }
    return item;
  });

  if (targetItem) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to update schedule:', err);
    }
  }
  return targetItem;
};

// 일정 상태 변경
export const updateScheduleStatus = (
  id: string,
  newStatus: ScheduleItem['status']
): void => {
  updateSchedule(id, { status: newStatus });
};

// 일정 삭제
export const deleteSchedule = (id: string): void => {
  const current = getSchedules();
  const updated = current.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete schedule:', err);
  }
};

// 모든 일정 초기화 (비우기)
export const clearAllSchedules = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } catch (err) {
    console.error('Failed to clear schedules:', err);
  }
};
