// 고객용 보증서 공개 화면 (/w/<토큰>)
// 카카오 알림톡의 [보증서 보기] 버튼을 누르면 이 화면이 열립니다.
import React, { useEffect, useState } from 'react';
import type { WarrantyItem } from '../lib/warrantyStorage';
import { fetchPublicWarranty } from '../lib/warrantyCloud';
import { WarrantyViewer } from './WarrantyViewer';

interface PublicWarrantyPageProps {
  token: string;
}

export const PublicWarrantyPage: React.FC<PublicWarrantyPageProps> = ({ token }) => {
  const [warranty, setWarranty] = useState<WarrantyItem | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = '정품 보증서 | 코션스마트센터';
    fetchPublicWarranty(token)
      .then((w) => setWarranty(w))
      .catch((e) => setError(e instanceof Error ? e.message : '보증서를 불러오지 못했습니다.'));
  }, [token]);

  const goHome = () => {
    window.location.href = '/';
  };

  if (warranty) {
    return <WarrantyViewer warranty={warranty} onClose={goHome} publicMode />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-sm text-center space-y-4">
        <p
          style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: '0.08em' }}
          className="text-xs text-red-500 font-medium"
        >
          CAUTION SMART CENTER
        </p>
        {error ? (
          <>
            <i className="ri-error-warning-line text-4xl text-amber-400" />
            <h1 className="text-lg font-bold">보증서를 열 수 없습니다</h1>
            <p className="text-sm text-slate-400 leading-relaxed">{error}</p>
            <a
              href="https://pf.kakao.com/_FxlNhX/chat"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FEE500] text-[#3c1e1e] font-bold rounded-xl text-sm"
            >
              <i className="ri-kakao-talk-fill" />
              카카오톡으로 문의하기
            </a>
          </>
        ) : (
          <>
            <i className="ri-loader-4-line text-4xl animate-spin text-slate-400 inline-block" />
            <h1 className="text-base font-bold">정품 보증서를 불러오는 중...</h1>
          </>
        )}
      </div>
    </div>
  );
};
