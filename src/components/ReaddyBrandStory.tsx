import React from 'react';
import { motion } from 'framer-motion';

interface ReaddyBrandStoryProps {
  onNavigateToContact?: (serviceName?: string) => void;
}

export const ReaddyBrandStory: React.FC<ReaddyBrandStoryProps> = ({ onNavigateToContact }) => {
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

          {/* CARDIP Official Hero Showcase: The original Peelable Paint & PPS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-gray-200 shadow-md mb-10 overflow-hidden group hover:border-cardip-red/40 transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex items-center justify-center bg-gray-50 rounded-2xl p-4 sm:p-6 overflow-hidden border border-gray-100">
                <img
                  src="/images/cardip/cardip_peelable_hero.png"
                  alt="The original Peelable Paint & PPS - CARDIP"
                  className="w-full h-auto max-h-80 object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="lg:col-span-5 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-50 border border-red-200 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-cardip-red animate-pulse" />
                  <span className="text-xs font-bold font-roboto text-cardip-red tracking-wider uppercase">
                    The Original Peelable Paint & PPS
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                  독일 정품 <span className="text-cardip-red font-cardip font-black">CARDIP®</span> PPS
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
                  독일 Colosol Coatings GmbH 본사의 <strong className="text-gray-900 font-cardip">CARDIP® Aqua+ PPS</strong>는 차체에 칼을 대지 않는 100% 무절개 스프레이 분사 방식으로 원도장을 안전하게 보호하며, 필요 시 언제든 흔적 없이 깔끔하게 벗겨낼 수 있는(Peelable) 세계적인 정품 액상 보호 도막 시스템입니다.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold text-gray-700">
                  <span className="px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-200">100% Made in Germany</span>
                  <span className="px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-200">Easy-Peel-Polymer™ 특허</span>
                  <span className="px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-200">친환경 수성 포뮬러</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3-Column Core Features: 250µm+ Thickness, 50 Series Product, Peelable Protection */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Column 1: 250µm+ 도막 두께 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 sm:p-9 border-2 border-gray-200 hover:border-cardip-red/50 transition-all shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="w-full h-64 sm:h-72 bg-black rounded-2xl p-2 flex items-center justify-center mb-6 overflow-hidden border border-gray-800">
                  <img
                    src="/images/cardip/cardip_thickness_gauge.png"
                    alt="250µm+ Total film thickness"
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="space-y-2 mb-4">
                  <span className="inline-block text-xs font-bold font-roboto text-cardip-red bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider">
                    250µm+ TOTAL FILM THICKNESS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-cardip-dark font-roboto">
                    250µm+ 압도적 도막 두께
                  </h3>
                </div>

                <p className="text-base text-gray-700 leading-relaxed font-sans mb-6">
                  일반 보호필름(150µm)을 압도하는 <strong className="text-cardip-dark">250µm 이상(실측 최대 428µm)</strong>의 초후도 탄성 피막을 형성하여, 고속 주행 스톤칩과 가혹한 도로 환경으로부터 차량 원도장을 빈틈없이 강력하게 보호합니다.
                </p>
              </div>

              <div className="space-y-2.5 pt-5 border-t border-gray-100 bg-gray-50/70 rounded-xl p-4 text-sm text-gray-800">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-red text-base" />
                  <span className="font-medium">실측 최대 428µm 고강도 탄성 보호막 형성</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-red text-base" />
                  <span className="font-medium">독일 공인 DIN ISO 20567-1 스톤칩 저항 인증</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-red text-base" />
                  <span className="font-medium">복잡한 3D 굴곡과 에어로파츠까지 균일 도포</span>
                </div>
              </div>
            </motion.div>

            {/* Column 2: 50 Series Aqua+ PPS Pro Clear 5050 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 sm:p-9 border-2 border-gray-200 hover:border-cardip-red/50 transition-all shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="w-full h-64 sm:h-72 bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl p-4 flex items-center justify-center mb-6 overflow-hidden border border-gray-100 group-hover:bg-red-50/20 transition-colors">
                  <img
                    src="/images/cardip/cardip_50series_product.png"
                    alt="CARDIP 50 Series Aqua+ PPS Pro Clear 5050"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                  />
                </div>

                <div className="space-y-2 mb-4">
                  <span className="inline-block text-xs font-bold font-roboto text-cardip-red bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider">
                    AQUA+ PPS PRO CLEAR 5050
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-cardip-dark font-roboto">
                    독일 정품 50시리즈 원료
                  </h3>
                </div>

                <p className="text-base text-gray-700 leading-relaxed font-sans mb-6">
                  독일 본사의 특허 원료로 현장 인위적 희석 없이 <strong className="text-cardip-dark">100% 규격 원액 그대로 다이렉트 분사</strong>되며, 수성 및 유성 등 모든 상도 도료 및 프리미엄 클리어코트와 완벽히 결합합니다.
                </p>
              </div>

              <div className="space-y-2.5 pt-5 border-t border-gray-100 bg-gray-50/70 rounded-xl p-4 text-sm text-gray-800">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-red text-base" />
                  <span className="font-medium">100% 독일 Colosol 본사 직수입 정품 원액</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-red text-base" />
                  <span className="font-medium">유해물질(VOCs) 없는 친환경 수성 시스템</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-red text-base" />
                  <span className="font-medium">오렌지필 제로 세계 최고 수준 표면 평활도</span>
                </div>
              </div>
            </motion.div>

            {/* Column 3: Peelable Paint 보호막 형성 & 무손상 박리 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 sm:p-9 border-2 border-gray-200 hover:border-cardip-red/50 transition-all shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="w-full h-64 sm:h-72 bg-black rounded-2xl p-2 flex items-center justify-center mb-6 overflow-hidden border border-gray-800">
                  <img
                    src="/images/cardip/cardip_peelable_hand.png"
                    alt="Perfect Adhesion & Peelability - Lifetime guarantee"
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="space-y-2 mb-4">
                  <span className="inline-block text-xs font-bold font-roboto text-cardip-red bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider">
                    PEELABLE PAINT SYSTEM
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-cardip-dark font-roboto">
                    Peelable 무손상 박리 보호막
                  </h3>
                </div>

                <p className="text-base text-gray-700 leading-relaxed font-sans mb-6">
                  특허받은 <strong className="text-cardip-dark">Easy-Peel-Polymer™</strong> 기술로 화학 본드 접착제 없이도 완벽히 밀착되며, 필요 시 칼자국이나 본드 잔여물, 도장 손상 없이 언제든 신차 출고 상태 그대로 깨끗하게 벗겨집니다.
                </p>
              </div>

              <div className="space-y-2.5 pt-5 border-t border-gray-100 bg-gray-50/70 rounded-xl p-4 text-sm text-gray-800">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-red text-base" />
                  <span className="font-medium">화학 본드 잔여물 0% 무접착 밀착 시스템</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-red text-base" />
                  <span className="font-medium">칼을 쓰지 않는 100% 무스크래치 무절개 시공</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-red text-base" />
                  <span className="font-medium">원도장 손상 없이 신차 본래 모습으로 완벽 복구</span>
                </div>
              </div>
            </motion.div>
          </div>

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

          {onNavigateToContact && (
            <div className="mt-14 text-center">
              <button
                onClick={() => onNavigateToContact('CARDIP')}
                className="px-8 py-4 bg-cardip-red hover:bg-red-700 text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2.5 text-base cursor-pointer"
              >
                <i className="ri-customer-service-2-line text-lg" />
                <span><span className="font-cardip font-bold">CARDIP®</span> 공식 시공 상담 신청하기</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
