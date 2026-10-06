import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { type WarrantyItem, getWarrantyViewUrl } from '../lib/warrantyStorage';
import { sendKakaoWarranty } from '../lib/kakao';

interface WarrantyViewerProps {
  warranty: WarrantyItem;
  onClose?: () => void;
}

export const WarrantyViewer: React.FC<WarrantyViewerProps> = ({
  warranty,
  onClose
}) => {
  const [activePage, setActivePage] = useState<'front' | 'back' | 'mobile'>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'mobile';
    }
    return 'front';
  });
  const [copied, setCopied] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const [showTermsDetail, setShowTermsDetail] = useState(false);

  // 만료일 계산
  const issueDateObj = new Date(warranty.issueDate);
  const expiryDateObj = new Date(issueDateObj);
  expiryDateObj.setFullYear(expiryDateObj.getFullYear() + (warranty.warrantyPeriodYears || 6));
  const expiryDateStr = isNaN(expiryDateObj.getTime())
    ? ''
    : `${expiryDateObj.getFullYear()}-${String(expiryDateObj.getMonth() + 1).padStart(2, '0')}-${String(expiryDateObj.getDate()).padStart(2, '0')}`;

  // 전화번호 포맷팅 (010-0000-0000)
  const formatPhone = (phone?: string) => {
    if (!phone) return '-';
    const clean = phone.replace(/[^0-9]/g, '');
    if (clean.length === 11) {
      return clean.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    if (clean.length === 10) {
      return clean.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    return phone;
  };

  // 링크 복사
  const handleCopyLink = () => {
    const url = getWarrantyViewUrl(warranty.warrantyNo);
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setShareFeedback('보증서 확인 링크가 클립보드에 복사되었습니다!');
      setTimeout(() => {
        setCopied(false);
        setShareFeedback(null);
      }, 3000);
    });
  };

  // 카카오톡 전송 / 공유
  const handleKakaoShare = async () => {
    const res = await sendKakaoWarranty(warranty);
    setShareFeedback(res.message);
    setTimeout(() => setShareFeedback(null), 4000);
  };

  // 인쇄 실행
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto flex flex-col items-center p-2 sm:p-6 print:p-0 print:bg-white print:static print:overflow-visible">
      {/* ── Top Header Controls (인쇄 시 숨김) ── */}
      <div className="w-full max-w-4xl bg-slate-900/90 text-white rounded-2xl p-4 mb-4 border border-slate-700/80 shadow-2xl flex flex-wrap items-center justify-between gap-3 sticky top-2 z-20 print:hidden">
        <div className="flex items-center gap-3">
          <span
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, letterSpacing: '0.05em' }}
            className="text-xs sm:text-sm text-red-500 font-medium tracking-wider"
          >
            CAUTION SMART CENTER
          </span>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>독일 CARDIP 정품 품질 보증서</span>
              <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-mono">
                {warranty.warrantyNo}
              </span>
            </h2>
            <p className="text-[11px] text-gray-400">
              고객: <strong className="text-white">{warranty.customerName}</strong>님 | 차량: <strong className="text-white">{warranty.carPlate}</strong> ({warranty.carModel})
            </p>
          </div>
        </div>

        {/* 뷰 모드 전환 버튼들 */}
        <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActivePage('front')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activePage === 'front' ? 'bg-red-600 text-white shadow-md' : 'text-gray-300 hover:text-white'
            }`}
          >
            앞면 (보증상세)
          </button>
          <button
            onClick={() => setActivePage('back')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activePage === 'back' ? 'bg-red-600 text-white shadow-md' : 'text-gray-300 hover:text-white'
            }`}
          >
            뒷면 (보증약관)
          </button>
          <button
            onClick={() => setActivePage('mobile')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activePage === 'mobile' ? 'bg-primary text-white shadow-md' : 'text-gray-300 hover:text-white'
            }`}
          >
            모바일 카드
          </button>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleKakaoShare}
            className="px-3 py-1.5 bg-[#FEE500] hover:bg-[#FDD835] text-[#3c1e1e] text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            title="고객 카카오톡으로 보증서 전송"
          >
            <i className="ri-kakao-talk-fill text-sm" />
            <span className="hidden sm:inline">카카오톡 전송</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-600 transition-colors flex items-center gap-1 cursor-pointer"
            title="고객 전송용 보증서 열람 링크 복사"
          >
            <i className={copied ? 'ri-check-line text-emerald-400' : 'ri-file-copy-line'} />
            <span className="hidden sm:inline">{copied ? '복사완료' : '링크복사'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-600 transition-colors flex items-center gap-1 cursor-pointer"
            title="보증서 인쇄 또는 PDF로 저장"
          >
            <i className="ri-printer-line text-sm" />
            <span className="hidden sm:inline">인쇄 / PDF</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-red-500/20 text-gray-400 hover:text-red-400 flex items-center justify-center transition-colors cursor-pointer"
              title="창 닫기"
            >
              <i className="ri-close-line text-lg" />
            </button>
          )}
        </div>
      </div>

      {/* 피드백 알림 배너 */}
      {shareFeedback && (
        <div className="w-full max-w-4xl mb-4 bg-emerald-500/90 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between shadow-lg animate-fade-in print:hidden">
          <div className="flex items-center gap-2">
            <i className="ri-checkbox-circle-fill text-base" />
            <span>{shareFeedback}</span>
          </div>
          <button onClick={() => setShareFeedback(null)} className="text-white/80 hover:text-white">
            <i className="ri-close-line" />
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
         1. 원본 양식 인쇄 뷰 (Front Page)
      ───────────────────────────────────────────────────────────── */}
      {(activePage === 'front' || typeof window !== 'undefined') && (
        <div
          className={`relative bg-white shadow-2xl rounded-lg overflow-hidden mx-auto transition-all ${
            activePage === 'front' ? 'block' : 'hidden print:block'
          }`}
          style={{
            width: '100%',
            maxWidth: '723px',
            aspectRatio: '723 / 1024',
            pageBreakAfter: 'always'
          }}
        >
          {/* 원본 배경 이미지 */}
          <img
            src="/images/warranty/warranty_front.png"
            alt="Caution Smart Center Certificate of Warranty Front"
            className="w-full h-full object-cover select-none pointer-events-none"
          />

          {/* ── 1. 고객정보 오버레이 ── */}
          {/* 고객명 */}
          <div
            className="absolute font-bold text-gray-900 font-sans tracking-wide"
            style={{
              top: '42.2%',
              left: '20.5%',
              width: '26%',
              fontSize: 'clamp(11px, 2.0vw, 15px)'
            }}
          >
            {warranty.customerName}
          </div>

          {/* 연락처 */}
          <div
            className="absolute font-bold text-gray-900 font-mono tracking-wider"
            style={{
              top: '45.4%',
              left: '20.5%',
              width: '26%',
              fontSize: 'clamp(10px, 1.8vw, 14px)'
            }}
          >
            {formatPhone(warranty.customerPhone)}
          </div>

          {/* 주소 */}
          <div
            className="absolute font-medium text-gray-800 font-sans truncate text-left"
            style={{
              top: '48.6%',
              left: '20.5%',
              width: '26%',
              fontSize: 'clamp(9px, 1.4vw, 12px)'
            }}
            title={warranty.customerAddress}
          >
            {warranty.customerAddress || '-'}
          </div>

          {/* ── 2. 보증서 정보 오버레이 ── */}
          {/* WARRANTY NO */}
          <div
            className="absolute font-bold text-gray-900 font-mono tracking-wider"
            style={{
              top: '42.2%',
              left: '67.5%',
              width: '27%',
              fontSize: 'clamp(10px, 1.7vw, 13.5px)'
            }}
          >
            {warranty.warrantyNo}
          </div>

          {/* DATE OF ISSUE (시공일자) */}
          <div
            className="absolute font-bold text-gray-900 font-mono tracking-wider"
            style={{
              top: '45.4%',
              left: '67.5%',
              width: '27%',
              fontSize: 'clamp(10px, 1.7vw, 13.5px)'
            }}
          >
            {warranty.issueDate}
          </div>

          {/* ── 3. 차량정보 오버레이 ── */}
          {/* 차종 */}
          <div
            className="absolute font-bold text-gray-900 font-sans truncate"
            style={{
              top: '58.8%',
              left: '21.8%',
              width: '25%',
              fontSize: 'clamp(10px, 1.8vw, 14px)'
            }}
            title={warranty.carModel}
          >
            {warranty.carModel}
          </div>

          {/* 색상 */}
          <div
            className="absolute font-medium text-gray-800 font-sans truncate"
            style={{
              top: '61.9%',
              left: '21.8%',
              width: '25%',
              fontSize: 'clamp(10px, 1.7vw, 13px)'
            }}
          >
            {warranty.carColor || '-'}
          </div>

          {/* 차량번호 */}
          <div
            className="absolute font-bold text-gray-900 font-sans tracking-wider"
            style={{
              top: '58.8%',
              left: '62.6%',
              width: '32%',
              fontSize: 'clamp(11px, 2.0vw, 15px)'
            }}
          >
            {warranty.carPlate}
          </div>

          {/* 차대번호 (VIN) */}
          <div
            className="absolute font-semibold text-gray-800 font-mono tracking-widest truncate"
            style={{
              top: '61.9%',
              left: '62.6%',
              width: '32%',
              fontSize: 'clamp(9px, 1.4vw, 12px)'
            }}
            title={warranty.vin}
          >
            {warranty.vin?.trim() ? warranty.vin.trim() : '-'}
          </div>

          {/* ── 4. 제품 및 시공가격 오버레이 ── */}
          {/* 투명PPS ( ) 내부 상세 */}
          <div
            className="absolute font-bold text-red-700 font-sans flex items-center justify-center text-center"
            style={{
              top: '71.4%',
              left: '46.8%',
              width: '12.5%',
              fontSize: 'clamp(9px, 1.4vw, 12px)'
            }}
          >
            {warranty.hasClearPps ? warranty.clearPpsDetail || '전체' : '-'}
          </div>

          {/* 컬러PPS ( ) 내부 상세 */}
          <div
            className="absolute font-bold text-red-700 font-sans flex items-center justify-center text-center truncate"
            style={{
              top: '71.4%',
              left: '72.0%',
              width: '12.5%',
              fontSize: 'clamp(9px, 1.3vw, 11.5px)'
            }}
            title={warranty.colorPpsDetail}
          >
            {warranty.hasColorPps ? warranty.colorPpsDetail || '전체' : '-'}
          </div>

          {/* 시공가격 */}
          <div
            className="absolute font-black text-gray-900 font-mono tracking-wider text-right pr-4"
            style={{
              top: '75.8%',
              left: '21.0%',
              width: '49.0%',
              fontSize: 'clamp(11px, 2.2vw, 16px)'
            }}
          >
            {warranty.price ? `${warranty.price} 원` : '-'}
          </div>

          {/* 하단 모바일 이동/인쇄 퀵 바 (인쇄 시 숨김) */}
          <div className="absolute bottom-2 inset-x-2 print:hidden bg-slate-900/90 backdrop-blur-sm rounded-xl p-2 flex items-center justify-center gap-2 z-10 sm:hidden">
            <button
              onClick={() => setActivePage('mobile')}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer border border-slate-700"
            >
              <i className="ri-smartphone-line text-red-500" />
              <span>모바일 카드</span>
            </button>
            <button
              onClick={() => setActivePage('back')}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <span>뒷면(약관) &gt;</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer border border-slate-700"
            >
              <i className="ri-download-2-line text-red-500" />
              <span>PDF저장</span>
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
         2. 원본 양식 인쇄 뷰 (Back Page)
      ───────────────────────────────────────────────────────────── */}
      {(activePage === 'back' || typeof window !== 'undefined') && (
        <div
          className={`relative bg-white shadow-2xl rounded-lg overflow-hidden mx-auto mt-4 print:mt-0 transition-all ${
            activePage === 'back' ? 'block' : 'hidden print:block'
          }`}
          style={{
            width: '100%',
            maxWidth: '723px',
            aspectRatio: '723 / 1024',
            pageBreakBefore: 'always'
          }}
        >
          {/* 뒷면 배경 이미지 */}
          <img
            src="/images/warranty/warranty_back.png"
            alt="Caution Smart Center Certificate of Warranty Back"
            className="w-full h-full object-cover select-none pointer-events-none"
          />

          {/* 보증기간이 6년(기본)과 다를 때만 덮어쓰기 오버레이 */}
          {warranty.warrantyPeriodYears && warranty.warrantyPeriodYears !== 6 && (
            <div
              className="absolute font-bold text-gray-900 font-mono tracking-wider flex items-center justify-center bg-white"
              style={{
                top: '29.1%',
                left: '38.6%',
                width: '2.5%',
                height: '1.8%',
                fontSize: 'clamp(10px, 1.6vw, 13px)'
              }}
            >
              {warranty.warrantyPeriodYears}
            </div>
          )}

          {/* 하단 모바일 이동/인쇄 퀵 바 (인쇄 시 숨김) */}
          <div className="absolute bottom-2 inset-x-2 print:hidden bg-slate-900/90 backdrop-blur-sm rounded-xl p-2 flex items-center justify-center gap-2 z-10 sm:hidden">
            <button
              onClick={() => setActivePage('front')}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer border border-slate-700"
            >
              <span>&lt; 앞면(상세)</span>
            </button>
            <button
              onClick={() => setActivePage('mobile')}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <i className="ri-smartphone-line" />
              <span>모바일 카드</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer border border-slate-700"
            >
              <i className="ri-download-2-line text-red-500" />
              <span>PDF저장</span>
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
         3. 스마트폰 모바일 카드 뷰 (Mobile Card View)
      ───────────────────────────────────────────────────────────── */}
      {activePage === 'mobile' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 print:hidden text-gray-900"
        >
          {/* 상단 프리미엄 헤더 */}
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 text-white p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-xs sm:text-sm tracking-wider text-white"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, letterSpacing: '0.05em' }}
              >
                CAUTION SMART CENTER
              </span>
              <span className="text-xs font-mono text-gray-300 font-bold tracking-wider">
                {warranty.warrantyNo}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-1">
              공식 정품 품질 보증서
            </h3>
            <p className="text-xs text-gray-400 font-sans">
              (주)코션스마트센터 공식 인증 시공 보증 시스템
            </p>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 block">고객명</span>
                <span className="text-base font-bold text-white">{warranty.customerName} 고객님</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 block">시공 차량</span>
                <span className="text-base font-bold text-red-500">{warranty.carPlate}</span>
              </div>
            </div>
          </div>

          {/* 보증 요약 카드 */}
          <div className="p-6 space-y-4">
            {/* 차량 & 시공 정보 테이블 (검정과 빨간색 2가지 컬러 & 통일된 폰트) */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-600 font-medium">시공 차종</span>
                <span className="font-bold text-gray-900">{warranty.carModel}</span>
              </div>
              {warranty.carColor && (
                <div className="flex justify-between py-1 border-b border-gray-200/60">
                  <span className="text-gray-600 font-medium">차량 색상</span>
                  <span className="font-bold text-gray-900">{warranty.carColor}</span>
                </div>
              )}
              {warranty.vin?.trim() && (
                <div className="flex justify-between py-1 border-b border-gray-200/60">
                  <span className="text-gray-600 font-medium">차대번호 (VIN)</span>
                  <span className="font-bold text-gray-900">{warranty.vin}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-600 font-medium">시공 제품</span>
                <span className="font-bold text-red-600">
                  {[
                    warranty.hasClearPps ? `투명PPS(${warranty.clearPpsDetail || '전체'})` : '',
                    warranty.hasColorPps ? `컬러PPS(${warranty.colorPpsDetail || '전체'})` : ''
                  ].filter(Boolean).join(' + ') || '독일 정품 CARDIP PPS'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-600 font-medium">시공 일자</span>
                <span className="font-bold text-gray-900">{warranty.issueDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-600 font-medium">품질 보증기간</span>
                <span className="font-bold text-red-600">시공일로부터 {warranty.warrantyPeriodYears}년</span>
              </div>
              {expiryDateStr && (
                <div className="flex justify-between py-1 border-b border-gray-200/60">
                  <span className="text-gray-600 font-medium">보증 만료일</span>
                  <span className="font-bold text-gray-900">{expiryDateStr}까지</span>
                </div>
              )}
              {warranty.price && (
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 font-medium">시공 금액</span>
                  <span className="font-bold text-gray-900">
                    {warranty.price} 원 <span className="text-xs font-normal text-gray-500">(VAT 별도)</span>
                  </span>
                </div>
              )}
            </div>

            {/* ── 보증서 원본 열람 & PDF 파일 다운로드 버튼 ── */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setActivePage('front');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                title="정품 보증서 원본(앞면·뒷면) 전체 양식을 엽니다"
              >
                <i className="ri-file-text-line text-base" />
                <span>보증서 원본 보기</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                title="스마트폰이나 PC에 PDF 파일로 저장하거나 인쇄합니다"
              >
                <i className="ri-download-2-line text-base text-red-500" />
                <span>PDF 파일 다운로드</span>
              </button>
            </div>

            {/* 정품 인증 마크 */}
            <div className="bg-red-50/60 border border-red-200/80 rounded-2xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <i className="ri-shield-check-fill text-xl" />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-red-900 mb-0.5">독일 CARDIP 정품 시공 보증</h4>
                <p className="text-gray-600 leading-relaxed">
                  본 보증서는 독일 CARDIP의 Peelable Paint 기술을 적용하여 (주)코션스마트센터에서 시공한 정품임을 보증합니다.
                </p>
              </div>
            </div>

            {/* ── 공식 보증 약관 및 관리안내 (7개 조항) ── */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setShowTermsDetail((prev) => !prev)}
                className="w-full p-4 flex items-center justify-between text-left bg-gray-50/80 hover:bg-gray-100/80 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center text-xs font-bold">
                    <i className="ri-file-list-3-line" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-xs sm:text-sm">
                      PPS 시공 보증 조건 및 관리안내
                    </h5>
                    <p className="text-[11px] text-gray-500">
                      보증 범위, 제외 대상, 사후 관리 7개 규정
                    </p>
                  </div>
                </div>
                <i className={`ri-arrow-down-s-line text-lg text-gray-400 transition-transform ${showTermsDetail ? 'rotate-180' : ''}`} />
              </button>

              {showTermsDetail ? (
                <div className="p-4 space-y-3.5 text-[11px] sm:text-xs text-gray-700 divide-y divide-gray-100">
                  {/* 1. 보증에 대하여 */}
                  <div>
                    <h6 className="font-bold text-gray-900 mb-1 flex items-center gap-1.5 text-xs">
                      <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 text-[10px] flex items-center justify-center font-bold">1</span>
                      보증에 대하여
                    </h6>
                    <ul className="list-disc list-inside space-y-0.5 text-gray-600 pl-1 leading-relaxed">
                      <li>본 보증서는 (주)코션스마트센터에서 시공한 PPS의 시공 내용과 보증 조건을 안내하기 위해 발급됩니다.</li>
                      <li>보증 기간 내 정상적인 차량 사용 및 제품 관리 조건에서 시공상의 하자가 발생한 경우, 시공 상태와 발생 원인을 확인하여 보증 서비스를 제공합니다.</li>
                      <li>본 보증은 외부 충격이나 사고 등으로 발생한 물리적 손상이 아닌, 시공상의 하자를 대상으로 합니다.</li>
                    </ul>
                  </div>

                  {/* 2. 보증기간 */}
                  <div className="pt-2.5">
                    <h6 className="font-bold text-gray-900 mb-1 flex items-center gap-1.5 text-xs">
                      <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 text-[10px] flex items-center justify-center font-bold">2</span>
                      보증기간
                    </h6>
                    <div className="bg-red-50/50 p-2.5 rounded-xl border border-red-100 text-red-900 font-medium">
                      독일 CARDIP PPS | 시공일로부터 <strong className="font-black text-red-600 underline">{warranty.warrantyPeriodYears || 6}년</strong>
                      <p className="text-[10px] text-gray-500 mt-0.5">※ 발급된 보증서에 기재된 기간을 기준으로 합니다.</p>
                    </div>
                  </div>

                  {/* 3. 보증 대상 */}
                  <div className="pt-2.5">
                    <h6 className="font-bold text-gray-900 mb-1 flex items-center gap-1.5 text-xs">
                      <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 text-[10px] flex items-center justify-center font-bold">3</span>
                      보증 대상
                    </h6>
                    <ol className="list-decimal list-inside space-y-0.5 text-gray-600 pl-1 leading-relaxed">
                      <li>정상적인 사용 및 관리 상태에서 발생한 PPS 도막의 비정상적인 들뜸 또는 박리</li>
                      <li>시공 과정에서 발생한 명확한 도장 및 도막 형성상의 하자</li>
                      <li>정상적인 사용 조건에서 발생한 시공 부위의 비정상적인 접착 또는 도막 이상</li>
                      <li>보증기간 내 차량 및 시공 상태 점검 결과 시공상의 하자로 확인되는 경우</li>
                    </ol>
                  </div>

                  {/* 4. 보증 대상에서 제외되는 경우 */}
                  <div className="pt-2.5">
                    <h6 className="font-bold text-gray-900 mb-1 flex items-center gap-1.5 text-xs">
                      <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 text-[10px] flex items-center justify-center font-bold">4</span>
                      보증 대상에서 제외되는 경우
                    </h6>
                    <ol className="list-decimal list-inside space-y-0.5 text-gray-600 pl-1 leading-relaxed">
                      <li>교통사고, 충돌, 접촉, 돌 튐, 스크래치, 긁힘 등 외부 충격 또는 물리적 손상</li>
                      <li>날카로운 물체나 외부 물체에 의한 PPS의 절개, 찢김 및 기타 손상</li>
                      <li>부적절한 세차·관리 방법 또는 강한 산성·알칼리성 세정제, 용제 등 화학물질 사용으로 인한 손상</li>
                      <li>사고수리, 판금·도색, 정비 및 기타 차량 작업 과정에서 발생한 손상</li>
                      <li>코션스마트센터의 확인 없이 PPS를 임의로 제거, 절개, 수정 또는 보수한 경우</li>
                      <li>차량의 기존 도장면, 소재 자체 문제 또는 정상 사용 중 발생 가능한 경미한 표면 변화</li>
                      <li>천재지변 등 합리적인 관리 범위를 벗어난 원인으로 발생한 손상</li>
                    </ol>
                  </div>

                  {/* 5. 보증 처리 방법 */}
                  <div className="pt-2.5">
                    <h6 className="font-bold text-gray-900 mb-1 flex items-center gap-1.5 text-xs">
                      <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 text-[10px] flex items-center justify-center font-bold">5</span>
                      보증 처리 방법
                    </h6>
                    <ul className="list-disc list-inside space-y-0.5 text-gray-600 pl-1 leading-relaxed">
                      <li>보증 관련 문제 발생 시 코션스마트센터에 점검 요청</li>
                      <li>차량 및 시공 상태, 손상 원인 확인 후 보증 적용 여부 안내</li>
                      <li>보증 대상인 경우 부위 상태에 따라 보수 또는 재시공 등의 방법으로 조치</li>
                    </ul>
                  </div>

                  {/* 6. PPS 시공 후 관리방법 */}
                  <div className="pt-2.5">
                    <h6 className="font-bold text-gray-900 mb-1 flex items-center gap-1.5 text-xs">
                      <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 text-[10px] flex items-center justify-center font-bold">6</span>
                      PPS 시공 후 관리방법
                    </h6>
                    <div className="space-y-1.5 pl-1 text-gray-600">
                      <div>
                        <strong className="text-gray-900 block">[세차 및 일반 관리]</strong>
                        <ul className="list-disc list-inside space-y-0.5 pl-1 leading-relaxed">
                          <li>부드러운 세차용 스펀지 또는 적합한 세차 도구를 사용해 주세요.</li>
                          <li>고압수 또는 강한 스팀을 한 부위에 장시간 집중 분사는 피해 주세요.</li>
                          <li>거친 브러시나 연마성이 있는 제품의 사용은 피해 주세요.</li>
                          <li>오염물질이나 이물질이 묻은 경우 가능한 한 빠르게 제거해 주세요.</li>
                          <li>강한 산성·알칼리성 세정제, 용제 등 PPS에 적합하지 않은 제품 사용 금지.</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="text-gray-900 block">[PPS 손상 시]</strong>
                        <p className="leading-relaxed pl-1">
                          사고·충격 등으로 손상된 경우 임의로 제거하거나 긁지 마시고 코션스마트센터에 문의해 주세요.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 7. 보증서의 적용 */}
                  <div className="pt-2.5">
                    <h6 className="font-bold text-gray-900 mb-1 flex items-center gap-1.5 text-xs">
                      <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 text-[10px] flex items-center justify-center font-bold">7</span>
                      보증서의 적용
                    </h6>
                    <p className="text-gray-600 pl-1 leading-relaxed">
                      본 보증서는 보증서에 기재된 차량과 시공 내역을 기준으로 적용됩니다. 보증기간 및 범위는 기재된 내용을 따르며 관련 법령에서 보장하는 고객의 권리를 제한하지 않습니다.
                    </p>
                    <p className="font-bold text-gray-900 text-right mt-2">
                      시공점 : (주) 코션스마트센터
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-gray-50/50 text-[11px] text-gray-500 flex items-center justify-between">
                  <span>품질보증 6년 · 시공상 하자 보증 · 공식 AS 지원</span>
                  <span className="text-red-600 font-bold">자세히 보기 &gt;</span>
                </div>
              )}
            </div>

            {/* 사후 관리 핵심 요약 미니 카드 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs space-y-1.5 text-slate-700">
              <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                <i className="ri-information-line text-red-600" />
                <span>간편 세차 및 유지 가이드</span>
              </h5>
              <ul className="list-disc list-inside space-y-0.5 text-slate-600 text-[11px] leading-relaxed">
                <li>부드러운 스펀지 & 중성 카샴푸 권장</li>
                <li>모서리 부위 고압수 초근접(10cm 미만) 분사 주의</li>
                <li>조류 배설물, 나무 수액 등은 즉시 세척 권장</li>
              </ul>
            </div>

            {/* 고객센터 전화 버튼 */}
            <a
              href="tel:031-705-1888"
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <i className="ri-customer-service-2-fill text-red-500 text-base" />
              <span>코션스마트센터 사후관리 문의 (031-705-1888)</span>
            </a>
          </div>
        </motion.div>
      )}

      {/* 인쇄 스타일 지정 */}
      <style>{`
        @media print {
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          nav, header, footer, .print\\:hidden {
            display: none !important;
          }
          @page {
            size: A4 portrait;
            margin: 8mm;
          }
        }
      `}</style>
    </div>
  );
};
