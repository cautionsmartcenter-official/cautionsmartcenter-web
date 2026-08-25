import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SquashHamburger } from './SquashHamburger';
import { AuthModal } from './AuthModal';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  entranceComplete: boolean;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export function Navbar({ entranceComplete, activeTab, onSelectTab }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'services', label: 'SERVICES' },
    { id: 'portfolio', label: 'PORTFOLIO' },
    { id: 'contact', label: 'CONTACT US' },
  ];

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out flex items-center px-4 sm:px-6 lg:px-10 border-b ${
          isScrolled
            ? 'h-24 lg:h-28 bg-black/90 backdrop-blur-2xl border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.9)]'
            : 'h-32 lg:h-40 bg-gradient-to-b from-black/95 via-black/85 to-transparent border-white/10 backdrop-blur-md'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: entranceComplete ? 1 : 0, y: entranceComplete ? 0 : -20 }}
        transition={{ duration: 0.8 }}
      >
        {/* ===== DESKTOP NAVBAR ===== */}
        <div className="hidden md:flex items-center justify-between w-full max-w-[1600px] mx-auto gap-4 lg:gap-6">
          {/* Left Container: Logo + Nav Items (여백 최소화 밀착 배치) */}
          <div className="flex items-center gap-4 lg:gap-8 flex-shrink-0">
            {/* Brand Logo (3배 크기 웅장 확장) */}
            <motion.div
              className="flex items-center cursor-pointer group flex-shrink-0"
              onClick={() => handleNavClick('home')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <img
                src="/images/logos/logo_white_transparent.png"
                alt="Caution SMART CENTER"
                className={`transition-all duration-300 object-contain drop-shadow-[0_4px_20px_rgba(255,255,255,0.4)] ${
                  isScrolled ? 'h-20 lg:h-24' : 'h-28 lg:h-36'
                }`}
              />
            </motion.div>

            {/* Navigation Links (로고 바로 옆 밀착 캡슐) */}
            <div className="flex items-center gap-1 lg:gap-2 bg-black/70 border border-white/20 p-1.5 lg:p-2 rounded-full backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex-shrink-0">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-3.5 lg:px-5 py-2 lg:py-2.5 rounded-full text-[13px] lg:text-[14px] font-extrabold tracking-widest transition-all duration-300 cursor-pointer border-none uppercase font-sans whitespace-nowrap flex-shrink-0 group ${
                      isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {isActive ? (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 rounded-full z-0 shadow-[0_0_20px_rgba(239,68,68,0.5)] border border-amber-400/30"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-full transition-colors duration-200 z-0" />
                    )}
                    <span className={`relative z-10 whitespace-nowrap drop-shadow-sm ${
                      isActive ? 'text-white font-black' : ''
                    }`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right CTA & Auth Button */}
          <div className="flex items-center gap-3 lg:gap-4 flex-shrink-0">
            {user ? (
              <div className="flex items-center gap-3 whitespace-nowrap bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                <span className="text-xs lg:text-sm text-gray-200 font-semibold font-sans truncate max-w-[130px]">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                <button
                  onClick={signOut}
                  className="text-xs text-gray-400 hover:text-red-400 transition-colors cursor-pointer bg-transparent border-none font-sans font-bold whitespace-nowrap"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="text-xs lg:text-sm font-bold text-gray-300 hover:text-white transition-all cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-full font-sans uppercase tracking-wider whitespace-nowrap"
              >
                Sign In
              </button>
            )}

            <motion.button
              onClick={() => handleNavClick('contact')}
              className="group relative overflow-hidden px-5 lg:px-6 py-2.5 lg:py-3 bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white rounded-full text-xs lg:text-[14px] font-black tracking-wider uppercase font-sans shadow-[0_0_20px_rgba(239,68,68,0.4)] border border-amber-400/40 cursor-pointer flex items-center gap-2 whitespace-nowrap flex-shrink-0"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
              <span className="relative z-10 whitespace-nowrap drop-shadow">견적 & 문의</span>
              <span className="relative z-10 text-sm lg:text-base font-black transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.button>
          </div>
        </div>

        {/* ===== MOBILE NAVBAR ===== */}
        <div className="flex md:hidden items-center justify-between w-full">
          {/* Brand Logo Mobile (모바일 3배) */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <img
              src="/images/logos/logo_white_transparent.png"
              alt="Caution SMART CENTER"
              className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)]"
            />
          </div>

          {/* Mobile Right Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl bg-white/10 text-white cursor-pointer border border-white/20 flex items-center justify-center backdrop-blur-md active:scale-95 transition-transform"
            >
              <SquashHamburger isOpen={menuOpen} isMobile />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 top-20 z-40 bg-black/95 backdrop-blur-3xl flex flex-col p-6 border-t border-white/15 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-3 my-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-2xl font-black font-sans tracking-widest py-3.5 border-b border-white/10 cursor-pointer bg-transparent uppercase flex items-center justify-between transition-colors ${
                    activeTab === item.id ? 'text-amber-400 pl-3 border-amber-400/50 bg-white/5 rounded-r-xl' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeTab === item.id && <span className="text-amber-400 text-lg">●</span>}
                </button>
              ))}
            </div>

            <div className="mt-auto pt-6 flex flex-col gap-3">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full py-4 bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white rounded-2xl text-center font-black font-sans uppercase tracking-wider text-base cursor-pointer border border-amber-400/40 shadow-[0_0_25px_rgba(239,68,68,0.4)] active:scale-98 transition-transform"
              >
                비즈니스 파트너십 & 시공 문의 →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

