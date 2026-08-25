import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface Review {
  id: number;
  name: string;
  avatar: string;
  vehicle: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

const REVIEWS_DATA: Review[] = [
  {
    id: 1,
    name: '김민수 고객님',
    avatar: '/images/readdy/customer-001.jpg',
    vehicle: '람보르기니 우루스 (Lamborghini Urus)',
    service: 'AI 로봇 바이올렛 컬러PPS 시공',
    rating: 5,
    date: '2024.11',
    comment: 'AI 로봇 PPS 시공을 받았는데 정말 놀라웠습니다. 기존 랩핑과는 차원이 다른 마감 품질이에요. 균일한 코팅과 완벽한 광택, 그리고 무엇보다 내구성이 뛰어나서 매우 만족스럽습니다. CAUTION의 기술력은 정말 최고입니다.',
    verified: true
  },
  {
    id: 2,
    name: '박지영 고객님',
    avatar: '/images/readdy/customer-002.jpg',
    vehicle: '메르세데스-마이바흐 S580 (Mercedes-Benz Maybach)',
    service: '마이바흐 듀오톤 컬러PPS & 판금도색',
    rating: 5,
    date: '2024.10',
    comment: '수입차 정비부터 디테일링까지 한 곳에서 모두 해결할 수 있어서 너무 편리합니다. 특히 판금도색 작업이 정말 완벽했어요. 색상 매칭도 정확하고 마감도 깔끔해서 사고 전보다 더 좋아 보입니다. 강력 추천합니다!',
    verified: true
  },
  {
    id: 3,
    name: '이준호 고객님',
    avatar: '/images/readdy/customer-003.jpg',
    vehicle: '페라리 포르토피노 M (Ferrari Portofino M)',
    service: 'PPCS 신차 보호막 & 하이엔드 코팅',
    rating: 5,
    date: '2024.12',
    comment: 'PPCS 시공 후 차량이 완전히 새것처럼 변했습니다. AI 로봇 기술이라 시공 시간도 빠르고 품질도 일정해서 믿을 수 있었어요. 직원분들도 친절하고 전문적이어서 안심하고 맡길 수 있었습니다. 다음에도 꼭 이용할게요.',
    verified: true
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS_DATA.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = REVIEWS_DATA[currentIndex];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto relative border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase">
              VERIFIED OWNER REVIEWS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-mono uppercase tracking-tight text-white leading-tight">
            고객님들의 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-white">
              생생한 실제 시공 후기
            </span>
          </h2>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevReview}
            aria-label="이전 후기"
            className="w-12 h-12 rounded-full border border-white/20 bg-neutral-900/80 hover:bg-neutral-800 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextReview}
            aria-label="다음 후기"
            className="w-12 h-12 rounded-full border border-red-500/50 bg-gradient-to-r from-red-600 to-amber-500 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg shadow-red-600/30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Featured Review Card Carousel with Real Avatars */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#141414] to-[#0c0c0c] border border-white/15 shadow-2xl relative overflow-hidden"
          >
            {/* Background quote watermark */}
            <Quote className="absolute top-6 right-6 sm:top-10 sm:right-10 w-24 h-24 text-white/[0.03] pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="flex items-center gap-4 sm:gap-5">
                {/* Real Customer Avatar Image */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-red-500/50 shrink-0 shadow-lg bg-neutral-800">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                    <span className="text-xs font-mono font-bold text-amber-400 ml-1.5">
                      5.0 / 5.0
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-black font-mono text-white">
                    {current.vehicle}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2.5 mt-1 text-xs font-mono text-gray-400">
                    <span className="text-red-400 font-bold px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20">
                      {current.service}
                    </span>
                    <span>{current.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 w-fit">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    {current.name}
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono">인증 오너 리뷰</div>
                </div>
              </div>
            </div>

            {/* Review Comment */}
            <div className="pt-6 sm:pt-8">
              <p className="text-gray-200 text-base sm:text-xl leading-relaxed font-sans font-light italic">
                "{current.comment}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {REVIEWS_DATA.map((rev, idx) => (
            <button
              key={rev.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`후기 ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 bg-gradient-to-r from-red-500 to-amber-400'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
