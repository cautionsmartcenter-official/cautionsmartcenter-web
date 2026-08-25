import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ReaddyNavbar } from './components/ReaddyNavbar';
import { ReaddyFooter } from './components/ReaddyFooter';
import { ReaddyServicesSection } from './components/ReaddyServicesSection';
import { ReaddyAiTechSection } from './components/ReaddyAiTechSection';
import { ReaddyReviewsSection } from './components/ReaddyReviewsSection';
import { ReaddyCtaSection } from './components/ReaddyCtaSection';
import { ReaddyContactSection } from './components/ReaddyContactSection';
import { ReaddyBrandStory } from './components/ReaddyBrandStory';
import { ReaddyServices } from './components/ReaddyServices';
import { ReaddyServiceDetail } from './components/ReaddyServiceDetail';
import { ReaddyPortfolio } from './components/ReaddyPortfolio';
import { VIDEO_URLS } from './config/videos';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('repair');
  const [contactInitialService, setContactInitialService] = useState<string>('');
  const [entranceComplete, setEntranceComplete] = useState(false);

  /* ── Navigate to Service Detail ── */
  const handleOpenServiceDetail = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setActiveTab('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ── Navigate to Contact Section with Service Pre-Selected ── */
  const handleNavigateToContact = (serviceName?: string) => {
    if (serviceName) {
      setContactInitialService(serviceName);
    }
    setActiveTab('home');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  /* ── Hero video mouse and touch scrubbing ── */
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);

  const handleSeeked = useCallback(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    isSeekingRef.current = false;
    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
      isSeekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const video = heroVideoRef.current;
      if (!video || !video.duration) return;
      const deltaX = e.movementX;
      const sensitivity = 0.8;
      const change = (deltaX / window.innerWidth) * video.duration * sensitivity;
      targetTimeRef.current = Math.max(
        0,
        Math.min(video.duration, targetTimeRef.current + change)
      );
      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const video = heroVideoRef.current;
      if (!video || !video.duration || touchStartXRef.current === null || e.touches.length !== 1) return;
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - touchStartXRef.current;
      touchStartXRef.current = currentX;
      const sensitivity = 1.2;
      const change = (deltaX / window.innerWidth) * video.duration * sensitivity;
      targetTimeRef.current = Math.max(
        0,
        Math.min(video.duration, targetTimeRef.current + change)
      );
      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleTouchEnd = () => {
      touchStartXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  /* ── Entrance delay ── */
  useEffect(() => {
    const timer = setTimeout(() => setEntranceComplete(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-dark antialiased">
      {/* ── 1. Readdy Global Header & Navigation ── */}
      <ReaddyNavbar
        activeTab={activeTab === 'service-detail' ? 'services' : activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* ── 2. Brand Story View ── */}
      {activeTab === 'brand-story' && (
        <main>
          <ReaddyBrandStory />
        </main>
      )}

      {/* ── 3. Services Overview View ── */}
      {activeTab === 'services' && (
        <main>
          <ReaddyServices onSelectServiceDetail={handleOpenServiceDetail} />
        </main>
      )}

      {/* ── 4. Service Detail View (e.g. /services/repair) ── */}
      {activeTab === 'service-detail' && (
        <main>
          <ReaddyServiceDetail
            serviceId={selectedServiceId}
            onSelectService={handleOpenServiceDetail}
            onNavigateHome={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToContact={handleNavigateToContact}
          />
        </main>
      )}

      {/* ── 5. Portfolio Gallery View ── */}
      {activeTab === 'portfolio' && (
        <main>
          <ReaddyPortfolio onNavigateToContact={handleNavigateToContact} />
        </main>
      )}

      {/* ── 5. Home View: Our Custom Hero + Readdy 1:1 Exact Sections ── */}
      {activeTab === 'home' && (
        <main>
          {/* ════════════════ HERO SECTION (우리가 만든 비디오 스크럽 히어로 100% 보존) ════════════════ */}
          <section className="relative h-screen h-[100dvh] flex flex-col overflow-hidden bg-black">
            {/* Video background (Clean Pure Video) */}
            {VIDEO_URLS.hero && (
              <video
                ref={heroVideoRef}
                src={VIDEO_URLS.hero}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onSeeked={handleSeeked}
              />
            )}

            {/* Subtle dark gradient for perfect text contrast without obstructing video */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 pointer-events-none z-10" />

            {/* Hero content: Option 1 Modern Glassmorphism Floating Card */}
            <motion.div
              className="relative z-20 flex flex-col flex-1 px-6 sm:px-12 max-w-7xl mx-auto w-full pt-28 sm:pt-36 pb-12 sm:pb-16 justify-end"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: entranceComplete ? 1 : 0, y: entranceComplete ? 0 : 30 }}
              transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1.0] }}
            >
              {/* Glassmorphism Floating Hero Card */}
              <div className="max-w-xl bg-black/70 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/90 rounded-full mb-4 shadow-md shadow-primary/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-bold text-white tracking-widest uppercase">
                    AI ROBOT MASTER CARE
                  </span>
                </div>

                {/* Card Title */}
                <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight uppercase mb-3">
                  PREMIUM <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-white">AUTO SOLUTION</span>
                </h1>

                {/* Card Description */}
                <p className="text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed font-sans mb-6">
                  24년 장인정신과 최첨단 AI 로봇기술의 만남. 분당·수원·용인·광주 수입차 사고수리, 판금도색, PPS 및 컬러PPS 완벽 시공 전문 브랜드.
                </p>

                {/* Card Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#services"
                    className="px-6 py-3 bg-primary text-white text-xs sm:text-sm font-bold rounded-full hover:bg-primary-dark transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-lg shadow-primary/30 group"
                  >
                    <span>서비스 알아보기</span>
                    <i className="ri-arrow-right-line text-base group-hover:translate-x-1 transition-transform" />
                  </a>
                  <button
                    onClick={() => handleNavigateToContact()}
                    className="px-6 py-3 bg-white/10 hover:bg-white text-white hover:text-black text-xs sm:text-sm font-bold rounded-full border border-white/30 backdrop-blur-md transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>무료 상담 신청</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </section>

          {/* ════════════════ 2. READDY SERVICES SECTION (1:1 Exact) ════════════════ */}
          <ReaddyServicesSection onSelectServiceDetail={handleOpenServiceDetail} />

          {/* ════════════════ 3. READDY AI TECHNOLOGY SECTION (1:1 Exact) ════════════════ */}
          <ReaddyAiTechSection />

          {/* ════════════════ 4. READDY CUSTOMER REVIEWS SECTION (1:1 Exact) ════════════════ */}
          <ReaddyReviewsSection />

          {/* ════════════════ 5. READDY CTA & SILHOUETTES SECTION (1:1 Exact) ════════════════ */}
          <ReaddyCtaSection />

          {/* ════════════════ 6. READDY CONTACT FORM SECTION (1:1 Exact) ════════════════ */}
          <ReaddyContactSection initialService={contactInitialService} />
        </main>
      )}

      {/* ── 6. Readdy Global Footer ── */}
      <ReaddyFooter
        onSelectTab={(tab) => {
          if (tab === 'repair' || tab === 'paint' || tab === 'detailing' || tab === 'ai-tech') {
            handleOpenServiceDetail(tab);
          } else {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />
    </div>
  );
}
