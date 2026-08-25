import React from 'react';
import { motion } from 'framer-motion';

export const IntroductionSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-black text-white font-sans overflow-hidden flex flex-col justify-center">
      {/* 백그라운드 스플릿 컨테이너 (PC 대형 화면 기준 60% Black / 40% Red-Orange) */}
      <div className="absolute inset-0 flex flex-col lg:flex-row pointer-events-none z-0">
        {/* Left Dark Background */}
        <div className="w-full lg:w-[58%] h-full bg-[#050505] relative">
          {/* Bottom Left Dot Pattern Overlay */}
          <div
            className="absolute bottom-4 left-4 w-48 h-48 pointer-events-none opacity-40"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2px)',
              backgroundSize: '14px 14px',
            }}
          />
        </div>

        {/* Right Red-Orange Vivid Background */}
        <div className="w-full lg:w-[42%] h-full bg-gradient-to-br from-[#FF001E] via-[#FF2A10] to-[#FF4D00] relative">
          {/* Top Left Dot Pattern Overlay on Red section */}
          <div
            className="absolute top-6 left-6 w-56 h-36 pointer-events-none opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 3px, transparent 3px)',
              backgroundSize: '16px 16px',
            }}
          />
        </div>
      </div>

      {/* 메인 메인 컨텐츠 영역 */}
      <div className="relative z-10 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-12 py-12 lg:py-20 flex flex-col min-h-screen justify-between">
        


        {/* 본문 콘텐츠: 좌측 이력 & 우측 이미지 카스케이드 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
          
          {/* LEFT COLUMN: INTRODUCTION & HISTORY (Col 7) */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center pr-0 lg:pr-8"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Section Header */}
            <h1 className="text-5xl sm:text-7xl lg:text-[84px] font-black tracking-tight leading-none uppercase font-mono mb-4 text-white drop-shadow-md">
              INTRODUCTION
            </h1>

            {/* Sub-headline */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-200 mb-8">
              자동차 외장관리 <span className="text-amber-400">24년</span>의 고집
            </h2>

            {/* History Block */}
            <div className="space-y-4 mb-10 text-sm sm:text-base text-gray-300">
              <p className="font-semibold text-base sm:text-lg text-white mb-3">
                국내 외장관리 시장을 선도해 온 독보적인 이력
              </p>
              
              <ul className="space-y-2.5 pl-1">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong className="text-white">2024 ~</strong> 코션스마트센터 설립 및 대표</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong className="text-white">2023 ~</strong> 엑소쉴드코리아 설립 및 대표</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong className="text-white">2007 ~</strong> Caution Korea 설립</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong className="text-white">2007</strong> 국내 최초 유리막코팅 1,000대 시공 달성</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong className="text-white">2006</strong> 일본 AZ ELECTRONIC 현지 교육 이수</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong className="text-white">2000</strong> 자동차 외장관리 브랜드샵 운영 시작</span>
                </li>
              </ul>
            </div>

            {/* Highlighted Slogan */}
            <motion.div
              className="py-4 px-5 rounded-lg bg-amber-400/10 border-l-4 border-amber-400 mb-12"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-amber-400 font-extrabold text-base sm:text-xl tracking-tight leading-snug">
                &quot;최고가 아니면 시작하지 않았습니다. 품질로 증명하겠습니다.&quot;
              </p>
            </motion.div>

            {/* Milestones Stats Row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-4 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-3xl sm:text-5xl font-black text-[#FF2A10] tracking-tight font-mono">
                  2000
                </span>
                <span className="text-xs sm:text-sm text-gray-400 font-medium mt-1">Start</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl sm:text-5xl font-black text-[#FF2A10] tracking-tight font-mono">
                  2007
                </span>
                <span className="text-xs sm:text-sm text-gray-400 font-medium mt-1">CautionKorea</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl sm:text-5xl font-black text-[#FF2A10] tracking-tight font-mono">
                  2024
                </span>
                <span className="text-xs sm:text-sm text-gray-400 font-medium mt-1">CautionSmartCenter</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: VISUAL PHOTO SHOWCASE (Col 5) */}
          <motion.div
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* CEO Profile Image Card */}
            <div className="lg:col-span-7 relative group overflow-hidden rounded-2xl shadow-2xl border border-white/15 bg-black/40 backdrop-blur-sm min-h-[380px] sm:min-h-[440px] flex flex-col justify-end">
              <img
                src="/images/ceo_profile.png"
                alt="코션스마트센터 대표 프로필"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 p-5">
                <span className="inline-block bg-red-600 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded tracking-wider mb-1">
                  CEO
                </span>
                <h3 className="text-lg font-bold text-white">코션스마트센터 대표</h3>
              </div>
            </div>

            {/* Supercar Showcase Image Card */}
            <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl shadow-2xl border border-white/15 bg-black/80 backdrop-blur-sm min-h-[380px] sm:min-h-[440px] flex flex-col justify-end">
              <div className="absolute inset-0 flex items-center justify-center p-2 bg-gradient-to-b from-black/40 via-black/80 to-black/95">
                <img
                  src="/images/orange_supercar.png"
                  alt="코션스마트센터 외장관리 슈퍼카"
                  className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10 p-5">
                <span className="inline-block bg-amber-500 text-black text-[10px] font-bold uppercase px-2.5 py-1 rounded tracking-wider mb-1">
                  PREMIUM
                </span>
                <h3 className="text-sm font-bold text-white">최고급 외장관리 시공</h3>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Footer info note */}
        <footer className="mt-12 pt-6 border-t border-white/10 text-center sm:text-left text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2024 Caution Smart Center. All rights reserved.</p>
          <p className="font-mono text-gray-400">AUTOMOTIVE EXTERIOR CARE SPECIALIST</p>
        </footer>

      </div>
    </section>
  );
};

export default IntroductionSection;
