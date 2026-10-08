import React from 'react';
import { motion } from 'framer-motion';

interface ReaddyServicesSectionProps {
  onSelectServiceDetail?: (serviceId: string) => void;
}

export const ReaddyServicesSection: React.FC<ReaddyServicesSectionProps> = ({ onSelectServiceDetail }) => {
  const services = [
    {
      id: 'repair',
      title: '수입차 정비',
      points: [
        '전용 스캐너 정밀 진단',
        '수입차 전문 메인터넌스',
        '정기 소모품 점검 및 교체'
      ],
      image: '/images/readdy/service-repair-001.jpg',
      bgColor: 'bg-gray-100'
    },
    {
      id: 'paint',
      title: '판금도색',
      points: [
        '1급 하이테크 정밀 복원',
        '독일 친환경 수용성 도료',
        '99.9% 완벽 색상 조색'
      ],
      image: '/images/readdy/service-paint-001.jpg',
      bgColor: 'bg-teal-50'
    },
    {
      id: 'detailing',
      title: '디테일링',
      points: [
        '수제 정밀 듀얼 광택',
        '초발수 세라믹 코팅',
        '최고급 실내 가죽 케어'
      ],
      image: '/images/readdy/service-detail-001.jpg',
      bgColor: 'bg-gray-50'
    },
    {
      id: 'pps-clear',
      title: '투명PPS',
      points: [
        '250µm+ 스톤칩 방어',
        '칼 없는 무절개 스프레이 도포',
        '자가 스크래치 복원'
      ],
      image: '/images/readdy/service-detail-ai-001.jpg',
      bgColor: 'bg-gradient-to-br from-red-50 to-gray-50',
      badge: 'CARDIP® PPS'
    },
    {
      id: 'pps-color',
      title: '컬러PPS',
      points: [
        '원색 100% 안전 보존',
        '도색급 초고광택 컬러 체인지',
        '언제든 흔적 없는 완벽 박리'
      ],
      image: '/images/readdy/brand-tech-main-001.jpg',
      bgColor: 'bg-gradient-to-br from-amber-50 to-gray-50',
      badge: 'CARDIP® PPS'
    }
  ];

  return (
    <section id="services" className="py-24 lg:py-32 bg-gray-50 text-dark relative border-t border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-10 max-w-[1600px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 sm:mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-block px-4 py-1.5 bg-primary rounded-full mb-4 shadow-sm">
            <span className="text-xs font-bold text-white tracking-wider">OUR SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            프리미엄 토탈 케어
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            수입차 전문 정비부터 최첨단 보호까지
          </p>
        </motion.div>

        {/* 5 Cards Row - Increased Size & Concise Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-7">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group cursor-pointer"
              onClick={() => {
                if (onSelectServiceDetail) {
                  onSelectServiceDetail(service.id);
                } else {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-200/90 flex flex-col h-full">
                {/* Bigger Image Box (h-64 sm:h-72) */}
                <div className={`relative ${service.bgColor} overflow-hidden`}>
                  <div className="w-full h-64 sm:h-72">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                    />
                  </div>
                  {service.badge && (
                    <div className="absolute top-4 right-4 px-3.5 py-1.5 bg-cardip-red rounded-full shadow-md">
                      <span className="text-xs font-cardip font-bold text-white tracking-wide">
                        {service.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content - Points List */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    {/* Concise Bullet Points (No long paragraphs) */}
                    <ul className="space-y-2.5 mb-6">
                      {service.points.map((point, pIdx) => (
                        <li
                          key={pIdx}
                          className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-medium"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span className="leading-snug break-keep">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <span className="text-xs font-bold text-gray-500 group-hover:text-primary transition-colors">
                      자세히 보기
                    </span>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-primary text-gray-700 group-hover:text-white transition-all shadow-sm">
                      <i className="ri-arrow-right-line text-base group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
