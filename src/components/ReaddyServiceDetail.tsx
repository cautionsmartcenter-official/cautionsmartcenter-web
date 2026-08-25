import React from 'react';
import { motion } from 'framer-motion';

export interface ServiceDetailData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  features: string[];
  detailImage: string;
  details: { title: string; desc: string }[];
  process: { step: number; title: string; desc: string }[];
  relatedServices: string[];
}

export const SERVICE_DETAILS_DATA: Record<string, ServiceDetailData> = {
  repair: {
    id: 'repair',
    title: '수입차 정비',
    subtitle: 'Import Car Repair',
    description: '전문 기술진의 정밀한 진단과 정비로 수입차의 최상의 컨디션을 유지합니다. 브랜드별 특화된 정비 노하우와 최신 장비를 통해 완벽한 서비스를 제공합니다.',
    heroImage: '/images/readdy/service-hero-repair.jpg',
    features: [
      '엔진 및 변속기 정비',
      '전자장비 진단 및 수리',
      '브레이크 시스템 점검',
      '정기 점검 및 소모품 교체',
      '에어컨 시스템 정비',
      '서스펜션 및 조향장치 점검'
    ],
    detailImage: '/images/readdy/service-detail-repair-img.jpg',
    details: [
      {
        title: '엔진 정비',
        desc: 'BMW, 벤츠, 아우디, 포르쉐 등 각 브랜드별 특화된 엔진 진단 및 정비 서비스를 제공합니다. 최신 진단 장비로 정확한 문제 파악 후 최적의 정비 솔루션을 제안드립니다.'
      },
      {
        title: '변속기 정비',
        desc: '자동 및 수동 변속기의 모든 문제를 신속하고 정확하게 해결합니다. 미션 오일 교환부터 복잡한 내부 수리까지 전문가의 손길로 완벽하게 처리해드립니다.'
      },
      {
        title: '전자장비 진단',
        desc: '첨단 전자 진단 장비를 활용하여 차량의 모든 전자 시스템을 정밀하게 분석합니다. 경고등 점검부터 복잡한 전자제어 장치까지 완벽하게 대응합니다.'
      }
    ],
    process: [
      { step: 1, title: '예약 접수', desc: '전화 또는 온라인으로 예약을 접수합니다' },
      { step: 2, title: '차량 입고', desc: '예약 시간에 맞춰 차량을 입고합니다' },
      { step: 3, title: '정밀 진단', desc: '최신 장비로 차량 상태를 정밀 진단합니다' },
      { step: 4, title: '정비 작업', desc: '전문 기술진이 정비 작업을 진행합니다' },
      { step: 5, title: '검수 및 인도', desc: '철저한 검수 후 차량을 인도합니다' }
    ],
    relatedServices: ['paint', 'detailing', 'ai-tech']
  },
  paint: {
    id: 'paint',
    title: '판금도색',
    subtitle: 'Body Paint & Repair',
    description: '완벽한 색상 매칭과 정밀한 판금 작업으로 차량을 새것처럼 복원합니다. 첨단 색상 분석 시스템과 숙련된 기술로 원래의 아름다움을 되찾아드립니다.',
    heroImage: '/images/readdy/service-hero-paint.jpg',
    features: [
      '정밀 색상 매칭 시스템',
      '무진동 판금 작업',
      '친환경 도료 사용',
      '완벽한 광택 마감',
      'UV 코팅 보호',
      '풀 보디 도색'
    ],
    detailImage: '/images/readdy/service-detail-paint-img.jpg',
    details: [
      {
        title: '정밀 색상 매칭',
        desc: '첨단 색상 분석기를 사용하여 원래의 색상을 99.9% 정확하게 재현합니다. 모든 브랜드와 색상 코드를 완벽하게 매칭하여 자연스러운 마감을 보장합니다.'
      },
      {
        title: '판금 복원',
        desc: '충격으로 변형된 차체를 원래 상태로 정밀하게 복원합니다. 무진동 판금 기술로 차량의 강도와 외관을 동시에 완벽하게 되살립니다.'
      },
      {
        title: '프리미엄 도색',
        desc: '친환경 고품질 도료를 사용하여 건강하고 아름다운 마감을 제공합니다. 다층 도색 공법으로 깊이 있는 광택과 내구성을 동시에 확보합니다.'
      }
    ],
    process: [
      { step: 1, title: '손상 부위 확인', desc: '차량 손상 부위를 정밀하게 확인합니다' },
      { step: 2, title: '판금 작업', desc: '변형된 부위를 정밀하게 판금 복원합니다' },
      { step: 3, title: '색상 분석', desc: '첨단 장비로 원래 색상을 정밀 분석합니다' },
      { step: 4, title: '도색 작업', desc: '프리미엄 도료로 완벽하게 도색합니다' },
      { step: 5, title: '광택 마감', desc: '광택 작업으로 완벽한 마무리를 합니다' }
    ],
    relatedServices: ['repair', 'detailing', 'ai-tech']
  },
  detailing: {
    id: 'detailing',
    title: '디테일링',
    subtitle: 'Premium Detailing',
    description: '세심한 손길로 차량의 모든 부분을 완벽하게 관리하는 프리미엄 케어 서비스입니다. 외관부터 내부까지 철저한 클리닝과 보호 작업을 진행합니다.',
    heroImage: '/images/readdy/service-hero-detailing.jpg',
    features: [
      '외관 폴리싱 및 코팅',
      '실내 클리닝 및 살균',
      '엔진룸 세척',
      '유리막 코팅',
      '가죽 시트 케어',
      '휠 및 타이어 관리'
    ],
    detailImage: '/images/readdy/service-detail-detailing-img.jpg',
    details: [
      {
        title: '외관 케어',
        desc: '전문 폴리싱 기법으로 스크래치와 스월 마크를 제거하고, 프리미엄 코팅제로 광택과 보호력을 동시에 극대화합니다. 차량의 외관을 최상의 상태로 유지합니다.'
      },
      {
        title: '실내 클리닝',
        desc: '가죽 시트부터 카펫까지 차량 내부를 깊이 있게 클리닝합니다. 살균 처리로 위생적인 실내 환경을 만들어드립니다.'
      },
      {
        title: '유리막 코팅',
        desc: '나노 기술 기반 유리막 코팅으로 차량 표면에 강력한 보호막을 형성합니다. 오염물질과 스크래치로부터 차량을 효과적으로 보호합니다.'
      }
    ],
    process: [
      { step: 1, title: '차량 검수', desc: '차량 상태를 꼼꼼하게 검수합니다' },
      { step: 2, title: '세차 및 클레잉', desc: '철저한 세차와 클레잉으로 오염물을 제거합니다' },
      { step: 3, title: '폴리싱', desc: '전문 기술로 표면을 폴리싱합니다' },
      { step: 4, title: '코팅', desc: '프리미엄 코팅제를 적용합니다' },
      { step: 5, title: '실내 클리닝', desc: '실내를 깊이 있게 클리닝합니다' }
    ],
    relatedServices: ['repair', 'paint', 'ai-tech']
  },
  'ai-tech': {
    id: 'ai-tech',
    title: 'PPS (Paint Protection Spray)',
    subtitle: 'CARDIP Peelable Paint',
    description: 'CARDIP Peelable Paint 카딥의 뿌리는 페인트. AI 로봇 기술로 구현하는 차세대 페인트 보호 시스템으로 완벽한 페인트 보호와 컬러 체인지를 제공합니다.',
    heroImage: '/images/readdy/service-hero-ai.jpg',
    features: [
      'AI 로봇 정밀 분사 시공',
      '균일한 마이크론 코팅 두께',
      '장기 내구성 및 스톤칩 방어',
      '빠른 작업 시간 및 원복 가능',
      '스마트 품질 관리',
      '친환경 프리미엄 도료'
    ],
    detailImage: '/images/readdy/service-detail-ai-img.jpg',
    details: [
      {
        title: 'AI 정밀 시공',
        desc: 'AI 로봇이 차량의 곡면과 각도를 실시간으로 분석하여 인간의 한계를 뛰어넘는 정밀한 코팅을 시행합니다. 균일한 두께와 완벽한 마감을 보장합니다.'
      },
      {
        title: '스마트 품질 관리',
        desc: '작업 중 실시간으로 코팅 상태를 모니터링하고, AI가 최적의 조건을 자동으로 조정합니다. 완벽한 품질을 데이터로 입증합니다.'
      },
      {
        title: '차세대 보호 솔루션 (CARDIP)',
        desc: '기존 PPF 필름의 황변과 본드 고착 단점을 완벽히 극복한 수용성/유성 보호 솔루션입니다. 뛰어난 내구성과 투명도로 차량 본연의 아름다움을 살리면서 언제든 원래 상태로 떼어낼 수 있습니다.'
      }
    ],
    process: [
      { step: 1, title: '차량 스캐닝', desc: 'AI가 차량 표면을 3D 스캐닝합니다' },
      { step: 2, title: '코팅 계획 수립', desc: '데이터 기반 최적의 코팅 계획을 수립합니다' },
      { step: 3, title: 'AI 로봇 시공', desc: 'AI 로봇이 정밀하게 코팅을 시공합니다' },
      { step: 4, title: '실시간 품질 체크', desc: '작업 중 실시간 품질을 검증합니다' },
      { step: 5, title: '최종 검수', desc: '완벽한 품질을 확인 후 인도합니다' }
    ],
    relatedServices: ['repair', 'paint', 'detailing']
  }
};

