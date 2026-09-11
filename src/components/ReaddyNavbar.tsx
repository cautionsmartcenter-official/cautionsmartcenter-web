import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Bell, HelpCircle } from 'lucide-react';

interface ReaddyNavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onSelectService?: (serviceId: string) => void;
  onSelectBrandStory?: (targetId?: string) => void;
}

export const ReaddyNavbar: React.FC<ReaddyNavbarProps> = ({ activeTab, onSelectTab, onSelectService, onSelectBrandStory }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);
  const [isMobileCommunityExpanded, setIsMobileCommunityExpanded] = useState(true);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesExpanded, setIsMobileServicesExpanded] = useState(false);
  const [isBrandStoryDropdownOpen, setIsBrandStoryDropdownOpen] = useState(false);
  const [isMobileBrandStoryExpanded, setIsMobileBrandStoryExpanded] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const servicesDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const brandStoryDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const isCommunityActive = activeTab === 'notice' || activeTab === 'faq' || activeTab === 'community';
  const isSolidHeader = isScrolled || activeTab === 'notice' || activeTab === 'faq';

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsCommunityDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsCommunityDropdownOpen(false);
    }, 150);
  };

  const handleServicesMouseEnter = () => {
    if (servicesDropdownTimeoutRef.current) clearTimeout(servicesDropdownTimeoutRef.current);
    setIsServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesDropdownTimeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 150);
  };

  const handleBrandStoryMouseEnter = () => {
    if (brandStoryDropdownTimeoutRef.current) clearTimeout(brandStoryDropdownTimeoutRef.current);
    setIsBrandStoryDropdownOpen(true);
  };

  const handleBrandStoryMouseLeave = () => {
    brandStoryDropdownTimeoutRef.current = setTimeout(() => {
      setIsBrandStoryDropdownOpen(false);
    }, 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolidHeader
          ? 'bg-black/85 backdrop-blur-md border-b border-white/10 shadow-lg py-0'
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
          <div className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              
              if (item.id === 'brand-story') {
                return (
                  <div
                    key={item.id}
                    className="relative py-2"
                    onMouseEnter={handleBrandStoryMouseEnter}
                    onMouseLeave={handleBrandStoryMouseLeave}
                  >
                    <button
                      onClick={() => {
                        if (onSelectBrandStory) {
                          onSelectBrandStory();
                        } else {
                          onSelectTab('brand-story');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={`relative flex items-center gap-1.5 text-sm font-semibold tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                        isActive ? 'text-white font-bold' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isBrandStoryDropdownOpen ? 'rotate-180 text-red-500' : 'text-gray-400'
                        }`}
                      />
                      {isActive && (
                        <motion.div
                          layoutId="readdy-nav-indicator"
                          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-red-600 rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {isBrandStoryDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-44 bg-neutral-950/95 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl p-1.5 z-50"
                        >
                          {[
                            { id: 'our-story', name: '히스토리' },
                            { id: 'distributor', name: 'CARDIP' },
                            { id: 'technology', name: 'CurveRobot' }
                          ].map((section, index, array) => (
                            <React.Fragment key={section.id}>
                              <button
                                onClick={() => {
                                  if (onSelectBrandStory) {
                                    onSelectBrandStory(section.id);
                                  } else {
                                    onSelectTab('brand-story');
                                  }
                                  setIsBrandStoryDropdownOpen(false);
                                }}
                                className="flex items-center gap-2.5 w-full text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer text-gray-200 hover:bg-white/10 hover:text-white"
                              >
                                <span>{section.name}</span>
                              </button>
                              {index < array.length - 1 && (
                                <div className="h-px bg-white/10 my-1 mx-2" />
                              )}
                            </React.Fragment>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              if (item.id === 'services') {
                return (
                  <div
                    key={item.id}
                    className="relative py-2"
                    onMouseEnter={handleServicesMouseEnter}
                    onMouseLeave={handleServicesMouseLeave}
                  >
                    <button
                      onClick={() => {
                        onSelectTab('services');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`relative flex items-center gap-1.5 text-sm font-semibold tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                        isActive ? 'text-white font-bold' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isServicesDropdownOpen ? 'rotate-180 text-red-500' : 'text-gray-400'
                        }`}
                      />
                      {isActive && (
                        <motion.div
                          layoutId="readdy-nav-indicator"
                          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-red-600 rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {isServicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-44 bg-neutral-950/95 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl p-1.5 z-50"
                        >
                          {[
                            { id: 'pps-clear', name: '투명 PPS' },
                            { id: 'pps-color', name: '컬러 PPS' },
                            { id: 'paint', name: '판금도색' },
                            { id: 'repair', name: '수입차 정비' },
                            { id: 'detailing', name: '디테일링' }
                          ].map((service, index, array) => (
                            <React.Fragment key={service.id}>
                              <button
                                onClick={() => {
                                  if (onSelectService) {
                                    onSelectService(service.id);
                                  } else {
                                    onSelectTab('services');
                                  }
                                  setIsServicesDropdownOpen(false);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="flex items-center gap-2.5 w-full text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer text-gray-200 hover:bg-white/10 hover:text-white"
                              >
                                <span>{service.name}</span>
                              </button>
                              {index < array.length - 1 && (
                                <div className="h-px bg-white/10 my-1 mx-2" />
                              )}
                            </React.Fragment>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

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

            {/* Community Tab with Dropdown Menu */}
            <div
              className="relative py-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => {
                  onSelectTab('notice');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative flex items-center gap-1.5 text-sm font-semibold tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                  isCommunityActive ? 'text-white font-bold' : 'text-gray-300 hover:text-white'
                }`}
              >
                <span>커뮤니티</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isCommunityDropdownOpen ? 'rotate-180 text-red-500' : 'text-gray-400'
                  }`}
                />
                {isCommunityActive && (
                  <motion.div
                    layoutId="readdy-nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-red-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>

              {/* Desktop Dropdown Box */}
              <AnimatePresence>
                {isCommunityDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-44 bg-neutral-950/95 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl p-1.5 z-50"
                  >
                    <button
                      onClick={() => {
                        onSelectTab('notice');
                        setIsCommunityDropdownOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`flex items-center gap-2.5 w-full text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        activeTab === 'notice'
                          ? 'bg-red-600/20 text-red-400 font-bold border border-red-500/20'
                          : 'text-gray-200 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Bell className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>공지사항</span>
                    </button>

                    <div className="h-px bg-white/10 my-1 mx-2" />

                    <button
                      onClick={() => {
                        onSelectTab('faq');
                        setIsCommunityDropdownOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`flex items-center gap-2.5 w-full text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        activeTab === 'faq'
                          ? 'bg-red-600/20 text-red-400 font-bold border border-red-500/20'
                          : 'text-gray-200 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>자주묻는질문</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
              className="px-7 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-full transition-all whitespace-nowrap cursor-pointer shadow-[0_2px_12px_rgba(225,29,72,0.4)] hover:shadow-[0_4px_16px_rgba(225,29,72,0.6)] active:scale-95 ml-1"
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
                {navItems.map((item) => {
                  if (item.id === 'brand-story') {
                    return (
                      <div key={item.id} className="pt-1">
                        <button
                          onClick={() => setIsMobileBrandStoryExpanded(!isMobileBrandStoryExpanded)}
                          className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                            activeTab === 'brand-story'
                              ? 'bg-red-600/15 text-red-500 font-bold border border-red-500/20'
                              : 'text-gray-200 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isMobileBrandStoryExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {isMobileBrandStoryExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="bg-white/5 rounded-xl mx-2 my-1 flex flex-col p-1.5 space-y-1 border border-white/5">
                                {[
                                  { id: 'our-story', name: '히스토리' },
                                  { id: 'distributor', name: 'CARDIP' },
                                  { id: 'technology', name: 'CurveRobot' }
                                ].map((section) => (
                                  <button
                                    key={section.id}
                                    onClick={() => {
                                      if (onSelectBrandStory) {
                                        onSelectBrandStory(section.id);
                                      } else {
                                        onSelectTab('brand-story');
                                      }
                                      setIsMobileMenuOpen(false);
                                    }}
                                    className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-gray-300 hover:bg-white/10 hover:text-white"
                                  >
                                    <span>{section.name}</span>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  if (item.id === 'services') {
                    return (
                      <div key={item.id} className="pt-1">
                        <button
                          onClick={() => setIsMobileServicesExpanded(!isMobileServicesExpanded)}
                          className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                            activeTab === 'services'
                              ? 'bg-red-600/15 text-red-500 font-bold border border-red-500/20'
                              : 'text-gray-200 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isMobileServicesExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {isMobileServicesExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="bg-white/5 rounded-xl mx-2 my-1 flex flex-col p-1.5 space-y-1 border border-white/5">
                                {[
                                  { id: 'pps-clear', name: '투명 PPS' },
                                  { id: 'pps-color', name: '컬러 PPS' },
                                  { id: 'paint', name: '판금도색' },
                                  { id: 'repair', name: '수입차 정비' },
                                  { id: 'detailing', name: '디테일링' }
                                ].map((service) => (
                                  <button
                                    key={service.id}
                                    onClick={() => {
                                      if (onSelectService) {
                                        onSelectService(service.id);
                                      } else {
                                        onSelectTab('services');
                                      }
                                      setIsMobileMenuOpen(false);
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-gray-300 hover:bg-white/10 hover:text-white"
                                  >
                                    <span>{service.name}</span>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                        activeTab === item.id
                          ? 'bg-red-600/15 text-red-500 font-bold border border-red-500/20'
                          : 'text-gray-200 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span>{item.name}</span>
                      <i className="ri-arrow-right-s-line text-lg opacity-60" />
                    </button>
                  );
                })}

                {/* Mobile Community Accordion Section */}
                <div className="pt-1">
                  <button
                    onClick={() => setIsMobileCommunityExpanded(!isMobileCommunityExpanded)}
                    className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      isCommunityActive
                        ? 'bg-red-600/15 text-red-500 font-bold border border-red-500/20'
                        : 'text-gray-200 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>커뮤니티</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isMobileCommunityExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isMobileCommunityExpanded && (
                    <div className="ml-4 mt-1 pl-3 border-l border-white/10 space-y-1">
                      <button
                        onClick={() => {
                          onSelectTab('notice');
                          setIsMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                          activeTab === 'notice'
                            ? 'text-red-400 font-bold bg-white/5'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <Bell className="w-3.5 h-3.5 text-red-500" />
                        <span>공지사항</span>
                      </button>

                      <button
                        onClick={() => {
                          onSelectTab('faq');
                          setIsMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                          activeTab === 'faq'
                            ? 'text-amber-400 font-bold bg-white/5'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                        <span>자주묻는질문</span>
                      </button>
                    </div>
                  )}
                </div>
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
