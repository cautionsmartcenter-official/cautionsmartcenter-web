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
import { ScrambleIn } from './components/ScrambleText';
import { VIDEO_URLS } from './config/videos';
import { SITE_CONFIG } from './config/content';

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

  /* ── Destructure config for readability ── */
  const { hero } = SITE_CONFIG;

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

            {/* Hero content */}
            <motion.div
              className="relative z-20 flex flex-col flex-1 px-6 sm:px-12 max-w-7xl mx-auto w-full pt-28 sm:pt-36 pb-12 sm:pb-16 justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: entranceComplete ? 1 : 0 }}
              transition={{ duration: 1 }}
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                {/* Left column */}
                <div className="flex flex-col gap-5 max-w-2xl">
                  <div className="inline-block px-4 py-1.5 bg-primary/90 backdrop-blur-md rounded-full w-fit">
                    <span className="text-xs font-semibold text-white tracking-widest uppercase">
                      AI Robot Master Care
                    </span>
                  </div>

                  <h1
                    className="text-white font-black uppercase leading-[0.92] tracking-tight drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]"
                    style={{ fontFamily: '"Poppins", "Anton SC", "Noto Sans KR", sans-serif', fontSize: 'clamp(36px, 7vw, 84px)' }}
                  >
                    <span className="text-white drop-shadow-md">
                      <ScrambleIn text={hero.titleLeft[0]} delay={200} triggered={entranceComplete} />
                    </span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-white">
                      <ScrambleIn text={hero.titleLeft[1]} delay={500} triggered={entranceComplete} />
                    </span>
                  </h1>

                  <motion.div
                    className="bg-black/80 backdrop-blur-xl border border-white/20 p-4 sm:p-5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] max-w-xl"
                    initial={{ opacity: 0, y: 25 }}
                    animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.9,
                      ease: [0.215, 0.61, 0.355, 1.0],
                      delay: 0.2,
                    }}
                  >
                    <p className="text-sm sm:text-base md:text-lg text-gray-100 font-bold leading-relaxed font-sans drop-shadow">
                      {hero.description}
                    </p>
                  </motion.div>

                  {/* Hero Action Buttons */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    <a
                      href="#services"
                      className="px-8 py-4 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer group shadow-lg shadow-primary/30"
                    >
                      <span>서비스 알아보기</span>
                      <i className="ri-arrow-right-line text-lg group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href="#ai-tech"
                      className="px-8 py-4 bg-black/60 backdrop-blur-md text-white text-sm font-semibold rounded-full border-2 border-white/40 hover:bg-white hover:text-dark transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                    >
                      <span>AI 기술 보기</span>
                    </a>
                  </div>
                </div>

                {/* Right Brand Typography */}
                <h1
                  className="text-white font-black uppercase leading-[0.92] tracking-tight text-left md:text-right drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]"
                  style={{ fontFamily: '"Poppins", "Anton SC", "Noto Sans KR", sans-serif', fontSize: 'clamp(36px, 7vw, 84px)' }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-amber-400">
                    <ScrambleIn text={hero.titleRight[0]} delay={700} triggered={entranceComplete} />
                  </span>
                  <br />
                  <span className="text-white drop-shadow-md">
                    <ScrambleIn text={hero.titleRight[1]} delay={1000} triggered={entranceComplete} />
                  </span>
                </h1>
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
