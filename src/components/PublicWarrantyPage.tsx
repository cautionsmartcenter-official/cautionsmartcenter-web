// 고객용 보증서 공개 및 다운로드 전용 화면 (/w/<토큰>)
// 이메일이나 알림톡의 [보증서 확인 및 PDF 다운로드] 링크로 들어오면 열립니다.
import React, { useEffect, useState } from 'react';
import type { WarrantyItem } from '../lib/warrantyStorage';
import { downloadWarrantyPdf, copyTextToClipboard, formatPriceWithCommas, cacheReceivedWarranty } from '../lib/warrantyStorage';
import { fetchPublicWarranty } from '../lib/warrantyCloud';
import { WarrantyViewer } from './WarrantyViewer';

interface PublicWarrantyPageProps {
  token: string;
}

export const PublicWarrantyPage: React.FC<PublicWarrantyPageProps> = ({ token }) => {
  const [warranty, setWarranty] = useState<WarrantyItem | null>(null);
  const [error, setError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showFullDocument, setShowFullDocument] = useState(false);

  useEffect(() => {
    document.title = '정품 품질보증서 | 코션스마트센터';

    // 1. URL search or hash에 d= 데이터가 있으면 즉시 복호화하여 1초 만에 표시
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
      const encoded = searchParams.get('d') || hashParams.get('d');
      if (encoded) {
        // Base64URL 디코딩 (한글 및 특수문자 완벽 복원)
        const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
        const binaryStr = atob(base64);
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        const jsonStr = new TextDecoder('utf-8').decode(bytes);
        const p = JSON.parse(jsonStr);

        if (p && p.no && p.name) {
          const item: WarrantyItem = {
            id: token || p.no,
            warrantyNo: p.no,
            createdAt: p.date || new Date().toISOString(),
            customerName: p.name,
            customerPhone: p.phone || '',
            customerEmail: p.email || '',
            carModel: p.model || '',
            carPlate: p.plate || '',
            carColor: p.color || '',
            vin: p.vin || '',
            hasClearPps: Boolean(p.c),
            clearPpsDetail: p.cd || '',
            hasColorPps: Boolean(p.k),
            colorPpsDetail: p.kd || '',
            price: p.p || '',
            issueDate: p.date || '',
            warrantyPeriodYears: Number(p.years) || 6,
            issuedBy: p.by || '(주) 코션스마트센터',
            status: 'active'
          };
          // 고객 폰에 보관 → 나중에 [내 차량 보증서 등록]에서 차량번호+연락처로 확인 가능
          cacheReceivedWarranty(item);
          setWarranty(item);
          return;
        }
      }
    } catch (e) {
      console.warn('[PublicWarrantyPage] URL 데이터 파싱 오류:', e);
    }

    // 2. 서버 Firestore 조회 폴백
    fetchPublicWarranty(token)
      .then((w) => setWarranty(w))
      .catch((e) => setError(e instanceof Error ? e.message : '보증서를 불러오지 못했습니다.'));
  }, [token]);

  // 페이지 진입 시 자동 PDF 다운로드 실행
  useEffect(() => {
    if (warranty) {
      const timer = setTimeout(() => {
        handleDownloadPdf();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [warranty?.warrantyNo]);

  // PDF 다운로드 실행
  const handleDownloadPdf = async () => {
    if (!warranty || isDownloading) return;
    setIsDownloading(true);
    setDownloadSuccess(false);
    try {
      const ok = await downloadWarrantyPdf(warranty);
      if (ok) {
        setDownloadSuccess(true);
      }
    } catch (e) {
      console.error('PDF 다운로드 실패:', e);
    } finally {
      setIsDownloading(false);
    }
  };

  const goHome = () => {
    window.location.href = '/';
  };

  // 만약 고객이 "원본 서식 전체 열람"을 눌렀을 경우
  if (warranty && showFullDocument) {
    return <WarrantyViewer warranty={warranty} onClose={() => setShowFullDocument(false)} publicMode />;
  }

  // 로딩 중이거나 정상 보증서 로드 완료 상태
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-4 sm:p-6 py-8">
      {/* 헤더 브랜딩 */}
      <div className="w-full max-w-lg text-center mb-6">
        <span
          style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: '0.1em' }}
          className="text-xs text-red-500 font-bold uppercase tracking-widest inline-block mb-1"
        >
          CAUTION SMART CENTER
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          독일 정품 CARDIP 품질보증서
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          (주)코션스마트센터 공식 인증 시공 보증 시스템
        </p>
      </div>

      {error ? (
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
          <i className="ri-error-warning-line text-4xl text-amber-400 block" />
          <h2 className="text-lg font-bold text-white">보증서를 열 수 없습니다</h2>
          <p className="text-xs text-slate-400 leading-relaxed">{error}</p>
          <a
            href="https://pf.kakao.com/_FxlNhX/chat"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-[#FEE500] text-[#3c1e1e] font-bold rounded-xl text-xs w-full shadow cursor-pointer"
          >
            <i className="ri-kakao-talk-fill text-base" />
            카카오톡 고객센터 문의하기
          </a>
        </div>
      ) : !warranty ? (
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
          <i className="ri-loader-4-line text-4xl animate-spin text-red-500 inline-block" />
          <h2 className="text-base font-bold text-white">정품 보증서를 불러오는 중입니다...</h2>
        </div>
      ) : (
        <div className="w-full max-w-md space-y-4">
          {/* ── 핵심 다운로드 카드 ── */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-red-950 border-2 border-red-500/50 rounded-3xl p-5 shadow-2xl text-center space-y-3 relative overflow-hidden">
            <div className="space-y-1">
              <span className="text-[11px] bg-red-600/30 text-red-400 border border-red-500/30 px-2.5 py-0.5 rounded-full font-bold inline-block">
                발급 완료
              </span>
              <h2 className="text-lg font-bold text-white">
                <span className="text-red-400">{warranty.customerName}</span> 고객님, 보증서가 준비되었습니다.
              </h2>
              <p className="text-xs text-slate-300">
                아래 버튼을 누르면 1·2페이지 합본 공식 PDF가 다운로드됩니다.
              </p>
            </div>

            {/* 메인 다운로드 버튼 */}
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="w-full py-4 px-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black rounded-2xl shadow-xl shadow-red-900/40 flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              {isDownloading ? (
                <i className="ri-loader-4-line animate-spin text-xl text-white" />
              ) : (
                <i className="ri-download-2-fill text-xl text-yellow-300" />
              )}
              <span>보증서 1·2페이지 통합 PDF 다운로드</span>
            </button>

            {downloadSuccess && (
              <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-2.5 text-xs text-emerald-300 font-semibold flex items-center justify-center gap-1.5 animate-fade-in">
                <i className="ri-checkbox-circle-fill text-sm text-emerald-400" />
                <span>PDF 파일이 스마트폰(사진첩/다운로드)에 저장되었습니다!</span>
              </div>
            )}

            <p className="text-[11px] text-slate-400 leading-relaxed">
              💡 사고나 보험 처리 시 저장된 보증서 PDF 파일을 보험사에 제출하시면 정품 보증 혜택이 적용됩니다.
            </p>
          </div>

          {/* ── 디지털 정품 보증서 카드 (깨짐 없는 깔끔한 모바일 카드) ── */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 text-slate-900">
            {/* 카드 상단 블랙 헤더 */}
            <div className="bg-slate-900 text-white p-5">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-red-400 font-bold font-mono">
                  {warranty.warrantyNo}
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full text-[10px] font-bold">
                  ● 정품 인증 완료
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {warranty.carModel}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                차량번호: <strong className="text-white font-sans text-sm">{warranty.carPlate}</strong>
              </p>
            </div>

            {/* 카드 상세 스펙 테이블 */}
            <div className="p-5 space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">고객명</span>
                <span className="font-bold text-slate-900">{warranty.customerName} 고객님</span>
              </div>
              {warranty.carColor && (
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">차량 색상</span>
                  <span className="font-bold text-slate-900">{warranty.carColor}</span>
                </div>
              )}
              {warranty.vin && (
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">차대번호(VIN)</span>
                  <span className="font-bold text-slate-900 font-mono">{warranty.vin}</span>
                </div>
              )}
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">시공 제품</span>
                <span className="font-bold text-red-600">
                  {[
                    warranty.hasClearPps ? `투명PPS(${warranty.clearPpsDetail || '전체'})` : '',
                    warranty.hasColorPps ? `컬러PPS(${warranty.colorPpsDetail || '전체'})` : ''
                  ].filter(Boolean).join(' + ') || '독일 정품 CARDIP PPS'}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">시공일자 / 보증기간</span>
                <span className="font-bold text-slate-900">
                  {warranty.issueDate} (시공일로부터 {warranty.warrantyPeriodYears}년)
                </span>
              </div>
              {warranty.price && (
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">시공금액</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {formatPriceWithCommas(warranty.price)} 원 (VAT별도)
                  </span>
                </div>
              )}
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 font-medium">발급처</span>
                <span className="font-bold text-slate-900">{warranty.issuedBy || '(주) 코션스마트센터'}</span>
              </div>
            </div>

            {/* 카드 푸터: 보조 액션 버튼들 */}
            <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setShowFullDocument(true)}
                className="flex-1 py-2 px-3 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <i className="ri-file-text-line text-slate-600" />
                <span>A4 인쇄 원문 보기</span>
              </button>

              <button
                onClick={async () => {
                  await copyTextToClipboard(window.location.href);
                  alert('보증서 확인 링크가 복사되었습니다.');
                }}
                className="flex-1 py-2 px-3 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <i className="ri-link text-blue-600" />
                <span>보증서 링크 복사</span>
              </button>
            </div>
          </div>

          {/* 하단 고객센터 안내 */}
          <div className="text-center text-xs text-slate-500 pt-2 space-y-1">
            <p>(주)코션스마트센터 | 대표전화: 031-705-1888</p>
            <p>경기도 성남시 분당구 판교동 / 공식 인증 센터</p>
            <button
              onClick={goHome}
              className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer pt-2 block mx-auto"
            >
              코션스마트센터 메인 홈페이지 방문하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
