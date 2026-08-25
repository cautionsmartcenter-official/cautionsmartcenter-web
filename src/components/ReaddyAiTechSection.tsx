import React from 'react';
import { motion } from 'framer-motion';

export const ReaddyAiTechSection: React.FC = () => {
  const points = [
    '정밀한 AI 로봇 시공',
    '균일한 코팅 두께',
    '빠른 작업 시간',
    '완벽한 마감 품질'
  ];

  return (
    <section id="ai-tech" className="py-24 lg:py-32 bg-white text-dark">
      <div className="mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image with rounded-[40px] and Floating Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl sm:rounded-[40px] overflow-hidden shadow-2xl bg-black aspect-square max-h-[500px]">
              <img
                src="/images/readdy/ai-tech-main-001.jpg"
                alt="AI Robot Technology"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Readdy Floating Stat Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-5 right-2 sm:-bottom-8 sm:-right-8 bg-dark rounded-2xl p-4 sm:p-6 shadow-2xl border border-gray-800"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-1.5 h-12 sm:h-16 bg-primary rounded-full" />
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-white mb-0.5 sm:mb-1">99.9%</div>
                  <div className="text-xs sm:text-sm text-gray-300 font-medium">정밀도</div>
                  <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">AI 로봇 기술</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 bg-primary rounded-full mb-6 shadow-sm">
              <span className="text-xs font-semibold text-white tracking-wider">AI TECHNOLOGY</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
              AI 로봇이 만드는 <br />
              완벽한 페인트 보호막
            </h2>

            <p className="text-base text-gray-600 leading-relaxed mb-8">
              기존 필름 랩핑을 뛰어넘는 혁신 솔루션, <strong>CARDIP Peelable Paint</strong> (카딥의 뿌리는 페인트). CAUTION의 AI 로봇 기술은 미세한 부분까지 완벽하게 시공하여 차량의 페인트를 완벽히 보호하며, 언제든 신차 본래 도장으로 100% 원복이 가능합니다.
            </p>

            <div className="space-y-4 mb-10">
              {points.map((point, idx) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 shrink-0">
                    <i className="ri-check-line text-primary text-sm font-bold" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{point}</span>
                </motion.div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-dark text-dark text-sm font-semibold rounded-full hover:bg-dark hover:text-white transition-all whitespace-nowrap cursor-pointer group shadow-sm hover:shadow-md"
            >
              <span>기술 상세보기</span>
              <i className="ri-arrow-right-up-line text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
