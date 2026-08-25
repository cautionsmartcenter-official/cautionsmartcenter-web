import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ReaddyReviewsSection: React.FC = () => {
  const reviews = [
    {
      id: 1,
      rating: 5,
      content: 'AI 로봇 PPS 시공을 받았는데 정말 놀라웠습니다. 기존 랩핑과는 차원이 다른 마감 품질이에요. 균일한 코팅과 완벽한 광택, 그리고 무엇보다 내구성이 뛰어나서 매우 만족스럽습니다. CAUTION의 기술력은 정말 최고입니다.',
      name: '김민수',
      car: 'BMW 5 Series',
      image: '/images/readdy/customer-001.jpg'
    },
    {
      id: 2,
      rating: 5,
      content: '수입차 정비부터 디테일링까지 한 곳에서 모두 해결할 수 있어서 너무 편리합니다. 특히 판금도색 작업이 정말 완벽했어요. 색상 매칭도 정확하고 마감도 깔끔해서 사고 전보다 더 좋아 보입니다. 강력 추천합니다!',
      name: '박지영',
      car: 'Mercedes-Benz E-Class',
      image: '/images/readdy/customer-002.jpg'
    },
    {
      id: 3,
      rating: 5,
      content: 'PPS (CARDIP 뿌리는 페인트) 시공 후 차량이 완전히 새것처럼 변했습니다. AI 로봇 기술이라 시공 시간도 빠르고 품질도 일정해서 믿을 수 있었어요. 직원분들도 친절하고 전문적이어서 안심하고 맡길 수 있었습니다. 다음에도 꼭 이용할게요.',
      name: '이준호',
      car: 'Audi A6',
      image: '/images/readdy/customer-003.jpg'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const current = reviews[currentIndex];

  return (
    <section className="py-24 lg:py-32 bg-gray-50 text-dark">
      <div className="mx-auto px-6 lg:px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            고객님들의 생생한 후기
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl sm:rounded-[30px] p-6 sm:p-10 lg:p-12 shadow-xl border border-gray-100"
            >
              {/* Star Rating Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-dark rounded-full mb-5 sm:mb-6">
                <i className="ri-star-fill text-amber-400 w-4 h-4 flex items-center justify-center text-xs sm:text-sm" />
                <span className="text-xs sm:text-sm font-bold text-white">{current.rating}.0</span>
              </div>

              {/* Quote Content */}
              <div className="mb-8">
                <i className="ri-double-quotes-l text-4xl text-gray-200 mb-4 block" />
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed font-sans font-normal">
                  {current.content}
                </p>
              </div>

              {/* Author & Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 bg-gray-100 shrink-0">
                    <img
                      src={current.image}
                      alt={current.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <div className="text-base font-bold text-gray-900">{current.name}</div>
                    <div className="text-sm text-gray-500">{current.car}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-white border-2 border-gray-200 hover:border-dark hover:bg-gray-50 transition-colors cursor-pointer"
                    aria-label="이전"
                  >
                    <i className="ri-arrow-left-line text-dark" />
                  </button>
                  <button
                    onClick={next}
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-black hover:bg-dark transition-colors cursor-pointer text-white shadow-md"
                    aria-label="다음"
                  >
                    <i className="ri-arrow-right-line text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {reviews.map((rev, idx) => (
              <button
                key={rev.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex ? 'bg-primary w-8' : 'bg-gray-300 w-2'
                }`}
                aria-label={`후기 ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
