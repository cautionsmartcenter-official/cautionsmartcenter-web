import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Building2,
  Send,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import {
  BRANCH_DATA,
  HEADQUARTER_INFO,
  PARTNER_BENEFITS,
  PARTNER_STEPS
} from '../config/branchData';
import { saveConsultation } from '../lib/consultationStorage';

export const ReaddyPartners: React.FC = () => {
  // 메인 서브 탭: 'locator' (시공 네트워크 안내) vs 'join' (공식 시공 파트너 모집)
  const [activeSubTab, setActiveSubTab] = useState<'locator' | 'join'>('locator');

  // 가맹 신청 폼 상태
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRegion, setFormRegion] = useState('');
  const [formBizType, setFormBizType] = useState('1급 자동차 공업사');
  const [formMessage, setFormMessage] = useState('');
  const [agreePrivacy, setAgreePrivacy] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 파트너 문의 폼 제출 핸들러
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim() || !formRegion.trim()) {
      alert('대표자명, 연락처, 희망 지역을 모두 입력해 주세요.');
      return;
    }
    if (!agreePrivacy) {
      alert('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      saveConsultation({
        name: formName.trim(),
        phone: formPhone.trim(),
        email: formEmail.trim() || '미입력',
        brand: '가맹/파트너',
        model: `희망지역: ${formRegion.trim()}`,
        codeName: formBizType,
        service: '시공 파트너 문의',
        message: `[시공 파트너 개설/제휴 문의]\n사업형태: ${formBizType}\n희망지역: ${formRegion.trim()}\n\n문의사항:\n${formMessage.trim() || '시공 파트너 상담 요청'}`
      });

      setSubmitSuccess(true);
      setFormName('');
      setFormPhone('');
      setFormEmail('');
      setFormRegion('');
      setFormMessage('');
    } catch (err) {
      console.error(err);
      alert('문의 접수 중 오류가 발생했습니다. 고객센터(031-712-6665)로 문의해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-20">
      {/* ════════════════ 1. HERO HEADER SECTION (요청 문장 100% 반영) ════════════════ */}
      <section className="relative bg-neutral-950 text-white py-20 lg:py-26 overflow-hidden">
        {/* Ambient Brand Glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-neutral-800/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-5"
          >
            전국 <span className="font-cardip">CARDIP®</span> PPS 시공 파트너 네트워크
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed break-keep"
          >
            독일 <span className="font-cardip font-bold text-white">CARDIP®</span> 공식 한국 디스트리뷰터 (주)코션스마트센터가 공급하는 정품 <span className="font-cardip font-bold text-white">CARDIP®</span> PPS를 기반으로 운영되는 전국 전문 시공 네트워크입니다.
          </motion.p>

          {/* Sub-Tab Navigation Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex p-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl mt-9 shadow-2xl"
          >
            <button
              onClick={() => setActiveSubTab('locator')}
              className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-bold transition-all cursor-pointer ${
                activeSubTab === 'locator'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>전국 시공점 안내</span>
            </button>
            <button
              onClick={() => setActiveSubTab('join')}
              className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-bold transition-all cursor-pointer ${
                activeSubTab === 'join'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>공식 시공 파트너 모집</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ════════════════ 2. CONTENT SECTIONS ════════════════ */}
      <AnimatePresence mode="wait">
        {activeSubTab === 'locator' ? (
          /* ── SUB-TAB 1: 전국 시공 네트워크 안내 ── */
          <motion.section
            key="locator"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="py-16 lg:py-24 bg-gray-50"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              {/* ── 2-A. 총판 본사 (직영) 최상단 공식 소개 ── */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm mb-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-red-500" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white shadow-sm">
                        {HEADQUARTER_INFO.badge}
                      </span>
                      <span className="text-xs font-bold text-gray-500">{HEADQUARTER_INFO.region}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                      {HEADQUARTER_INFO.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {HEADQUARTER_INFO.address}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-gray-700">
                      <span className="px-2.5 py-0.5 bg-gray-100 rounded-md font-bold text-gray-800 border border-gray-200 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-gray-500" />
                        {HEADQUARTER_INFO.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── 2-B. Section Title for Branches ── */}
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                  시공 네트워크 및 협력 운영점 안내
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  독일 CARDIP® 정품 PPS 소재를 기반으로 표준 공정 시공을 제공하는 거점입니다.
                </p>
              </div>

              {/* ── 2-C. Branch Grid: 협력 운영점(인천) + 신규 파트너 모집 카드 ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-stretch">
                {/* 1) 코션스마트센터 인천 (협력 운영점) */}
                {BRANCH_DATA.map((branch) => (
                  <motion.div
                    key={branch.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                  >
                    <div>
                      {/* Branch Photo Header */}
                      <div className="relative w-full h-72 sm:h-80 bg-neutral-900 overflow-hidden">
                        <img
                          src={branch.image}
                          alt={branch.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                        {/* Top Badges (협력 운영점 / 인천) */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-black shadow-md bg-white text-gray-900">
                            {branch.branchType}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/20">
                            {branch.region}
                          </span>
                        </div>

                        {/* Bottom Overlay Info on Image */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-xs font-semibold text-gray-300 mb-1">{branch.detailAddress}</p>
                          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                            {branch.name}
                          </h3>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 sm:p-8 space-y-6">
                        {/* Description: "인천 지역에서 코션스마트센터 브랜드로 자동차 사고수리 및 외장 시공 서비스를 운영하고 있습니다." */}
                        <p className="text-sm text-gray-600 leading-relaxed break-keep">
                          {branch.description}
                        </p>

                        {/* Detailed Address & Phone Only */}
                        <div className="space-y-3 pt-5 border-t border-gray-100 text-sm text-gray-700">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold text-gray-900">{branch.address}</span>
                              {branch.detailAddress && (
                                <p className="text-xs text-gray-500 mt-0.5">{branch.detailAddress}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-gray-500 shrink-0" />
                            <span className="text-base font-bold text-gray-900">{branch.phone}</span>
                          </div>

                          {/* 하단 작은 안내: ※ 공식 가맹 및 파트너 계약 진행 중 */}
                          {branch.statusNotice && (
                            <div className="pt-3 border-t border-gray-100">
                              <p className="text-xs text-red-600 font-semibold tracking-tight">
                                {branch.statusNotice}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* 2) 전국 주요 시·도 신규 시공 파트너 모집 카드 (흰색 바탕 + 검정 테두리) */}
                <div className="bg-white text-gray-900 rounded-3xl p-8 sm:p-10 border-2 border-gray-900 shadow-sm flex flex-col justify-between relative overflow-hidden">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-50 border border-red-200 rounded-full text-xs font-bold text-red-600">
                      <span>신규 시공 파트너 모집</span>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-3">
                        전국 주요 시·도 <br className="hidden sm:block" />
                        신규 시공 파트너를 모집합니다
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-keep">
                        서울 강남/서초, 경기 남부, 부산/경남, 대구/경북 등 권역별 독점 상권을 확보하고 
                        독일 CARDIP® 정품 PPS 소재를 기반으로 차별화된 하이엔드 액상 보호필름 시장에 진입하세요.
                      </p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-700">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                        <span>공식 인증 현판 제공 및 권역별 시공 파트너 운영</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                        <span>독일 CARDIP® 정품 PPS 소재 100% 직수입 공급</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                        <span>본사 유입 고객 시공 문의 연계</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8">
                    <button
                      onClick={() => {
                        setActiveSubTab('join');
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-sm sm:text-base transition-all shadow-lg shadow-red-600/30 cursor-pointer"
                    >
                      <span>시공 파트너 개설 혜택 및 신청 안내 보기</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        ) : (
          /* ── SUB-TAB 2: 공식 시공 파트너 모집 (요청 문장 100% 반영) ── */
          <motion.section
            key="join"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="py-16 lg:py-24 bg-white"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              {/* Introduction Header: 요청하신 문구로 100% 반영 */}
              <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 border border-red-200 rounded-full text-xs font-bold text-red-600 mb-4">
                  <span>공식 시공 파트너 안내</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight mb-6">
                  CARDIP® PPS 공식 시공 파트너 모집
                </h2>
                <div className="text-base sm:text-lg text-gray-700 leading-relaxed break-keep space-y-1">
                  <p>한국 공식 디스트리뷰터 (주)코션스마트센터와 함께</p>
                  <p>독일 CARDIP® PPS의 전문 시공 파트너로 함께할</p>
                  <p className="font-bold text-gray-900">전문 1급 공업사 및 하이테크 자동차 시공점 대표님을 모집합니다.</p>
                </div>

              </div>

              {/* 3대 핵심 혜택 (제목 한 줄 완벽 유지) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                {PARTNER_BENEFITS.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 rounded-3xl p-6 sm:p-7 xl:p-8 border-2 border-gray-100 hover:border-red-500/30 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 font-roboto font-black text-xl mb-6">
                        {benefit.number}
                      </div>
                      <span className="text-xs font-bold text-red-600 tracking-wider block mb-2">
                        {benefit.highlight}
                      </span>
                      {/* whitespace-nowrap 적용으로 한 줄 완벽 유지 */}
                      <h3 className="text-base sm:text-lg md:text-[16px] lg:text-[17px] xl:text-[20px] font-black text-gray-900 tracking-tight mb-4 whitespace-nowrap">
                        {benefit.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-keep">
                        {benefit.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-gray-200/60 flex items-center gap-2 text-xs font-bold text-gray-800 break-keep">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{benefit.summaryPoint}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 파트너 개설 4단계 프로세스 */}
              <div className="mb-24">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-3">
                    공식 시공 파트너 등록 절차
                  </h3>
                  <p className="text-sm text-gray-600">
                    체계적인 절차를 통해 신속하고 안정적인 매장 오픈을 지원합니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PARTNER_STEPS.map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative overflow-hidden"
                    >
                      <div className="text-4xl font-black font-roboto text-gray-200 mb-3">
                        {step.step}
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        {step.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-keep">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ════════ 파트너 문의 신청 폼 ════════ */}
              <div id="inquiry-form" className="max-w-3xl mx-auto bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-neutral-800 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <span className="inline-block px-3.5 py-1 bg-red-600/20 text-red-400 border border-red-600/30 rounded-full text-xs font-bold mb-3">
                      시공 파트너 상담 신청
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
                      시공 파트너 개설 및 기술 제휴 문의
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 break-keep">
                      간단한 정보를 남겨주시면 총판 담당자가 검토 후 24시간 이내에 유선으로 상세히 안내해 드립니다.
                    </p>
                  </div>

                  {submitSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-neutral-800/80 border border-emerald-500/40 rounded-2xl p-8 text-center space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-3xl">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-xl font-bold text-white">파트너 문의가 정상 접수되었습니다!</h4>
                      <p className="text-sm text-gray-300 leading-relaxed break-keep max-w-md mx-auto">
                        작성해 주신 연락처로 담당자가 신속히 연락드리겠습니다. <br />
                        급하신 문의는 본사 고객센터(<strong>031-712-6665</strong>)로 전화 주시면 빠른 상담이 가능합니다.
                      </p>
                      <button
                        onClick={() => setSubmitSuccess(false)}
                        className="mt-4 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                      >
                        추가 문의 작성하기
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-2">
                            대표자명 / 담당자명 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="예: 홍길동 대표"
                            className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-2">
                            연락처 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={formPhone}
                            onChange={(e) => setFormPhone(e.target.value)}
                            placeholder="예: 010-1234-5678"
                            className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-2">
                            희망 개설 지역 (시/구) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formRegion}
                            onChange={(e) => setFormRegion(e.target.value)}
                            placeholder="예: 서울 강남구, 대구 수성구 등"
                            className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-2">
                            현재 사업장 형태
                          </label>
                          <select
                            value={formBizType}
                            onChange={(e) => setFormBizType(e.target.value)}
                            className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-white focus:outline-none focus:border-red-500 cursor-pointer"
                          >
                            <option value="1급 자동차 공업사">1급 자동차 공업사</option>
                            <option value="수입차 정비/판금 센터">수입차 정비/판금 센터</option>
                            <option value="PPF / 틴팅 / 랩핑 전문점">PPF / 틴팅 / 랩핑 전문점</option>
                            <option value="프리미엄 디테일링 샵">프리미엄 디테일링 샵</option>
                            <option value="신규 매장 창업 준비">신규 매장 창업 준비</option>
                            <option value="기타">기타 자동차 관련 사업</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-2">
                          이메일 주소 (선택)
                        </label>
                        <input
                          type="email"
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="partner@example.com"
                          className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-2">
                          문의 내용 / 보유 설비 현황
                        </label>
                        <textarea
                          rows={3}
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          placeholder="현재 보유하신 도장 부스 유무, 매장 평수, 가맹 관련 궁금하신 점을 자유롭게 적어주세요."
                          className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 resize-none"
                        />
                      </div>

                      {/* 개인정보 수집 동의 */}
                      <label className="flex items-center gap-2.5 text-xs text-gray-400 cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          checked={agreePrivacy}
                          onChange={(e) => setAgreePrivacy(e.target.checked)}
                          className="w-4 h-4 rounded text-red-600 accent-red-600 bg-neutral-950 border-neutral-700 cursor-pointer"
                        />
                        <span>상담 및 연락을 위한 개인정보 수집 및 이용에 동의합니다.</span>
                      </label>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-base transition-all shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isSubmitting ? '접수 처리 중...' : '시공 파트너 상담 신청서 제출하기'}</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};
