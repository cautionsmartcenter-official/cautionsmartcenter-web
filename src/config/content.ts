// ============================================================
// Site Content Configuration — 텍스트/데이터 관리
// ============================================================
// 사이트에 표시되는 모든 텍스트를 여기서 수정할 수 있습니다.
// ============================================================

export const SITE_CONFIG = {
  // 브랜드
  brandName: 'Caution SMART CENTER',
  copyright: '© 2024 CAUTION SMART CENTER. All rights reserved.',

  // 히어로 섹션 (SEO & GEO 최적화 문구)
  hero: {
    titleLeft: ['PREMIUM', 'AUTO SOLUTION'],
    titleRight: ['CAUTION', 'SMART CENTER'],
    watermark: 'CAUTION SMART',
    description:
      '24년 장인정신과 최첨단 AI 로봇기술의 만남. 분당·수원·용인·광주 수입차 사고수리, 판금도색, PPS 및 컬러PPS 완벽 시공 전문 브랜드.',
  },

  // 시네마틱 텍스트 섹션
  cinematic: {
    text: '단순한 정비를 넘어 슈퍼카 본연의 가치를 보존합니다. 독일 카딥(Cardip) 및 엑소쉴드(Exoshield) 독점 기술력과 24년 장인 정신, 최첨단 AI 로봇 분사 시스템으로 이질감 없는 완성도를 약속드립니다. 분당, 수원, 용인 등 수도권 전 지역 무료 픽업 & 드랍 서비스를 제공합니다.',
  },

  // 성능 지표 섹션
  metrics: {
    subtitle: 'Key Achievements & Expertise',
    items: [
      { value: '24Years', label: '24년 전통의 외장관리 노하우' },
      { value: '1,000+', label: '국내 최초 유리막코팅 1천대 달성' },
      { value: '100%', label: '분당·수원·용인 픽업&드랍 지원' },
    ],
  },

  // 기술 섹션
  technology: {
    title: ['Next-Gen', 'PPS Technology'],
    description:
      '필름이 아닌 도장 기반 차세대 스피레이 보호막(PPS). 들뜸과 황변 없는 완벽한 내구성을 제공합니다.',
    features: [
      {
        title: 'AI Robot Spray',
        desc: 'AI 로봇을 이용한 미세 단차 제로 정밀 분사 코팅',
      },
      {
        title: 'Original Defense',
        desc: '차량 원도장 손상 없는 깔끔한 박리 및 복원',
      },
      {
        title: 'Color Change PPS',
        desc: '도색 수준 퀄리티와 강력한 스톤칩 차단 레이어',
      },
      {
        title: 'Import Repair',
        desc: '브랜드별 맞춤 정비 진단 및 첨단 판금도색 솔루션',
      },
    ],
  },

  // 아키텍처 섹션
  architecture: {
    subtitle: 'Work Process',
    heading: '4단계 맞춤형 정밀 시공 프로세스',
    description:
      '차량 정밀 진단부터 원도장 케어, AI 분사 보호 레이어 적용, 최종 고광택 수제 마감까지 철저한 품질 관리를 보증합니다.',
    layers: [
      { num: 1, name: '정밀 진단 (Diagnosis)' },
      { num: 2, name: '표면 연마 (Preparation)' },
      { num: 3, name: 'AI PPS 분사 (Spray Layer)' },
      { num: 4, name: '핸드메이드 마감 (Hand Finish)' },
    ],
  },

  // 푸터
  footer: {
    tagline:
      '귀사의 소중한 차량 가치, 코션스마트센터가 함께합니다. 분당 수입차 사고수리 및 외장관리 전문 (경기도 광주시 태재로 26).',
  },

  // 네비게이션
  nav: {
    links: [
      { label: 'About', scrollMultiplier: 1 },
      { label: 'Metrics', scrollMultiplier: 2 },
    ],
    downloadLabel: 'Download',
  },
};
