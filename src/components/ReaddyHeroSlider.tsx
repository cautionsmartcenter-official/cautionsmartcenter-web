import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SlideItem {
  id: number;
  image: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
}

const HERO_SLIDES: SlideItem[] = [
  {
    id: 1,
    image: '/images/hero/slide1.png',
    tag: 'SIGNATURE COLOR CHANGE PPS',
    title: '마이바흐 듀오톤 컬러PPS',
    subtitle: 'MAYBACH S-CLASS DUO-TONE',
    description: '순정 듀오톤의 품격과 도장면 보호를 동시에 완성하는 최고급 박리형 컬러PPS'
  },
  {
    id: 2,
    image: '/images/hero/slide2.png',
    tag: 'ULTRA HIGH-GLOSS CLEAR PPS',
    title: '마이바흐 퓨어 화이트 & 광택 복원',
    subtitle: 'MAYBACH S-CLASS PURE WHITE',
    description: '쇼카 수준의 깊고 선명한 리플렉션과 스톤칩 완벽 차단 투명 PPS 솔루션'
  },
  {
    id: 3,
    image: '/images/hero/slide3.png',
    tag: 'MATTE PROTECTION SYSTEM',
    title: 'BMW X7 사틴 매트 블랙 PPS',
    subtitle: 'BMW X7 SATIN MATTE BLACK',
    description: '원도장 손상 없이 고급스러운 반무광 사틴 질감으로 전환하는 무절개 보호막'
  },
  {
    id: 4,
    image: '/images/hero/slide4.png',
    tag: 'SUPERCAR SEAMLESS PROTECTION',
    title: '람보르기니 아벤타도르 SVJ 컬러 커스텀',
    subtitle: 'LAMBORGHINI AVENTADOR SVJ PURPLE',
    description: '복잡한 에어로 파츠와 극단적 곡면까지 칼 없이 완성하는 AI 로봇 정밀 시공'
  }
];

const SLIDE_DURATION = 6000; // 6 seconds per slide

interface ReaddyHeroSliderProps {
  onNavigateToContact: () => void;
}

