import React, { useState, useEffect } from 'react';
import { getWorkPhotoById, type WorkPhotoItem } from '../lib/workPhotoStorage';

interface WorkStatusViewerProps {
  onBackToHome?: () => void;
}

export const WorkStatusViewer: React.FC<WorkStatusViewerProps> = ({ onBackToHome }) => {
  const [item, setItem] = useState<WorkPhotoItem | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [urlParams, setUrlParams] = useState({
    id: '',
    name: '',
    plate: '',
    model: '',
    stage: ''
  });

  useEffect(() => {
    // 해시 파라미터 파싱 (#work-status?id=...&name=...)
    const hash = window.location.hash;
    const queryString = hash.includes('?') ? hash.split('?')[1] : '';
    const params = new URLSearchParams(queryString);
    
    const id = params.get('id') || '';
    const name = params.get('name') || '';
    const plate = params.get('plate') || '';
    const model = params.get('model') || '';
    const stage = params.get('stage') || '';

    setUrlParams({ id, name, plate, model, stage });

    if (id) {
      const found = getWorkPhotoById(id);
      if (found) {
        setItem(found);
        return;
      }
    }

    // 로컬스토리지에 저장된 항목이 없어도 URL 파라미터로 기본 정보 렌더링
    if (name || plate) {
      setItem({
        id: id || 'temp',
        createdAt: new Date().toISOString(),
        customerName: name || '고객',
        customerPhone: '',
        carModel: model || '시공 차량',
        carPlate: plate || '',
        stage: stage || '시공 진행 중',
        photos: []
      });
    }
  }, []);

  const handleDownloadPhoto = (photoUrl: string, index: number) => {
    const a = document.createElement('a');
    a.href = photoUrl;
    a.download = `코션스마트센터_시공사진_${urlParams.plate || '차량'}_${index + 1}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white flex flex-col items-center justify-start p-4 sm:p-6 pb-20 select-none">
      {/* 최상단 네비게이션 */}
      <header className="w-full max-w-lg flex items-center justify-between py-3 mb-4 border-b border-slate-800">
        <button
          onClick={onBackToHome || (() => (window.location.hash = ''))}
          className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-lg hover:bg-slate-800/60 transition-colors"
        >
          <i className="ri-arrow-left-s-line text-lg" />
          <span>홈으로</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-black tracking-wider text-emerald-400 uppercase">LIVE WORK STATUS</span>
        </div>
      </header>

      {/* 메인 카드 컨테이너 */}
      <main className="w-full max-w-lg space-y-4">
        {/* 브랜드 헤더 & 상태 배지 */}
        <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/70 border border-slate-800 p-5 rounded-3xl shadow-xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center shadow-lg shadow-red-600/30">
              <i className="ri-shield-check-fill text-xl text-white" />
            </div>
            <div>
              <p className="text-[11px] font-bold tracking-widest text-red-400 uppercase">CAUTION SMART CENTER</p>
              <h1 className="text-lg font-black text-white">차량 시공 진행 현황</h1>
            </div>
          </div>

          {/* 차량 정보 & 진행 단계 */}
          <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800/80 space-y-2 mt-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">고객명</span>
              <span className="text-sm font-bold text-slate-100">{item?.customerName || urlParams.name || '고객님'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">차량번호 / 차종</span>
              <span className="text-sm font-black text-amber-300">
                {item?.carPlate || urlParams.plate} {item?.carModel ? `(${item.carModel})` : urlParams.model ? `(${urlParams.model})` : ''}
              </span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-800">
              <span className="text-xs text-slate-400">현재 공정</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-black rounded-full border border-emerald-500/30">
                <i className="ri-tools-fill text-xs" />
                {item?.stage || urlParams.stage || '정밀 시공 진행 중'}
              </span>
            </div>
          </div>

          {item?.message && (
            <div className="mt-3 p-3 bg-red-950/30 border border-red-900/40 rounded-xl text-xs text-slate-300 leading-relaxed">
              <p className="font-bold text-red-400 flex items-center gap-1 mb-1">
                <i className="ri-chat-smile-2-line" /> 시공 마스터 안내 말씀:
              </p>
              {item.message}
            </div>
          )}
        </div>

        {/* 시공 사진 갤러리 섹션 */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-200 flex items-center gap-1.5">
              <i className="ri-image-2-fill text-red-500 text-base" />
              <span>실시간 시공 현장 사진</span>
            </h2>
            <span className="text-[11px] text-slate-400 font-semibold">
              총 {item?.photos?.length || 0}장
            </span>
          </div>

          {(!item?.photos || item.photos.length === 0) ? (
            <div className="p-8 text-center bg-slate-950/50 rounded-2xl border border-slate-800/60 text-slate-500 space-y-2">
              <i className="ri-camera-lens-line text-3xl text-slate-600 block" />
              <p className="text-xs font-semibold text-slate-400">등록된 작업 사진이 없습니다.</p>
              <p className="text-[11px] text-slate-500">시공팀에서 작업 사진을 업로드하면 이곳에 실시간으로 표시됩니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              {item.photos.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-red-500/50 cursor-pointer shadow-md transition-all active:scale-[0.98]"
                >
                  <img
                    src={photo}
                    alt={`시공 사진 ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2">
                    <span className="text-[11px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-full">
                      #{idx + 1}
                    </span>
                    <span className="text-xs text-red-400">
                      <i className="ri-zoom-in-line" />
                    </span>
                  </div>
                  <span className="absolute top-2 left-2 text-[10px] font-bold bg-black/60 text-slate-200 px-1.5 py-0.5 rounded">
                    사진 {idx + 1}
                  </span>
                </div>
              ))}
            </div>
          )}

          <p className="text-[11px] text-slate-400 text-center pt-2">
            💡 사진을 터치하면 크게 확대하여 보실 수 있습니다.
          </p>
        </div>

        {/* 정품 시공 보증 안내 & 문의 */}
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl space-y-2 text-center text-xs text-slate-400">
          <p className="font-bold text-slate-200">독일 CARDIP 공식 수입원 (주)코션스마트센터</p>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            시공이 완료되면 모바일 정품 전자 보증서가 고객님 카카오톡으로 자동 발급됩니다.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <a
              href="tel:031-705-1888"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <i className="ri-phone-fill text-emerald-400" />
              <span>시공센터 전화문의</span>
            </a>
          </div>
        </div>
      </main>

      {/* 사진 풀스크린 모달 뷰어 */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="w-full max-w-lg flex items-center justify-between text-white py-2" onClick={(e) => e.stopPropagation()}>
            <span className="text-xs font-bold text-slate-300">시공 사진 확대</span>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 text-xl"
            >
              <i className="ri-close-line" />
            </button>
          </div>

          <div className="relative max-w-lg max-h-[75vh] flex items-center justify-center overflow-hidden my-auto" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto}
              alt="확대된 시공 사진"
              className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl border border-slate-800"
            />
          </div>

          <div className="w-full max-w-lg flex items-center justify-center gap-3 pt-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => handleDownloadPhoto(selectedPhoto, 0)}
              className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
            >
              <i className="ri-download-2-line" />
              <span>사진 저장하기</span>
            </button>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
