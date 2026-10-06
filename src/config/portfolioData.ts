export interface PortfolioItem {
  id: string;
  category: 'maybach-twotone' | 'color-pps' | 'pps' | 'paint' | 'repair';
  categoryName: string;
  title: string;
  carModel: string;
  image: string;
  images: string[];
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
  // ── 1. 마이바흐 투톤PPS (코션스마트센터 시그니처 마스터피스) ──
  {
    id: 'maybach-s580',
    category: 'maybach-twotone',
    categoryName: '마이바흐 투톤',
    title: '메르세데스-마이바흐 S580 베르데실버&오팔라이트화이트 투톤PPS',
    carModel: 'Mercedes-Maybach S 580 (Two-Tone)',
    image: '/images/portfolio/maybach/01.jpg',
    images: [
      '/images/portfolio/maybach/01.jpg', // [전면] 코션 번호판 정면 풀샷 (DSC08836)
      '/images/portfolio/maybach/02.jpg', // [전측면] 코션 번호판 프론트 쿼터뷰 (DSC08863)
      '/images/portfolio/maybach/03.jpg', // [측면] 사옥 앞 롱바디 측면뷰 (DSC08865)
      '/images/portfolio/maybach/04.jpg', // [뒷면] C필러 엠블럼 & 리어 테일램프 (DSC08883)
      '/images/portfolio/maybach/05.jpg'  // [디테일] 1mm 초정밀 투톤 분할 라인 (SAM_9878)
    ],
    tags: ['마이바흐 투톤', '베르데 실버', '오팔라이트 화이트', '박리형 컬러PPS', '순정 100% 원복'],
    summary: '코션스마트센터의 독보적인 투톤 마스터 공법! 상단 베르데 실버와 하단 오팔라이트 화이트의 완벽한 투톤 완성',
    details: [
      '마이바흐 정품 출고 라인을 1mm 오차 없이 정밀하게 계측 재현',
      '순정 도장 손상 없이 언제든 본딩 자국 없이 떼어낼 수 있는 CARDIP Peelable Paint',
      '원적외선 전용 특수 열처리 부스에서 완성된 신차급 도장 광택'
    ],
    linkType: 'instagram',
    linkUrl: OFFICIAL_LINKS.instagram,
    linkText: '인스타그램 투톤PPS 영상'
  },
  {
    id: 'maybach-gls600-kalahari',
    category: 'maybach-twotone',
    categoryName: '마이바흐 투톤',
    title: '마이바흐 GLS600 상단 칼라하리 골드 투톤PPS',
    carModel: 'Mercedes-Maybach GLS 600',
    image: '/images/portfolio/gls600/01.jpg',
    images: [
      '/images/portfolio/gls600/01.jpg', // [전면] 코션 번호판 정면 풀샷
      '/images/portfolio/gls600/02.jpg', // [전측면] 얼짱 전측면 쿼터뷰
      '/images/portfolio/gls600/03.jpg', // [측면] 롱바디 측면 사이드뷰
      '/images/portfolio/gls600/04.jpg', // [뒷면] 리어 쿼터뷰
      '/images/portfolio/gls600/05.jpg'  // [디테일] 크롬 그릴 & 범퍼 메시 디테일
    ],
    tags: ['마이바흐 GLS600', '칼라하리 골드', '투톤PPS', '럭셔리 SUV', '순정 도장 보존'],
    summary: '최고급 럭셔리 SUV의 상단부를 칼라하리 골드로 정밀 분무 도포하여 품격 있는 투톤 비스포크 디자인을 완성',
    details: [
      '마이바흐 정품 출고 라인을 1mm 오차 없이 정밀하게 계측 시공',
      '기존 순정 블랙 도장면 위에 CARDIP Peelable Paint 분무 열처리 도포',
      '원복 시 본딩 잔여물 및 스크래치 없이 100% 필오프 원상복구 가능'
    ],
    linkType: 'instagram',
    linkUrl: OFFICIAL_LINKS.instagram,
    linkText: '인스타그램 투톤PPS 영상'
  },
  {
    id: 'maybach-gls600-nautical',
    category: 'maybach-twotone',
    categoryName: '마이바흐 투톤',
    title: '마이바흐 GLS600 상단 노틱 블루 투톤PPS',
    carModel: 'Mercedes-Maybach GLS 600 (Nautical Blue)',
    image: '/images/portfolio/maybach_nautical/01.jpg',
    images: [
      '/images/portfolio/maybach_nautical/01.jpg', // [전면] 코션 번호판 정면 풀샷 (DSC06806)
      '/images/portfolio/maybach_nautical/02.jpg', // [전측면] 사옥 앞 얼짱 전측면 쿼터뷰 (DSC06808)
      '/images/portfolio/maybach_nautical/03.jpg', // [측면] 사옥 앞 롱바디 측면뷰 (DSC06800)
      '/images/portfolio/maybach_nautical/04.jpg', // [뒷면] 야외 와이드 쿼터뷰 (DSC06812)
      '/images/portfolio/maybach_nautical/05.jpg'  // [디테일] 헤드라이트 & 투톤 엣지 (DSC06804)
    ],
    tags: ['마이바흐 GLS600', '노틱 블루', '상단 투톤', '플래그십 SUV', '스프레이 PPS'],
    summary: '깊고 웅장한 노틱 블루 컬러를 마이바흐 상단 캐릭터 라인에 따라 완벽 구현하여 바다의 우아함을 담은 비스포크 에디션',
    details: [
      '벤츠 마이바흐 순정 컬러 코드 노틱 블루 100% 컴퓨터 정밀 조색 매칭',
      '칼 재단선이 전혀 노출되지 않는 고난도 분무 도포 및 클리어코트 마감',
      '도장면 스톤칩 방어와 투톤 드레스업을 동시에 실현하는 최상위 공법'
    ],
    linkType: 'instagram',
    linkUrl: OFFICIAL_LINKS.instagram,
    linkText: '인스타그램 노틱블루 시공기'
  },
  {
    id: 'maybach-s680-v12',
    category: 'maybach-twotone',
    categoryName: '마이바흐 투톤',
    title: '메르세데스-마이바흐 S680 V12 신차 전체 PPS',
    carModel: 'Mercedes-Maybach S 680 V12',
    image: '/images/portfolio/maybach_v12/01.jpg',
    images: [
      '/images/portfolio/maybach_v12/01.jpg', // [전면] 코션 번호판 V12 정면 풀샷 (DSC05540)
      '/images/portfolio/maybach_v12/02.jpg', // [전측면] 얼짱 전측면 쿼터뷰 (DSC05537)
      '/images/portfolio/maybach_v12/03.jpg', // [측면] 롱바디 측면뷰 (DSC05534)
      '/images/portfolio/maybach_v12/04.jpg', // [뒷면] 코션 번호판 & V12 리어뷰 (DSC05525)
      '/images/portfolio/maybach_v12/05.jpg'  // [디테일] C필러 V12 시그니처 엠블럼 (DSC05580)
    ],
    tags: ['마이바흐 V12', 'S680', '최상위 플래그십', '투톤 마스터', '전체 PPS 보호'],
    summary: '마이바흐의 정점 V12 파워트레인을 품은 S680의 예술적인 투톤 실루엣을 한 치의 오차 없이 시공 및 보호',
    details: [
      'V12 전용 크롬 몰딩과 엠블럼 탈거 없이 정밀 마스킹 후 무손상 분무 도포',
      '마이바흐 본사 출고 품질을 능가하는 매끄러운 투톤 경계면 엣지 피니시',
      '신차 오리지널 도장면을 완벽히 보존하며 수년 후에도 100% 원형 복원 가능'
    ],
    linkType: 'instagram',
    linkUrl: OFFICIAL_LINKS.instagram,
    linkText: '인스타그램 V12 투톤 시공기'
  },
  {
    id: 'maybach-s580-rosegold',
    category: 'maybach-twotone',
    categoryName: '마이바흐 투톤',
    title: '마이바흐 S580 노틱 블루 & 라이트 로즈골드 비스포크 투톤PPS',
    carModel: 'Mercedes-Maybach S 580 (Rose Gold Two-Tone)',
    image: '/images/portfolio/maybach_rosegold/01.jpg',
    images: [
      '/images/portfolio/maybach_rosegold/01.jpg', // [전면] 코션 번호판 정면 풀샷 (DSC07023)
      '/images/portfolio/maybach_rosegold/02.jpg', // [전측면] 얼짱 전측면 쿼터뷰 (DSC07018)
      '/images/portfolio/maybach_rosegold/03.jpg', // [측면] 롱바디 측면 사이드뷰 (DSC07020)
      '/images/portfolio/maybach_rosegold/04.jpg', // [뒷면] 코션 번호판 리어 쿼터뷰 (DSC07035)
      '/images/portfolio/maybach_rosegold/05.jpg'  // [디테일] 투톤 분할 라인 디테일 (DSC07022)
    ],
    tags: ['노틱 블루', '로즈골드 투톤', '비스포크 에디션', '마이바흐 세단', 'CARDIP 정품'],
    summary: '상단 노틱 블루와 하단 라이트 로즈골드의 환상적인 색감 조화로 세상에 단 하나뿐인 마이바흐 비스포크 아트를 완성',
    details: [
      '로즈골드의 은은하고 고급스러운 메탈릭 펄감을 전용 열처리 부스에서 완벽 안착',
      '측면 투톤 분할 라인을 숙련된 마스터 테크니션의 수작업으로 정밀 마스킹',
      '도장면 손상 걱정 없는 안전한 박리형 친환경 PPS 공법 적용'
    ],
    linkType: 'instagram',
    linkUrl: OFFICIAL_LINKS.instagram,
    linkText: '인스타그램 로즈골드 투톤 영상'
  },

  // ── 2. 컬러PPS (스프레이 & 필오프 컬러 체인지) ──
  {
    id: 'color-cayenne-blue',
    category: 'color-pps',
    categoryName: '컬러PPS',
    title: '포르쉐 카이엔 넵튠 블루(Neptune Blue) 컬러PPS',
    carModel: 'Porsche Cayenne (Neptune Blue PPS)',
    image: '/images/portfolio/cayenne_blue/01.jpg',
    images: [
      '/images/portfolio/cayenne_blue/01.jpg', // [전면] 코션 번호판 정면 풀샷 (DSC08637)
      '/images/portfolio/cayenne_blue/02.jpg', // [전측면] 사옥 앞 얼짱 전측면 쿼터뷰 (DSC08634)
      '/images/portfolio/cayenne_blue/03.jpg', // [측면] 사옥 앞 롱바디 측면 사이드뷰 (DSC08631)
      '/images/portfolio/cayenne_blue/04.jpg', // [뒷면] 리어 쿼터뷰 & 라이트바 (DSC08621)
      '/images/portfolio/cayenne_blue/05.jpg'  // [디테일] 4점식 LED 매트릭스 라이트 (DSC08628)
    ],
    tags: ['넵튠 블루', '포르쉐 컬러', '스포츠디자인', '고광택 피니시', '스프레이 PPS'],
    summary: '포르쉐 스페셜 오더 컬러인 넵튠 블루를 초정밀 열처리 부스에서 구현하여 맑고 청량한 슈퍼 스포츠 SUV의 매력을 극대화',
    details: [
      '포르쉐 전용 순정 조색 데이터를 기반으로 한 완벽한 넵튠 블루 색상 구현',
      '기존 도장면을 안전하게 보호하면서 컬러 커스텀 드레스업 동시 달성',
      '초발수 코팅 마감으로 비나 오염 물질이 맺히지 않고 흘러내리는 방오력'
    ],
    linkType: 'instagram',
    linkUrl: OFFICIAL_LINKS.instagram,
    linkText: '인스타그램 넵튠블루 시공기'
  },
  {
    id: 'color-ferrari488',
    category: 'color-pps',
    categoryName: '컬러PPS',
    title: '페라리 488 GTB 순정 도장 보존 페라리 레드 컬러PPS',
    carModel: 'Ferrari 488 GTB (Rosso Corsa)',
    image: '/images/portfolio/ferrari488/01.jpg',
    images: [
      '/images/portfolio/ferrari488/01.jpg', // [전면] 품격 있는 눈높이 정면 풀샷 & 코션 번호판
      '/images/portfolio/ferrari488/02.jpg', // [전측면] 코션 사옥 앞 얼짱 전측면 쿼터뷰
      '/images/portfolio/ferrari488/03.jpg', // [측면] 페라리 에어로 롱바디 측면 사이드뷰
      '/images/portfolio/ferrari488/04.jpg', // [뒷면] 사람 없는 리어 쿼터뷰 & 테일램프
      '/images/portfolio/ferrari488/05.jpg'  // [디테일] 초선명 헤드라이트 점등 & 휀더 클로즈업
    ],
    tags: ['페라리 488', '컬러PPS', '페라리 레드', 'CARDIP 정품', '원형 복원 가능'],
    summary: '슈퍼카의 순정 도장면 손상 걱정 없이 언제든 떼어낼 수 있는 CARDIP Peelable Paint 페라리 레드 풀바디 컬러 체인지',
    details: [
      '원하는 페라리 오리지널 레드로 완벽 변신 + 스톤칩 방어 동시 구현',
      '일반 랩핑 필름과 비교할 수 없는 깊고 투명한 클리어 도장 광택',
      '열처리 부스 내 규정 온도 베이킹을 통한 신차급 내구성 확보'
    ],
    linkType: 'instagram',
    linkUrl: OFFICIAL_LINKS.instagram,
    linkText: '인스타그램 컬러PPS 영상'
  },
  {
    id: 'color-m3-touring',
    category: 'color-pps',
    categoryName: '컬러PPS',
    title: 'BMW M3 투어링 랩핑 제거 후 GT 실버 컬러PPS',
    carModel: 'BMW M3 Touring (GT Silver PPS)',
    image: '/images/portfolio/m3_touring/01.jpg',
    images: [
      '/images/portfolio/m3_touring/01.jpg', // [전면] 코션 번호판 정면 풀샷 (DSC08131)
      '/images/portfolio/m3_touring/02.jpg', // [전측면] 사옥 앞 얼짱 전측면 쿼터뷰 (DSC08137)
      '/images/portfolio/m3_touring/03.jpg', // [측면] 투어링 롱바디 측면 사이드뷰 (DSC08144)
      '/images/portfolio/m3_touring/04.jpg', // [뒷면] 리어 쿼터뷰 & 쿼드 머플러 (DSC08147)
      '/images/portfolio/m3_touring/05.jpg'  // [디테일] 레이저 라이트 점등 디테일 (DSC08135)
    ],
    tags: ['M3 투어링', 'GT 실버', '랩핑 제거', '하이그로시 PPS', '고성능 왜건'],
    summary: '기존 랩핑 필름을 안전하게 제거하고 은은하고 날렵한 GT 실버 컬러PPS와 하이그로시 파츠 전체 보호 시공',
    details: [
      '기존 노후 랩핑 필름 안전 박리 및 도장면 정밀 디테일링 케어',
      'M 전용 바디킷과 오버휀더의 입체적인 굴곡에 완벽 밀착 도포',
      '루프 제외 전신 하이그로시 및 카본 파츠까지 완벽 보호'
    ],
    linkType: 'instagram',
    linkUrl: OFFICIAL_LINKS.instagram,
    linkText: '인스타그램 컬러PPS 영상'
  },
  {
    id: 'color-s450-grille',
    category: 'color-pps',
    categoryName: '컬러PPS',
    title: '메르세데스-벤츠 S450 프론트 그릴 블랙 컬러PPS (나이트 에디션)',
    carModel: 'Mercedes-Benz S 450 (Grille Black PPS)',
    image: '/images/portfolio/s450/01.jpg',
    images: [
      '/images/portfolio/s450/01.jpg', // [전면] 코션 번호판 정면 풀샷 & 블랙 그릴 (DSC08287)
      '/images/portfolio/s450/02.jpg', // [전측면] 코션 사옥 앞 얼짱 전측면 쿼터뷰 (DSC08291)
      '/images/portfolio/s450/03.jpg', // [측면] 코션 사옥 앞 롱바디 측면 사이드뷰 (20260909_140858)
      '/images/portfolio/s450/04.jpg', // [뒷면] 코션 번호판 리어 쿼터뷰 & 테일램프 (DSC08301)
      '/images/portfolio/s450/05.jpg'  // [디테일] 하이글로시 블랙 그릴 & 헤드라이트 (DSC08290)
    ],
    tags: ['그릴 컬러PPS', '블랙 PPS', '크롬죽이기', '나이트에디션', '플래그십 세단', '스톤칩 방어'],
    summary: '은색 크롬 라디에이터 그릴과 전면 몰딩을 도장 손상 없이 원상복구 가능한 고광택 블랙 컬러PPS로 시공한 나이트 에디션 크롬죽이기',
    details: [
      '전면 라디에이터 그릴의 스톤칩 집중 방어와 동시에 딥 블랙 고광택 익스테리어 완성',
      '크롬 파츠 손상 없이 언제든 100% 원상복구가 가능한 박리형(Peelable) 컬러PPS 공법',
      '일반 랩핑 필름의 들뜸이나 이질감 없이 순정 하이글로시 도장과 동일한 광택 및 내구성 확보'
    ],
    linkType: 'blog',
    linkUrl: OFFICIAL_LINKS.blog,
    linkText: '네이버 블로그 시공기'
  },
  {
    id: 'color-g80-grille',
    category: 'color-pps',
    categoryName: '컬러PPS',
    title: '제네시스 전기 G80 크레스트 그릴 하이글로시 블랙 컬러PPS',
    carModel: 'Genesis Electrified G80 (Grille Black PPS)',
    image: '/images/portfolio/g80_grille/01.jpg',
    images: [
      '/images/portfolio/g80_grille/01.jpg', // [전면] DRL 쿼드 라이트 점등 정면 풀샷 (DSC08405)
      '/images/portfolio/g80_grille/02.jpg', // [전측면] 얼짱 전측면 쿼터뷰 & 쿼드 라이트 (DSC08381)
      '/images/portfolio/g80_grille/03.jpg', // [측면] 하이앵글 롱바디 측면 실루엣 & 휠 (20260914_181157)
      '/images/portfolio/g80_grille/04.jpg', // [그릴 쿼터] 제네시스 윙 엠블럼 & 블랙 메시 그릴 (DSC08398)
      '/images/portfolio/g80_grille/05.jpg'  // [디테일] 크레스트 그릴 & 코션 번호판 디테일 (20260914_180516)
    ],
    tags: ['그릴 컬러PPS', '블랙 PPS', '크레스트 그릴', '크롬죽이기', '전기차 PPS', '스톤칩 방어'],
    summary: '전기 G80의 전면 크레스트 그릴 크롬을 도색 손상 없이 박리 가능한 하이글로시 딥 블랙 컬러PPS로 시공하여 강렬한 스포티 룩 완성',
    details: [
      '전면 대형 크레스트 그릴의 스톤칩 집중 방어와 감각적인 올 블랙 드레스업 동시 구현',
      '전기차 충전구 및 전방 카메라/센서 간섭 없이 정밀 마스킹 및 분무 도포 공법 적용',
      '순정 도장면 손상 없이 언제든 100% 원형 복원이 가능한 친환경 박리형 PPS'
    ],
    linkType: 'blog',
    linkUrl: OFFICIAL_LINKS.blog,
    linkText: '네이버 블로그 시공기'
  },
  {
    id: 'color-modely-red',
    category: 'color-pps',
    categoryName: '컬러PPS',
    title: '테슬라 모델 Y 신차 전체 페라리 레드 컬러PPS',
    carModel: 'Tesla Model Y (Ferrari Red PPS)',
    image: '/images/portfolio/modely_red/01.jpg',
    images: [
      '/images/portfolio/modely_red/01.jpg', // [전면] 코션 번호판 정면 풀샷 (SAM_9783)
      '/images/portfolio/modely_red/02.jpg', // [전측면] 얼짱 전측면 쿼터뷰 (DSC08740)
      '/images/portfolio/modely_red/03.jpg', // [측면] 사옥 앞 롱바디 측면 사이드뷰 (SAM_9788)
      '/images/portfolio/modely_red/04.jpg', // [뒷면] 코션 번호판 리어 쿼터뷰 (SAM_9790)
      '/images/portfolio/modely_red/05.jpg'  // [디테일] 헤드라이트 점등 & 휠 클로즈업 (DSC08772)
    ],
    tags: ['테슬라 모델Y', '페라리 레드', '신차 전체PPS', '컬러 체인지', '전기차 전용', '고광택 피니시'],
    summary: '신차 출고 직후 테슬라 모델 Y를 강렬하고 우아한 페라리 레드 고광택 컬러PPS로 전체 시공하여 완벽한 슈퍼 EV로 완성',
    details: [
      '일반 랩핑 필름의 오렌지필 없이 슈퍼카 순정 도장 이상의 깊은 펄감과 투명 광택 구현',
      '신차 얇은 클리어코트를 스톤칩·생활 스크래치로부터 보호하는 두터운 보호 도막층 형성',
      '원할 때 칼자국이나 도장 손상 없이 깨끗하게 원상복구 가능한 CARDIP 정품 PPS'
    ],
    linkType: 'instagram',
    linkUrl: OFFICIAL_LINKS.instagram,
    linkText: '인스타그램 페라리레드 시공기'
  },
  {
    id: 'color-ev6-gt',
    category: 'color-pps',
    categoryName: '컬러PPS',
    title: '기아 EV6 GT 스틸 매트 사틴 실버 컬러PPS',
    carModel: 'Kia EV6 GT (Satin Matte Silver PPS)',
    image: '/images/portfolio/ev6_gt/01.jpg',
    images: [
      '/images/portfolio/ev6_gt/01.jpg', // [전면] 코션 번호판 정면 풀샷 (DSC08103)
      '/images/portfolio/ev6_gt/02.jpg', // [전측면] 코션 사옥 앞 얼짱 전측면 쿼터뷰 (DSC08107)
      '/images/portfolio/ev6_gt/03.jpg', // [측면] 코션 사옥 앞 롱바디 측면 사이드뷰 (DSC08108)
      '/images/portfolio/ev6_gt/04.jpg', // [뒷면] 코션 사옥 앞 리어 쿼터뷰 & 테일램프 (DSC08113)
      '/images/portfolio/ev6_gt/05.jpg'  // [디테일] 포지드 카본 필러/미러 & 형광 캘리퍼 (DSC08121)
    ],
    tags: ['기아 EV6 GT', '컬러PPS', '사틴 무광', '스틸 매트 그레이', '전기차 전용', '스톤칩 방어'],
    summary: '고성능 전기차 EV6 GT의 역동적인 바디 라인을 고급스러운 스틸 매트 사틴 실버 컬러PPS로 감싸 슈퍼 전기차의 미래지향적 감성과 도장면 보호를 동시 구현',
    details: [
      '일반 필름 랩핑과 차원이 다른 매끄럽고 은은한 프리미엄 사틴 무광 메탈릭 텍스처',
      '고속 주행 스톤칩 및 도장 손상을 완벽 방어하는 CARDIP 박리형 보호 도막층',
      '형광 브레이크 캘리퍼 및 유광 블랙 파츠와 어우러지는 완벽한 익스테리어 밸런스'
    ],
    linkType: 'instagram',
    linkUrl: OFFICIAL_LINKS.instagram,
    linkText: '인스타그램 EV6 GT 시공기'
  },

  // ── 3. PPS (투명/보호) ──
  {
    id: 'pps-gwagon',
    category: 'pps',
    categoryName: 'PPS',
    title: '메르세데스-벤츠 G450d 신차 풀바디 투명PPS',
    carModel: 'Mercedes-Benz G 450d (W465)',
    image: '/images/portfolio/gwagon/01.jpg',
    images: [
      '/images/portfolio/gwagon/01.jpg', // [전면] 코션 번호판 정면 풀샷 (SAM_9648)
      '/images/portfolio/gwagon/02.jpg', // [전측면] 코션 사옥 앞 얼짱 전측면 쿼터뷰 (SAM_9650)
      '/images/portfolio/gwagon/03.jpg', // [측면] 사옥 앞 박스형 롱바디 측면뷰 (20260909_100434)
      '/images/portfolio/gwagon/04.jpg', // [뒷면] 코션 번호판 & 스페어타이어 리어 쿼터뷰 (SAM_9655)
      '/images/portfolio/gwagon/05.jpg'  // [디테일] 원형 멀티빔 LED 헤드라이트 & 그릴 (SAM_9658)
    ],
    tags: ['벤츠 G450d', 'G바겐 PPS', '각진 바디 정밀시공', '오프로드 스톤칩 방어', '스페어타이어 커버'],
    summary: '아이코닉 오프로더의 복잡한 힌지 구조와 직각 바디 판넬, 휀더 플레어까지 완벽 밀착 보호하는 G바겐 전용 PPS 솔루션',
    details: [
      '외부로 노출된 도어 힌지와 윈드실드 프레임 등 취약 부위 100% 빈틈없는 시공',
      '고속 주행 및 험로 주행 시 발생하는 스톤칩으로부터 고가 순정 도장면 원천 보호',
      '세차 스트레스 없는 최상급 방오성과 자가 스크래치 복원 기능 제공'
    ],
    linkType: 'instagram',
    linkUrl: OFFICIAL_LINKS.instagram,
    linkText: '인스타그램 G바겐 시공기'
  },
  {
    id: 'pps-m3-sedan',
    category: 'pps',
    categoryName: 'PPS',
    title: 'BMW M3 컴페티션 세단 신차 풀바디 투명PPS',
    carModel: 'BMW M3 Competition Sedan (G80)',
    image: '/images/portfolio/m3_sedan/01.jpg',
    images: [
      '/images/portfolio/m3_sedan/01.jpg', // [전면] 코션 번호판 정면 풀샷 (DSC07853)
      '/images/portfolio/m3_sedan/02.jpg', // [전측면] 코션 사옥 앞 얼짱 전측면 쿼터뷰 (DSC07855)
      '/images/portfolio/m3_sedan/03.jpg', // [측면] 사옥 앞 M3 세단 롱바디 측면뷰 (DSC07862)
      '/images/portfolio/m3_sedan/04.jpg', // [뒷면] 리어 쿼터뷰 & 쿼드 머플러 (DSC07863)
      '/images/portfolio/m3_sedan/05.jpg'  // [디테일] 레이저 라이트 & 바디킷 디테일 (DSC07880)
    ],
    tags: ['BMW M3', 'M 컴페티션', '버티컬 키드니그릴', '카본 루프 보호', '고성능 스포츠세단'],
    summary: '압도적인 버티컬 키드니 그릴과 카본 루프, 볼륨감 넘치는 와이드 휀더를 정밀 컷리스 공법으로 완벽 보호',
    details: [
      '초고속 주행에 특화된 프론트 범퍼 에어로 파츠 및 카본 루프 완벽 밀착 보호',
      '순정 도장의 메탈릭 입자와 광택도를 더욱 선명하고 깊이 있게 끌어올리는 광학 필름',
      '황변 없는 무황변 내후성으로 서킷 주행 및 일상 주행 모두 안심'
    ],
    linkType: 'instagram',
    linkUrl: OFFICIAL_LINKS.instagram,
    linkText: '인스타그램 M3 시공기'
  },
  {
    id: 'pps-model-x',
    category: 'pps',
    categoryName: 'PPS',
    title: '테슬라 모델 X 신차 투명PPS',
    carModel: 'Tesla Model X (Full Body PPS)',
    image: '/images/portfolio/model_x/01.jpg',
    images: [
      '/images/portfolio/model_x/01.jpg', // [전면] 코션 번호판 정면 풀샷 (DSC08541)
      '/images/portfolio/model_x/02.jpg', // [전측면] 사옥 앞 얼짱 전측면 쿼터뷰 (DSC08544)
      '/images/portfolio/model_x/03.jpg', // [측면] 사옥 앞 모델 X 롱바디 측면뷰 (DSC08555)
      '/images/portfolio/model_x/04.jpg', // [뒷면] 테일램프 점등 리어 쿼터뷰 (DSC08558)
      '/images/portfolio/model_x/05.jpg'  // [디테일] 헤드라이트 점등 & 휀더 카메라 (DSC08549)
    ],
    tags: ['테슬라 모델X', '전기차 PPS', '팔콘윙 도어', '글래스 루프', '스톤칩 방어', '신차 전체보호'],
    summary: '테슬라 플래그십 전기 SUV의 대형 글래스 루프 경계선과 독창적인 팔콘 윙 도어 모서리까지 섬세하게 마감한 프리미엄 PPS',
    details: [
      '팔콘 윙 도어 개폐 시 발생할 수 있는 엣지 칩 및 센서 주변 정밀 맞춤 시공',
      '전면 그릴리스 범퍼와 휀더를 한 장 통시공으로 이어붙임 없는 깔끔한 마감',
      '신차 도장의 얇은 클리어코트를 완벽히 보호하여 세차 스크래치 제로화'
    ],
    linkType: 'instagram',
    linkUrl: OFFICIAL_LINKS.instagram,
    linkText: '인스타그램 모델X 시공기'
  },
  {
    id: 'pps-ex90',
    category: 'pps',
    categoryName: 'PPS',
    title: '볼보 EX90 신차 투명PPS',
    carModel: 'Volvo EX90 (Flagship EV SUV)',
    image: '/images/portfolio/ex90/01.jpg',
    images: [
      '/images/portfolio/ex90/01.jpg', // [전면] 코션 번호판 정면 풀샷 (SAM_9779)
      '/images/portfolio/ex90/02.jpg', // [전측면] 코션 번호판 얼짱 전측면 쿼터뷰 (SAM_9776)
      '/images/portfolio/ex90/03.jpg', // [측면] 볼보 EX90 롱바디 측면 사이드뷰 (DSC08691)
      '/images/portfolio/ex90/04.jpg', // [뒷면] 코션 번호판 리어 쿼터뷰 (SAM_9771)
      '/images/portfolio/ex90/05.jpg'  // [디테일] 토르의 망치 헤드라이트 디테일 (SAM_9765)
    ],
    tags: ['볼보 EX90', '전기차 PPS', '신차 전체보호', '무절개 시공', '자가 복원'],
    summary: '볼보 플래그십 순수 전기 SUV의 매끄러운 바디 라인과 루프 센서 라인까지 칼 재단 없는 무절개 일체형 PPS로 완벽 보호',
    details: [
      '전기차 전면 그릴리스 패널 및 라이더(LiDAR) 센서 부위 초정밀 안전 시공',
      '자가 치유(Self-Healing) 기술로 스톤칩과 자동세차 스크래치 완벽 방어',
      '황변 없는 무황변 광학 원단으로 신차 오리지널 도장면 광택 유지'
    ],
    linkType: 'instagram',
    linkUrl: OFFICIAL_LINKS.instagram,
    linkText: '인스타그램 EX90 시공기'
  },

  // ── 3. 판금도색 (사고수리 & 보험복원) ──
  {
    id: 'paint-cayenne',
    category: 'paint',
    categoryName: '판금도색',
    title: '포르쉐 카이엔 스포츠 디자인 정밀 사고수리 & 도색 복원',
    carModel: 'Porsche Cayenne Sports Design',
    image: '/images/portfolio/cayenne_paint/01.jpg',
    images: [
      '/images/portfolio/cayenne_paint/01.jpg', // [전면] 코션 번호판 정면 풀샷 (DSC08321)
      '/images/portfolio/cayenne_paint/02.jpg', // [전측면] 코션 사옥 앞 얼짱 전측면 쿼터뷰 (DSC08326)
      '/images/portfolio/cayenne_paint/03.jpg', // [측면] 코션 사옥 앞 롱바디 측면 사이드뷰 (DSC08327)
      '/images/portfolio/cayenne_paint/04.jpg', // [뒷면] 코션 사옥 앞 리어 쿼터뷰 & 테일램프 (DSC08331)
      '/images/portfolio/cayenne_paint/05.jpg'  // [디테일] 휀더 & 휠 & 포르쉐 캘리퍼 복원 디테일 (DSC08328)
    ],
    tags: ['포르쉐 사고수리', '정밀 판금', '수용성 조색', '단차 0% 복원', '보험처리 전문'],
    summary: '외장 충돌로 손상된 스포츠 디자인 바디킷과 휀더를 오리지널 규격으로 복원하고 컬러PPS까지 원스톱 리스토어',
    details: [
      '글라슈리트 친환경 수용성 도료 및 컴퓨터 디지털 측색기 이색감 제로 매칭',
      '알루미늄 바디 판금 전용 장비로 원형 복원 및 센서 정밀 캘리브레이션',
      '최고급 열처리 챔버 내 규정 온도 및 시간 엄수 베이킹'
    ],
    linkType: 'blog',
    linkUrl: OFFICIAL_LINKS.blog,
    linkText: '네이버 블로그 정밀 복원기'
  },
  {
    id: 'paint-bmw-x6',
    category: 'paint',
    categoryName: '판금도색',
    title: 'BMW X6 30d 바디 사고수리 복원 & 사틴 무광PPS',
    carModel: 'BMW X6 30d (Satin Matte PPS)',
    image: '/images/portfolio/bmw_x6/01.jpg',
    images: [
      '/images/portfolio/bmw_x6/01.jpg', // [전면] 버티컬 키드니 그릴 정면 풀샷 (IMG_8600)
      '/images/portfolio/bmw_x6/02.jpg', // [전측면] 코션 사옥 앞 얼짱 전측면 쿼터뷰 (IMG_8602)
      '/images/portfolio/bmw_x6/03.jpg', // [측면] 코션 사옥 앞 롱바디 측면 사이드뷰 (IMG_8603)
      '/images/portfolio/bmw_x6/04.jpg', // [뒷면] 사옥 앞 리어 쿼터뷰 & 테일램프 (IMG_8606)
      '/images/portfolio/bmw_x6/05.jpg'  // [디테일] M 엠블럼 & 사틴 무광 텍스처 (IMG_8614)
    ],
    tags: ['사고수리', '판금도색', '무광PPS', '보험수리 전문', '원형 복원'],
    summary: '사고로 손상된 외장 판넬을 정밀 판금 복원 및 열처리 재도색 후, 기존 사틴 무광 질감의 PPS까지 이질감 없이 완벽 재시공 출고',
    details: [
      '손상 부위 단차 0% 정밀 교정 및 방청 아연 프라이머 코팅',
      '독일 정품 수용성 도료 조색 매칭 및 열처리 건조',
      '사고 수리 후 기존 무광PPS 질감과 100% 동일하게 엣지 마감'
    ],
    linkType: 'blog',
    linkUrl: OFFICIAL_LINKS.blog,
    linkText: '네이버 블로그 복원기'
  },

  // ── 4. 정비수리 (코션스마트센터 실제 슈퍼카/하이엔드 정비 실사 포트폴리오) ──
  {
    id: 'repair-aventador-v12',
    category: 'repair',
    categoryName: '정비수리',
    title: '람보르기니 아벤타도르 LP700-4 V12 파워트레인 통탈거 & ISR 7단 변속기 듀얼 클러치 오버홀',
    carModel: 'Lamborghini Aventador LP700-4 (6.5L V12)',
    image: '/images/portfolio/repair_aventador/02.jpg',
    images: [
      '/images/portfolio/repair_aventador/01.jpg',
      '/images/portfolio/repair_aventador/02.jpg',
      '/images/portfolio/repair_aventador/03.jpg',
      '/images/portfolio/repair_aventador/04.jpg',
      '/images/portfolio/repair_aventador/05.jpg'
    ],
    tags: ['람보르기니 전용정비', '6.5L V12 파워트레인 통탈거', 'ISR 7단 듀얼클러치', '카본 모노코크 보호', 'LDAS 진단기'],
    summary: '700마력 자연흡기 V12 슈퍼카의 변속 슬립 및 클러치 마모 한계 문제를 해결하기 위해, 후방 서브프레임과 파워트레인 일체를 안전하게 통탈거하여 ISR 7단 싱글클러치 듀얼로드를 완벽 오버홀한 최고난도 메이저 프로젝트',
    details: [
      '카본 파이버 모노코크 섀시 손상 방지를 위한 특수 지그 체결 및 차체 전장 하네스 100% 개별 라벨링 분리',
      '엔진 크레인을 활용한 6.5L V12 엔진 및 ISR(Independent Shifting Rods) 7단 변속기 파워트레인 통탈거 적출',
      '람보르기니 순정 트윈 디스크 클러치 팩, 스로우아웃 유압 릴리즈 베어링 및 E-Gear 솔레노이드 밸브 신품 교체',
      '규정 토크값 정밀 체결, 오일 라인 플러싱 및 전용 진단기 기반 클러치 PIS(Kiss-point) 정밀 영점 캘리브레이션'
    ],
    linkType: 'blog',
    linkUrl: OFFICIAL_LINKS.blog,
    linkText: '네이버 블로그 정비 사례'
  },
  {
    id: 'repair-porsche-macan',
    category: 'repair',
    categoryName: '정비수리',
    title: '포르쉐 마칸 GTS 3.0 V6 바이터보 전면 프레임 통탈거 & 실린더 보어 스크래치 정밀 리빌드',
    carModel: 'Porsche Macan GTS 3.0 V6 Bi-Turbo',
    image: '/images/portfolio/repair_porsche/03.jpg',
    images: [
      '/images/portfolio/repair_porsche/01.jpg',
      '/images/portfolio/repair_porsche/02.jpg',
      '/images/portfolio/repair_porsche/03.jpg',
      '/images/portfolio/repair_porsche/04.jpg',
      '/images/portfolio/repair_porsche/05.jpg'
    ],
    tags: ['포르쉐 전문리빌드', 'V6 바이터보', '보어 스크래치 해결', '엔진 풀 오버홀', 'PIWIS 전용 진단'],
    summary: '포르쉐 직분사 터보 엔진의 고질적인 실린더 내벽 스크래치(오일 과다 소모 및 실화 발생)를 해결하기 위해, 전면 서포트를 통탈거하고 엔진 블록을 완전 분해하여 신품 피스톤 링과 실린더 슬리브 리빌드를 완벽히 수행',
    details: [
      '프론트 범퍼, 쿨링 모듈, 프론트 서브프레임 탈거 후 3.0 V6 바이터보 파워트레인 완전 적출',
      '내시경 및 마이크로미터 정밀 측정을 통한 실린더 보어 1~6번 내벽 마모 및 피스톤 스커프 스크래치 진단',
      '강화 특수 실린더 슬리브 인서트 시공, 피스톤 링셋 교환 및 크랭크샤프트 메인 저널 베어링 클리어런스 정밀 세팅',
      '포르쉐 순정 타이밍 체인 및 가이드, 유압 텐셔너, 헤드 가스켓 일체 신품 교체 및 순정 PIWIS 적응 학습 완료'
    ],
    linkType: 'blog',
    linkUrl: OFFICIAL_LINKS.blog,
    linkText: '네이버 블로그 정비 사례'
  },
  {
    id: 'repair-bentley-w12',
    category: 'repair',
    categoryName: '정비수리',
    title: '벤틀리 컨티넨탈 플라잉스퍼 6.0 W12 트윈터보 엔진 드롭 & W12 헤드/캠샤프트 메이저 오버홀',
    carModel: 'Bentley Continental Flying Spur 6.0 W12 Twin-Turbo',
    image: '/images/portfolio/repair_bentley/02.jpg',
    images: [
      '/images/portfolio/repair_bentley/01.jpg',
      '/images/portfolio/repair_bentley/02.jpg',
      '/images/portfolio/repair_bentley/03.jpg',
      '/images/portfolio/repair_bentley/04.jpg',
      '/images/portfolio/repair_bentley/05.jpg'
    ],
    tags: ['벤틀리 W12 엔진', '6.0 트윈터보 드롭', '타이밍 체인 오버홀', '에어서스펜션 재생', '벤틀리 전용 공구'],
    summary: '극도의 정밀도를 요구하는 6.0L W12 트윈터보 엔진의 오일 누유, 타이밍 소음 및 진공 누설 문제를 차체에서 파워트레인을 완전히 분리하는 엔진 드롭 공정으로 완벽히 근본 해결한 초고난도 리빌드',
    details: [
      '엔진룸 패키징이 극도로 타이트한 벤틀리 W12 차체 구조에 맞춰 프론트 서브프레임 일체 하향 드롭(Drop) 탈거',
      '복합 VR 뱅크 구조의 4개 캠샤프트, 48개 유압 태핏 밸브트레인 카본 슬러지 초음파 세척 및 정밀 래핑',
      '노후 가스켓 류(로커암 커버, 타이밍 케이스, 오일팬) 및 경화된 W12 특수 진공 배관 라인 100% 신품 교체',
      '에어 서스펜션 밸브블록 누설 점검, 하체 컨트롤암 부싱 교환 및 공차 체결(Ride Height) 정밀 셋업'
    ],
    linkType: 'blog',
    linkUrl: OFFICIAL_LINKS.blog,
    linkText: '네이버 블로그 정비 사례'
  },
  {
    id: 'repair-benz-sclass',
    category: 'repair',
    categoryName: '정비수리',
    title: '메르세데스-벤츠 S클래스 플래그십 하체 서브프레임 & 매직바디 승차감 신차급 리프레시',
    carModel: 'Mercedes-Benz S-Class (W221/W222 Long Wheelbase)',
    image: '/images/portfolio/repair_benz/03.jpg',
    images: [
      '/images/portfolio/repair_benz/01.jpg',
      '/images/portfolio/repair_benz/02.jpg',
      '/images/portfolio/repair_benz/03.jpg',
      '/images/portfolio/repair_benz/04.jpg',
      '/images/portfolio/repair_benz/05.jpg'
    ],
    tags: ['벤츠 S클래스 하체정비', '매직바디컨트롤 승차감', '순정 부싱/컨트롤암', '서브프레임 오버홀', 'Xentry 정밀 진단'],
    summary: '플래그십 세단 특유의 안락한 승차감을 완벽하게 되찾기 위해 노후된 하체 부싱, 스태빌라이저, 컨트롤암 및 엔진/미션 마운트를 순정 규격으로 일체 리프레시하여 하체 잡소리와 롤링을 100% 해결',
    details: [
      '노후 경화로 인해 차체 진동과 이음을 유발하던 전/후륜 컨트롤암, 텐션 스트럿, 볼조인트 정밀 분해',
      '메르세데스-벤츠 순정 신품 스태빌라이저 바(부싱 일체형) 및 유압 엔진/미션 마운트 신품 체결',
      '공차 상태를 재현한 상태에서 벤츠 공식 서비스 매뉴얼 상의 규정 토크(Nm) 및 각도 조임(Angle Torque) 엄격 준수',
      'Xentry 진단기를 통한 에어매틱 서스펜션 압력 테스트, 차고 센서 보정 및 고속 주행 진동 제로화 완료'
    ],
    linkType: 'blog',
    linkUrl: OFFICIAL_LINKS.blog,
    linkText: '네이버 블로그 정비 사례'
  }
];
