import React from 'react';

interface ReaddyFooterProps {
  onSelectTab?: (tab: string) => void;
}

export const ReaddyFooter: React.FC<ReaddyFooterProps> = ({ onSelectTab }) => {
  const footerLinks = {
    services: [
      { name: '수입차 정비', id: 'repair' },
      { name: '판금도색', id: 'paint' },
      { name: '디테일링', id: 'detailing' },
      { name: 'PPS (Paint Protection Spray)', id: 'ai-tech' }
    ],
    company: [
      { name: '브랜드 스토리', id: 'brand-story' },
      { name: '시공 포트폴리오', id: 'portfolio' },
      { name: '기술력 & 설비', id: 'brand-story' },
      { name: '오시는 길', id: 'home' }
    ],
    support: [
      { name: '상담 신청', id: 'contact' },
      { name: '견적 문의', id: 'contact' },
      { name: 'FAQ', id: 'contact' }
    ]
  };

  return (
    <footer className="bg-black text-white border-t border-gray-900">
      <div className="mx-auto px-6 lg:px-12 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Services Column */}
          <div>
            <h4 className="text-base font-bold mb-4">서비스</h4>
            <div className="w-10 h-0.5 bg-primary mb-6" />
            <ul className="space-y-3">
              {footerLinks.services.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      if (onSelectTab) onSelectTab('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-sm text-gray-400 hover:text-primary transition-colors cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-base font-bold mb-4">회사</h4>
            <div className="w-10 h-0.5 bg-primary mb-6" />
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      if (onSelectTab) onSelectTab(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-sm text-gray-400 hover:text-primary transition-colors cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-base font-bold mb-4">고객지원</h4>
            <div className="w-10 h-0.5 bg-primary mb-6" />
            <ul className="space-y-3">
              {footerLinks.support.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      if (onSelectTab) onSelectTab('home');
                      setTimeout(() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="text-sm text-gray-400 hover:text-primary transition-colors cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-base font-bold mb-4">연락처</h4>
            <div className="w-10 h-0.5 bg-primary mb-6" />
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <i className="ri-phone-line text-primary mt-0.5 w-4 h-4 flex items-center justify-center" />
                <a href="tel:031-712-6665" className="text-sm text-gray-400 hover:text-white transition-colors">
                  031-712-6665
                </a>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-mail-line text-primary mt-0.5 w-4 h-4 flex items-center justify-center" />
                <a href="mailto:info@cautioncenter.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                  info@cautioncenter.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-map-pin-line text-primary mt-0.5 w-4 h-4 flex items-center justify-center" />
                <span className="text-sm text-gray-400">
                  경기도 광주시 태재로 26 (신현동) / 분당 본점
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <img
                  src="/images/logos/caution_logo_white.png?v=4"
                  alt="CAUTION SMART CENTER"
                  className="h-8 sm:h-9 w-auto object-contain brightness-100"
                  style={{ imageRendering: 'auto' }}
                />
              </div>
              <div className="flex items-center gap-3 mt-3">
                <div className="w-16 h-0.5 bg-primary" />
                <span className="text-xs text-gray-500 font-mono">AI 로봇 자동차 외장관리 시스템</span>
              </div>
            </div>

            <div className="text-center lg:text-right">
              <p className="text-sm text-gray-500 mb-4">
                © 2025 CAUTION SMART CENTER. All rights reserved.
              </p>
              <div className="flex items-center justify-center lg:justify-end gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-primary transition-colors cursor-pointer"
                  aria-label="Instagram"
                >
                  <i className="ri-instagram-line text-xl" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-primary transition-colors cursor-pointer"
                  aria-label="Facebook"
                >
                  <i className="ri-facebook-fill text-xl" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-primary transition-colors cursor-pointer"
                  aria-label="YouTube"
                >
                  <i className="ri-youtube-fill text-xl" />
                </a>
                <a
                  href="http://pf.kakao.com/_FxINhX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-bold"
                  aria-label="KakaoTalk"
                >
                  <i className="ri-chat-3-line text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
