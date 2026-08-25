import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReaddyNavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const ReaddyNavbar: React.FC<ReaddyNavbarProps> = ({ activeTab, onSelectTab }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', name: '홈' },
    { id: 'brand-story', name: '브랜드 스토리' },
    { id: 'services', name: '서비스' },
    { id: 'portfolio', name: '포트폴리오' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg py-0'
          : 'bg-transparent py-2 sm:py-3'
      }`}
    >
      <nav className="w-full px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo (Ultra-Smooth Anti-Aliased White Logo) */}
          <button
            onClick={() => {
              onSelectTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center cursor-pointer group py-1"
          >
            <img
              src="/images/logos/caution_logo_white.png?v=4"
              alt="CAUTION SMART CENTER"
              className="h-7 sm:h-8 w-auto object-contain brightness-100 group-hover:opacity-90 transition-opacity"
              style={{
                imageRendering: 'auto'
              }}
            />
          </button>

          {/* Right: Navigation Links + Red CTA Button */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative py-2 text-sm font-semibold tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                    isActive ? 'text-white font-bold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="readdy-nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-red-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            {/* Red Oval CTA Button */}
            <button
              onClick={() => {
                if (activeTab !== 'home') {
                  onSelectTab('home');
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-7 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-full transition-all whitespace-nowrap cursor-pointer shadow-[0_2px_12px_rgba(225,29,72,0.4)] hover:shadow-[0_4px_16px_rgba(225,29,72,0.6)] active:scale-95 ml-2"
            >
              상담 신청
            </button>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center cursor-pointer text-white"
            aria-label="메뉴"
          >
            <i className={`ri-${isMobileMenuOpen ? 'close' : 'menu'}-line text-2xl`} />
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-neutral-950/95 backdrop-blur-2xl border border-white/15 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] mb-4"
            >
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center justify-between w-full text-left px-4 py-3.5 rounded-xl text-base font-semibold transition-all ${
                      activeTab === item.id
                        ? 'bg-red-600/15 text-red-500 font-bold border border-red-500/20'
                        : 'text-gray-200 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.name}</span>
                    <i className="ri-arrow-right-s-line text-lg opacity-60" />
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (activeTab !== 'home') {
                    onSelectTab('home');
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="block w-full mt-4 py-3.5 bg-red-600 hover:bg-red-700 active:scale-98 text-white text-base font-bold rounded-xl text-center cursor-pointer shadow-lg shadow-red-600/30 transition-all"
              >
                무료 상담 & 견적 신청
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
