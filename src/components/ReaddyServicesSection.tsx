import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Wrench, Paintbrush, Car, CheckCircle2 } from 'lucide-react';

interface ReaddyServicesSectionProps {
  onSelectServiceDetail?: (serviceId: string) => void;
}

export const ReaddyServicesSection: React.FC<ReaddyServicesSectionProps> = ({ onSelectServiceDetail }) => {
  // 1. 플래그십 CARDIP® PPS 하이라이트 (상단 2개 대형 와이드 카드)
  const flagshipServices = [
    {
      id: 'pps-clear',
      title: '투명 PPS',
      engTitle: 'CARDIP® Spray PPF',
      tagline: '뿌리는 차세대 무절개 스프레이 PPF · 틈새 없는 완전 밀착 보호',
      description: '차체에 칼을 일절 대지 않는 액상 분사 도포 방식으로 시공되어 복잡한 곡면과 에어로 파츠까지 100% 빈틈없이 감싸줍니다. 250µm+ 고강도 도막으로 스톤칩을 원천 차단하며, 필요 시 언제든 잔여물 없이 도장면 손상 0%로 완벽하게 박리됩니다.',
      image: '/images/readdy/service-detail-ai-001.jpg',
      badge: 'CARDIP® PPS',
      tags: ['250µm+ 고강도 도막', '자가 스크래치 복원', '칼 없는 무절개 도포', '무황변 10년 보증'],
      highlightBg: 'hover:border-primary/40'
    },
    {
      id: 'pps-color',
      title: '컬러 PPS',
      engTitle: 'CARDIP® Peelable Color',
      tagline: '원도장 손상 없는 혁신적인 컬러 체인지 & 페인트 프로텍션',
      description: '순정 출고 도색과 구별할 수 없는 초고광택 색감을 완성하면서도, 기존 순정 도장면을 샌딩 없이 100% 안전하게 보존합니다. 언제든 스티커처럼 깔끔하게 뜯어내어 본래 순정 도장으로 되돌릴 수 있는 차세대 Peelable Paint 시스템입니다.',
      image: '/images/readdy/brand-tech-main-001.jpg',
      badge: 'CARDIP® COLOR',
      tags: ['원색 100% 안전 보존', '오렌지필 없는 광택', '자유로운 커스텀 조색', '언제든 완벽 박리'],
      highlightBg: 'hover:border-primary/40'
    }
  ];

  // 2. 토탈 메인터넌스 & 케어 (하단 3열 균형 와이드 카드)
  const maintenanceServices = [
    {
      id: 'repair',
      icon: Wrench,
      title: '수입차 전문 정비',
      engTitle: 'Import Car Maintenance',
      description: '포르쉐·벤츠·BMW·아우디 등 브랜드별 공식 전용 진단 스캐너와 숙련된 전문 기술진의 정밀 정비로 최상의 차량 컨디션을 유지합니다.',
      image: '/images/readdy/service-repair-001.jpg',
      tags: ['전용 진단 스캐너', '엔진/미션 정밀 정비', '정기 소모품 관리']
    },
    {
      id: 'paint',
      icon: Paintbrush,
      title: '1급 하이테크 판금도색',
      engTitle: 'Body & Paint Restoration',
      description: '독일 친환경 수용성 도료와 첨단 3D 색상 분석 시스템으로 신차 출고 당시의 색상과 광택을 오차 없이 100% 정밀 복원합니다.',
      image: '/images/readdy/service-paint-001.jpg',
      tags: ['1급 하이테크 공업사', '독일 수용성 도료', '99.9% 색상 매칭']
    },
    {
      id: 'detailing',
      icon: Sparkles,
      title: '프리미엄 디테일링',
      engTitle: 'Master Detailing & Coating',
      description: '마이크로 스크래치를 정밀하게 복원하는 수제 광택과 고경도 세라믹 유리막 코팅, 최고급 천연 가죽 케어로 깊은 광택을 선사합니다.',
      image: '/images/readdy/service-detail-001.jpg',
      tags: ['수제 정밀 듀얼 광택', '초발수 유리막 코팅', '프리미엄 실내 케어']
    }
  ];

  const handleCardClick = (id: string) => {
    if (onSelectServiceDetail) {
      onSelectServiceDetail(id);
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F8FAFC] text-dark relative border-t border-gray-200">
      <div className="mx-auto px-6 lg:px-12 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-block px-4 py-1.5 bg-primary text-white rounded-full mb-3.5 shadow-sm">
            <span className="text-xs font-bold tracking-wider">OUR SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
            프리미엄 토탈 케어
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-keep">
            수입차 전문 정비부터 독일 <span className="font-cardip font-bold text-black">CARDIP®</span> 최첨단 보호까지,<br className="hidden sm:inline" />
            코션스마트센터가 자부하는 5대 프리미엄 마스터 솔루션
          </p>
        </motion.div>

        {/* ── 1. 플래그십 CARDIP® PPS 테크놀로지 (상단 2개 대형 와이드 카드) ── */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-2 mb-4 px-1">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs font-black tracking-wider text-gray-800 uppercase">
              독일 정품 CARDIP® PPS 테크놀로지 (Flagship Solutions)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-8">
            {flagshipServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleCardClick(service.id)}
                className={`group cursor-pointer rounded-3xl bg-white border border-gray-200/90 shadow-sm hover:shadow-2xl ${service.highlightBg} transition-all duration-300 overflow-hidden flex flex-col`}
              >
                {/* 16:9 와이드 시네마틱 이미지 */}
                <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-gray-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Left Top Badge: Flagship */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-[11px] font-bold rounded-full shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>FLAGSHIP TECH</span>
                  </div>

                  {/* Right Top Badge: CARDIP Official */}
                  <div className="absolute top-4 right-4 px-3.5 py-1.5 bg-black/85 backdrop-blur-md text-white text-xs font-cardip font-bold rounded-full border border-white/20 shadow-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{service.badge}</span>
                  </div>

                  {/* Bottom Image Overlay Tagline */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs sm:text-sm font-medium text-gray-200 block drop-shadow">
                      {service.engTitle}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-primary transition-colors flex items-center justify-between">
                      <span>{service.title}</span>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full">
                        자세히 보기
                      </span>
                    </h3>

                    <p className="text-xs sm:text-sm font-bold text-gray-800 mt-2">
                      {service.tagline}
                    </p>

                    <p className="text-sm text-gray-600 leading-relaxed mt-3 break-keep">
                      {service.description}
                    </p>

                    {/* Key Feature Tags */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      {service.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-100/90 text-gray-700 text-xs font-medium"
                        >
                          <CheckCircle2 className="w-3 h-3 text-primary" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {service.title} 시공 프로세스 및 견적 보기
                    </span>
                    <div className="w-9 h-9 rounded-full bg-gray-100 group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center shrink-0 shadow-sm">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 2. 토탈 메인터넌스 & 케어 (하단 3열 균형 와이드 카드) ── */}
        <div>
          <div className="flex items-center gap-2 mb-4 px-1">
            <Car className="w-4 h-4 text-primary" />
            <span className="text-xs font-black tracking-wider text-gray-800 uppercase">
              수입차 전문 메인터넌스 & 케어 (Total Care Solutions)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {maintenanceServices.map((service, index) => {
              const IconComp = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  onClick={() => handleCardClick(service.id)}
                  className="group cursor-pointer rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* 16:10 와이드 이미지 */}
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-gray-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-xl bg-white/95 backdrop-blur text-black flex items-center justify-center shadow-md">
                      <IconComp className="w-4 h-4 text-primary" />
                    </div>
                  </div>

                  {/* Content Box */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <span className="text-[11px] text-gray-400 font-semibold block mt-0.5">
                        {service.engTitle}
                      </span>

                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-3 break-keep">
                        {service.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {service.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-gray-50 border border-gray-200/80 text-gray-600 text-[11px] font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="pt-4 mt-5 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-700 group-hover:text-primary transition-colors">
                      <span>서비스 상세 안내</span>
                      <div className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
