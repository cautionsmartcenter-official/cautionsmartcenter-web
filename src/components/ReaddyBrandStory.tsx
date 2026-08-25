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
      <section className="py-24 lg:py-32 bg-white">
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
              첨단 기술력
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
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-black">
              <div className="w-full h-[500px]">
                <img
                  src="/images/readdy/brand-tech-main-001.jpg"
                  alt="AI Technology"
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
      <section className="py-24 lg:py-32 bg-white">
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
