import React, { useState, useRef } from 'react';
import { type WarrantyItem, copyTextToClipboard } from '../lib/warrantyStorage';
import {
  type WorkPhotoItem,
  saveWorkPhoto,
  compressImageFile,
  createWorkPhotoShareMessage,
  getWorkPhotoViewUrl
} from '../lib/workPhotoStorage';
import { sendWorkPhotoViaSolapi } from '../lib/solapiWorkPhoto';
import { isAlimtalkConfigured } from '../lib/alimtalk';

interface AdminWorkPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  warranties: WarrantyItem[];
  preselectedWarranty?: WarrantyItem | null;
  onSuccessToast?: (msg: string) => void;
}

const STAGES = [
  '🧼 1단계: 디테일링 세척 및 탈지 전처리',
  '🛡️ 2단계: 필름 성형 및 안착 시공 중',
  '✂️ 3단계: 정밀 핸드컷 마감 및 모서리 건조',
  '☀️ 4단계: 열처리 및 최종 품질 검수',
  '🎉 5단계: 최종 시공 완료 및 출고 대기'
];

export const AdminWorkPhotoModal: React.FC<AdminWorkPhotoModalProps> = ({
  isOpen,
  onClose,
  warranties,
  preselectedWarranty,
  onSuccessToast
}) => {
  const [selectedWarrantyId, setSelectedWarrantyId] = useState<string>(preselectedWarranty?.id || '');
  const [customerName, setCustomerName] = useState(preselectedWarranty?.customerName || '');
  const [customerPhone, setCustomerPhone] = useState(preselectedWarranty?.customerPhone || '');
  const [carModel, setCarModel] = useState(preselectedWarranty?.carModel || '');
  const [carPlate, setCarPlate] = useState(preselectedWarranty?.carPlate || '');
  const [stage, setStage] = useState(STAGES[1]);
  const [customStage, setCustomStage] = useState('');
  const [message, setMessage] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // preselectedWarranty 변경 시 자동 입력
  React.useEffect(() => {
    if (preselectedWarranty) {
      setSelectedWarrantyId(preselectedWarranty.id);
      setCustomerName(preselectedWarranty.customerName);
      setCustomerPhone(preselectedWarranty.customerPhone);
      setCarModel(preselectedWarranty.carModel);
      setCarPlate(preselectedWarranty.carPlate);
    }
  }, [preselectedWarranty]);

  if (!isOpen) return null;

  // 보증서 선택 변경 시 자동 채우기
  const handleSelectWarranty = (id: string) => {
    setSelectedWarrantyId(id);
    const target = warranties.find((w) => w.id === id);
    if (target) {
      setCustomerName(target.customerName);
      setCustomerPhone(target.customerPhone);
      setCarModel(target.carModel);
      setCarPlate(target.carPlate);
    }
  };

  // 사진 파일 선택 및 자동 압축
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (photos.length + files.length > 5) {
      alert('시공 사진은 한 번에 최대 5장까지 등록할 수 있습니다.');
      return;
    }

    setIsCompressing(true);
    try {
      const compressedList: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const compressed = await compressImageFile(files[i]);
        compressedList.push(compressed);
      }
      setPhotos((prev) => [...prev, ...compressedList]);
    } catch (err) {
      console.error('Image compression failed:', err);
      alert('사진 처리 중 오류가 발생했습니다.');
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // 사진 삭제
  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, idx) => idx !== index));
  };

  const currentStage = stage === 'custom' ? customStage : stage;

  // 임시 아이템 객체 생성
  const buildCurrentItem = (): WorkPhotoItem => {
    return {
      id: `wp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      warrantyId: selectedWarrantyId || undefined,
      customerName: customerName.trim() || '고객',
      customerPhone: customerPhone.trim(),
      carModel: carModel.trim() || '차량',
      carPlate: carPlate.trim(),
      stage: currentStage || '시공 진행 중',
      message: message.trim(),
      photos: photos
    };
  };

  // 1. 솔라피(Solapi)로 고객 폰에 직접 문자/MMS 전송
  const handleSendViaSolapi = async () => {
    if (!customerPhone) {
      alert('고객 연락처를 입력해 주세요.');
      return;
    }

    const solapiReady = isAlimtalkConfigured();
    if (!solapiReady) {
      if (
        window.confirm(
          '솔라피 API Key가 아직 설정되지 않았습니다.\n[카카오톡 설정]에서 솔라피 정보를 등록하신 후 이용하실 수 있습니다.\n\n안내문구 및 앨범 링크를 클립보드에 복사하시겠습니까?'
        )
      ) {
        handleCopyShareMessage();
      }
      return;
    }

    setIsSending(true);
    const item = buildCurrentItem();
    // 데이터 저장
    const saved = saveWorkPhoto(item);

    const result = await sendWorkPhotoViaSolapi(saved);
    setIsSending(false);

    if (result.success) {
      onSuccessToast?.(`🎉 고객님 휴대폰으로 시공 현황(${result.method})이 성공적으로 발송되었습니다!`);
      onClose();
    } else {
      alert(`솔라피 발송 실패: ${result.errorMessage}\n\n문자 복사 또는 카카오톡 공유를 이용해 주세요.`);
    }
  };

  // 2. 안내문구 + 앨범 링크 복사
  const handleCopyShareMessage = async () => {
    const item = buildCurrentItem();
    saveWorkPhoto(item);

    const text = createWorkPhotoShareMessage(item);
    const ok = await copyTextToClipboard(text);
    if (ok) {
      onSuccessToast?.('📋 시공 사진 확인 링크와 안내 문구가 복사되었습니다. (카톡/문자에 붙여넣기 하세요)');
    } else {
      alert('복사에 실패했습니다.');
    }
  };

  // 3. 고객 화면 미리보기 (새 창 열기)
  const handlePreviewCustomerView = () => {
    const item = buildCurrentItem();
    saveWorkPhoto(item);
    const url = getWorkPhotoViewUrl(item);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        {/* 모달 상단 헤더 */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/30">
              <i className="ri-camera-3-fill text-lg text-white" />
            </div>
            <div>
              <h2 className="text-base font-black">차량 시공/작업 사진 전송</h2>
              <p className="text-xs text-slate-300">고객님께 실시간 작업 현황 사진을 솔라피 문자/카톡으로 보냅니다</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <i className="ri-close-line text-xl" />
          </button>
        </div>

        {/* 모달 본문 (스크롤 영역) */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-700 flex-1">
          {/* 차량/고객 선택 */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              등록된 보증서(차량) 선택 <span className="text-slate-400 font-normal">(선택 시 고객 정보 자동 입력)</span>
            </label>
            <select
              value={selectedWarrantyId}
              onChange={(e) => handleSelectWarranty(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">-- 직접 입력 또는 보증서 목록에서 선택 --</option>
              {warranties.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.carPlate} | {w.carModel} ({w.customerName} 고객님 / {w.customerPhone})
                </option>
              ))}
            </select>
          </div>

          {/* 고객 정보 2열 그리드 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">고객명 *</label>
              <input
                type="text"
                placeholder="홍길동"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">연락처 *</label>
              <input
                type="text"
                placeholder="010-1234-5678"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">차종 *</label>
              <input
                type="text"
                placeholder="포르쉐 911 카레라"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">차량번호 *</label>
              <input
                type="text"
                placeholder="12가 3456"
                value={carPlate}
                onChange={(e) => setCarPlate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* 시공 단계 선택 (원클릭 칩 버튼) */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">
              현재 시공 단계 선택 <span className="text-emerald-600 font-bold">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {STAGES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStage(s)}
                  className={`px-3 py-2 text-left text-xs font-bold rounded-xl transition-all border ${
                    stage === s
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-500 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {s}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setStage('custom')}
                className={`px-3 py-2 text-left text-xs font-bold rounded-xl transition-all border ${
                  stage === 'custom'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-500 shadow-sm'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                ✏️ 직접 입력
              </button>
            </div>
            {stage === 'custom' && (
              <input
                type="text"
                placeholder="직접 시공 단계를 입력해 주세요 (예: 휠 코팅 및 본넷 PPF 완료)"
                value={customStage}
                onChange={(e) => setCustomStage(e.target.value)}
                className="w-full mt-2 px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500"
              />
            )}
          </div>

          {/* 작업 사진 업로드 (스마트폰 카메라/앨범) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                작업 현장 사진 첨부 <span className="text-slate-400 font-normal">({photos.length}/5장)</span>
              </label>
              {photos.length < 5 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isCompressing}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <i className="ri-add-line text-sm" />
                  <span>사진 추가 (촬영/선택)</span>
                </button>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              multiple
              accept="image/*"
              className="hidden"
            />

            {/* 썸네일 그리드 */}
            {photos.length === 0 ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/30 p-6 rounded-2xl text-center cursor-pointer transition-colors"
              >
                <i className="ri-camera-lens-line text-3xl text-slate-400 block mb-1" />
                <p className="text-xs font-bold text-slate-600">휴대폰 카메라로 촬영하거나 앨범에서 사진을 선택하세요</p>
                <p className="text-[11px] text-slate-400 mt-0.5">최대 5장까지 등록 가능 (자동 고화질 압축 지원)</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {photos.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group">
                    <img src={img} alt={`작업 사진 ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute top-1 right-1 w-5 h-5 bg-black/70 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors"
                      title="사진 삭제"
                    >
                      <i className="ri-close-line" />
                    </button>
                    <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-black/60 text-white px-1 rounded">
                      #{idx + 1}
                    </span>
                  </div>
                ))}
                {photos.length < 5 && (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/40 flex flex-col items-center justify-center text-slate-400 hover:text-emerald-600 cursor-pointer transition-colors"
                  >
                    <i className="ri-add-line text-xl" />
                    <span className="text-[10px] font-bold">추가</span>
                  </div>
                )}
              </div>
            )}

            {isCompressing && (
              <p className="text-xs text-emerald-600 font-bold mt-1.5 flex items-center gap-1 animate-pulse">
                <i className="ri-loader-4-line animate-spin" /> 사진 최적화 압축 중...
              </p>
            )}
          </div>

          {/* 추가 고객 안내 메시지 */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              고객 전달 메모 <span className="text-slate-400 font-normal">(선택 사항)</span>
            </label>
            <textarea
              rows={2}
              placeholder="예: 꼼꼼한 모서리 마감을 위해 1차 열처리 건조를 진행 중입니다. 예상 출고 시각은 오후 5시경입니다."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 leading-relaxed"
            />
          </div>

          {/* 발송 안내 요약 박스 */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <p className="font-bold text-slate-800 flex items-center gap-1">
              <i className="ri-information-line text-emerald-600" /> 발송 안내
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              • <strong>[솔라피로 바로 발송]</strong>을 누르면 고객님 휴대폰으로 사진(MMS)과 고화질 모바일 앨범 링크가 함께 발송됩니다.
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              • 솔라피 설정 전이거나 직접 카톡으로 보내고 싶으실 땐 <strong>[안내문구 복사]</strong>를 눌러 고객 채팅방에 바로 붙여넣으실 수 있습니다.
            </p>
          </div>
        </div>

        {/* 모달 하단 액션 버튼 바 */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          {/* 고객 열람 미리보기 */}
          <button
            type="button"
            onClick={handlePreviewCustomerView}
            className="px-3.5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
            title="고객이 보게 될 모바일 화면 미리보기"
          >
            <i className="ri-external-link-line text-sm text-slate-500" />
            <span>앨범 화면 미리보기</span>
          </button>

          <div className="flex items-center gap-2">
            {/* 문구 복사 */}
            <button
              type="button"
              onClick={handleCopyShareMessage}
              className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
            >
              <i className="ri-file-copy-line text-sm" />
              <span>문구 복사</span>
            </button>

            {/* 솔라피 즉시 발송 */}
            <button
              type="button"
              onClick={handleSendViaSolapi}
              disabled={isSending || isCompressing}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-black rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-sm" />
                  <span>솔라피 발송 중...</span>
                </>
              ) : (
                <>
                  <i className="ri-send-plane-fill text-sm" />
                  <span>솔라피로 고객에게 발송</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
