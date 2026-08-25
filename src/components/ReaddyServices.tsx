import React from 'react';
import { motion } from 'framer-motion';

interface ReaddyServicesProps {
  onSelectServiceDetail?: (serviceId: string) => void;
}

export const ReaddyServices: React.FC<ReaddyServicesProps> = ({ onSelectServiceDetail }) => {
  const serviceList = [
    {
      id: 'repair',
      title: '수입차 정비',
      subtitle: 'Import Car Repair',
      description: '전문 기술진의 정밀한 진단과 정비로 수입차의 최상의 컨디션을 유지합니다. 브랜드별 특화된 정비 노하우와 최신 장비를 통해 완벽한 서비스를 제공합니다.',
      features: [
        '엔진 및 변속기 정비',
        '전자장비 진단 및 수리',
        '브레이크 시스템 점검',
        '정기 점검 및 소모품 교체'
      ],
      image: '/images/readdy/service-detail-repair-001.jpg'
    },
    {
      id: 'paint',
      title: '판금도색',
      subtitle: 'Body Paint & Repair',
      description: '완벽한 색상 매칭과 정밀한 판금 작업으로 차량을 새것처럼 복원합니다. 첨단 색상 분석 시스템과 숙련된 기술로 원래의 아름다움을 되찾아드립니다.',
      features: [
        '정밀 색상 매칭 시스템',
        '무진동 판금 작업',
        '친환경 도료 사용',
        '완벽한 광택 마감'
      ],
      image: '/images/readdy/service-detail-paint-001.jpg'
    },
    {
      id: 'detailing',
      title: '디테일링',
      subtitle: 'Premium Detailing',
      description: '세심한 손길로 차량의 모든 부분을 완벽하게 관리하는 프리미엄 케어 서비스입니다. 외관부터 내부까지 철저한 클리닝과 보호 작업을 진행합니다.',
      features: [
        '외관 폴리싱 및 코팅',
        '실내 클리닝 및 살균',
        '엔진룸 세척',
        '유리막 코팅'
      ],
      image: '/images/readdy/service-detail-detailing-001.jpg'
    },
    {
      id: 'ai-tech',
      title: 'PPS (Paint Protection Spray)',
      subtitle: 'CARDIP Peelable Paint',
      description: 'CARDIP Peelable Paint 카딥의 뿌리는 페인트. AI 로봇 기술과 프리미엄 수용성/유성 보호 도료를 통해 기존 랩핑 필름을 뛰어넘는 완벽한 페인트 보호 및 컬러 체인지를 제공합니다.',
      features: [
        'AI 로봇 정밀 분사 시공',
        '균일한 마이크론 코팅 두께',
        '원래 신차 도장 100% 원복 가능 (Peelable)',
        '초고광택 및 강력한 스톤칩 방어'
      ],
      image: '/images/readdy/service-detail-ai-001.jpg',
      highlight: true
    }
  ];

  const processSteps = [
    { number: '01', title: '상담 및 예약', description: '전화 또는 온라인으로 상담 예약을 진행합니다', icon: 'ri-phone-line' },
    { number: '02', title: '차량 진단', description: '전문가가 차량 상태를 정밀하게 진단합니다', icon: 'ri-search-line' },
    { number: '03', title: '견적 안내', description: '정확한 견적과 작업 일정을 안내드립니다', icon: 'ri-file-list-line' },
    { number: '04', title: '서비스 진행', description: '최고의 기술력으로 완벽한 서비스를 제공합니다', icon: 'ri-tools-line' },
    { number: '05', title: '품질 검수', description: '철저한 품질 검수 후 차량을 인도합니다', icon: 'ri-checkbox-circle-line' }
  ];

  return (
    <div className="bg-white text-dark min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[68vh] flex items-center justify-center bg-black overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="/images/readdy/services-hero-001.jpg"
            alt="Services"
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
              <span className="text-xs font-semibold text-white tracking-wider">OUR SERVICES</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
              프리미엄 서비스
            </h1>
            <p className="text-base lg:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              수입차 전문 정비부터 AI 로봇 기술까지, <br className="hidden sm:block" />
              CAUTION SMART CENTER의 모든 서비스를 만나보세요
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Services Detailed Alternating Rows */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="space-y-32">
            {serviceList.map((srv, idx) => (
              <motion.div
                key={srv.id}
                id={srv.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black">
                    {srv.highlight && (
                      <div className="absolute top-6 right-6 z-10 px-4 py-2 bg-primary rounded-full shadow-lg">
                        <span className="text-xs font-bold text-white">NEW TECH</span>
                      </div>
                    )}
                    <div className="w-full h-[400px]">
                      <img
                        src={srv.image}
                        alt={srv.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="inline-block px-4 py-2 bg-gray-100 rounded-full mb-4">
                    <span className="text-xs font-semibold text-dark tracking-wider">{srv.subtitle}</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black text-dark mb-6 tracking-tight">
                    {srv.title}
                  </h2>
                  <p className="text-base text-gray-600 leading-relaxed mb-8">
                    {srv.description}
                  </p>
                  <div className="space-y-4">
                    {srv.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 shrink-0">
                          <i className="ri-check-line text-primary text-sm font-bold" />
                        </div>
                        <span className="text-sm font-medium text-dark">{feat}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    {onSelectServiceDetail && (
                      <button
                        onClick={() => onSelectServiceDetail(srv.id)}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-all whitespace-nowrap cursor-pointer group shadow-md"
                      >
                        <span>자세히 보기</span>
                        <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-dark text-white text-sm font-semibold rounded-full hover:bg-dark-light transition-all whitespace-nowrap cursor-pointer group shadow-md"
                    >
                      <span>상담 신청하기</span>
                      <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 5-Step Process Section */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="mx-auto px-6 lg:px-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-primary rounded-full mb-4">
              <span className="text-xs font-semibold text-white tracking-wider">PROCESS</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-dark mb-4 tracking-tight">
              서비스 프로세스
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              체계적인 프로세스로 최상의 서비스를 제공합니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, n) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: n * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 h-full">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                    <i className={`${step.icon} text-primary text-2xl`} />
                  </div>
                  <div className="text-4xl font-black text-gray-200 mb-2 font-mono">{step.number}</div>
                  <h3 className="text-lg font-bold text-dark mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>

                {n < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <i className="ri-arrow-right-line text-2xl text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
