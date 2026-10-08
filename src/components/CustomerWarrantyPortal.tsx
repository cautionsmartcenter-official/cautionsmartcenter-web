import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  LogOut,
  Plus,
  Check,
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

  // 보증서 상세 뷰어 열림 상태
  if (selectedWarranty) {
    return (
      <WarrantyViewer
        warranty={selectedWarranty}
        onClose={() => setSelectedWarranty(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-between">
      {/* ── Top Header Bar (White Clean Theme) ── */}
      <header className="w-full border-b border-gray-200 bg-white px-6 lg:px-12 py-4 sticky top-0 z-30 flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-red-600" />
          <span>홈페이지로 돌아가기</span>
        </button>

        <span className="text-sm font-bold text-gray-800 tracking-wide">
          정품 전자보증서
        </span>

        {customer ? (
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-700 hidden sm:inline">
              <strong className="font-bold text-gray-900">{customer.name}</strong> 님
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold border border-gray-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-gray-500" />
              <span>로그아웃</span>
            </button>
          </div>
        ) : (
          <div className="text-xs text-gray-500 font-medium">
            본인 인증 전용
          </div>
        )}
      </header>

      {/* ── Main Content Area ── */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col justify-center">
        {!customer ? (
          /* ──────────────────────────────────────────────────────────
             1. 비로그인 상태 (흰색 바탕 깔끔한 본인 인증 안내)
             ────────────────────────────────────────────────────────── */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white border border-gray-200 rounded-3xl p-6 sm:p-12 shadow-sm text-center"
          >
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-3 leading-tight">
              <span className="block sm:inline">코션스마트센터</span>{' '}
              <span className="block sm:inline">정품 전자보증서</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed [word-break:keep-all]">
              본인 인증(로그인)을 통해 고객님의 정품 시공 보증서를 안전하게 조회하고 보관하실 수 있습니다.
            </p>

            {/* Social 1-Click Login Action Buttons */}
            <div className="max-w-md mx-auto space-y-3 pt-2">
              {/* Kakao 1-sec login */}
              <button
                onClick={() => handleOpenLogin('kakao')}
                className="w-full py-3.5 sm:py-4 px-5 rounded-2xl bg-[#FEE500] hover:bg-[#FDD835] active:scale-[0.98] text-[#191919] font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-sm transition-all cursor-pointer"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.477 3 2 6.477 2 10.772c0 2.766 1.84 5.19 4.606 6.556-.201.751-.727 2.715-.833 3.136-.131.52.19.513.4.374.167-.11 2.656-1.802 3.731-2.534.697.101 1.417.155 2.096.155 5.523 0 10-3.477 10-7.687S17.523 3 12 3z"/>
                </svg>
                <span className="leading-snug text-center sm:text-left">
                  <span className="block sm:inline">카카오 1초 로그인으로</span>{' '}
                  <span className="block sm:inline">내 보증서 확인하기</span>
                </span>
              </button>

              {/* Naver login */}
              <button
                onClick={() => handleOpenLogin('naver')}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#03C75A] hover:bg-[#02b350] active:scale-[0.98] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-sm transition-all cursor-pointer"
              >
                <span className="font-black text-base shrink-0">N</span>
                <span className="whitespace-nowrap">네이버 로그인으로 조회하기</span>
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-8">
              독일 CARDIP 공식 수입원 (주)코션스마트센터 정품 시공 보증 시스템
            </p>
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
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    본인 인증 완료
                  </span>
                  <span className="text-xs text-gray-500">
                    연결 계정: {customer.provider === 'kakao' ? '카카오' : '네이버'}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  <strong className="text-red-600">{customer.name}</strong> 고객님의 정품 보증서 보관함
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  등록된 시공 보증서 {myWarranties.length}건이 안전하게 보관되어 있습니다.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsRegisterOpen(!isRegisterOpen);
                  setRegFeedback(null);
                }}
                className="px-5 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-xs sm:text-sm border border-gray-200 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4 text-red-600" />
                <span>내 차량 보증서 추가 등록</span>
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
                    className="bg-gray-50 border border-gray-300 rounded-3xl p-6 sm:p-7 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-gray-900">
                        내 차량 보증서 연결 (보안 확인)
                      </h4>
                      <button
                        type="button"
                        onClick={() => setIsRegisterOpen(false)}
                        className="text-xs text-gray-500 hover:text-black cursor-pointer"
                      >
                        닫기
                      </button>
                    </div>

                    <p className="text-xs text-gray-600">
                      시공 매장에서 발급된 차량번호와 등록된 연락처 정보를 입력하시면 고객님 계정에 영구 등록됩니다.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          차량번호
                        </label>
                        <input
                          type="text"
                          value={regPlate}
                          onChange={(e) => setRegPlate(e.target.value)}
                          placeholder="예: 123가 4567"
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-red-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          시공 시 등록한 연락처 (또는 보증서 번호)
                        </label>
                        <input
                          type="text"
                          value={regVerify}
                          onChange={(e) => setRegVerify(e.target.value)}
                          placeholder="휴대폰 번호 또는 보증번호(CSC-...)"
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-red-600"
                        />
                      </div>
                    </div>

                    {regFeedback && (
                      <div
                        className={`text-xs p-3 rounded-xl border ${
                          regFeedback.success
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            : 'bg-red-50 border-red-200 text-red-600'
                        }`}
                      >
                        {regFeedback.message}
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-sm"
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
              <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-sm">
                <h3 className="text-base font-bold text-gray-800 mb-1">
                  등록된 정품 보증서가 없습니다
                </h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto mb-6">
                  시공 시 등록하신 휴대폰 번호와 일치하는 보증서가 아직 없거나 연결되지 않았습니다. 상단의 <strong>[내 차량 보증서 추가 등록]</strong> 버튼으로 차량번호를 입력해 주세요.
                </p>
                <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
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
                      whileHover={{ y: -2 }}
                      className="bg-white border border-gray-200 hover:border-red-600 rounded-3xl p-6 transition-all shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200">
                            {item.warrantyNo}
                          </span>
                          <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                            보증 유효 ({item.warrantyPeriodYears}년)
                          </span>
                        </div>

                        <div className="mb-4">
                          <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                            <span>{item.carPlate}</span>
                            <span className="text-xs font-normal text-gray-500">({item.carModel})</span>
                          </h3>
                          <p className="text-xs text-gray-700 mt-1">
                            <strong className="text-gray-900">시공내역:</strong> {ppsTypes}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            시공일자: {item.issueDate}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                        <span className="text-xs text-gray-500">
                          발급점: {item.issuedBy}
                        </span>
                        <button
                          onClick={() => setSelectedWarranty(item)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
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
      <footer className="w-full border-t border-gray-200 py-6 px-6 text-center text-xs text-gray-500 bg-white">
        <p>© 2026 CAUTION SMART CENTER. 독일 정품 CARDIP 공식 품질 보증 관리 시스템.</p>
        <p className="mt-1 text-[11px] text-gray-500">
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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer text-sm"
              >
                닫기
              </button>

              <div className="text-center mb-6">
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
                <h3 className="text-lg font-bold text-gray-900">
                  {loginProvider === 'kakao' ? '카카오 간편 본인 인증' : '네이버 간편 본인 인증'}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  시공 시 등록하셨던 성함과 연락처를 입력해 주세요.
                </p>
              </div>

              <form onSubmit={handleCompleteLogin} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    고객 성함
                  </label>
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="예: 홍길동"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-red-600 focus:bg-white"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    휴대폰 번호
                  </label>
                  <input
                    type="tel"
                    value={inputPhone}
                    onChange={(e) => setInputPhone(e.target.value)}
                    placeholder="예: 010-1234-5678"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-red-600 focus:bg-white"
                  />
                </div>

                {loginError && (
                  <div className="text-xs p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all cursor-pointer mt-2 shadow-sm ${
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
