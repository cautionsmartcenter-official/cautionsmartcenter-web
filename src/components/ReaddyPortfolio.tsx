import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA, OFFICIAL_LINKS, PortfolioItem } from '../config/portfolioData';

export type { PortfolioItem };

const CATEGORIES = [
  { id: 'all', name: '전체보기' },
  { id: 'pps', name: 'PPS' },
  { id: 'color-pps', name: '컬러 PPS' },
  { id: 'paint', name: '판금도색' },
  { id: 'repair', name: '정비수리' },
  { id: 'detailing', name: '디테일링' }
];

interface ReaddyPortfolioProps {
  onNavigateToContact: (serviceName?: string) => void;
}

export const ReaddyPortfolio: React.FC<ReaddyPortfolioProps> = ({ onNavigateToContact }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const filteredItems =
    selectedCategory === 'all'
      ? PORTFOLIO_DATA
      : PORTFOLIO_DATA.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white text-dark">
      {/* ── 1. Portfolio Hero Banner ── */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex items-center justify-center bg-black overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="/images/readdy/brand-hero-clean.jpg"
            alt="Caution Portfolio"
            className="w-full h-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/75" />
        </div>

        <div className="relative z-10 mx-auto px-6 lg:px-12 max-w-5xl text-center pt-32 sm:pt-40 pb-20 sm:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 bg-primary rounded-full mb-6">
              <span className="text-xs font-semibold text-white tracking-wider">PORTFOLIO & CHANNELS</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
              시공 갤러리 & 포트폴리오
            </h1>
            <p className="text-sm sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
              CAUTION SMART CENTER의 독보적인 기술력으로 완성된 슈퍼카 및 프리미엄 수입차 시공 사례를 확인해 보세요.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Official Social Channels Banner (Instagram & Naver Blog) ── */}
      <section className="py-6 bg-slate-100/90 border-b border-slate-200">
        <div className="mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Instagram Card */}
            <a
              href={OFFICIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-pink-300 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white flex items-center justify-center text-2xl shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform shrink-0">
                  <i className="ri-instagram-line" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-50 text-pink-600 border border-pink-100">
                      실시간 릴스 시공기
                    </span>
                    <span className="text-xs font-bold text-slate-800">공식 인스타그램</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-pink-600 transition-colors">
                    {OFFICIAL_LINKS.instagramHandle}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    PPS · 컬러 PPS 최신 시공 영상 & 숏폼 릴스 보러가기
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-gradient-to-tr group-hover:from-pink-500 group-hover:to-purple-600 group-hover:text-white text-slate-400 flex items-center justify-center transition-all shrink-0">
                <i className="ri-arrow-right-up-line text-base font-bold" />
              </div>
            </a>

            {/* Naver Blog Card */}
            <a
              href={OFFICIAL_LINKS.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#03C75A] text-white flex items-center justify-center text-xl font-black shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
                  N
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                      정밀 시공기 & 보험처리
                    </span>
                    <span className="text-xs font-bold text-slate-800">네이버 블로그</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {OFFICIAL_LINKS.blogName}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    판금도색, 조색 복원, 보험수리 Before & After 상세 스토리
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#03C75A] group-hover:text-white text-slate-400 flex items-center justify-center transition-all shrink-0">
                <i className="ri-arrow-right-up-line text-base font-bold" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── 3. Category Filter Tabs ── */}
      <section className="py-6 bg-gray-50 border-b border-gray-200/80 sticky top-16 sm:top-20 z-30 backdrop-blur-md bg-gray-50/95">
        <div className="mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/30 scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Dynamic Context Banner for Category */}
          {(selectedCategory === 'pps' || selectedCategory === 'color-pps') && (
            <div className="mt-4 p-3 rounded-xl bg-pink-50 border border-pink-200/80 flex items-center justify-between gap-3 text-xs text-pink-900">
              <div className="flex items-center gap-2">
                <i className="ri-instagram-line text-base text-pink-600 shrink-0" />
                <span>
                  <strong>PPS & 컬러 PPS</strong> 작업 영상 및 필오프(Peelable) 테스트는 <strong>공식 인스타그램</strong>에서 실시간 릴스로 매일 업데이트됩니다.
                </span>
              </div>
              <a
                href={OFFICIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full transition-all shrink-0 whitespace-nowrap shadow-sm"
              >
                인스타 피드 보기 ↗
              </a>
            </div>
          )}

          {selectedCategory === 'paint' && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between gap-3 text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-[#03C75A] text-white font-black text-[10px] flex items-center justify-center shrink-0">N</span>
                <span>
                  <strong>판금도색 & 수입차 사고수리</strong> Before & After 단계별 상세 복원 과정은 <strong>공식 네이버 블로그</strong>에서 확인하실 수 있습니다.
                </span>
              </div>
              <a
                href={OFFICIAL_LINKS.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-[#03C75A] hover:bg-[#02b350] text-white font-bold rounded-full transition-all shrink-0 whitespace-nowrap shadow-sm"
              >
                블로그 후기 보기 ↗
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. Portfolio Grid ── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col group cursor-pointer"
                  onClick={() => setActiveModalItem(item)}
                >
                  {/* Image Container */}
                  <div className="relative w-full h-64 overflow-hidden bg-black">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1.5 bg-black/70 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20">
                        {item.categoryName}
                      </span>
                    </div>

                    {/* External Channel Badge on Card */}
                    <div className="absolute top-4 right-4">
                      {item.linkType === 'instagram' ? (
                        <span className="px-2.5 py-1 bg-gradient-to-r from-purple-600/90 to-pink-600/90 text-white text-[10px] font-bold rounded-full backdrop-blur-md shadow flex items-center gap-1">
                          <i className="ri-instagram-line" />
                          <span>Instagram</span>
                        </span>
                      ) : item.linkType === 'blog' ? (
                        <span className="px-2.5 py-1 bg-[#03C75A]/95 text-white text-[10px] font-bold rounded-full backdrop-blur-md shadow flex items-center gap-1">
                          <span className="font-black text-[9px]">N</span>
                          <span>Blog</span>
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-primary mb-1.5 uppercase tracking-wider">
                        {item.carModel}
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-primary transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
                        {item.summary}
                      </p>
                    </div>

                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Action */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-xs font-bold text-gray-500 group-hover:text-primary transition-colors flex items-center gap-1">
                          {item.linkType === 'instagram' ? (
                            <>
                              <i className="ri-instagram-line text-pink-600" />
                              <span>인스타 시공 릴스 보기</span>
                            </>
                          ) : item.linkType === 'blog' ? (
                            <>
                              <span className="text-[#03C75A] font-black text-[11px]">N</span>
                              <span>블로그 상세 복원기</span>
                            </>
                          ) : (
                            <span>상세 시공기 보기</span>
                          )}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                          <i className="ri-arrow-right-up-line text-base font-bold" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── 5. Portfolio Bottom Consultation Banner ── */}
      <section className="py-20 sm:py-28 bg-[#111827] text-white text-center">
        <div className="mx-auto px-6 lg:px-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-5 tracking-tight">
              내 차량에 딱 맞는 시공 견적이 궁금하신가요?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-9 leading-relaxed max-w-2xl mx-auto">
              PPS부터 판금도색, 메디컬 정비, 디테일링까지 최고 수준의 마스터가 1:1 맞춤 견적을 안내해 드립니다.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigateToContact()}
                className="inline-flex items-center gap-2.5 px-9 py-4 bg-primary hover:bg-primary-dark text-white text-base font-bold rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
              >
                <span>포트폴리오 맞춤 견적 상담하기</span>
                <i className="ri-arrow-right-line text-lg" />
              </button>
              <a
                href={OFFICIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 hover:bg-white hover:text-dark text-white text-base font-bold rounded-full border border-white/20 transition-all cursor-pointer"
              >
                <i className="ri-instagram-line text-pink-400" />
                <span>인스타그램 전체 시공기</span>
              </a>
              <a
                href={OFFICIAL_LINKS.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 hover:bg-white hover:text-dark text-white text-base font-bold rounded-full border border-white/20 transition-all cursor-pointer"
              >
                <span className="w-5 h-5 rounded bg-[#03C75A] text-white font-black text-xs flex items-center justify-center">N</span>
                <span>네이버 블로그 복원기</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. Detail Lightbox Modal ── */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Content Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-white rounded-[32px] overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="닫기"
              >
                <i className="ri-close-line text-2xl" />
              </button>

              {/* Modal Image */}
              <div className="relative w-full h-72 sm:h-80 bg-black shrink-0">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-4 left-6 flex items-center gap-2">
                  <span className="px-3.5 py-1.5 bg-primary text-white text-xs font-bold rounded-full shadow">
                    {activeModalItem.categoryName}
                  </span>
                  {activeModalItem.linkType === 'instagram' && (
                    <span className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full shadow flex items-center gap-1">
                      <i className="ri-instagram-line" /> Instagram 연동
                    </span>
                  )}
                  {activeModalItem.linkType === 'blog' && (
                    <span className="px-3 py-1.5 bg-[#03C75A] text-white text-xs font-bold rounded-full shadow flex items-center gap-1">
                      <span className="font-black text-[10px]">N</span> Naver Blog 연동
                    </span>
                  )}
                </div>
              </div>

              {/* Modal Details Body */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1">
                <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">
                  {activeModalItem.carModel}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
                  {activeModalItem.title}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed mb-6 font-medium">
                  {activeModalItem.summary}
                </p>

                <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100">
                  <div className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                    주요 작업 내역 & 기술 포인트
                  </div>
                  <ul className="space-y-2.5">
                    {activeModalItem.details.map((det, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-sm text-gray-700 font-medium">
                        <i className="ri-checkbox-circle-fill text-primary text-base shrink-0 mt-0.5" />
                        <span>{det}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* External Post Direct Link Button if available */}
                {activeModalItem.linkUrl && (
                  <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {activeModalItem.linkType === 'instagram' ? (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white flex items-center justify-center text-xl shrink-0">
                          <i className="ri-instagram-line" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-[#03C75A] text-white flex items-center justify-center text-lg font-black shrink-0">
                          N
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          {activeModalItem.linkType === 'instagram'
                            ? '인스타그램 공식 시공 릴스/게시물'
                            : '네이버 블로그 상세 복원 포스팅'}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          실제 작업 과정 사진과 영상을 원문으로 바로 확인하실 수 있습니다.
                        </div>
                      </div>
                    </div>
                    <a
                      href={activeModalItem.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2 text-xs font-bold rounded-full text-white transition-all shrink-0 flex items-center gap-1.5 shadow ${
                        activeModalItem.linkType === 'instagram'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                          : 'bg-[#03C75A] hover:bg-[#02b350]'
                      }`}
                    >
                      <span>원문 보기</span>
                      <i className="ri-external-link-line" />
                    </a>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      const serviceTarget =
                        activeModalItem.category === 'repair'
                          ? '수입차 정비'
                          : activeModalItem.category === 'paint'
                          ? '판금도색'
                          : activeModalItem.category === 'detailing'
                          ? '디테일링'
                          : 'PPS (Paint Protection Spray)';
                      setActiveModalItem(null);
                      onNavigateToContact(serviceTarget);
                    }}
                    className="flex-1 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-full transition-all text-center cursor-pointer shadow-lg shadow-primary/30"
                  >
                    이 시공으로 맞춤 견적 문의하기
                  </button>
                  <button
                    onClick={() => setActiveModalItem(null)}
                    className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-full transition-all text-center cursor-pointer"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