interface ReaddyServiceDetailProps {
  serviceId: string;
  onSelectService: (serviceId: string) => void;
  onNavigateHome: () => void;
  onNavigateToContact?: (serviceName: string) => void;
}

export const ReaddyServiceDetail: React.FC<ReaddyServiceDetailProps> = ({
  serviceId,
  onSelectService,
  onNavigateHome,
  onNavigateToContact
}) => {
  const service = SERVICE_DETAILS_DATA[serviceId] || SERVICE_DETAILS_DATA.repair;
  const related = service.relatedServices.map((id) => SERVICE_DETAILS_DATA[id]).filter(Boolean);

  return (
    <div className="min-h-screen bg-white text-dark">
      {/* 1. Detail Hero Banner */}
      <section className="relative min-h-[65vh] sm:min-h-[72vh] flex items-center justify-center bg-black overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover object-center opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />
        </div>

        <div className="relative z-10 mx-auto px-6 lg:px-12 max-w-5xl text-center pt-32 sm:pt-40 pb-20 sm:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-5 py-2 bg-primary rounded-full mb-5 sm:mb-6 shadow-md shadow-primary/30">
              <span className="text-xs font-bold text-white tracking-wider">{service.subtitle}</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-5 sm:mb-6 leading-tight tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              {service.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed drop-shadow">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Features Grid */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="mx-auto px-6 lg:px-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-block px-4 py-2 bg-gray-100 rounded-full mb-4">
              <span className="text-xs font-semibold text-dark tracking-wider">FEATURES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-dark mb-4 tracking-tight">
              서비스 특징
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors border border-gray-100"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                  <i className="ri-check-line text-primary text-lg font-bold" />
                </div>
                <h3 className="text-base font-bold text-dark">{feat}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Deep-Dive Details with Large Image */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-3xl overflow-hidden shadow-xl bg-black">
                <div className="w-full h-[400px]">
                  <img
                    src={service.detailImage}
                    alt={`${service.title} 상세`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-black text-dark mb-8 tracking-tight">
                전문적인 {service.title}
              </h2>
              <div className="space-y-6">
                {service.details.map((item, idx) => (
                  <div key={idx} className="border-l-4 border-primary pl-6">
                    <h3 className="text-lg font-bold text-dark mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. 5-Step Process */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="mx-auto px-6 lg:px-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-gray-100 rounded-full mb-4">
              <span className="text-xs font-semibold text-dark tracking-wider">PROCESS</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-dark mb-4 tracking-tight">
              서비스 프로세스
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {service.process.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className="bg-gray-50 rounded-2xl p-6 h-full border border-gray-100">
                  <div className="text-3xl font-black text-primary mb-3 font-mono">
                    {String(step.step).padStart(2, '0')}
                  </div>
                  <h3 className="text-base font-bold text-dark mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Dark CTA Section (Between Process and Related Services) */}
      <section className="py-20 sm:py-28 bg-[#111827] text-white text-center">
        <div className="mx-auto px-6 lg:px-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-5 tracking-tight">
              {service.id === 'detailing'
                ? '지금 디테일링을 경험해보세요'
                : service.id === 'repair'
                ? '지금 수입차 정비를 경험해보세요'
                : service.id === 'paint'
                ? '지금 판금도색을 경험해보세요'
                : '지금 PPS를 경험해보세요'}
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-9 leading-relaxed max-w-2xl mx-auto">
              전문가 상담부터 최고의 서비스까지, CAUTION SMART CENTER가 함께합니다
            </p>
            <button
              onClick={() => {
                if (onNavigateToContact) {
                  const serviceParam =
                    service.id === 'repair'
                      ? '수입차 정비'
                      : service.id === 'paint'
                      ? '판금도색'
                      : service.id === 'detailing'
                      ? '디테일링'
                      : 'PPS (Paint Protection Spray)';
                  onNavigateToContact(serviceParam);
                } else {
                  onNavigateHome();
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }
              }}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-primary hover:bg-primary-dark text-white text-base font-bold rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
            >
              <span>상담 신청하기</span>
              <i className="ri-arrow-right-line text-lg" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 6. Related Services */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="mx-auto px-6 lg:px-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-black text-dark mb-4 tracking-tight">
              관련 서비스
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              CAUTION SMART CENTER의 다른 프리미엄 서비스도 함께 확인해보세요
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  onSelectService(rel.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group border border-gray-100"
              >
                <div className="w-full h-48 overflow-hidden bg-black">
                  <img
                    src={rel.heroImage}
                    alt={rel.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">
                    {rel.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
                    {rel.description}
                  </p>
                  <div className="flex items-center text-primary font-semibold text-sm gap-1 group-hover:gap-2 transition-all">
                    <span>자세히 보기</span>
                    <i className="ri-arrow-right-line" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={onNavigateHome}
              className="px-8 py-4 bg-dark text-white text-sm font-semibold rounded-full hover:bg-dark-light transition-all cursor-pointer shadow-md"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
