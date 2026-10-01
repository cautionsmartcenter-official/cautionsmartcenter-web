export interface BranchItem {
  id: string;
  name: string;
  branchType: string;
  region: string;
  address: string;
  detailAddress?: string;
  phone: string;
  image: string;
  services: string[]; // 공급 품목 (PPS)
  rawMaterial: string; // 독일 CARDIP® 정품 PPS 소재
  description: string;
  badges: string[];
  statusNotice?: string; // e.g. '※ 공식 가맹 및 파트너 계약 진행 중'
}

// 총판 본사 (직영) 단독 정보 - 상단 설명용
export const HEADQUARTER_INFO = {
  name: '코션스마트센터 본점 (경기 광주)',
  role: '독일 CARDIP® 공식 한국 총판 본사 및 메인 테크니컬 센터',
  badge: '총판 본사 (직영)',
  region: '경기 광주',
  address: '경기도 광주시 신현동 태재로 26',
  detailAddress: '독일 CARDIP® 공식 한국 총판 본사 및 메인 테크니컬 센터',
  phone: '031-712-6665',
  image: '/images/readdy/brand-story-team-001.jpg',
  services: ['PPS'],
  rawMaterial: '독일 CARDIP® 정품 PPS 소재',
  description: '독일 CARDIP® 공식 한국 총판(General Distributor) 본사로서 최고 수준의 표준 시공 퀄리티와 전국 시공 네트워크 공급망을 총괄합니다.',
  badges: ['한국 공식 총판 본사', '직영 테크니컬 센터']
};

// 전국 공식 가맹점 및 협력 운영점 목록
export const BRANCH_DATA: BranchItem[] = [
  {
    id: 'incheon',
    name: '코션스마트센터 인천',
    branchType: '협력 운영점',
    region: '인천',
    address: '인천광역시 남동구 능허대로595번길 63 4층 1호',
    detailAddress: '1급 하이테크 자동차 공업사 서비스 센터',
    phone: '0507-1453-7750',
    image: '/images/branches/incheon_branch.jpg',
    services: ['PPS'],
    rawMaterial: '독일 CARDIP® 정품 PPS 소재',
    description: '인천 지역에서 코션스마트센터 브랜드로 자동차 사고수리 및 외장 시공 서비스를 운영하고 있습니다.',
    badges: ['협력 운영점', '1급 하이테크 공업사', 'CurveRobot 첨단 설비'],
    statusNotice: '※ 공식 가맹 및 파트너 계약 진행 중'
  }
];

// 시공 파트너 3대 핵심 혜택
export const PARTNER_BENEFITS = [
  {
    number: '01',
    highlight: '권역별 파트너 운영',
    title: '권역별 파트너 운영 및 공식 인증',
    description: '한국 공식 디스트리뷰터인 (주)코션스마트센터의 공식 파트너로서, 계약 조건에 따라 해당 권역의 시공 파트너로 운영할 수 있는 권한과 공식 인증을 제공합니다.',
    summaryPoint: '공식 인증 현판 제공 및 권역별 시공 파트너 운영'
  },
  {
    number: '02',
    highlight: '정품 소재 공급',
    title: '독일 CARDIP® 정품 PPS 소재 공급',
    description: '독일 본사 직수입 정품 독일 CARDIP® PPS 소재를 안정적인 한국 총판 직공급 체계로 독점 공급받아 시공 완성도와 마진 경쟁력을 확보합니다.',
    summaryPoint: '독일 CARDIP® 정품 PPS 소재 100% 직수입 공급'
  },
  {
    number: '03',
    highlight: '시공 문의 연계',
    title: '본사 마케팅 및 시공 문의 연계',
    description: '본사 공식 웹사이트와 SNS, 브랜드 마케팅을 통해 유입되는 시공 문의를 지역 및 운영 조건에 따라 파트너점과 연계합니다.',
    summaryPoint: '본사 유입 고객 시공 문의 연계'
  }
];

// 파트너 개설 4단계 프로세스
export const PARTNER_STEPS = [
  {
    step: '01',
    name: '파트너 상담 접수',
    desc: '온라인 신청 또는 유선 상담을 통해 희망 권역 및 사업장 현황 확인'
  },
  {
    step: '02',
    name: '현장 실사 & 설비 협의',
    desc: '도장 부스 및 작업 공간 실사, 권역 상권 분석 및 조건 협의'
  },
  {
    step: '03',
    name: '공식 파트너 계약',
    desc: '한국 총판 정식 파트너 계약 체결 및 권역 시공 권한 확정'
  },
  {
    step: '04',
    name: '정품 소재 공급 & 오픈',
    desc: '독일 CARDIP® 정품 PPS 소재 공급 및 본사 공식 채널 등록, 시공 개시'
  }
];
