import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  FileText,
  Car,
  CheckCircle2,
  ArrowLeft,
  LogOut,
  PlusCircle,
  AlertCircle
} from 'lucide-react';
import {
  getCurrentCustomer,
  loginWithKakao,
  loginWithNaver,
  logoutCustomer,
  linkWarrantyToCustomer,
  getCustomerVerifiedWarranties,
  type CustomerUser
} from '../lib/customerAuthStorage';
import { type WarrantyItem } from '../lib/warrantyStorage';
import { WarrantyViewer } from './WarrantyViewer';

interface CustomerWarrantyPortalProps {
  onBackToHome: () => void;
  initialWarrantyNo?: string | null;
}

export const CustomerWarrantyPortal: React.FC<CustomerWarrantyPortalProps> = ({
  onBackToHome,
  initialWarrantyNo
}) => {
  const [customer, setCustomer] = useState<CustomerUser | null>(() => getCurrentCustomer());
  const [selectedWarranty, setSelectedWarranty] = useState<WarrantyItem | null>(null);

  // 간편 로그인 모달 상태
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginProvider, setLoginProvider] = useState<'kakao' | 'naver'>('kakao');
  const [inputName, setInputName] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // 보증서 수동 등록 폼 상태
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [regPlate, setRegPlate] = useState('');
  const [regVerify, setRegVerify] = useState('');
  const [regFeedback, setRegFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // 고객이 열람 가능한 보증서 목록
  const myWarranties = customer ? getCustomerVerifiedWarranties(customer) : [];

  // 로그인 모달 열기
  const handleOpenLogin = (provider: 'kakao' | 'naver') => {
    setLoginProvider(provider);
    setLoginError(null);
    setIsLoginModalOpen(true);
  };

  // 간편 로그인 완료 처리
  const handleCompleteLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) {
      setLoginError('성함을 입력해 주세요.');
      return;
    }
    const clean = inputPhone.replace(/[^0-9]/g, '');
    if (clean.length < 10) {
      setLoginError('휴대폰 번호 10~11자리를 정확히 입력해 주세요.');
      return;
    }

    let user: CustomerUser;
    if (loginProvider === 'kakao') {
      user = loginWithKakao(inputName, clean);
    } else {
      user = loginWithNaver(inputName, clean);
    }

    // 만약 URL에 특정 보증번호(initialWarrantyNo)가 있었다면 해당 보증서 등록 시도
    if (initialWarrantyNo) {
      linkWarrantyToCustomer(user, '', initialWarrantyNo);
    }

    setCustomer(user);
    setIsLoginModalOpen(false);
    setInputName('');
    setInputPhone('');
    setLoginError(null);
  };

  // 로그아웃
  const handleLogout = () => {
    logoutCustomer();
    setCustomer(null);
    setSelectedWarranty(null);
  };

  // 보증서 신규 등록
  const handleRegisterWarranty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) return;
    if (!regPlate.trim()) {
      setRegFeedback({ success: false, message: '차량번호를 입력해 주세요.' });
      return;
    }
    if (!regVerify.trim()) {
      setRegFeedback({ success: false, message: '시공 시 등록한 연락처(또는 뒷4자리)를 입력해 주세요.' });
      return;
    }

    const result = linkWarrantyToCustomer(customer, regPlate, regVerify);
    setRegFeedback(result);

    if (result.success) {
      setCustomer(getCurrentCustomer());
      setRegPlate('');
      setRegVerify('');
      setTimeout(() => {
        setIsRegisterOpen(false);
        setRegFeedback(null);
      }, 2000);
    }
  };

  // ── 보증서 상세 뷰어 열림 상태 ──
  if (selectedWarranty) {
    return (
      <WarrantyViewer
        warranty={selectedWarranty}
        onClose={() => setSelectedWarranty(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between selection:bg-red-500 selection:text-white">
      {/* ── Top Header Bar ── */}
      <header className="w-full border-b border-white/10 bg-neutral-950/80 backdrop-blur-md px-6 lg:px-12 py-4 sticky top-0 z-30 flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-red-500" />
          <span>홈페이지로 돌아가기</span>
        </button>

        <div className="flex items-center gap-3">
          <img
            src="/images/logos/caution_logo_white.png?v=4"
            alt="CAUTION"
            className="h-6 w-auto object-contain"
          />
          <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30">
            정품 전자보증서
          </span>
        </div>

        {customer ? (
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-300 hidden sm:inline">
              <strong className="text-white font-bold">{customer.name}</strong> 님
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-gray-400" />
              <span>로그아웃</span>
            </button>
          </div>
        ) : (
          <div className="text-xs text-gray-400">
            <span className="text-red-400 font-semibold">🔒 본인 인증 전용</span>
          </div>
        )}
      </header>

      {/* ── Main Content Area ── */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 flex flex-col justify-center">
        {!customer ? (
          /* ──────────────────────────────────────────────────────────
             1. 비로그인 상태 (본인 인증 유도 & 개인정보/시공가격 보호 안내)
             ────────────────────────────────────────────────────────── */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-neutral-900/90 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Shield Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-red-600/15 border border-red-500/30 text-red-500 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(225,29,72,0.25)]">
              <ShieldCheck className="w-9 h-9 sm:w-11 sm:h-11" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-center text-white tracking-tight mb-3">
              코션스마트센터 정품 전자보증서
            </h1>
            <p className="text-sm sm:text-base text-gray-400 text-center max-w-xl mx-auto mb-8 leading-relaxed">
              본인 인증(로그인)을 통해 고객님의 소중한 정품 시공 보증서를 안전하게 조회하고 보관하실 수 있습니다.
            </p>

            {/* Privacy & Price Protection Notice Banner */}
            <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-4 sm:p-5 mb-8 text-left flex items-start gap-3.5">
              <Lock className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-red-300 mb-1">
                  개인정보 및 시공 가격 보호 안내
                </h4>
                <p className="text-xs sm:text-[13px] text-gray-300 leading-relaxed">
                  정품 보증서에는 차주님의 <strong>성함, 연락처 및 상세 시공 가격</strong>이 기재되어 있습니다. 
                  타인이 차량번호만으로 무단 조회하는 것을 철저히 차단하고자, <strong>본인 인증을 완료하신 고객님께만 안전하게 보증서가 제공</strong>됩니다.
                </p>
              </div>
            </div>

            {/* Social 1-Click Login Action Buttons */}
            <div className="max-w-md mx-auto space-y-3">
              {/* Kakao 1-sec login */}
              <button
                onClick={() => handleOpenLogin('kakao')}
                className="w-full py-4 px-6 rounded-2xl bg-[#FEE500] hover:bg-[#FDD835] active:scale-[0.98] text-[#191919] font-bold text-base flex items-center justify-center gap-3 shadow-lg shadow-yellow-500/10 transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.477 3 2 6.477 2 10.772c0 2.766 1.84 5.19 4.606 6.556-.201.751-.727 2.715-.833 3.136-.131.52.19.513.4.374.167-.11 2.656-1.802 3.731-2.534.697.101 1.417.155 2.096.155 5.523 0 10-3.477 10-7.687S17.523 3 12 3z"/>
                </svg>
                <span>카카오 1초 로그인하고 내 보증서 확인하기</span>
              </button>

              {/* Naver login */}
              <button
                onClick={() => handleOpenLogin('naver')}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#03C75A] hover:bg-[#02b350] active:scale-[0.98] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg shadow-green-500/10 transition-all cursor-pointer"
              >
                <span className="font-black text-base">N</span>
                <span>네이버 로그인으로 조회하기</span>
              </button>
            </div>

            {/* Features (Warranty protection without unconfirmed VIP text) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-8 pt-8 border-t border-white/10 text-left">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-200 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-red-500" />
                  <span>철저한 보안 보호</span>
                </div>
                <p className="text-[11px] text-gray-400">
                  타인의 임의 조회를 완벽 차단하여 시공 내역 및 가격을 안전하게 보호합니다.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-200 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-red-500" />
                  <span>정품 전자보증서 평생 보관</span>
                </div>
                <p className="text-[11px] text-gray-400">
                  독일 정품 CARDIP PPS 보증서를 스마트폰에서 언제든 분실 걱정 없이 확인합니다.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-200 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-red-500" />
                  <span>사고 보험 처리 공식 증빙</span>
                </div>
                <p className="text-[11px] text-gray-400">
                  접촉 사고 발생 시 보험사 제출용 정품 시공 증빙 자료로 즉시 활용 가능합니다.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ──────────────────────────────────────────────────────────
             2. 로그인 완료 상태 (본인 보증서 목록 & 신규 차량 등록)
             ────────────────────────────────────────────────────────── */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-6"
          >
            {/* Welcome User Card */}
            <div className="bg-neutral-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    본인 인증 완료
                  </span>
                  <span className="text-xs text-gray-400">
                    연결 계정: {customer.provider === 'kakao' ? '카카오' : '네이버'}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  <strong className="text-red-500">{customer.name}</strong> 고객님의 정품 보증서 보관함
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  등록된 시공 보증서 {myWarranties.length}건이 안전하게 보관되어 있습니다.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsRegisterOpen(!isRegisterOpen);
                  setRegFeedback(null);
                }}
                className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <PlusCircle className="w-4 h-4 text-red-500" />
                <span>+ 내 차량 보증서 추가 등록</span>
              </button>
            </div>

            {/* Manual Register Drawer */}
            <AnimatePresence>
              {isRegisterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <form
                    onSubmit={handleRegisterWarranty}
                    className="bg-neutral-900 border border-red-500/30 rounded-3xl p-6 sm:p-7 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Car className="w-4 h-4 text-red-500" />
                        <span>내 차량 보증서 연결 (보안 확인)</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setIsRegisterOpen(false)}
                        className="text-xs text-gray-400 hover:text-white cursor-pointer"
                      >
                        닫기 ✕
                      </button>
                    </div>

                    <p className="text-xs text-gray-400">
                      시공 매장에서 발급된 차량번호와 등록된 연락처 정보를 입력하시면 고객님 계정에 영구 등록됩니다.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                          차량번호
                        </label>
                        <input
                          type="text"
                          value={regPlate}
                          onChange={(e) => setRegPlate(e.target.value)}
                          placeholder="예: 123가 4567"
                          className="w-full px-4 py-2.5 bg-neutral-950 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                          시공 시 등록한 연락처 (또는 보증서 번호)
                        </label>
                        <input
                          type="text"
                          value={regVerify}
                          onChange={(e) => setRegVerify(e.target.value)}
                          placeholder="휴대폰 번호 또는 보증번호(CSC-...)"
                          className="w-full px-4 py-2.5 bg-neutral-950 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>

                    {regFeedback && (
                      <div
                        className={`text-xs p-3 rounded-xl border ${
                          regFeedback.success
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : 'bg-red-500/10 border-red-500/30 text-red-400'
                        }`}
                      >
                        {regFeedback.message}
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-lg shadow-red-600/30"
                      >
                        보증서 확인 및 등록
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Warranty Cards List */}
            {myWarranties.length === 0 ? (
              <div className="bg-neutral-900/60 border border-white/10 rounded-3xl p-10 text-center">
                <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-200 mb-1">
                  등록된 정품 보증서가 없습니다
                </h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
                  시공 시 등록하신 휴대폰 번호와 일치하는 보증서가 아직 없거나 연결되지 않았습니다. 상단의 <strong>[+ 내 차량 보증서 추가 등록]</strong> 버튼으로 차량번호를 입력해 주세요.
                </p>
                <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md"
                >
                  내 차량 보증서 등록하기
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myWarranties.map((item) => {
                  const ppsTypes = [
                    item.hasClearPps ? `투명PPS(${item.clearPpsDetail || '전체'})` : '',
                    item.hasColorPps ? `컬러PPS(${item.colorPpsDetail || '전체'})` : ''
                  ].filter(Boolean).join(', ') || 'CARDIP 정품 PPS';

                  return (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -3 }}
                      className="bg-neutral-900 border border-white/10 hover:border-red-500/50 rounded-3xl p-6 transition-all shadow-xl flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30">
                            {item.warrantyNo}
                          </span>
                          <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            보증 유효 ({item.warrantyPeriodYears}년)
                          </span>
                        </div>

                        <div className="mb-4">
                          <h3 className="text-lg font-black text-white flex items-center gap-2">
                            <span>{item.carPlate}</span>
                            <span className="text-xs font-normal text-gray-400">({item.carModel})</span>
                          </h3>
                          <p className="text-xs text-gray-300 mt-1">
                            <strong className="text-white">시공내역:</strong> {ppsTypes}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            시공일자: {item.issueDate}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                        <span className="text-xs text-gray-400">
                          발급점: {item.issuedBy}
                        </span>
                        <button
                          onClick={() => setSelectedWarranty(item)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-red-600/20 flex items-center gap-1.5"
                        >
                          <span>보증서 열람하기</span>
                          <span>→</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* ── Footer Info ── */}
      <footer className="w-full border-t border-white/5 py-6 px-6 text-center text-xs text-gray-500">
        <p>© 2026 CAUTION SMART CENTER. 독일 정품 CARDIP 공식 품질 보증 관리 시스템.</p>
        <p className="mt-1 text-[11px] text-gray-600">
          보증서 발급 및 본인 확인 문의: 031-705-1888 (평일 09:00 - 18:00)
        </p>
      </footer>

      {/* ── 간편 로그인 모달 (카카오/네이버) ── */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-neutral-900 border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl relative"
            >
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>

              <div className="text-center mb-5">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 ${
                    loginProvider === 'kakao' ? 'bg-[#FEE500] text-[#191919]' : 'bg-[#03C75A] text-white'
                  }`}
                >
                  {loginProvider === 'kakao' ? (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3C6.477 3 2 6.477 2 10.772c0 2.766 1.84 5.19 4.606 6.556-.201.751-.727 2.715-.833 3.136-.131.52.19.513.4.374.167-.11 2.656-1.802 3.731-2.534.697.101 1.417.155 2.096.155 5.523 0 10-3.477 10-7.687S17.523 3 12 3z"/>
                    </svg>
                  ) : (
                    <span className="font-black text-xl">N</span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white">
                  {loginProvider === 'kakao' ? '카카오 간편 본인 인증' : '네이버 간편 본인 인증'}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  시공 시 등록하셨던 성함과 연락처로 보증서와 안전하게 연동됩니다.
                </p>
              </div>

              <form onSubmit={handleCompleteLogin} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    고객 성함
                  </label>
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="예: 홍길동"
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    휴대폰 번호
                  </label>
                  <input
                    type="tel"
                    value={inputPhone}
                    onChange={(e) => setInputPhone(e.target.value)}
                    placeholder="예: 010-1234-5678"
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                {loginError && (
                  <div className="text-xs p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all cursor-pointer mt-2 shadow-lg ${
                    loginProvider === 'kakao'
                      ? 'bg-[#FEE500] hover:bg-[#FDD835] text-[#191919]'
                      : 'bg-[#03C75A] hover:bg-[#02b350] text-white'
                  }`}
                >
                  인증 완료하고 내 보증서 열기
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
