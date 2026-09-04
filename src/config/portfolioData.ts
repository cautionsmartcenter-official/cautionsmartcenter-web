export interface PortfolioItem {
  id: string;
  category: 'pps' | 'color-pps' | 'paint' | 'repair' | 'detailing';
  categoryName: string;
  title: string;
  carModel: string;
  image: string;
  tags: string[];
  summary: string;
  details: string[];
  linkType?: 'instagram' | 'blog' | 'custom';
  linkUrl?: string;
  linkText?: string;
}

export const OFFICIAL_LINKS = {
  instagram: 'https://www.instagram.com/cautionsmartcenter_official/',
  instagramHandle: '@cautionsmartcenter_official',
  blog: 'https://blog.naver.com/cautionsmartcenter',
  blogName: '코션스마트센터 공식 블로그'
};

export const PORTFOLIO_DATA: PortfolioItem[] = [
  // 1. PPS (투명) - 공식 인스타그램 연동
  {
    id: 'pps-1',
    category: 'pps',
    categoryName: 'PPS',
    title: '포르쉐 911 GT3 RS 풀바디 투명 PPS 시공',
    carModel: 'Porsche 911 GT3 RS (992)',
    image: '/images/readdy/service-hero-ai.jpg',
    tags: ['투명 PPS', '무황변', '자가 복원', 'AI 로봇 시공'],
    summary: '초고속 트랙 주행에 최적화된 완벽한 스톤칩 방어 및 굴곡 부위 무절개 일체형 시공',
    details: [
      '스톤칩 및 미세 스크래치 100% 자가 치유(Self-Healing)',
      '필름 컷팅선 없는 엣지 마감 및 분무 도포 방식',
      '고광택 및 초발수 하이엔드 피니시'
    ],
    linkType: 'instagram',
    linkUrl: OFFICIAL_LINKS.instagram,
    linkText: '인스타그램 릴스 시공기'
  },
  {
    id: 'pps-2',
    category: 'pps',
    categoryName: 'PPS',
    title: '람보르기니 우루스 퍼포만테 전체 PPS 보호',
    carModel: 'Lamborghini Urus Performante',
    image: '/images/readdy/service-detail-ai-img.jpg',
    tags: ['전체 PPS', '초발수 코팅', '도장면 100% 보호'],
    summary: '복잡한 카본 파츠와 캐릭터 라인을 완벽하게 감싸는 초정밀 두께 제어 시공',
    details: [
      '공기역학 파츠 및 카본 패키지 완전 보호',
      '자외선(UV) 차단 및 산화 방지 코팅층 형성',
      '세차 및 유지관리 편의성 극대화'
    ],
    linkType: 'instagram',
    linkUrl: OFFICIAL_LINKS.instagram,
    linkText: '인스타그램 릴스 시공기'
  },

  // 2. 컬러 PPS - 공식 인스타그램 연동
  {
    id: 'color-pps-1',
    category: 'color-pps',
    categoryName: '컬러 PPS',
    title: '페라리 296 GTB 사틴 미드나잇 블루 컬러 PPS',
    carModel: 'Ferrari 296 GTB',
    image: '/images/readdy/service-detail-paint-001.jpg',
    tags: ['컬러 PPS', 'CARDIP', '사틴 피니시', '순정 도장 보존'],
    summary: '도장면 손상 없이 언제든 떼어낼 수 있는 CARDIP Peelable Paint 커스텀 컬러 체인지',
    details: [
      '원하는 컬러로 완벽 변신 + 보호 성능 동시 제공',
      '원복 시 본딩 잔여물 없이 100% 필오프(Peelable)',
      '도장 부스 내 초정밀 열처리 공정'
    ],
    linkType: 'instagram',
    linkUrl: OFFICIAL_LINKS.instagram,
    linkText: '인스타그램 컬러PPS 영상'
  },
  {
    id: 'color-pps-2',
    category: 'color-pps',
    categoryName: '컬러 PPS',
    title: '메르세데스-AMG GT 4도어 매트 블랙 컬러 PPS',
    carModel: 'Mercedes-AMG GT 63 S (X290)',
    image: '/images/readdy/service-paint-001.jpg',
    tags: ['매트 블랙', '컬러 체인지', '뿌리는 페인트'],
    summary: '묵직하고 카리스마 넘치는 매트 질감과 오리지널 실버 컬러 100% 보존',
    details: [
      '이음새 없는 균일한 무광 매트 텍스처',
      '외부 충격에 강한 고탄성 폴리머 보호막',
      '시공 후 정밀 광택 및 휠 클리닝 케어'
    ],
    linkType: 'instagram',
    linkUrl: OFFICIAL_LINKS.instagram,
    linkText: '인스타그램 컬러PPS 영상'
  },

  // 3. 판금도색 - 공식 네이버 블로그 연동
  {
    id: 'paint-1',
    category: 'paint',
    categoryName: '판금도색',
    title: '메르세데스-마이바흐 S680 휀더 정밀 조색 복원',
    carModel: 'Mercedes-Maybach S 680 (Z223)',
    image: '/images/readdy/service-hero-paint.jpg',
    tags: ['정밀 조색', '수용성 도료', '원형 복원', '열처리 건조'],
    summary: '글라슈리트 정품 수용성 도료와 컴퓨터 디지털 스펙트로미터 색상 매칭',
    details: [
      '이색감 0.0%의 완벽한 팩토리 컬러 매칭',
      '알루미늄 바디 판금 전용 장비 복원',
      '원적외선 챔버 내 규정 온도 열처리'
    ],
    linkType: 'blog',
    linkUrl: OFFICIAL_LINKS.blog,
    linkText: '네이버 블로그 정밀 복원기'
  },
  {
    id: 'paint-2',
    category: 'paint',
    categoryName: '판금도색',
    title: 'BMW M3 컴페티션 리어 범퍼 & 디퓨저 복원',
    carModel: 'BMW M3 Competition (G80)',
    image: '/images/readdy/service-detail-paint-img.jpg',
    tags: ['판금도색', '오리지널 퀄리티', '단차 0% 복원'],
    summary: '외장 복원 및 M 전용 고광택 클리어 코팅으로 신차급 광도 재현',
    details: [
      '미세 단차 교정 및 정밀 센서 캘리브레이션',
      'HS 하이솔리드 프리미엄 클리어 도포',
      '도장면 오렌지필 완벽 레벨링 폴리싱'
    ],
    linkType: 'blog',
    linkUrl: OFFICIAL_LINKS.blog,
    linkText: '네이버 블로그 판금도색 후기'
  },

  // 4. 정비수리 - 공식 네이버 블로그 연동
  {
    id: 'repair-1',
    category: 'repair',
    categoryName: '정비수리',
    title: '포르쉐 파나메라 터보 S 메이저 메인터넌스',
    carModel: 'Porsche Panamera Turbo S (971)',
    image: '/images/readdy/service-hero-repair.jpg',
    tags: ['메이저 정비', '포르쉐 정품 진단', '소모품 교환', '하체 부싱'],
    summary: 'PIWIS 전용 진단기를 통한 120개 항목 정밀 점검 및 점화·흡배기 메인터넌스',
    details: [
      'PIWIS-III 전용 스캐너 풀 시스템 스캔',
      '정품 점화플러그 및 코일, 모빌1 레이싱 엔진오일',
      '에어 서스펜션 정밀 캘리브레이션'
    ],
    linkType: 'blog',
    linkUrl: OFFICIAL_LINKS.blog,
    linkText: '네이버 블로그 정비 사례'
  },
  {
    id: 'repair-2',
    category: 'repair',
    categoryName: '정비수리',
    title: 'BMW M5 F90 미션 오일 & 디퍼런셜 오버홀',
    carModel: 'BMW M5 (F90)',
    image: '/images/readdy/service-detail-repair-img.jpg',
    tags: ['ZF 8단 미션', 'M 디퍼런셜', '정밀 오버홀'],
    summary: 'M 드라이브트레인 완벽 성능 유지를 위한 ZF 순정 오일 및 가스켓 풀 교환',
    details: [
      'ZF 순정 필터 일체형 팬 및 전용 플루이드 정량 주입',
      'M xDrive 트랜스퍼 케이스 오일 교환',
      '주행 어댑테이션 리셋 및 로드 테스트'
    ],
    linkType: 'blog',
    linkUrl: OFFICIAL_LINKS.blog,
    linkText: '네이버 블로그 정비 사례'
  },

  // 5. 디테일링 - 공식 인스타그램 연동
  {
    id: 'detailing-1',
    category: 'detailing',
    categoryName: '디테일링',
    title: '롤스로이스 고스트 프라이빗 듀얼 수성 광택 & 세라믹 코팅',
    carModel: 'Rolls-Royce Ghost Series II',
    image: '/images/readdy/service-hero-detailing.jpg',
    tags: ['수성 광택', '9H 세라믹 코팅', '가죽 클리닝', '실내 케어'],
    summary: '클리어코트 삭감 없는 수성 컴파운딩과 최고 등급 9H 하드 세라믹 코팅',
    details: [
      '스월마크 99% 제거 및 딥 글로스(Deep Gloss) 복원',
      '2코트 9H 세라믹 코팅으로 초발수 방오막 형성',
      '풀 그레인 천연 가죽 시트 컨디셔닝 케어'
    ],
    linkType: 'instagram',
    linkUrl: OFFICIAL_LINKS.instagram,
    linkText: '인스타그램 디테일링 영상'
  },
  {
    id: 'detailing-2',
    category: 'detailing',
    categoryName: '디테일링',
    title: '애스턴마틴 DB12 마스터 디테일링 패키지',
    carModel: 'Aston Martin DB12',
    image: '/images/readdy/service-detail-detailing-img.jpg',
    tags: ['유리막 코팅', '엔진룸 클리닝', '휠 캘리퍼 코팅'],
    summary: '외장 페인트, 유리, 휠, 엔진룸까지 신차 이상의 상태로 완성하는 마스터 패키지',
    details: [
      '나노 세라믹 윈도우 발수 코팅',
      '브레이크 분진 고열 저항 캘리퍼 코팅',
      '실내 알칸타라 및 가죽 풀 디테일링'
    ],
    linkType: 'instagram',
    linkUrl: OFFICIAL_LINKS.instagram,
    linkText: '인스타그램 디테일링 영상'
  }
];
