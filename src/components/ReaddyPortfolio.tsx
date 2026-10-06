import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA, OFFICIAL_LINKS, PortfolioItem } from '../config/portfolioData';

export type { PortfolioItem };

const CATEGORIES = [
  { id: 'maybach-twotone', name: '마이바흐 투톤 PPS' },
  { id: 'color-pps', name: '컬러 PPS' },
  { id: 'pps', name: '투명 PPS' },
  { id: 'paint', name: '판금도색' },
  { id: 'repair', name: '정비수리' }
];

interface ReaddyPortfolioProps {
  onNavigateToContact: (serviceName?: string) => void;
}

// ── 카드 내부 인터랙티브 사진 슬라이더 컴포넌트 ──
const PortfolioCard: React.FC<{
  item: PortfolioItem;
  onOpenModal: (item: PortfolioItem, initialIndex?: number) => void;
  onNavigateToContact: (serviceName?: string) => void;
}> = ({ item, onOpenModal, onNavigateToContact }) => {
  const images = item.images && item.images.length > 0 ? item.images : [item.image];
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentIdx(index);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
    >
      {/* ── 1. Image Slider Area (사진 클릭 시 한 장씩 넘어감) ── */}
      <div
        className="relative w-full aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer select-none"
        onClick={nextImage}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIdx}
            src={images[currentIdx]}
            alt={`${item.title} - 사진 ${currentIdx + 1}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full h-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Gradient Overlay for Top Badges */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-10 pointer-events-none">
          <span className="px-3 py-1 bg-black/75 backdrop-blur-md text-white text-[11px] font-bold rounded-full border border-white/20 shadow-sm">
            {item.categoryName}
          </span>
          <span className="px-2 py-0.5 bg-emerald-500/90 text-white text-[10px] font-bold rounded-full shadow-sm">
            번호판 정품인증
          </span>
        </div>

        {/* Top Right Channel Badge */}
        <div className="absolute top-3.5 right-3.5 z-10">
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

        {/* Prev / Next Arrow Navigation (hover or touch) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="이전 사진"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-95 z-10 cursor-pointer shadow-md backdrop-blur-sm"
            >
              <i className="ri-arrow-left-s-line text-lg font-bold" />
            </button>
            <button
              onClick={nextImage}
              aria-label="다음 사진"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-95 z-10 cursor-pointer shadow-md backdrop-blur-sm"
            >
              <i className="ri-arrow-right-s-line text-lg font-bold" />
            </button>
          </>
        )}

        {/* Bottom Bar: Photo Counter & Lightbox Expand Button */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/75 via-black/35 to-transparent flex items-center justify-between z-10 pointer-events-none">
          {/* Dots Indicator */}
          {images.length > 1 && (
            <div className="flex items-center gap-1 pointer-events-auto">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => selectImage(e, i)}
                  className={`transition-all rounded-full cursor-pointer ${
                    i === currentIdx
                      ? 'w-5 h-1.5 bg-white shadow-sm'
                      : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`${i + 1}번째 사진 보기`}
                />
              ))}
            </div>
          )}

          {/* Photo Counter Badge & Zoom Hint */}
          <div className="flex items-center gap-1.5 ml-auto pointer-events-auto">
            <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-bold tracking-wider border border-white/10 flex items-center gap-1">
              <i className="ri-image-line text-[11px]" />
              <span>{currentIdx + 1} / {images.length}</span>
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(item, currentIdx);
              }}
              title="사진 크게보기"
              className="w-6 h-6 rounded-full bg-white/20 hover:bg-white hover:text-dark text-white flex items-center justify-center transition-all backdrop-blur-sm cursor-pointer"
            >
              <i className="ri-fullscreen-line text-xs font-bold" />
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. Card Content Area ── */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              {item.carModel}
            </span>
            <button
              onClick={() => onOpenModal(item, currentIdx)}
              className="text-xs font-bold text-gray-400 hover:text-primary transition-colors flex items-center gap-0.5 cursor-pointer"
            >
              <span>상세보기</span>
              <i className="ri-arrow-right-s-line" />
            </button>
          </div>

          <h3
            onClick={() => onOpenModal(item, currentIdx)}
            className="text-lg sm:text-xl font-black text-gray-900 mb-2.5 hover:text-primary transition-colors leading-snug cursor-pointer"
          >
            {item.title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
            {item.summary}
          </p>
        </div>

        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {item.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-[11px] font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <button
            onClick={() => {
              const serviceTarget =
                item.category === 'repair'
                  ? '수입차 정비'
                  : item.category === 'paint'
                  ? '판금도색'
                  : item.category === 'maybach-twotone'
                  ? '마이바흐 투톤'
                  : item.category === 'color-pps'
                  ? '컬러PPS'
                  : '투명PPS';
              onNavigateToContact(serviceTarget);
            }}
            className="w-full flex items-center justify-between pt-3.5 border-t border-gray-100 cursor-pointer group/btn"
          >
            <span className="text-xs font-bold text-gray-600 group-hover/btn:text-primary transition-colors flex items-center gap-1.5">
              <i className="ri-message-3-line text-primary text-sm" />
              <span>이 시공 1:1 맞춤 견적 문의</span>
            </span>
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all">
              <i className="ri-arrow-right-up-line text-sm font-bold" />
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ── 메인 포트폴리오 섹션 ──
export const ReaddyPortfolio: React.FC<ReaddyPortfolioProps> = ({ onNavigateToContact }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('maybach-twotone');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);

  // 모달 열기 핸들러
  const handleOpenModal = (item: PortfolioItem, initialIndex = 0) => {
    setActiveModalItem(item);
    setModalImageIndex(initialIndex);
  };

  // 모달 키보드 단축키 (좌우 방향키, ESC)
  useEffect(() => {
    if (!activeModalItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalItem(null);
      } else if (e.key === 'ArrowRight') {
        const count = activeModalItem.images?.length || 1;
        setModalImageIndex((prev) => (prev + 1) % count);
      } else if (e.key === 'ArrowLeft') {
        const count = activeModalItem.images?.length || 1;
        setModalImageIndex((prev) => (prev - 1 + count) % count);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalItem]);

  const filteredItems = PORTFOLIO_DATA.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white text-dark">
      {/* ── 1. Portfolio Hero Banner ── */}
      <section className="relative min-h-[50vh] sm:min-h-[58vh] flex items-center justify-center bg-black overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="/images/portfolio/maybach/01.jpg"
            alt="Caution Portfolio Hero"
            className="w-full h-full object-cover object-center opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/85" />
        </div>

        <div className="relative z-10 mx-auto px-6 lg:px-12 max-w-5xl text-center pt-32 sm:pt-36 pb-16 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 bg-primary rounded-full mb-5 shadow-lg shadow-primary/30">
              <span className="text-xs font-bold text-white tracking-wider">
                100% 코션스마트센터 실제 시공 포트폴리오
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight tracking-tight">
              실차 시공 갤러리 & 포트폴리오
            </h1>
            <p className="text-sm sm:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed">
              코션스마트센터 정품 번호판이 장착된 실제 슈퍼카·하이엔드 수입차 시공 사례입니다.
              <br className="hidden sm:inline" />
              <strong>사진을 클릭하시면 한 장씩 다음 시공 컷으로 넘겨보실 수 있습니다.</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Official Social Channels Banner ── */}
      <section className="py-5 bg-slate-100/90 border-b border-slate-200">
        <div className="mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Instagram Card */}
            <a
              href={OFFICIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-2xl bg-white border border-slate-200 hover:border-pink-300 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white flex items-center justify-center text-xl shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform shrink-0">
                  <i className="ri-instagram-line" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-50 text-pink-600 border border-pink-100">
                      실시간 릴스 시공기
                    </span>
                    <span className="text-xs font-bold text-slate-800">공식 인스타그램</span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900 group-hover:text-pink-600 transition-colors">
                    {OFFICIAL_LINKS.instagramHandle}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    PPS · 투톤 마이바흐 · 컬러 PPS 최신 시공 영상 보러가기
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-gradient-to-tr group-hover:from-pink-500 group-hover:to-purple-600 group-hover:text-white text-slate-400 flex items-center justify-center transition-all shrink-0">
                <i className="ri-arrow-right-up-line text-sm font-bold" />
              </div>
            </a>

            {/* Naver Blog Card */}
            <a
              href={OFFICIAL_LINKS.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#03C75A] text-white flex items-center justify-center text-lg font-black shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
                  N
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                      정밀 시공기 & 보험처리
                    </span>
                    <span className="text-xs font-bold text-slate-800">네이버 블로그</span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {OFFICIAL_LINKS.blogName}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    판금도색, 조색 복원, 보험수리 Before & After 상세 스토리
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#03C75A] group-hover:text-white text-slate-400 flex items-center justify-center transition-all shrink-0">
                <i className="ri-arrow-right-up-line text-sm font-bold" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── 3. Category Filter Tabs (디테일링 제외, 정비수리 유지) ── */}
      <section className="py-5 bg-gray-50 border-b border-gray-200/80 sticky top-16 sm:top-20 z-30 backdrop-blur-md bg-gray-50/95">
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

          {/* Interactive Hint Banner */}
          <div className="mt-3 text-center">
            <span className="text-[11px] text-gray-500 font-medium inline-flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-full border border-gray-200/60 shadow-xs">
              <i className="ri-cursor-line text-primary" />
              <span>카드의 <strong>사진을 클릭</strong>하시면 다음 사진으로 넘어갑니다 (좌우 화살표로도 이동 가능)</span>
            </span>
          </div>
        </div>
      </section>

      {/* ── 4. Portfolio Grid (코션 번호판 장착 실사) ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  onOpenModal={handleOpenModal}
                  onNavigateToContact={onNavigateToContact}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── 5. Bottom Consultation Banner ── */}
      <section className="py-20 bg-[#111827] text-white text-center">
        <div className="mx-auto px-6 lg:px-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">
              내 차량에 딱 맞는 시공 견적이 궁금하신가요?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              PPS부터 컬러 PPS 투톤, 판금도색 사고수리, 정밀 메카닉 정비까지 최고 수준의 마스터가 1:1 맞춤 견적을 안내해 드립니다.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <button
                onClick={() => onNavigateToContact()}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-dark text-white text-sm sm:text-base font-bold rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
              >
                <span>포트폴리오 맞춤 견적 상담하기</span>
                <i className="ri-arrow-right-line text-lg" />
              </button>
              <a
                href={OFFICIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white hover:text-dark text-white text-sm sm:text-base font-bold rounded-full border border-white/20 transition-all cursor-pointer"
              >
                <i className="ri-instagram-line text-pink-400" />
                <span>인스타그램 전체 시공기</span>
              </a>
              <a
                href={OFFICIAL_LINKS.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white hover:text-dark text-white text-sm sm:text-base font-bold rounded-full border border-white/20 transition-all cursor-pointer"
              >
                <span className="w-4 h-4 rounded bg-[#03C75A] text-white font-black text-[10px] flex items-center justify-center">N</span>
                <span>네이버 블로그 복원기</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. Fullscreen Lightbox Modal (사진 클릭 및 넘김 지원) ── */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalItem(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col"
            >
              {/* Top Close Button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                aria-label="닫기"
              >
                <i className="ri-close-line text-2xl" />
              </button>

              {/* Modal Main Image with Click-to-Next Slider */}
              {(() => {
                const modalImages =
                  activeModalItem.images && activeModalItem.images.length > 0
                    ? activeModalItem.images
                    : [activeModalItem.image];
                const activeImg = modalImages[modalImageIndex] || modalImages[0];

                const handleNext = () => {
                  setModalImageIndex((prev) => (prev + 1) % modalImages.length);
                };

                const handlePrev = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  setModalImageIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
                };

                return (
                  <div className="relative w-full h-80 sm:h-96 md:h-[420px] bg-black select-none shrink-0 overflow-hidden">
                    <div
                      className="w-full h-full flex items-center justify-center cursor-pointer"
                      onClick={handleNext}
                      title="클릭하면 다음 사진으로 넘어갑니다"
                    >
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={modalImageIndex}
                          src={activeImg}
                          alt={`${activeModalItem.title} - 큰 이미지 ${modalImageIndex + 1}`}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.25 }}
                          className="w-full h-full object-contain object-center"
                        />
                      </AnimatePresence>
                    </div>

                    {/* Modal Prev / Next Buttons */}
                    {modalImages.length > 1 && (
                      <>
                        <button
                          onClick={handlePrev}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer shadow-lg z-20"
                          aria-label="이전 사진"
                        >
                          <i className="ri-arrow-left-s-line text-2xl font-bold" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer shadow-lg z-20"
                          aria-label="다음 사진"
                        >
                          <i className="ri-arrow-right-s-line text-2xl font-bold" />
                        </button>
                      </>
                    )}

                    {/* Modal Floating Badges */}
                    <div className="absolute top-4 left-5 flex items-center gap-2 z-20 pointer-events-none">
                      <span className="px-3.5 py-1.5 bg-primary text-white text-xs font-bold rounded-full shadow">
                        {activeModalItem.categoryName}
                      </span>
                      <span className="px-3 py-1.5 bg-black/70 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20 shadow">
                        {modalImageIndex + 1} / {modalImages.length}
                      </span>
                    </div>

                    {/* Bottom Thumbnail Strip */}
                    {modalImages.length > 1 && (
                      <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-2 z-20 px-4 overflow-x-auto no-scrollbar py-1">
                        {modalImages.map((thumb, tIdx) => (
                          <button
                            key={tIdx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalImageIndex(tIdx);
                            }}
                            className={`w-12 h-9 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer shadow ${
                              tIdx === modalImageIndex
                                ? 'border-primary scale-110 shadow-lg'
                                : 'border-white/40 opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img src={thumb} alt="썸네일" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Modal Details Body */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1">
                <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">
                  {activeModalItem.carModel}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-3">
                  {activeModalItem.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 font-medium">
                  {activeModalItem.summary}
                </p>

                <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100">
                  <div className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                    주요 작업 내역 & 기술 포인트
                  </div>
                  <ul className="space-y-2.5">
                    {activeModalItem.details.map((det, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 font-medium">
                        <i className="ri-checkbox-circle-fill text-primary text-base shrink-0 mt-0.5" />
                        <span>{det}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      const serviceTarget =
                        activeModalItem.category === 'repair'
                          ? '수입차 정비'
                          : activeModalItem.category === 'paint'
                          ? '판금도색'
                          : activeModalItem.category === 'color-pps'
                          ? '컬러PPS'
                          : '투명PPS';
                      setActiveModalItem(null);
                      onNavigateToContact(serviceTarget);
                    }}
                    className="flex-1 py-3.5 sm:py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-full transition-all text-center cursor-pointer shadow-lg shadow-primary/30 text-sm sm:text-base"
                  >
                    이 시공으로 맞춤 견적 문의하기
                  </button>
                  <button
                    onClick={() => setActiveModalItem(null)}
                    className="px-6 py-3.5 sm:py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-full transition-all text-center cursor-pointer text-sm sm:text-base"
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
