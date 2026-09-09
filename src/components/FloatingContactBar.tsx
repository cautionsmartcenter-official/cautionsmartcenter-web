import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingContactBar: React.FC = () => {
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);
  const phoneNumber = '031-712-6665';
  const kakaoUrl = 'http://pf.kakao.com/_FxlNhX/chat';

  const handlePhoneClick = () => {
    // If on desktop and user clicks, show tooltip / copy feedback
    setShowPhoneTooltip(true);
    setTimeout(() => setShowPhoneTooltip(false), 3000);
  };

  return (
    <aside 
      aria-label="빠른 상담 및 전화 연결"
      className="fixed right-3 sm:right-6 bottom-20 sm:bottom-24 z-50 flex flex-col items-center gap-3 select-none pointer-events-auto"
    >
      {/* ── 1. 카카오톡 빠른 상담 버튼 ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative group flex flex-col items-center"
      >
        <a
          href={kakaoUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="카카오톡 1:1 빠른 상담하기"
          className="flex flex-col items-center no-underline cursor-pointer group"
        >
          {/* 노란색 원형 아이콘 */}
          <div 
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-yellow-400/40"
            style={{
              backgroundColor: '#FEE500',
              boxShadow: '0 4px 14px 0 rgba(254, 229, 0, 0.45), 0 2px 6px 0 rgba(0, 0, 0, 0.15)'
            }}
          >
            {/* 카카오톡 말풍선 + TALK 아이콘 */}
            <svg 
              viewBox="0 0 100 100" 
              className="w-8 h-8 sm:w-9 sm:h-9" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 말풍선 실루엣 */}
              <path
                d="M50 20 C28 20 12 34.5 12 50.5 C12 61 18.8 70.3 29.5 75.2 L25.5 89.5 C25.2 90.6 26.4 91.5 27.3 90.8 L44.8 79.5 C46.5 79.8 48.2 80 50 80 C72 80 88 65.5 88 50.5 C88 34.5 72 20 50 20 Z"
                fill="#371D1E"
              />
              {/* TALK 텍스트 */}
              <text
                x="50"
                y="52"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#FEE500"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="900"
                fontSize="22"
                letterSpacing="-0.5"
              >
                TALK
              </text>
            </svg>
          </div>

          {/* 빠른 상담 알약 뱃지 */}
          <div 
            className="-mt-2.5 z-10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-black tracking-tight text-[#181600] shadow-md border border-yellow-300 whitespace-nowrap transition-transform duration-200 group-hover:scale-105"
            style={{
              backgroundColor: '#FEE500',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.18)'
            }}
          >
            빠른 상담
          </div>
        </a>

        {/* 데스크탑 호버 툴팁 */}
        <div className="hidden lg:group-hover:flex absolute right-full mr-3 top-4 items-center bg-gray-900/95 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap pointer-events-none transition-opacity">
          카카오톡 1:1 실시간 상담
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900/95" />
        </div>
      </motion.div>

      {/* ── 2. 전화 상담 버튼 ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative group flex flex-col items-center"
      >
        <a
          href={`tel:${phoneNumber}`}
          onClick={handlePhoneClick}
          title={`전화 상담 연결 (${phoneNumber})`}
          className="flex flex-col items-center no-underline cursor-pointer group"
        >
          {/* 파란색 원형 아이콘 */}
          <div 
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-500/40"
            style={{
              backgroundColor: '#3B82F6',
              boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.45), 0 2px 6px 0 rgba(0, 0, 0, 0.15)'
            }}
          >
            {/* 전화기 + 음파 아이콘 */}
            <svg
              viewBox="0 0 100 100"
              className="w-8 h-8 sm:w-9 sm:h-9"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 입체형 전화 수화기 */}
              <path
                d="M32 24 C30 24 28 26 27.5 28 C26.5 32 26 36.5 27.5 42 C30 51 38 64 49 71 C55 74.5 61 75 65.5 74.5 C68 74 70 72 70 69.5 L70 63 C70 61.5 69 60.2 67.5 59.8 L59.5 57.8 C58 57.4 56.5 58 55.5 59.2 L53 62.2 C46.5 59 41 53.5 37.8 47 L40.8 44.5 C42 43.5 42.6 42 42.2 40.5 L40.2 32.5 C39.8 31 38.5 30 37 30 L32 24 Z"
                fill="#FFFFFF"
              />
              {/* 음파 1 (작은 호) */}
              <path
                d="M58 36 C61 39 62.5 42 63 46"
                stroke="#FFFFFF"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              {/* 음파 2 (중간 호) */}
              <path
                d="M65 30 C70 34 72.5 40 73.5 47"
                stroke="#FFFFFF"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* 음파 3 (큰 호) */}
              <path
                d="M72 24 C79 29 82.5 38 84 48"
                stroke="#FFFFFF"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* 전화 상담 알약 뱃지 */}
          <div 
            className="-mt-2.5 z-10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-tight text-white shadow-md border border-blue-400 whitespace-nowrap transition-transform duration-200 group-hover:scale-105"
            style={{
              backgroundColor: '#3B82F6',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.18)'
            }}
          >
            전화 상담
          </div>
        </a>

        {/* 데스크탑 호버 툴팁 또는 클릭 시 안내 팝업 */}
        <AnimatePresence>
          {showPhoneTooltip ? (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-full mr-3 top-4 flex items-center bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-20"
            >
              📞 {phoneNumber} (연결 중)
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-blue-600" />
            </motion.div>
          ) : (
            <div className="hidden lg:group-hover:flex absolute right-full mr-3 top-4 items-center bg-gray-900/95 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap pointer-events-none transition-opacity">
              📞 {phoneNumber}
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900/95" />
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </aside>
  );
};
