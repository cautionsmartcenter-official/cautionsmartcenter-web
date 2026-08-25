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
      description: '전문 기술진의 정밀한 진단과 정비로 수입차의 최상의 컨디션을 유지합니다',
      image: '/images/readdy/service-repair-001.jpg',
      bgColor: 'bg-gray-100'
    },
    {
      id: 'paint',
      title: '판금도색',
      description: '완벽한 색상 매칭과 정밀한 판금 작업으로 차량을 새것처럼 복원합니다',
      image: '/images/readdy/service-paint-001.jpg',
      bgColor: 'bg-teal-50'
    },
    {
      id: 'detailing',
      title: '디테일링',
      description: '세심한 손길로 차량의 모든 부분을 완벽하게 관리하는 프리미엄 케어',
      image: '/images/readdy/service-detail-001.jpg',
      bgColor: 'bg-gray-50'
    },
    {
      id: 'ai-tech',
      title: 'PPS (Paint Protection Spray)',
      description: 'CARDIP Peelable Paint 카딥의 뿌리는 페인트',
      image: '/images/readdy/service-ai-001.jpg',
      bgColor: 'bg-gradient-to-br from-red-50 to-gray-50',
      badge: 'NEW'
    }
  ];

  return (
    <section id="services" className="py-24 lg:py-32 bg-gray-50 text-dark">
      <div className="mx-auto px-6 lg:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-block px-4 py-2 bg-primary rounded-full mb-4 shadow-sm">
            <span className="text-xs font-semibold text-white tracking-wider">OUR SERVICES</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            프리미엄 토탈 케어
          </h2>
          <p className="text-base text-gray-600 max-w-2xl">
            수입차 전문 정비부터 최첨단 보호까지
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => {
                if (onSelectServiceDetail) {
                  onSelectServiceDetail(service.id);
                } else {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                <div className={`relative ${service.bgColor} overflow-hidden`}>
                  <div className="w-full h-56">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {service.badge && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary rounded-full shadow-md">
                      <span className="text-xs font-bold text-white">{service.badge}</span>
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-end pt-2">
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary transition-colors shadow-sm">
                      <i className="ri-arrow-right-line text-primary group-hover:text-white transition-colors text-base" />
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