export const ReaddyHeroSlider: React.FC<ReaddyHeroSliderProps> = ({ onNavigateToContact }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Touch swipe support for mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, nextSlide, currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX !== null) {
      setTouchDeltaX(e.touches[0].clientX - touchStartX);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null) {
      if (touchDeltaX < -40) {
        nextSlide(); // Swipe left -> next
      } else if (touchDeltaX > 40) {
        prevSlide(); // Swipe right -> prev
      }
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section className="relative w-full overflow-hidden bg-black select-none">
      {/* ════════════════ 1. MOBILE DEDICATED HERO (md:hidden) ════════════════ */}
      <div className="md:hidden flex flex-col w-full bg-[#08080a] text-white pt-20 pb-10">
        {/* ── 1-A. Vehicle Showcase Stage (16:10 / 16:9 - No Cropping of Car) ── */}
        <div
          className="relative w-full aspect-[16/10] overflow-hidden bg-black flex-shrink-0 touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Subtle Ambient Spotlight behind car */}
          <div className="absolute inset-0 bg-radial-gradient from-white/10 via-transparent to-black/80 pointer-events-none z-10" />

          {/* Car Image with Smooth Transition */}
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={`mobile-slide-${currentSlide.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <motion.img
                initial={{ scale: 1.04 }}
                animate={{ scale: 1 }}
                transition={{ duration: SLIDE_DURATION / 1000 + 1, ease: 'easeOut' }}
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Subtle top and bottom shadows for seamless blend */}
          <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/70 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#08080a] via-[#08080a]/60 to-transparent pointer-events-none z-10" />

          {/* Counter Badge (01 / 04) */}
          <div className="absolute top-2.5 right-3 z-20 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-roboto font-bold tracking-wider text-white shadow-lg">
            <span>{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="text-white/40 font-normal"> / {String(HERO_SLIDES.length).padStart(2, '0')}</span>
          </div>

          {/* Prev / Next Touch Arrows on Image */}
          <button
            onClick={prevSlide}
            aria-label="이전 슬라이드"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white/90 hover:text-white flex items-center justify-center transition-transform active:scale-90"
          >
            <i className="ri-arrow-left-s-line text-lg" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="다음 슬라이드"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white/90 hover:text-white flex items-center justify-center transition-transform active:scale-90"
          >
            <i className="ri-arrow-right-s-line text-lg" />
          </button>
        </div>

        {/* ── 1-B. Segmented Progress Bar & Play/Pause Controls ── */}
        <div className="w-full px-4 py-2.5 bg-[#0d0d10] border-y border-white/[0.08] flex items-center gap-3">
          {/* Segmented Progress Bars */}
          <div className="flex-1 flex items-center gap-1.5">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              const isPast = idx < currentIndex;
              return (
                <button
                  key={`m-bar-${slide.id}`}
                  onClick={() => goToSlide(idx)}
                  className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden relative cursor-pointer"
                  aria-label={`슬라이드 ${idx + 1} 이동`}
                >
                  {isActive ? (
                    <motion.div
                      key={`m-fill-${idx}-${currentIndex}-${isPlaying}`}
                      initial={{ width: '0%' }}
                      animate={{ width: isPlaying ? '100%' : '100%' }}
                      transition={{ duration: isPlaying ? SLIDE_DURATION / 1000 : 0, ease: 'linear' }}
                      className="h-full bg-red-600 rounded-full shadow-[0_0_8px_rgba(225,29,72,0.8)]"
                    />
                  ) : isPast ? (
                    <div className="w-full h-full bg-white/70 rounded-full" />
                  ) : (
                    <div className="w-0 h-full bg-white/20 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Pause / Play Toggle Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? '일시정지' : '재생'}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs text-white/80 transition-colors"
          >
            <i className={isPlaying ? 'ri-pause-line' : 'ri-play-line'} />
          </button>
        </div>

        {/* ── 1-C. Slide Information Card & CTA Buttons ── */}
        <div className="w-full px-5 pt-4 pb-2 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={`m-info-${currentSlide.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-2"
            >
              {/* Category Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold font-roboto tracking-wider text-red-400 uppercase">
                  {currentSlide.tag}
                </span>
              </div>

              {/* Korean Main Title */}
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                {currentSlide.title}
              </h1>

              {/* English Subtitle */}
              <h2 className="text-xs font-bold font-roboto text-gray-400 tracking-wider uppercase">
                {currentSlide.subtitle}
              </h2>

              {/* Description */}
              <p className="text-xs text-gray-300 font-sans font-normal leading-relaxed pt-0.5">
                {currentSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA Buttons (Avoids collision with bottom-right floating quick contact) */}
          <div className="grid grid-cols-2 gap-2.5 pt-4 pb-1">
            <a
              href="#services"
              className="py-3 px-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-bold rounded-full transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/30 whitespace-nowrap"
            >
              <span>서비스 알아보기</span>
              <i className="ri-arrow-right-line text-sm" />
            </a>
            <button
              onClick={onNavigateToContact}
              className="py-3 px-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-bold rounded-full border border-white/20 backdrop-blur-md transition-all flex items-center justify-center whitespace-nowrap"
            >
              <span>무료 견적·상담</span>
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════ 2. DESKTOP HERO (md:block hidden) ════════════════ */}
      <div className="hidden md:block relative w-full h-[92vh] sm:h-screen min-h-[640px] max-h-[1080px] overflow-hidden bg-black">
        {/* Background Slides with Ken Burns Scale Effect */}
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={`desktop-${currentSlide.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <motion.img
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: SLIDE_DURATION / 1000 + 1, ease: 'easeOut' }}
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle Ambient Vignette & Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Foreground Content Area */}
        <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-end pb-12 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Left: Main Titles and Description */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`d-info-${currentSlide.id}`}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="space-y-3"
                >
                  {/* Category Tag */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[11px] sm:text-xs font-bold font-roboto tracking-wider text-white uppercase">
                      {currentSlide.tag}
                    </span>
                  </div>

                  {/* Korean Main Title */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] drop-shadow-lg">
                    {currentSlide.title}
                  </h1>

                  {/* English Subtitle (Reference Match) */}
                  <h2 className="text-sm sm:text-lg lg:text-xl font-bold font-roboto text-white/90 tracking-widest uppercase drop-shadow-md">
                    {currentSlide.subtitle}
                  </h2>

                  {/* Short Description */}
                  <p className="text-sm sm:text-base text-gray-200/90 max-w-2xl font-sans font-normal leading-relaxed pt-1 drop-shadow">
                    {currentSlide.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#services"
                  className="px-6 py-3.5 bg-primary text-white text-xs sm:text-sm font-bold rounded-full hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/30 group"
                >
                  <span>서비스 알아보기</span>
                  <i className="ri-arrow-right-line text-base group-hover:translate-x-1 transition-transform" />
                </a>
                <button
                  onClick={onNavigateToContact}
                  className="px-6 py-3.5 bg-white/15 hover:bg-white text-white hover:text-black text-xs sm:text-sm font-bold rounded-full border border-white/30 backdrop-blur-md transition-all flex items-center justify-center gap-2"
                >
                  <span>무료 견적·상담 신청</span>
                </button>
              </div>
            </div>

            {/* Right: Reference-Matched Slide Counter & Progress Bar */}
            <div className="lg:col-span-4 flex flex-col lg:items-end justify-end space-y-4">
              {/* Number Counter (e.g. 01 / 04) & Controls */}
              <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/15">
                <span className="text-lg sm:text-xl font-black font-roboto text-white tracking-wider">
                  {String(currentIndex + 1).padStart(2, '0')}{' '}
                  <span className="text-white/40 font-normal text-sm sm:text-base">
                    / {String(HERO_SLIDES.length).padStart(2, '0')}
                  </span>
                </span>

                <div className="h-4 w-px bg-white/20" />

                {/* Prev / Next Arrows */}
                <div className="flex items-center gap-1 text-white">
                  <button
                    onClick={prevSlide}
                    className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Previous Slide"
                  >
                    <i className="ri-arrow-left-s-line text-lg" />
                  </button>
                  <button
                    onClick={() => setIsPlaying((prev) => !prev)}
                    className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors text-xs"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    <i className={isPlaying ? 'ri-pause-line' : 'ri-play-line'} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Next Slide"
                  >
                    <i className="ri-arrow-right-s-line text-lg" />
                  </button>
                </div>
              </div>

              {/* Segmented Progress Bars (Reference 100% Match) */}
              <div className="w-full max-w-[280px] flex items-center gap-2">
                {HERO_SLIDES.map((slide, idx) => {
                  const isActive = idx === currentIndex;
                  const isPast = idx < currentIndex;

                  return (
                    <button
                      key={slide.id}
                      onClick={() => goToSlide(idx)}
                      className="flex-1 h-1.5 rounded-full bg-white/25 overflow-hidden transition-colors cursor-pointer relative"
                      aria-label={`Go to slide ${idx + 1}`}
                    >
                      {isActive ? (
                        <motion.div
                          key={`bar-${idx}-${currentIndex}-${isPlaying}`}
                          initial={{ width: '0%' }}
                          animate={{ width: isPlaying ? '100%' : '100%' }}
                          transition={{ duration: isPlaying ? SLIDE_DURATION / 1000 : 0, ease: 'linear' }}
                          className="h-full bg-white rounded-full shadow-glow"
                        />
                      ) : isPast ? (
                        <div className="w-full h-full bg-white rounded-full" />
                      ) : (
                        <div className="w-0 h-full bg-white/40 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
