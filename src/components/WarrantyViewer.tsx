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
  const [activePage, setActivePage] = useState<'front' | 'back' | 'mobile'>('front');
  const [copied, setCopied] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  // 만료일 계산
  const issueDateObj = new Date(warranty.issueDate);
  const expiryDateObj = new Date(issueDateObj);
  expiryDateObj.setFullYear(expiryDateObj.getFullYear() + (warranty.warrantyPeriodYears || 6));
  const expiryDateStr = isNaN(expiryDateObj.getTime())
    ? ''
    : `${expiryDateObj.getFullYear()}-${String(expiryDateObj.getMonth() + 1).padStart(2, '0')}-${String(expiryDateObj.getDate()).padStart(2, '0')}`;

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
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-xs">
            CSC
          </div>
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
              left: '19.5%',
              width: '27%',
              fontSize: 'clamp(11px, 2.0vw, 15px)'
            }}
          >
            {warranty.customerName}
          </div>

          {/* 연락처 */}
          <div
            className="absolute font-bold text-gray-900 font-mono tracking-wider"
            style={{
              top: '45.6%',
              left: '19.5%',
              width: '27%',
              fontSize: 'clamp(10px, 1.8vw, 14px)'
            }}
          >
            {warranty.customerPhone}
          </div>

          {/* 주소 */}
          <div
            className="absolute font-medium text-gray-800 font-sans truncate text-left"
            style={{
              top: '49.0%',
              left: '19.5%',
              width: '27%',
              fontSize: 'clamp(9px, 1.4vw, 12px)'
            }}
            title={warranty.customerAddress}
          >
            {warranty.customerAddress || '-'}
          </div>

          {/* ── 2. 보증서 정보 오버레이 ── */}
          {/* WARRANTY NO */}
          <div
            className="absolute font-black text-red-700 font-mono tracking-wider"
            style={{
              top: '42.2%',
              left: '69.0%',
              width: '20%',
              fontSize: 'clamp(10px, 1.7vw, 13.5px)'
            }}
          >
            {warranty.warrantyNo}
          </div>

          {/* DATE OF ISSUE (시공일자) */}
          <div
            className="absolute font-bold text-gray-900 font-mono tracking-wider"
            style={{
              top: '45.6%',
              left: '69.0%',
              width: '20%',
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
              top: '59.0%',
              left: '20.0%',
              width: '27%',
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
              top: '62.2%',
              left: '20.0%',
              width: '27%',
              fontSize: 'clamp(10px, 1.7vw, 13px)'
            }}
          >
            {warranty.carColor || '-'}
          </div>

          {/* 차량번호 */}
          <div
            className="absolute font-black text-gray-900 font-sans tracking-wider"
            style={{
              top: '59.0%',
              left: '61.5%',
              width: '26%',
              fontSize: 'clamp(11px, 2.0vw, 15px)'
            }}
          >
            {warranty.carPlate}
          </div>

          {/* 차대번호 (VIN) */}
          <div
            className="absolute font-semibold text-gray-800 font-mono tracking-widest truncate"
            style={{
              top: '62.2%',
              left: '61.5%',
              width: '26%',
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
              top: '71.5%',
              left: '48.0%',
              width: '8.8%',
              fontSize: 'clamp(9px, 1.4vw, 12px)'
            }}
          >
            {warranty.hasClearPps ? warranty.clearPpsDetail || '전체' : '-'}
          </div>

          {/* 컬러PPS ( ) 내부 상세 */}
          <div
            className="absolute font-bold text-red-700 font-sans flex items-center justify-center text-center truncate"
            style={{
              top: '71.5%',
              left: '73.5%',
              width: '8.2%',
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
              top: '75.9%',
              left: '24.0%',
              width: '45.0%',
              fontSize: 'clamp(11px, 2.2vw, 16px)'
            }}
          >
            {warranty.price ? `${warranty.price} 원` : '-'}
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

          {/* 보증기간 오버레이 (빨간 배너 영역: 시공일로부터 _____6____ 년) */}
          <div
            className="absolute font-black text-white font-mono tracking-wider flex items-center justify-center"
            style={{
              top: '59.3%',
              left: '81.5%',
              width: '5.5%',
              fontSize: 'clamp(11px, 2.2vw, 16px)'
            }}
          >
            {warranty.warrantyPeriodYears || 6}
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
              <span className="text-[11px] font-bold uppercase tracking-widest text-red-400 bg-red-500/20 border border-red-500/30 px-2.5 py-1 rounded-full">
                GERMANY CARDIP PPS
              </span>
              <span className="text-xs font-mono text-gray-300">
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
                <span className="text-base font-black text-red-400">{warranty.carPlate}</span>
              </div>
            </div>
          </div>

          {/* 보증 요약 카드 */}
          <div className="p-6 space-y-4">
            {/* 차량 & 시공 정보 테이블 */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-medium">시공 차종</span>
                <span className="font-bold text-gray-900">{warranty.carModel}</span>
              </div>
              {warranty.carColor && (
                <div className="flex justify-between py-1 border-b border-gray-200/60">
                  <span className="text-gray-500 font-medium">차량 색상</span>
                  <span className="font-semibold text-gray-800">{warranty.carColor}</span>
                </div>
              )}
              {warranty.vin?.trim() && (
                <div className="flex justify-between py-1 border-b border-gray-200/60">
                  <span className="text-gray-500 font-medium">차대번호 (VIN)</span>
                  <span className="font-mono text-gray-800">{warranty.vin}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-medium">시공 제품</span>
                <span className="font-bold text-red-700">
                  {[
                    warranty.hasClearPps ? `투명PPS(${warranty.clearPpsDetail || '전체'})` : '',
                    warranty.hasColorPps ? `컬러PPS(${warranty.colorPpsDetail || '전체'})` : ''
                  ].filter(Boolean).join(' + ') || '독일 정품 CARDIP PPS'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-medium">시공 일자</span>
                <span className="font-mono font-semibold text-gray-800">{warranty.issueDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-medium">품질 보증기간</span>
                <span className="font-bold text-primary">시공일로부터 {warranty.warrantyPeriodYears}년</span>
              </div>
              {expiryDateStr && (
                <div className="flex justify-between py-1 border-b border-gray-200/60">
                  <span className="text-gray-500 font-medium">보증 만료일</span>
                  <span className="font-mono font-semibold text-emerald-700">{expiryDateStr}까지</span>
                </div>
              )}
              {warranty.price && (
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 font-medium">시공 금액</span>
                  <span className="font-black text-gray-900">{warranty.price} 원 <span className="text-[10px] font-normal text-gray-400">(VAT 별도)</span></span>
                </div>
              )}
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

            {/* 사후 관리 핵심 요약 */}
            <div className="border border-gray-200 rounded-2xl p-4 text-xs space-y-2 text-gray-700 bg-white">
              <h5 className="font-bold text-gray-900 flex items-center gap-1.5">
                <i className="ri-information-line text-primary" />
                <span>시공 후 간편 관리 요령</span>
              </h5>
              <ul className="list-disc list-inside space-y-1 text-gray-600 text-[11px] leading-relaxed">
                <li>시공 후 부드러운 세차용 스펀지 및 중성 카샴푸 사용 권장</li>
                <li>고압수 분사 시 시공 모서리 부위에 초근접(10cm 미만) 분사 주의</li>
                <li>오염물질(새똥, 송진, 버그 등)은 방치하지 마시고 가볍게 물세척 권장</li>
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
