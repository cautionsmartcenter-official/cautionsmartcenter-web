import React from 'react';
import { motion } from 'framer-motion';

export const ReaddyBrandStory: React.FC = () => {
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
                  특히 AI 로봇 기술을 도입한 PPS (CARDIP Peelable Paint 뿌리는 페인트) 서비스는 기존의 페인트 보호 방식을 혁신적으로 개선했습니다. 정밀한 센서와 알고리즘을 통해 균일하고 완벽한 코팅을 실현하며, 이는 사람의 손으로는 불가능한 수준의 품질을 보장합니다.
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
                독일 <span className="text-cardip-red font-roboto">CARDIP®</span> 한국 공식 디스트리뷰터
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-xl text-gray-700 leading-relaxed font-sans font-normal max-w-3xl mx-auto break-keep"
            >
              코션스마트센터는 독일 Colosol Coatings GmbH의 한국 공식 디스트리뷰터(General Distributor South Korea)입니다.<br className="hidden md:inline" />
              독일에서 연구·생산되는 CARDIP® PPS 제품을 기반으로, 독일 본사의 기술 교육과 기준에 따라 제품 공급 및 전문 시공 서비스를 제공합니다.
            </motion.p>
          </div>

          {/* 3-Column Expanded Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Column 1: CARDIP System Overview & Official Application */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50/80 rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm flex flex-col justify-start hover:shadow-md transition-all"
            >
              {/* CARDIP Official Color Logo */}
              <div className="mb-8 pt-2">
                <img
                  src="/images/cardip/cardip_official_color_logo.svg"
                  alt="CARDIP Official Logo"
                  className="h-12 sm:h-14 lg:h-16 w-auto object-contain drop-shadow-sm"
                />
              </div>

              {/* Body Explanation (Retained exact user requested text) */}
              <div className="space-y-6 text-base sm:text-lg text-gray-800 leading-relaxed font-sans font-normal">
                <p>
                  차량 표면에 도료를 직접 분사 도포하는 방식으로 칼을 대지 않고 복잡한 곡면과 파츠까지 완벽한 일체형 마감을 구현하며, 필요에 따라 도장면 손상 없이 언제든 제거할 수 있는 Peelable Paint 시스템입니다.
                </p>
                <p>
                  코션스마트센터는 독일 본사의 엄격한 기술 기준과 공인 마스터 테크니션의 시공 노하우를 바탕으로, 최고 품질의 정품 도료 공급 및 책임 시공을 제공합니다.
                </p>
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
                  <strong className="text-cardip-dark">250µm+의 압도적인 도막 두께</strong>와 탁월한 스톤칩 저항성을 갖춘 PPS 베이스 도료입니다. 투명하고 매끄러운 고광택 마감을 완성하며, 시공 후 차량 원도장 손상 없이 언제든 완벽하게 박리할 수 있는 친환경 수성 시스템입니다.
                </p>
              </div>

              {/* Key Specs */}
              <div className="space-y-2.5 pt-5 border-t border-gray-100 bg-gray-50/70 rounded-xl p-4 text-sm text-gray-800">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-red text-base" />
                  <span className="font-medium">250µm+ 고강도 Peelable Paint 보호 도막 형성</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-red text-base" />
                  <span className="font-medium">칼 없이 완성하는 100% 무절개 분사 시공</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-cardip-red text-base" />
                  <span className="font-medium">도장면 잔여물 없는 깔끔한 원상복구</span>
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
                  PPS 도막 표면을 완벽히 보호하는 <strong className="text-cardip-dark">Self-Healing(자가복원) 프리미엄 클리어코트</strong> 시스템입니다. 주행 중 발생하는 미세 스크래치가 상온 및 열에 의해 자연 치유되며, 깊고 선명한 쇼카 수준의 광택과 UV 차단 성능을 제공합니다.
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
                  <span className="font-medium">DIN ISO 기준 자외선 차단 및 무황변 특성</span>
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
              <h3 className="text-lg font-bold text-cardip-dark mb-2">무접착 방식의 박리 시스템</h3>
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
    </div>
  );
};
