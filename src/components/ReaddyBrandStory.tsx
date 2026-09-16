import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReaddyBrandStoryProps {
  onNavigateToContact?: (serviceName?: string) => void;
}

export const ReaddyBrandStory: React.FC<ReaddyBrandStoryProps> = ({ onNavigateToContact }) => {
  const [isBrochureExpanded, setIsBrochureExpanded] = useState(false);
  const [brochureTab, setBrochureTab] = useState<'product' | 'film'>('product');
  const [selectedImageModal, setSelectedImageModal] = useState<string | null>(null);

  const productBentoItems = [
    {
      badge: 'Versatile',
      title: '광범위한 도료 호환성',
      desc: 'Glasurit, PPG, Sikkens, Spies Hecker, Standox 등 전 세계 최고급 유/수성 베이스코트 도료와 100% 결합 호환됩니다.',
      icon: 'ri-shuffle-line',
      highlight: '글로벌 브랜드 도료 완벽 결합'
    },
    {
      badge: 'Non Dangerous Goods',
      title: '친환경 비위험물 인증',
      desc: '유해 화학물질 위험물 규제에서 제외된 친환경 원료로, 인체와 자연에 무해하며 안전한 운송 및 취급이 가능합니다.',
      icon: 'ri-leaf-line',
      highlight: '국제 친환경 규격 획득'
    },
    {
      badge: 'Ready to Spray',
      title: '즉시 분사 방식 (No Mixing)',
      desc: '현장 배합이나 별도 희석제 없이 전용 정밀 스프레이 건으로 원액 그대로 다이렉트 분사하여 완벽한 품질을 유지합니다.',
      icon: 'ri-paint-brush-line',
      highlight: '별도 교반/희석 불필요'
    },
    {
      badge: 'Water-based',
      title: '친환경 수성 테크놀로지',
      desc: '유기용제(VOCs) 냄새와 독성을 획기적으로 차단한 차세대 친환경 수성 시스템으로 차주와 테크니션 모두 안전합니다.',
      icon: 'ri-drop-line',
      highlight: '인체·환경 무해 그린 도료'
    },
    {
      badge: 'High Solid',
      title: '고형분 급속 피막 형성 (40µm/layer)',
      desc: '1회 도포당 40µm 두께로 신속하게 축적되어 시공 시간을 대폭 단축하고 견고하고 두터운 도막을 형성합니다.',
      icon: 'ri-stack-line',
      highlight: '1회 도포당 40µm 형성'
    },
    {
      badge: 'Simple',
      title: '원스텝 1액형 구조 (One Component)',
      desc: '복잡한 화학 경화제 배합 오류 위험이 없는 단일 원액 성분으로, 항상 균일하고 안정적인 최고 품질을 보장합니다.',
      icon: 'ri-checkbox-circle-fill',
      highlight: '경화제 배합 오류 원천 차단'
    },
    {
      badge: 'Worldclass Leveling',
      title: '세계 최고 수준 평활도 (No Orange Peel)',
      desc: '우글거림(오렌지필)이 전혀 없는 매끄러운 순정 페인트 이상의 거울 같은 표면 평활도(Leveling)를 실현합니다.',
      icon: 'ri-sparkling-line',
      highlight: '오렌지필 제로 하이엔드 표면'
    },
    {
      badge: 'Fast Drying',
      title: '고효율 급속 건조 프로세스',
      desc: '최적화된 건조 경화 프로세스로 출고 시간을 획기적으로 단축하며 시공 비용 효율성과 완성도를 극대화합니다.',
      icon: 'ri-timer-flash-line',
      highlight: '신속하고 안정적인 경화'
    }
  ];

  const filmBentoItems = [
    {
      badge: '250µ+ Total Thickness',
      title: '250µm+ 압도적 도막 두께',
      desc: '실측 250~428µm에 달하는 초후도 탄성 피막으로 일반 필름 두께를 압도하는 강력한 물리적 보호 성능을 발휘합니다.',
      icon: 'ri-shield-fill',
      highlight: '실측 최대 428µm 강력 보호막'
    },
    {
      badge: 'Lifetime Guarantee',
      title: '평생 손상 없이 벗겨지는 품질 보증 (Peelability)',
      desc: '오리지널 도장면과의 완벽한 밀착력과 언제든 칼자국/손상 없이 떼어낼 수 있는 깔끔하게 벗겨지는 밸런스를 평생 보증합니다.',
      icon: 'ri-repeat-line',
      highlight: '도장면 손상 0% 평생 보증'
    },
    {
      badge: 'DIN ISO 20567-1',
      title: '스톤칩 완벽 방어 독일 공인 시험',
      desc: '독일 자동차 표준 규격 DIN ISO 20567-1 고속 자갈 낙하 충격 시험을 통과한 강력한 탄성 폴리머 피막입니다.',
      icon: 'ri-medal-fill',
      highlight: '독일 DIN ISO 20567-1 인증'
    },
    {
      badge: 'Lifetime Non-Yellowing',
      title: '평생 무황변 보증 (UV Protection)',
      desc: '반영구적인 자외선(UV) 차단 포뮬러로 한여름 직사광선 아래에서도 변색이나 누런 황변이 없는 평생 투명도를 보장합니다.',
      icon: 'ri-sun-line',
      highlight: '평생 무황변 품질 보증'
    },
    {
      badge: 'OEM Finishes',
      title: '순정 OEM급 광택 및 매트',
      desc: '포르쉐 911 GT3 등 하이퍼카/슈퍼카 순정 도장과 완벽히 일치하는 깊고 선명한 하이글로시 및 고급스러운 매트 질감입니다.',
      icon: 'ri-car-line',
      highlight: '포르쉐 순정급 쇼카 마감'
    },
    {
      badge: 'Coatable',
      title: '세라믹 & 왁스 코팅 100% 호환',
      desc: '유리막 코팅, 그래핀 코팅, 고체 왁스 등 기존 외장 디테일링 케미컬 시공과 완벽히 결합하여 발수성과 광택을 배가합니다.',
      icon: 'ri-magic-line',
      highlight: '외장 디테일링 케미컬 호환'
    },
    {
      badge: 'Standard Finish',
      title: '샌딩 & 광택 정밀 가공 가능',
      desc: '보호 필름임에도 실제 도장면처럼 샌딩 및 광택(Polish) 정밀 레벨링 공정이 가능하여 완벽한 표면 교정을 제공합니다.',
      icon: 'ri-tools-line',
      highlight: '도장면처럼 샌딩/광택 가공'
    },
    {
      badge: 'No Adhesive',
      title: '접착제 무첨가로 깔끔하게 벗겨지는 시스템',
      desc: '화학 본드 접착 성분이 전혀 없어 장기 부착 후 제거 시에도 본드 잔여물이나 클리어코트 손상 없이 깨끗하게 벗겨집니다.',
      icon: 'ri-shield-check-line',
      highlight: '화학 본드 잔여물 0%'
    },
    {
      badge: 'Resistant',
      title: '세차 스크래치 & 케미컬 완벽 저항',
      desc: '자동세차 브러쉬 마찰과 강력한 산성·알칼리성 세차 약품에도 피막이 부식되거나 손상되지 않는 탁월한 내화학성을 갖춥니다.',
      icon: 'ri-water-flash-line',
      highlight: '자동세차 및 케미컬 무영향'
    },
    {
      badge: 'Brilliance',
      title: '크리스탈 광학 투명도',
      desc: '왜곡 없이 투명한 크리스탈 광학 특성으로 원도장의 펄과 컬러감을 있는 그대로 선명하게 살려줍니다.',
      icon: 'ri-eye-line',
      highlight: '왜곡 없는 초투명 광학 피막'
    },
    {
      badge: 'Extremely Tough',
      title: '초강인 탄성 내충격성',
      desc: '외부 충격을 유연하게 흡수하고 미세 변형을 스스로 복원하는 고밀도 탄성 구조로 극한의 환경을 견딥니다.',
      icon: 'ri-flashlight-line',
      highlight: '충격 흡수 탄성 폴리머'
    },
    {
      badge: '6 Years Guaranteed',
      title: '최장 10년 수명 & 6년 공식 보증',
      desc: '독일 본사의 엄격한 품질 보증 규정에 따라 공식 6년 보증 및 최대 10년의 반영구적 내구성을 제공합니다.',
      icon: 'ri-time-line',
      highlight: '최대 10년 내구성 수명'
    }
  ];
  const techFeatures = [
    {
      icon: 'ri-robot-line',
      title: 'AI 로봇 시스템',
      description: '정밀한 센서와 알고리즘으로 완벽한 시공을 실현합니다'
    },
    {
      icon: 'ri-eye-line',
      title: '실시간 모니터링',
      description: '작업 전 과정을 실시간으로 모니터링하고 품질을 관리합니다'
    },
    {
      icon: 'ri-shield-check-line',
      title: '품질 보증',
      description: '철저한 품질 검수와 장기 보증으로 안심을 제공합니다'
    },
    {
      icon: 'ri-time-line',
      title: '효율적인 작업',
      description: '자동화 시스템으로 작업 시간을 단축하고 효율을 높입니다'
    }
  ];

  const coreValues = [
    {
      title: '혁신',
      subtitle: 'Innovation',
      description: 'AI 로봇 기술을 통해 차량 관리의 새로운 기준을 제시합니다',
      icon: 'ri-lightbulb-flash-line'
    },
    {
      title: '전문성',
      subtitle: 'Expertise',
      description: '수입차 전문 기술진의 풍부한 경험과 노하우를 제공합니다',
      icon: 'ri-award-line'
    },
    {
      title: '신뢰',
      subtitle: 'Trust',
      description: '투명한 프로세스와 철저한 품질 관리로 신뢰를 구축합니다',
      icon: 'ri-shield-star-line'
    },
    {
      title: '고객 중심',
      subtitle: 'Customer First',
      description: '고객의 만족과 차량의 가치 보존을 최우선으로 생각합니다',
      icon: 'ri-heart-line'
    }
  ];

  return (
    <div className="bg-white text-dark min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative min-h-[65vh] sm:min-h-[72vh] flex items-center justify-center bg-black overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="/images/readdy/brand-hero-clean.jpg"
            alt="Brand Story"
            className="w-full h-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/75" />
        </div>

        <div className="relative z-10 mx-auto px-6 lg:px-12 max-w-5xl text-center pt-32 sm:pt-40 pb-20 sm:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 bg-primary rounded-full mb-6">
              <span className="text-xs font-semibold text-white tracking-wider">BRAND STORY</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
              혁신으로 만드는 <br />
              완벽한 차량 관리
            </h1>
            <p className="text-base lg:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              CAUTION SMART CENTER는 AI 로봇 기술과 전문 기술진의 노하우를 결합하여 <br className="hidden sm:block" />
              차량 관리의 새로운 기준을 제시합니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section id="our-story" className="py-24 lg:py-32 bg-white">
        <div className="mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-2 bg-gray-100 rounded-full mb-6">
                <span className="text-xs font-semibold text-gray-900 tracking-wider">OUR STORY</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                차량 관리의 <br />
                새로운 패러다임
              </h2>
              <div className="space-y-6 text-base text-gray-600 leading-relaxed">
                <p>
                  CAUTION SMART CENTER는 수입차 전문 정비의 오랜 경험과 노하우를 바탕으로 설립되었습니다. 우리는 단순한 정비를 넘어, 차량의 가치를 지키고 높이는 토탈 케어 솔루션을 제공합니다.
                </p>
                <p>
                  특히 <span className="font-cardip font-bold text-gray-900">CARDIP®</span> PPS (Peelable Paint 뿌리는 페인트) 서비스와 첨단 CurveRobot 지능형 로봇 도장 시스템은 기존의 도장 보호 및 외장 관리 방식을 혁신적으로 개선했습니다. 정밀한 도포와 완벽한 코팅을 실현하며 최상의 퀄리티와 보호 성능을 보장합니다.
                </p>
                <p>
                  우리의 목표는 명확합니다. 고객의 소중한 차량을 최상의 상태로 유지하고, 그 가치를 오래도록 보존하는 것입니다. 이를 위해 끊임없이 기술을 연구하고 서비스를 개선해 나가고 있습니다.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-black">
                <div className="w-full h-[500px]">
                  <img
                    src="/images/readdy/brand-story-team-001.jpg"
                    alt="Our Story Team"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-8 -left-8 bg-primary rounded-2xl p-8 shadow-xl text-white"
              >
                <div className="text-5xl font-black mb-2">24+</div>
                <div className="text-sm text-white/90 font-medium">Years of Excellence</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2.5 CARDIP Official Technical Partnership & Korean Distributor Section */}
      <section id="distributor" className="py-24 lg:py-32 bg-white text-gray-900 relative overflow-hidden border-y border-gray-200">
        {/* Subtle Brand Ambient Lighting */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C2181C]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#0F1C25]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-red-50 border border-red-200 rounded-full mb-6 shadow-sm"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-cardip-red animate-pulse" />
              <span className="text-xs sm:text-sm font-bold font-roboto text-cardip-red tracking-wider">
                General Distributor South Korea
              </span>
            </motion.div>

            {/* Title: Exactly '독일 CARDIP® 한국 공식 디스트리뷰터' */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-cardip-dark tracking-tight leading-tight mb-6"
            >
              <span className="block break-keep">
                독일 <span className="text-cardip-red font-cardip font-black">CARDIP®</span> 한국 공식 디스트리뷰터
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-xl text-gray-700 leading-relaxed font-sans font-normal max-w-3xl mx-auto break-keep"
            >
              독일에서 연구·생산되는 <span className="font-cardip font-bold text-gray-900">CARDIP®</span> PPS 제품을 기반으로, 독일 본사의 기술 교육과 기준에 따라 제품 공급 및 전문 시공 서비스를 제공합니다.
            </motion.p>
          </div>

          {/* 3-Column Expanded Showcase Grid (Simplified & Balanced) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Column 1: CARDIP System Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 sm:p-9 border-2 border-gray-200 hover:border-cardip-red/50 transition-all shadow-md flex flex-col justify-between group"
            >
              <div>
                {/* Large Product Showcase Container */}
                <div className="w-full h-64 sm:h-72 bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl p-6 flex items-center justify-center mb-6 overflow-hidden border border-gray-100 group-hover:bg-red-50/30 transition-colors">
                  <img
                    src="/images/cardip/cardip_clean_logo.png"
                    alt="CARDIP Peelable Paint System"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md rounded-xl"
                  />
                </div>

                {/* Product Badge & Title */}
                <div className="space-y-2 mb-4">
                  <span className="inline-block text-xs font-bold font-roboto text-cardip-red bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider">
                    PEELABLE PAINT SYSTEM
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-cardip-dark font-cardip">
                    CARDIP® Peelable PPS
                  </h3>
                </div>

                {/* Body Explanation */}
                <p className="text-base text-gray-700 leading-relaxed font-sans mb-6">
                  칼을 대지 않는 100% 무절개 분사 방식으로 복잡한 곡면과 파츠까지 완벽한 일체형 마감을 구현하며, 원도장 손상 없이 언제든 제거할 수 있는 혁신적인 도장 보호 시스템입니다.
                </p>
              </div>

              {/* Key Specs */}
              <div className="space-y-2.5 pt-5 border-t border-gray-100 bg-gray-50/70 rounded-xl p-4 text-sm text-gray-800">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-red text-base" />
                  <span className="font-medium">칼 없이 완성하는 100% 무절개 분사 시공</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-red text-base" />
                  <span className="font-medium">독일 본사 엄격한 품질 기준 정품 도료 공급</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-red text-base" />
                  <span className="font-medium">원도장 손상 없이 깔끔하게 벗겨지는 원상복구</span>
                </div>
              </div>
            </motion.div>

            {/* Column 2: Aqua+ PPS Pro Clear 5050 (PPS Base & Clear) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 sm:p-9 border-2 border-gray-200 hover:border-cardip-red/50 transition-all shadow-md flex flex-col justify-between group"
            >
              <div>
                {/* Large Product Can Showcase */}
                <div className="w-full h-64 sm:h-72 bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl p-6 flex items-center justify-center mb-6 overflow-hidden border border-gray-100 group-hover:bg-red-50/30 transition-colors">
                  <img
                    src="/images/cardip/image10.png"
                    alt="CARDIP Aqua+ PPS Pro Clear 5050"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                  />
                </div>

                {/* Product Badge & Title */}
                <div className="space-y-2 mb-4">
                  <span className="inline-block text-xs font-bold font-roboto text-cardip-red bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider">
                    PPS BASE & CLEAR MATERIAL
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-cardip-dark font-roboto">
                    Aqua+ PPS Pro Clear 5050
                  </h3>
                </div>

                {/* Product Description */}
                <p className="text-base text-gray-700 leading-relaxed font-sans mb-6">
                  <strong className="text-cardip-dark">250µm+의 압도적인 도막 두께</strong>와 탁월한 스톤칩 저항성을 갖춘 친환경 수성 베이스 도료로, 오렌지필 없이 투명하고 매끄러운 고광택 마감을 완성합니다.
                </p>
              </div>

              {/* Key Specs */}
              <div className="space-y-2.5 pt-5 border-t border-gray-100 bg-gray-50/70 rounded-xl p-4 text-sm text-gray-800">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-red text-base" />
                  <span className="font-medium">250µm+ 고강도 Peelable Paint 보호막 형성</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-red text-base" />
                  <span className="font-medium">유해물질 없는 차세대 친환경 수성 포뮬러</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-red text-base" />
                  <span className="font-medium">도장면 잔여물 없이 깔끔하게 벗겨지는 원상복구</span>
                </div>
              </div>
            </motion.div>

            {/* Column 3: Reflow+ ClearCoat 9080 (Self-Healing Clear) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 sm:p-9 border-2 border-gray-200 hover:border-cardip-dark/50 transition-all shadow-md flex flex-col justify-between group"
            >
              <div>
                {/* Large Product Can Showcase */}
                <div className="w-full h-64 sm:h-72 bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl p-6 flex items-center justify-center mb-6 overflow-hidden border border-gray-100 group-hover:bg-slate-100/50 transition-colors">
                  <img
                    src="/images/cardip/image11.png"
                    alt="CARDIP Reflow+ ClearCoat 9080"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                  />
                </div>

                {/* Product Badge & Title */}
                <div className="space-y-2 mb-4">
                  <span className="inline-block text-xs font-bold font-roboto text-cardip-dark bg-slate-100 border border-slate-300 px-3 py-1 rounded-full uppercase tracking-wider">
                    SELF-HEALING CLEARCOAT
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-cardip-dark font-roboto">
                    Reflow+ ClearCoat 9080
                  </h3>
                </div>

                {/* Product Description */}
                <p className="text-base text-gray-700 leading-relaxed font-sans mb-6">
                  미세 스크래치가 상온 및 열에 의해 자연 치유되는 <strong className="text-cardip-dark">Self-Healing(자가복원)</strong> 기술과 자외선 차단 무황변 특성을 갖춘 쇼카 수준의 프리미엄 탑코트입니다.
                </p>
              </div>

              {/* Key Specs */}
              <div className="space-y-2.5 pt-5 border-t border-gray-100 bg-gray-50/70 rounded-xl p-4 text-sm text-gray-800">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-dark text-base" />
                  <span className="font-medium">미세 스크래치 셀프 힐링(자가복원) 기술</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-dark text-base" />
                  <span className="font-medium">최고급 도장 수준의 깊은 하이글로시 광택</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-dark text-base" />
                  <span className="font-medium">DIN ISO 기준 자외선 차단 및 평생 무황변</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Option 2: Inline Expandable Technical Brochure Trigger */}
          <div className="flex flex-col items-center justify-center mb-16">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsBrochureExpanded(!isBrochureExpanded)}
              className={`inline-flex items-center gap-3.5 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-bold transition-all shadow-md text-base sm:text-lg cursor-pointer ${
                isBrochureExpanded
                  ? 'bg-cardip-dark text-white shadow-xl ring-2 ring-cardip-red/60'
                  : 'bg-white hover:bg-red-50/40 text-cardip-dark border-2 border-gray-300 hover:border-cardip-red/50 hover:shadow-xl'
              }`}
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-cardip-red text-white text-xs font-black shadow-sm">
                🇩🇪
              </span>
              <span>
                독일 본사 공식 브로셔 & 상세 기술 스펙 {isBrochureExpanded ? '간략히 접기' : '전체 펼쳐보기'}
              </span>
              <i
                className={`ri-arrow-${isBrochureExpanded ? 'up' : 'down'}-s-line text-2xl text-cardip-red transition-transform duration-300`}
              />
            </motion.button>
            <p className="text-xs sm:text-sm text-gray-500 mt-2.5">
              {isBrochureExpanded
                ? '독일 Colosol Coatings GmbH 본사 공식 규격 및 한국어 상세 번역을 확인 중입니다.'
                : '클릭 시 독일 본사 공식 브로셔 원본과 21개 세부 기술 사양(Bento Grid)이 펼쳐집니다.'}
            </p>
          </div>

          {/* Option 2: Inline Expandable Section */}
          <AnimatePresence>
            {isBrochureExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="overflow-hidden mb-20"
              >
                <div className="bg-gradient-to-b from-gray-900 via-[#0F1C25] to-black text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-gray-800 shadow-2xl relative">
                  {/* Top Bar: Official License Badge & Tab Switcher */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 mb-10 border-b border-gray-800">
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="px-3 py-1 bg-red-950/80 text-cardip-red border border-red-500/40 rounded-full text-xs font-bold font-roboto uppercase tracking-wider">
                          Official Headquarters Technical Data
                        </span>
                        <span className="text-xs text-gray-400">DIN ISO 20567-1 Tested</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                        독일 본사 공식 기술 사양서 <span className="text-cardip-red font-cardip font-black">CARDIP® Ecosystem</span>
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        독일 Colosol Coatings GmbH 본사 발간 공식 브로셔 기반 한국어 공식 기술 번역
                      </p>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex items-center bg-black/50 p-1.5 rounded-2xl border border-gray-700/70 w-full md:w-auto">
                      <button
                        onClick={() => setBrochureTab('product')}
                        className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          brochureTab === 'product'
                            ? 'bg-cardip-red text-white shadow-lg'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <i className="ri-flask-line" />
                        <span>01. THE PRODUCT (원액 도료 사양)</span>
                      </button>
                      <button
                        onClick={() => setBrochureTab('film')}
                        className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          brochureTab === 'film'
                            ? 'bg-cardip-red text-white shadow-lg'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <i className="ri-shield-star-line" />
                        <span>02. THE FILM (보호 피막 성능)</span>
                      </button>
                    </div>
                  </div>

                  {/* Tab 1: THE PRODUCT */}
                  {brochureTab === 'product' && (
                    <motion.div
                      key="tab-product"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
                    >
                      {/* Left: Official Brochure Page 1 */}
                      <div className="lg:col-span-5 flex flex-col gap-4">
                        <div
                          onClick={() => setSelectedImageModal('/images/cardip/brochure_page_1.png')}
                          className="group relative rounded-2xl overflow-hidden border-2 border-gray-700/80 bg-black/60 shadow-xl cursor-pointer hover:border-cardip-red transition-all"
                        >
                          <img
                            src="/images/cardip/brochure_page_1.png"
                            alt="CARDIP The Product Official Brochure"
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg backdrop-blur-sm">
                              <i className="ri-zoom-in-line text-cardip-red text-base" />
                              <span>클릭하여 고화질 원본 크게 보기</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-xs text-gray-300 space-y-1.5">
                          <div className="flex items-center justify-between text-gray-400">
                            <span>제조사 / 본사</span>
                            <span className="text-white font-medium font-roboto">Colosol Coatings GmbH (Germany)</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-400">
                            <span>본사 소재지</span>
                            <span className="text-white font-medium font-roboto">Buchäckerring 36, 74906 Bad Rappenau</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-400">
                            <span>한국 공식 디스트리뷰터</span>
                            <span className="text-cardip-red font-bold">코션스마트센터 (Caution Smart Center)</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: 8 Technical Bento Items Korean Translation */}
                      <div className="lg:col-span-7 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-bold text-white flex items-center gap-2">
                            <i className="ri-checkbox-circle-line text-cardip-red" />
                            <span>Aqua+ PPS Clear 5050 핵심 원액 스펙</span>
                          </h4>
                          <span className="text-xs text-cardip-red font-mono font-bold bg-red-950/60 px-2.5 py-1 rounded-md border border-red-800/40">
                            100% Water-Based
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {productBentoItems.map((item, idx) => (
                            <div
                              key={idx}
                              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cardip-red/40 rounded-2xl p-4 sm:p-5 transition-all flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex items-center justify-between mb-2.5">
                                  <span className="text-[11px] font-bold font-roboto text-cardip-red bg-red-950/80 px-2.5 py-0.5 rounded-full border border-red-800/40 uppercase">
                                    {item.badge}
                                  </span>
                                  <i className={`${item.icon} text-gray-400 text-lg`} />
                                </div>
                                <h5 className="text-base font-bold text-white mb-1.5">{item.title}</h5>
                                <p className="text-xs text-gray-300 leading-relaxed font-sans">{item.desc}</p>
                              </div>
                              <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-medium text-red-300">
                                <i className="ri-check-line text-cardip-red" />
                                <span>{item.highlight}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Tab 2: THE FILM */}
                  {brochureTab === 'film' && (
                    <motion.div
                      key="tab-film"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
                    >
                      {/* Left: Official Brochure Page 2 */}
                      <div className="lg:col-span-5 flex flex-col gap-4">
                        <div
                          onClick={() => setSelectedImageModal('/images/cardip/brochure_page_2.png')}
                          className="group relative rounded-2xl overflow-hidden border-2 border-gray-700/80 bg-black/60 shadow-xl cursor-pointer hover:border-cardip-red transition-all"
                        >
                          <img
                            src="/images/cardip/brochure_page_2.png"
                            alt="CARDIP The Film Official Brochure"
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg backdrop-blur-sm">
                              <i className="ri-zoom-in-line text-cardip-red text-base" />
                              <span>클릭하여 고화질 원본 크게 보기</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-xs text-gray-300 space-y-1.5">
                          <div className="flex items-center justify-between text-gray-400">
                            <span>도막 두께 검증</span>
                            <span className="text-white font-medium font-roboto">250µm ~ 428µm 실측</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-400">
                            <span>스톤칩 공인 규격</span>
                            <span className="text-white font-medium font-roboto">DIN ISO 20567-1 시험 합격</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-400">
                            <span>품질 보증 항목</span>
                            <span className="text-cardip-red font-bold">평생 손상 없이 깨끗하게 벗겨지는 보증 & 평생 무황변</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: 12 Film Performance Items Korean Translation */}
                      <div className="lg:col-span-7 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-bold text-white flex items-center gap-2">
                            <i className="ri-shield-check-line text-cardip-red" />
                            <span>12대 고성능 보호 피막 기술 & 품질 보증</span>
                          </h4>
                          <span className="text-xs text-cardip-red font-mono font-bold bg-red-950/60 px-2.5 py-1 rounded-md border border-red-800/40">
                            250µm+ Ultra Protection
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {filmBentoItems.map((item, idx) => (
                            <div
                              key={idx}
                              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cardip-red/40 rounded-2xl p-4 sm:p-5 transition-all flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex items-center justify-between mb-2.5">
                                  <span className="text-[11px] font-bold font-roboto text-cardip-red bg-red-950/80 px-2.5 py-0.5 rounded-full border border-red-800/40 uppercase">
                                    {item.badge}
                                  </span>
                                  <i className={`${item.icon} text-gray-400 text-lg`} />
                                </div>
                                <h5 className="text-base font-bold text-white mb-1.5">{item.title}</h5>
                                <p className="text-xs text-gray-300 leading-relaxed font-sans">{item.desc}</p>
                              </div>
                              <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-medium text-red-300">
                                <i className="ri-check-line text-cardip-red" />
                                <span>{item.highlight}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Bottom Action Footer */}
                  <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
                      * Performance based on full CARDIP ecosystem. Guarantees are subject to official guarantee terms & conditions. DIN ISO 20567-1 tested.
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onNavigateToContact?.('PPS')}
                        className="px-6 py-3 bg-cardip-red hover:bg-red-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                      >
                        <i className="ri-customer-service-2-line" />
                        <span><span className="font-cardip font-bold">CARDIP®</span> 공식 시공 상담하기</span>
                      </button>
                      <button
                        onClick={() => setIsBrochureExpanded(false)}
                        className="px-4 py-3 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white text-xs sm:text-sm font-medium rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <i className="ri-arrow-up-s-line" />
                        <span>접기</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 4 Key Pillars of CARDIP Technology (White Theme High-Contrast Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm hover:border-cardip-red/40 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-cardip-red text-2xl font-black font-roboto mb-4">
                01
              </div>
              <h3 className="text-lg font-bold text-cardip-dark mb-2 font-roboto">Made in Germany</h3>
              <p className="text-base text-gray-600 leading-relaxed font-sans">
                독일 Colosol Coatings GmbH 본사에서 직접 연구·생산되는 최고 규격 정품 도료로, 독일 본사의 품질 기준에 따라 공급됩니다.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm hover:border-cardip-dark/40 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center text-cardip-dark text-2xl font-black font-roboto mb-4">
                02
              </div>
              <h3 className="text-lg font-bold text-cardip-dark mb-2">칼 없이 완성하는 Seamless 시공</h3>
              <p className="text-base text-gray-600 leading-relaxed font-sans">
                차량 표면에 칼을 대지 않는 정밀 분사 도포 방식으로, 복잡한 곡면과 틈새까지 이음새 없이 자연스럽고 완벽하게 마감됩니다.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm hover:border-cardip-red/40 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-cardip-red text-2xl font-black font-roboto mb-4">
                03
              </div>
              <h3 className="text-lg font-bold text-cardip-dark mb-2">무접착 방식으로 깔끔하게 벗겨지는 시스템</h3>
              <p className="text-base text-gray-600 leading-relaxed font-sans">
                접착제 없이 도료가 자체 형성되어 도포되며, 필요 시 원도장면 손상이나 잔여물 없이 깔끔하게 제거할 수 있어 원형을 안전하게 보존합니다.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm hover:border-cardip-dark/40 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center text-cardip-dark text-2xl font-black font-roboto mb-4">
                04
              </div>
              <h3 className="text-lg font-bold text-cardip-dark mb-2 font-roboto">DIN ISO 스톤칩 & 무황변</h3>
              <p className="text-base text-gray-600 leading-relaxed font-sans">
                DIN ISO 20567-1 고속 충격 시험을 통과한 강력한 스톤칩 저항성과 Non-Yellowing 무황변 특성으로 오랜 시간 투명도와 보호 성능을 유지합니다.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Technology Section */}
      <section id="technology" className="py-24 lg:py-32 bg-gray-50">
        <div className="mx-auto px-6 lg:px-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-primary rounded-full mb-4">
              <span className="text-xs font-semibold text-white tracking-wider">TECHNOLOGY</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight">
              첨단 기술력 <span className="text-primary font-roboto">CurveRobot</span>
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              AI 로봇 기술과 전문 노하우의 완벽한 조화
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-black border border-gray-200">
              <div className="w-full h-[450px] sm:h-[550px] lg:h-[620px]">
                <img
                  src="/images/curverobot_urus_booth.jpg"
                  alt="도장 부스 내 CurveRobot 지능형 로봇팔의 람보르기니 우루스 정밀 도장"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techFeatures.map((feat, idx) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                  <i className={`${feat.icon} text-primary text-2xl`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feat.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Core Values Section */}
      <section id="core-values" className="py-24 lg:py-32 bg-white">
        <div className="mx-auto px-6 lg:px-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-gray-100 rounded-full mb-4">
              <span className="text-xs font-semibold text-gray-900 tracking-wider">OUR VALUES</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight">
              핵심 가치
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              CAUTION SMART CENTER를 만드는 네 가지 핵심 가치
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreValues.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 lg:p-10 border border-gray-200 hover:border-primary/30 transition-all hover:shadow-xl">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-6">
                    <i className={`${val.icon} text-primary text-3xl`} />
                  </div>
                  <div className="flex items-baseline gap-3 mb-3">
                    <h3 className="text-2xl font-black text-gray-900">{val.title}</h3>
                    <span className="text-sm font-semibold text-primary">{val.subtitle}</span>
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed">{val.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox / Zoom Modal for German Brochure */}
      <AnimatePresence>
        {selectedImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageModal(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[92vh] bg-gray-900 rounded-3xl overflow-hidden border border-gray-700 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-black/60">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cardip-red animate-pulse" />
                  <span className="text-sm font-bold text-white font-roboto">
                    독일 CARDIP® 본사 공식 기술 브로셔 고화질 원본
                  </span>
                </div>
                <button
                  onClick={() => setSelectedImageModal(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl" />
                </button>
              </div>
              <div className="overflow-auto p-4 sm:p-6 flex items-center justify-center max-h-[82vh]">
                <img
                  src={selectedImageModal}
                  alt="Official Brochure High-Res"
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
