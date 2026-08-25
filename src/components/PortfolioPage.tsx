import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PortfolioItem {
  id: string;
  title: string;
  category: 'lamborghini' | 'ferrari' | 'maybach' | 'bentley_rr' | 'bmw_audi';
  categoryLabel: string;
  image: string;
  desc: string;
}

export const PortfolioPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);

  const portfolioItems: PortfolioItem[] = [
    {
      id: 'urus_1',
      title: 'LAMBORGHINI URUS 컬러PPS 시공',
      category: 'lamborghini',
      categoryLabel: 'Lamborghini',
      image: '/images/portfolio_urus_detail.png',
      desc: '화이트 우루스가 도색보다 더 도색 같은 바이올렛 패시파이(VIOLA PASIFAE)로 완성되었습니다.',
    },
    {
      id: 'urus_2',
      title: 'LAMBORGHINI URUS 컬러PPS 후면 컷',
      category: 'lamborghini',
      categoryLabel: 'Lamborghini',
      image: '/images/portfolio_urus_rear.jpg',
      desc: '우루스 250㎛ 이상 두께의 도장 보호 레이어와 하이그로시 립 완성 컷',
    },
    {
      id: 'aventador_1',
      title: 'LAMBORGHINI AVENTADOR SVJ 컬러PPS',
      category: 'lamborghini',
      categoryLabel: 'Lamborghini',
      image: '/images/portfolio_aventador_svj.jpg',
      desc: '기존 골드 컬러에서 펄 블랙 전체 컬러 체인지 및 원도장 완전 보호 시공 사례',
    },
    {
      id: 'aventador_2',
      title: 'LAMBORGHINI AVENTADOR SVJ 전면 대각선 컷',
      category: 'lamborghini',
      categoryLabel: 'Lamborghini',
      image: '/images/portfolio_aventador_side.jpg',
      desc: 'SVJ 특유의 에어로다이나믹 라인과 단차 없는 완벽한 이질감 제로 시공',
    },
    {
      id: 'maybach_1',
      title: 'MAYBACH TWO-TONE 컬러PPS 시공',
      category: 'maybach',
      categoryLabel: 'Maybach',
      image: '/images/portfolio_maybach_detail.png',
      desc: '상단 바디에 컬러PPS 적용으로 순정 듀오톤 표현과 마이바흐 품격 완성',
    },
    {
      id: 'maybach_2',
      title: 'MAYBACH TWO-TONE 엠블럼 디테일',
      category: 'maybach',
      categoryLabel: 'Maybach',
      image: '/images/portfolio_maybach_closeUp.jpg',
      desc: '엠블럼 및 테일램프 틈새 경계 라인 완벽 일체감 시공 디테일',
    },
    {
      id: 'ferrari_1',
      title: 'Ferrari Portofino M 컬러PPS 시공',
      category: 'ferrari',
      categoryLabel: 'Ferrari',
      image: '/images/portfolio_ferrari_portofino.png',
      desc: '블루에서 딥 레드 포르토피노 M으로 들뜸 없는 도장 퀄리티 시공',
    },
    {
      id: 'ferrari_2',
      title: 'Ferrari Portofino 휀더 엠블럼 디테일',
      category: 'ferrari',
      categoryLabel: 'Ferrari',
      image: '/images/portfolio_ferrari_emblem.png',
      desc: 'SF 엠블럼과 휀더 라인의 눈부신 거울 광택감 완성',
    },
    {
      id: 'ferrari_3',
      title: 'Ferrari Lusso 무광PPS 시공',
      category: 'ferrari',
      categoryLabel: 'Ferrari',
      image: '/images/portfolio_ferrari_lusso.png',
      desc: '매트 블랙 무광 특유의 묵직한 카리스마와 완벽한 방오 성능 시공',
    },
    {
      id: 'bentley_1',
      title: 'Bentley Continental GT Chrome Delete',
      category: 'bentley_rr',
      categoryLabel: 'Bentley & Rolls-Royce',
      image: '/images/portfolio_bentley_gt.png',
      desc: '크롬 몰딩 및 헤드라이트 베젤 블랙 크롬 딜리트 세련미 극대화 시공',
    },
    {
      id: 'rr_1',
      title: 'Rolls-Royce Cullinan PPS PORTFOLIO',
      category: 'bentley_rr',
      categoryLabel: 'Bentley & Rolls-Royce',
      image: '/images/portfolio_rolls_royce_cullinan.png',
      desc: '롤스로이스 컬리넌 코치라인 및 웅장한 전면 그릴 스프레이 보호막',
    },
    {
      id: 'bmw_1',
      title: 'BMW M3 E90 실버스톤 컬러PPS 시공',
      category: 'bmw_audi',
      categoryLabel: 'BMW & Audi',
      image: '/images/portfolio_bmw_m3_detail.png',
      desc: '실버스톤 특유의 반사광 표현과 정밀 마스킹 도장 시공 과정',
    },
    {
      id: 'bmw_2',
      title: 'BMW M3 E90 도어 안쪽 마감 디테일',
      category: 'bmw_audi',
      categoryLabel: 'BMW & Audi',
      image: '/images/portfolio_bmw_m3_door.jpg',
      desc: '기존 랩핑의 한계였던 도어 틈새 내부까지 완벽 컬러 변경 시공',
    },
    {
      id: 'audi_1',
      title: 'Audi Q7 PPS PORTFOLIO 시공',
      category: 'bmw_audi',
      categoryLabel: 'BMW & Audi',
      image: '/images/portfolio_audi_q7.png',
      desc: '스톤칩 무결점 방어를 위한 아우디 Q7 부스 스프레이 시공',
    },
  ];

  const filteredItems = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div className="w-full bg-[#050505] text-white pt-24 pb-20 font-sans min-h-screen">
      {/* ── Page Header ── */}
      <section className="py-16 px-6 sm:px-12 max-w-7xl mx-auto border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="text-red-500 font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 bg-red-500/10 rounded border border-red-500/20">
              Supercar & Luxury Works Showcase
            </span>
            <h1 className="text-4xl sm:text-6xl font-black font-mono uppercase tracking-tight mt-3 text-white">
              WORK <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">PORTFOLIO</span>
            </h1>
          </div>
          <p className="text-gray-400 text-sm sm:text-base max-w-md font-sans leading-relaxed">
            람보르기니, 페라리, 마이바흐, 롤스로이스 등 최고급 슈퍼카들의 완벽한 컬러PPS 및 보호 시공 레퍼런스를 직접 확인해보세요.
          </p>
        </motion.div>
      </section>

      {/* ── Category Filters ── */}
      <section className="py-10 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { id: 'all', label: '전체 보기 (ALL)' },
            { id: 'lamborghini', label: 'LAMBORGHINI' },
            { id: 'ferrari', label: 'FERRARI' },
            { id: 'maybach', label: 'MAYBACH' },
            { id: 'bentley_rr', label: 'BENTLEY & ROLLS-ROYCE' },
            { id: 'bmw_audi', label: 'BMW & AUDI' },
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white border-red-500 shadow-lg shadow-red-500/30'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Gallery Grid ── */}
      <section className="py-8 px-6 sm:px-12 max-w-7xl mx-auto">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map(item => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-2xl overflow-hidden bg-black/60 border border-white/15 cursor-pointer shadow-xl hover:shadow-[0_0_30px_rgba(255,42,16,0.3)] transition-all duration-500"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  <span className="absolute top-4 left-4 bg-red-600/80 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                    {item.categoryLabel}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2 font-mono">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-red-500 font-mono font-bold">
                    <span>자세히 보기</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── High-Res Modal ── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#0a0a0a] border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center font-bold text-xl border border-white/20 hover:bg-red-600 transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-black">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 sm:p-8 bg-[#0d0d0d] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-red-500 text-xs font-mono font-bold uppercase tracking-wider">
                    {selectedImage.categoryLabel}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black font-mono text-white mt-1">
                    {selectedImage.title}
                  </h3>
                  <p className="text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
                    {selectedImage.desc}
                  </p>
                </div>

                <a
                  href="#contact"
                  onClick={() => setSelectedImage(null)}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-amber-500 text-white rounded-xl font-mono text-xs font-extrabold uppercase tracking-wider hover:from-red-500 hover:to-amber-400 transition-all text-center shrink-0 shadow-lg shadow-red-600/30"
                >
                  동일 차종 시공 문의하기 →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioPage;
