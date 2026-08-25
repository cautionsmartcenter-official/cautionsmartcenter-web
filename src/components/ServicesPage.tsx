import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, CheckCircle2, Shield, Sparkles, Wrench, Palette, Search } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'repair' | 'paint' | 'pps' | 'detailing'>('pps');
  const [zoomImage, setZoomImage] = useState<{ src: string; title: string } | null>(null);

  const heroImages = {
    pps: {
      hero: '/images/readdy/service-hero-ai.jpg',
      detail: '/images/readdy/service-detail-ai-001.jpg',
      title: 'AI 로봇 PPS & 컬러PPS 시공 현장'
    },
    repair: {
      hero: '/images/readdy/service-hero-repair.jpg',
      detail: '/images/readdy/service-detail-repair-001.jpg',
      title: '수입차 전문 정비 및 엔진 진단'
    },
    paint: {
      hero: '/images/readdy/service-hero-paint.jpg',
      detail: '/images/readdy/service-detail-paint-001.jpg',
      title: '원적외선 도색 부스 및 정밀 조색'
    },
    detailing: {
      hero: '/images/readdy/service-hero-detailing.jpg',
      detail: '/images/readdy/service-detail-detailing-001.jpg',
      title: '특수 조명 하이엔드 광택 & 세라믹 코팅'
    }
  };

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
            <span className="text-red-500 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest px-3.5 py-1.5 bg-red-500/10 rounded-lg border border-red-500/30">
              Premium Solutions & Portfolio
            </span>
            <h1 className="text-4xl sm:text-6xl font-black font-mono uppercase tracking-tight mt-4 text-white">
              OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">SERVICES</span>
            </h1>
          </div>
          <p className="text-gray-300 text-base sm:text-lg max-w-lg font-sans leading-relaxed">
            최상급 수입차 정비부터 차세대 스프레이 PPS 보호 솔루션까지, 완벽한 퀄리티의 4대 프리미엄 외장 관리 케어를 경험해보세요.
          </p>
        </motion.div>
      </section>

      {/* ── 1. Service Portfolio Overview (service_portfolio.png) ── */}
      <section className="py-16 px-6 sm:px-12 max-w-7xl mx-auto">
        <motion.div
          className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative mb-14 group cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onClick={() => setZoomImage({ src: '/images/service_portfolio.png', title: '4대 프리미엄 서비스 종합 요약' })}
        >
          <img
            src="/images/service_portfolio.png"
            alt="Service Portfolio Overview"
            className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
          />
          <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
            <ZoomIn className="w-4 h-4 text-amber-400" />
            <span>이미지 확대해서 크게 보기</span>
          </div>
        </motion.div>

        {/* Interactive Tab Selectors */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16">
          {[
            { id: 'pps', label: '01. PPS | 컬러PPS 솔루션', icon: Shield },
            { id: 'repair', label: '02. 수입차 정비수리', icon: Wrench },
            { id: 'paint', label: '03. 판금도색', icon: Palette },
            { id: 'detailing', label: '04. 프리미엄 디테일링', icon: Sparkles },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 rounded-xl font-bold text-sm sm:text-base tracking-wide transition-all cursor-pointer border flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 via-amber-500 to-amber-400 text-white border-amber-400 shadow-xl shadow-red-600/30 scale-105'
                    : 'bg-white/5 text-gray-300 border-white/15 hover:text-white hover:bg-white/10 hover:border-white/30'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-amber-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* High-Res Service Hero Banner from Readdy */}
        <div className="mb-12 rounded-3xl overflow-hidden border border-white/15 shadow-2xl relative group aspect-[21/9] max-h-96 bg-black">
          <img
            src={heroImages[activeTab].hero}
            alt={heroImages[activeTab].title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-red-400 bg-red-500/20 px-3 py-1 rounded-full border border-red-500/30">
                PRO FACILITY & WORKSHOP
              </span>
              <h3 className="text-2xl sm:text-4xl font-black font-mono text-white mt-2">
                {heroImages[activeTab].title}
              </h3>
            </div>
            <div className="text-xs font-mono text-gray-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 w-fit">
              실제 코션 테크니컬 센터 현장
            </div>
          </div>
        </div>

        {/* Tab Content Cards */}
        <AnimatePresence mode="wait">
          {activeTab === 'pps' && (
            <motion.div
              key="pps"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-16"
            >
              {/* ── HIGH VISIBILITY HTML UI: PPS & COLOR PPS SUMMARY ── */}
              <div className="bg-gradient-to-b from-[#111113] to-[#08080a] border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="text-center max-w-3xl mx-auto mb-10">
                  <span className="text-amber-400 font-mono text-sm font-bold uppercase tracking-widest px-3 py-1 bg-amber-400/10 rounded-full border border-amber-400/20">
                    NEXT-GENERATION PAINT PROTECTION
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 font-mono">
                    PPS &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">컬러PPS SOLUTION</span>
                  </h2>
                  <p className="text-gray-300 text-base sm:text-lg mt-4 leading-relaxed font-sans">
                    AI 로봇 기술로 구현하는 차세대 페인트 보호 시스템입니다.<br className="hidden sm:block" />
                    기존 필름 PPS와 랩핑을 뛰어넘는 프리미엄 솔루션으로 완벽한 페인트 보호를 제공합니다.
                  </p>
                </div>

                {/* 2-Column Solution Cards with Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* PPS 투명 보호 카드 */}
                  <div className="bg-black/60 border border-white/15 rounded-2xl p-6 sm:p-8 hover:border-amber-400/50 transition-all shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center mb-6 shadow-lg">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2 font-mono">
                        PPS <span className="text-amber-400 text-lg font-normal">(Paint Protection Spray)</span>
                      </h3>
                      <p className="text-red-400 font-semibold text-sm mb-4">투명 도장 보호 솔루션</p>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                        원형 도장 위에 직접 코팅 레이어를 형성하여 필름의 이질감 없이 본연의 질감을 완벽히 보존합니다.
                      </p>
                      <ul className="space-y-3 border-t border-white/10 pt-4 text-gray-200 text-sm sm:text-base">
                        <li className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                          <span>굴곡이 심한 부위도 들뜸 없는 완벽 시공</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                          <span>순정 도장과 동일한 깊은 광택 및 오렌지필</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-6 rounded-xl overflow-hidden aspect-[16/9] border border-white/10">
                      <img src="/images/readdy/service-detail-ai-img.jpg" alt="PPS 시공 샷" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* 컬러 PPS 보호 카드 */}
                  <div className="bg-black/60 border border-white/15 rounded-2xl p-6 sm:p-8 hover:border-red-500/50 transition-all shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center mb-6 shadow-lg">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2 font-mono">
                        컬러PPS <span className="text-red-400 text-lg font-normal">(Paint Protection Spray)</span>
                      </h3>
                      <p className="text-amber-400 font-semibold text-sm mb-4">컬러 체인지 + 보호 솔루션</p>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                        랩핑의 색상 변경 효과와 PPS의 강력한 보호 성능을 결합했습니다. 순정 도색 수준의 높은 퀄리티를 제공합니다.
                      </p>
                      <ul className="space-y-3 border-t border-white/10 pt-4 text-gray-200 text-sm sm:text-base">
                        <li className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
                          <span>도어 틈새 내부까지 단차 없는 원도장급 컬러 체인지</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
                          <span>원상복구 시 순정 페인트 손상 없이 완벽 제거</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-6 rounded-xl overflow-hidden aspect-[16/9] border border-white/10">
                      <img src="/images/readdy/service-ai-001.jpg" alt="컬러PPS 시공 샷" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                {/* Original Image Zoom Banner */}
                <div 
                  onClick={() => setZoomImage({ src: '/images/service_pps_solution.png', title: 'PPS & 컬러PPS 솔루션 상세안내' })}
                  className="mt-8 p-4 bg-white/5 border border-white/10 hover:border-amber-400/40 rounded-xl flex items-center justify-between cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 text-amber-400" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-300">원본 인포그래픽 이미지 크게 보기</span>
                  </div>
                  <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">클릭하여 확대 🔍</span>
                </div>
              </div>

              {/* ── WHY PAINT BASED HTML CARD ── */}
              <div className="bg-[#0f0f12] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl">
                <div className="text-center max-w-3xl mx-auto mb-10">
                  <h2 className="text-2xl sm:text-4xl font-black text-white font-mono">
                    왜 <span className="text-amber-400">'필름'</span>이 아니라 <span className="text-red-500">'도장'</span> 기반인가요?
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base mt-3 leading-relaxed">
                    PPS는 단순 코팅이나 필름이 아닙니다. 도장 두께 측정 → 표면 정밀 연마 → 클리어층 안정화 → 보호 레이어 적용까지<br className="hidden sm:block" />
                    이어지는 단계형 시스템으로, 기존 도장 컨디션을 복원한 뒤 보호를 진행하는 구조입니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-black/50 border border-white/10 rounded-2xl p-6 text-center hover:border-amber-400/50 transition-all">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 font-black text-xl">
                      01
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">이질감 최소화</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      필름 경계나 두께감에 대한 부담을 없앴으며, 몰딩·곡면 부위도 들뜸 가능성이 전혀 없습니다.
                    </p>
                  </div>

                  <div className="bg-black/50 border border-white/10 rounded-2xl p-6 text-center hover:border-amber-400/50 transition-all">
                    <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-4 font-black text-xl">
                      02
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">유지관리 단순화</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      손상 부위 레이어 부분 보수 및 재형성이 가능하며, 광택 질감을 오랫동안 지속 유지합니다.
                    </p>
                  </div>

                  <div className="bg-black/50 border border-white/10 rounded-2xl p-6 text-center hover:border-amber-400/50 transition-all">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 font-black text-xl">
                      03
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">제거 후 컨디션</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      보호 레이어만 자체 분리되어 본드 자국 및 접착 잔여물이 남지 않으며 원도장을 완전 보존합니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── HIGH-CONTRAST READABLE COMPARISON TABLES ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Table 1: PPS vs PPF */}
                <div className="bg-[#0c0c0e] border border-white/20 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2">
                        <Shield className="w-6 h-6 text-amber-400" />
                        <span>보호 솔루션 비교 <span className="text-amber-400">(PPS vs PPF)</span></span>
                      </h3>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-white/20 bg-white/5">
                            <th className="p-3 font-bold text-gray-300 w-1/4">구분</th>
                            <th className="p-3 font-bold text-amber-400 bg-amber-500/10 w-3/8">PPS (스프레이 방식)</th>
                            <th className="p-3 font-bold text-gray-400 w-3/8">PPF (필름 방식)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 text-gray-200">
                          <tr>
                            <td className="p-3 font-semibold text-gray-400">주요 특징</td>
                            <td className="p-3 text-amber-300 font-semibold bg-amber-500/5">원형 도장 위 직접 코팅 레이어 형성</td>
                            <td className="p-3 text-gray-300">비닐/우레탄 필름 재단 후 부착</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold text-gray-400">강점</td>
                            <td className="p-3 text-amber-300 font-semibold bg-amber-500/5">들뜸 이질감 제로, 내구성 및 광택 우수</td>
                            <td className="p-3 text-gray-300">구역별 부착 수월하나 황변 가능성</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold text-gray-400">추천 대상</td>
                            <td className="p-3 text-amber-300 font-semibold bg-amber-500/5">순정 도장 변형 없이 완벽 보호 희망 고객</td>
                            <td className="p-3 text-gray-300">일반적 생활 스크래치 방어 희망 고객</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold text-gray-400">마감 디테일</td>
                            <td className="p-3 text-amber-300 font-semibold bg-amber-500/5">엣지 라인 경계가 없는 완벽한 일체감</td>
                            <td className="p-3 text-gray-300">필름 단면 테두리에 때가 낄 수 있음</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Table 2: Color PPS vs Wrapping */}
                <div className="bg-[#0c0c0e] border border-white/20 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-red-500" />
                        <span>컬러 솔루션 비교 <span className="text-red-500">(컬러PPS vs 랩핑)</span></span>
                      </h3>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-white/20 bg-white/5">
                            <th className="p-3 font-bold text-gray-300 w-1/4">구분</th>
                            <th className="p-3 font-bold text-red-400 bg-red-500/10 w-3/8">컬러PPS (스프레이)</th>
                            <th className="p-3 font-bold text-gray-400 w-3/8">컬러 랩핑 (필름)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 text-gray-200">
                          <tr>
                            <td className="p-3 font-semibold text-gray-400">색상 표현</td>
                            <td className="p-3 text-red-300 font-semibold bg-red-500/5">깊이 있는 순정 컬러감의 프리미엄 도색 효과</td>
                            <td className="p-3 text-gray-300">필름 질감 특유의 인위적인 무드</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold text-gray-400">마감 퀄리티</td>
                            <td className="p-3 text-red-300 font-semibold bg-red-500/5">틈새까지 전색하여 원도장 노출 없음</td>
                            <td className="p-3 text-gray-300">모서리/구석 부위 기존 색상 노출 위험</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold text-gray-400">보호 기능</td>
                            <td className="p-3 text-red-300 font-semibold bg-red-500/5">고두께 보호막 생성으로 방오/스톤칩 방어</td>
                            <td className="p-3 text-gray-300">얇은 필름 스크래치 수준의 최소 보호</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold text-gray-400">원상 복구</td>
                            <td className="p-3 text-red-300 font-semibold bg-red-500/5">도장면 손상 없는 미세 페일 필링 떼어냄</td>
                            <td className="p-3 text-gray-300">필름 제거 시 접착제 잔여물 제거 작업 필요</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'repair' && (
            <motion.div
              key="repair"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div 
                className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl cursor-pointer group relative"
                onClick={() => setZoomImage({ src: '/images/service_import_repair.png', title: '수입차 정비수리 상세안내' })}
              >
                <img
                  src="/images/service_import_repair.png"
                  alt="수입차 정비수리"
                  className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                />
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2">
                  <ZoomIn className="w-4 h-4 text-amber-400" />
                  <span>이미지 크게 보기 🔍</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'paint' && (
            <motion.div
              key="paint"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div 
                className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl cursor-pointer group relative"
                onClick={() => setZoomImage({ src: '/images/service_body_paint.png', title: '판금도색 상세안내' })}
              >
                <img
                  src="/images/service_body_paint.png"
                  alt="판금도색"
                  className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                />
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2">
                  <ZoomIn className="w-4 h-4 text-amber-400" />
                  <span>이미지 크게 보기 🔍</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'detailing' && (
            <motion.div
              key="detailing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              <div 
                className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl cursor-pointer group relative"
                onClick={() => setZoomImage({ src: '/images/service_detailing.png', title: 'Premium Detailing 상세안내' })}
              >
                <img
                  src="/images/service_detailing.png"
                  alt="Premium Detailing"
                  className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                />
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2">
                  <ZoomIn className="w-4 h-4 text-amber-400" />
                  <span>이미지 크게 보기 🔍</span>
                </div>
              </div>

              <div 
                className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl cursor-pointer group relative"
                onClick={() => setZoomImage({ src: '/images/total_detailing_detail.png', title: 'Total Detailing 4대 작업 상세안내' })}
              >
                <img
                  src="/images/total_detailing_detail.png"
                  alt="Total Detailing 4대 작업"
                  className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                />
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2">
                  <ZoomIn className="w-4 h-4 text-amber-400" />
                  <span>이미지 크게 보기 🔍</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── IMAGE ZOOM LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
          >
            <div 
              onClick={e => e.stopPropagation()}
              className="relative max-w-6xl w-full max-h-[90vh] bg-[#0d0d0f] border border-white/20 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/15 bg-black/50">
                <h4 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <ZoomIn className="w-5 h-5 text-amber-400" />
                  <span>{zoomImage.title}</span>
                </h4>
                <button
                  onClick={() => setZoomImage(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Modal Image Body */}
              <div className="overflow-auto p-4 flex-1 flex items-center justify-center bg-black/80">
                <img
                  src={zoomImage.src}
                  alt={zoomImage.title}
                  className="max-w-full h-auto object-contain rounded-lg shadow-2xl"
                />
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t border-white/15 bg-black/50 text-center text-xs text-gray-400">
                마우스 휠이나 터치로 확대/축소하거나 닫기 버튼(✕)을 클릭하세요.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesPage;
