import React from 'react';
import { motion } from 'framer-motion';
import { Bot, ShieldCheck, Award, Cpu } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full bg-[#050505] text-white pt-24 pb-20 font-sans min-h-screen">
      {/* ── Page Header ── */}
      <section className="relative py-16 px-6 sm:px-12 max-w-7xl mx-auto border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="text-red-500 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest px-3.5 py-1.5 bg-red-500/10 rounded-lg border border-red-500/30">
              Company Overview & Heritage
            </span>
            <h1 className="text-4xl sm:text-6xl font-black font-mono uppercase tracking-tight mt-4 text-white">
              ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">CAUTION</span> SMART CENTER
            </h1>
          </div>
          <p className="text-gray-300 text-base sm:text-lg max-w-md font-sans leading-relaxed">
            24년의 장인정신과 세계 최초 AI 로봇 도장/보호 기술의 결합으로 슈퍼카 및 프리미엄 수입차 외장케어의 새로운 표준을 제시합니다.
          </p>
        </motion.div>
      </section>

      {/* ── Readdy Brand Hero Showcase Banner ── */}
      <section className="py-12 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative aspect-[21/9] max-h-[460px] group bg-black">
          <img
            src="/images/readdy/brand-hero-001.jpg"
            alt="Caution Smart Center HQ Building"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                STATE-OF-THE-ART FACILITY
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-mono text-white mt-2">
                혁신으로 만드는 완벽한 차량 관리
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm mt-1 max-w-xl font-sans">
                경기도 광주시 태재로 26 (신현동)에 위치한 코션스마트센터 최첨단 AI 테크니컬 센터
              </p>
            </div>
            <div className="bg-red-600 px-5 py-3 rounded-2xl text-white font-mono font-black text-center shadow-lg shadow-red-600/40">
              <div className="text-2xl sm:text-3xl">24+</div>
              <div className="text-[10px] uppercase tracking-wider text-white/90">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 1. Welcome to Our Company & Team Section ── */}
      <section className="py-16 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            className="lg:col-span-6 rounded-3xl overflow-hidden border border-white/15 shadow-[0_0_50px_rgba(255,42,16,0.15)] relative group bg-black"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="/images/readdy/brand-story-team-001.jpg"
              alt="Caution Master Technicians Team"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 aspect-[4/3]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs font-mono text-gray-300 flex items-center justify-between">
              <span>수입차 공인 마스터 엔지니어 팀</span>
              <span className="text-amber-400 font-bold">1:1 전담 시공</span>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-6 flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
              NEW PARADIGM OF CAR CARE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-mono tracking-tight leading-tight">
              차량 관리의 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">
                새로운 패러다임
              </span>
            </h2>
            <blockquote className="text-amber-400 text-lg sm:text-xl font-bold border-l-4 border-amber-400 pl-4 py-1 italic">
              &quot;차량의 가치를 지키고 되살리는 기술 중심 서비스 기업&quot;
            </blockquote>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              CAUTION SMART CENTER는 수입차 전문 정비의 오랜 경험과 노하우를 바탕으로 설립되었습니다. 우리는 단순한 정비를 넘어, 차량의 가치를 지키고 높이는 토탈 케어 솔루션을 제공합니다.
            </p>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              특히 AI 로봇 기술을 도입한 PPS/PPCS 서비스는 기존의 페인트 보호 방식을 혁신적으로 개선했습니다. 정밀한 센서와 알고리즘을 통해 균일하고 완벽한 코팅을 실현하며 사람의 손으로는 불가능한 수준의 품질을 보장합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. AI Tech Center Multi-Arm System Banner ── */}
      <section className="py-16 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="rounded-3xl overflow-hidden border border-white/15 shadow-2xl relative aspect-[21/9] max-h-96 group bg-black mb-12">
          <img
            src="/images/readdy/brand-tech-main-001.jpg"
            alt="Futuristic AI Robotic System"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-red-400 bg-red-500/20 px-3 py-1 rounded-full border border-red-500/30">
                PATENTED AI ROBOT CELL
              </span>
              <h3 className="text-2xl sm:text-4xl font-black font-mono text-white mt-2">
                첨단 기술력과 장인 노하우의 완벽한 조화
              </h3>
            </div>
            <div className="text-xs font-mono text-amber-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
              6축 다관절 자동화 스프레이 셀
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-950 border border-white/10 hover:border-red-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-4">
              <Bot className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold font-mono text-white mb-2">AI 로봇 시스템</h4>
            <p className="text-xs text-gray-400 leading-relaxed">정밀한 센서와 알고리즘으로 완벽한 시공을 실현합니다.</p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-950 border border-white/10 hover:border-amber-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold font-mono text-white mb-2">실시간 모니터링</h4>
            <p className="text-xs text-gray-400 leading-relaxed">작업 전 과정을 실시간으로 모니터링하고 품질을 관리합니다.</p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-950 border border-white/10 hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold font-mono text-white mb-2">철저한 품질 보증</h4>
            <p className="text-xs text-gray-400 leading-relaxed">철저한 품질 검수와 장기 보증으로 안심을 제공합니다.</p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-950 border border-white/10 hover:border-blue-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold font-mono text-white mb-2">효율적인 작업</h4>
            <p className="text-xs text-gray-400 leading-relaxed">자동화 시스템으로 작업 시간을 단축하고 효율을 높입니다.</p>
          </div>
        </div>
      </section>

      {/* ── 3. Our History Banner Section (history.png) ── */}
      <section className="py-20 bg-gradient-to-b from-black via-[#0c0505] to-black border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white mb-4">
              OUR HISTORY
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              2007년부터 이어져 온 기술 혁신과 글로벌 독점 파트너십의 역사
            </p>
          </div>

          <motion.div
            className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="/images/history.png"
              alt="Our History timeline"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
