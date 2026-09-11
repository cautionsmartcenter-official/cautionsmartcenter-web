import { useState, useEffect } from 'react';
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
import { ReaddyNotice } from './components/ReaddyNotice';
import { ReaddyFaq } from './components/ReaddyFaq';
import { FloatingContactBar } from './components/FloatingContactBar';
import { AdminDashboard } from './components/AdminDashboard';
import { ReaddyHeroSlider } from './components/ReaddyHeroSlider';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('repair');
  const [contactInitialService, setContactInitialService] = useState<string>('');

  /* ── Navigate to Service Detail ── */
  const handleOpenServiceDetail = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setActiveTab('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ── Navigate to Service Section on Services Page ── */
  const handleNavigateToServiceSection = (serviceId: string) => {
    setActiveTab('services');
    setTimeout(() => {
      const el = document.getElementById(serviceId);
      if (el) {
        // Adjust for header offset + extra padding
        const yOffset = -140; 
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 150);
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

  /* ── Navigate to Brand Story (Optional Section Anchor) ── */
  const handleNavigateToBrandStory = (targetId?: string) => {
    setActiveTab('brand-story');
    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const yOffset = -140;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /* ── Hash routing (e.g. #admin) ── */
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setActiveTab('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  /* ── 0. Admin Dashboard View ── */
  if (activeTab === 'admin') {
    return (
      <AdminDashboard
        onExit={() => {
          window.location.hash = '';
          setActiveTab('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-dark antialiased">
      {/* ── 1. Readdy Global Header & Navigation ── */}
      <ReaddyNavbar
        activeTab={activeTab === 'service-detail' ? 'services' : activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectService={handleNavigateToServiceSection}
        onSelectBrandStory={handleNavigateToBrandStory}
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
          <ReaddyServices
            onSelectServiceDetail={handleOpenServiceDetail}
            onNavigateToContact={handleNavigateToContact}
          />
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

      {/* ── 6. Community: Notice View ── */}
      {activeTab === 'notice' && (
        <main>
          <ReaddyNotice
            onNavigateToContact={() => handleNavigateToContact()}
            onNavigateToFaq={() => {
              setActiveTab('faq');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      )}

      {/* ── 7. Community: FAQ View ── */}
      {activeTab === 'faq' && (
        <main>
          <ReaddyFaq
            onNavigateToContact={() => handleNavigateToContact()}
            onNavigateToNotice={() => {
              setActiveTab('notice');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      )}

      {/* ── 8. Home View: Our Custom Hero + Readdy 1:1 Exact Sections ── */}
      {activeTab === 'home' && (
        <main>
          {/* ════════════════ 1. READDY HERO SLIDER (레퍼런스 스타일 슬라이더) ════════════════ */}
          <ReaddyHeroSlider onNavigateToContact={() => handleNavigateToContact()} />

          {/* ════════════════ 2. READDY SERVICES SECTION (1:1 Exact) ════════════════ */}
          <ReaddyServicesSection onSelectServiceDetail={handleOpenServiceDetail} />

          {/* ════════════════ 3. READDY AI TECHNOLOGY SECTION (1:1 Exact) ════════════════ */}
          <ReaddyAiTechSection onNavigateToBrandTech={() => handleNavigateToBrandStory('technology')} />

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

      {/* ── 9. Right Floating Quick Contact Bar (카카오톡 채널 & 전화 상담) ── */}
      <FloatingContactBar />
    </div>
  );
}
