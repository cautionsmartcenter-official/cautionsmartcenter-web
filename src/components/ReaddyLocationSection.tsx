import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone, Clock, Copy, Check, ExternalLink } from 'lucide-react';

interface ReaddyLocationSectionProps {
  onNavigateToContact?: () => void;
}

export const ReaddyLocationSection: React.FC<ReaddyLocationSectionProps> = ({ onNavigateToContact }) => {
  const [copied, setCopied] = useState(false);

  const roadAddress = '경기도 광주시 태재로 26 (신현동)';
  const jibunAddress = '경기도 광주시 신현동 720-6';
  const centerPhone = '031-712-6665';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(roadAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="location" className="py-20 lg:py-28 bg-white text-black relative border-t border-gray-200">
      <div className="mx-auto px-6 lg:px-12 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-tight mb-4"
          >
            오시는 길 & 본점 센터 안내
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-gray-600 leading-relaxed break-keep"
          >
            독일 <span className="font-cardip font-bold text-black">CARDIP®</span> 공식 한국 총판 본사 및 메인 테크니컬 센터입니다.<br className="hidden sm:inline" />
            분당 율동공원·태재고개 인근에 위치하며 쾌적한 전용 주차 및 프라이빗 상담 라운지를 운영합니다.
          </motion.p>
        </div>

        {/* Main Content Grid: Map & Center Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Map (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
          >
            {/* Map Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs font-bold text-black">코션스마트센터 본점</span>
              </div>
              <span className="text-xs text-gray-500 font-mono">태재로 26</span>
            </div>

            {/* Map Frame */}
            <div className="relative w-full h-[360px] sm:h-[420px] bg-gray-100 overflow-hidden flex-1">
              <iframe
                title="코션스마트센터 위치 지도"
                src="https://maps.google.com/maps?q=%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EA%B4%91%EC%A3%BC%EC%8B%9C%20%ED%83%9C%EC%9E%AC%EB%A1%9C%2026&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />

            </div>

            {/* Navigation Buttons: Clean Black & White */}
            <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-black" />
                <span>내비게이션 바로 길찾기 :</span>
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {/* Naver Map Button - Black Theme */}
                <a
                  href="https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EA%B4%91%EC%A3%BC%EC%8B%9C%20%ED%83%9C%EC%9E%AC%EB%A1%9C%2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black hover:bg-gray-800 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
                  title="네이버 지도로 길찾기"
                >
                  <span>네이버 지도 길찾기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* Kakao Map Button - Clean White Theme */}
                <a
                  href="https://map.kakao.com/link/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EA%B4%91%EC%A3%BC%EC%8B%9C%20%ED%83%9C%EC%9E%AC%EB%A1%9C%2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-gray-100 text-black border border-gray-300 text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
                  title="카카오맵으로 길찾기"
                >
                  <span>카카오맵 길찾기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Address & Contact Details Card (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col justify-between space-y-5"
          >
            {/* Address Box */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gray-50/70 border border-gray-200 shadow-sm relative">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-black text-black">코션스마트센터 본점</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-1.5 mb-5">
                <div className="text-base text-black font-bold">
                  {roadAddress}
                </div>
                <div className="text-xs text-gray-600 flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-700 font-mono">지번</span>
                  <span>{jibunAddress}</span>
                </div>
              </div>

              {/* Copy Address Button */}
              <button
                onClick={handleCopyAddress}
                className="w-full py-2.5 px-4 bg-white hover:bg-gray-100 border border-gray-300 rounded-xl text-xs font-semibold text-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-black" />
                    <span className="text-black font-bold">주소가 복사되었습니다</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gray-600" />
                    <span>주소 복사하기</span>
                  </>
                )}
              </button>
            </div>

            {/* Hours & Phone Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Card */}
              <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-gray-600">전화 문의</span>
                </div>
                <a
                  href={`tel:${centerPhone}`}
                  className="text-base font-black text-black hover:text-primary transition-colors block"
                >
                  {centerPhone}
                </a>
                <span className="text-[11px] text-gray-400 mt-1 block">터치 시 바로 통화 연결</span>
              </div>

              {/* Hours Card */}
              <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-gray-600">운영 시간</span>
                </div>
                <div className="text-sm font-bold text-black">
                  평일 09:00 - 18:00
                </div>
                <span className="text-[11px] text-gray-400 mt-1 block">주말 · 공휴일 휴무</span>
              </div>
            </div>

            {/* Quick Action Button: Site Primary Red */}
            <div className="pt-1">
              <button
                onClick={() => {
                  if (onNavigateToContact) {
                    onNavigateToContact();
                  } else {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>방문 예약 및 온라인 견적 문의하기</span>
                <span className="text-base">→</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
