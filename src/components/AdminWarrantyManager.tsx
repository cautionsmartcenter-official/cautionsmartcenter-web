import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  type WarrantyItem,
  getWarranties,
  saveWarranty,
  updateWarranty,
  deleteWarranty,
  exportWarrantiesToCSV,
  generateWarrantyNo,
  createWarrantyShareMessage,
  getWarrantyViewUrl
} from '../lib/warrantyStorage';
import { WarrantyViewer } from './WarrantyViewer';

interface AdminWarrantyManagerProps {
  initialPrefill?: Partial<WarrantyItem> | null;
  onClearPrefill?: () => void;
}

export const AdminWarrantyManager: React.FC<AdminWarrantyManagerProps> = ({
  initialPrefill,
  onClearPrefill
}) => {
  const [warranties, setWarranties] = useState<WarrantyItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [productFilter, setProductFilter] = useState<'all' | 'clear' | 'color'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // 모달 상태
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewingWarranty, setViewingWarranty] = useState<WarrantyItem | null>(null);
  const [issuedSuccessWarranty, setIssuedSuccessWarranty] = useState<WarrantyItem | null>(null);

  // 알림 토스트
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 폼 필드 상태
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    carModel: '',
    carPlate: '',
    carColor: '',
    vin: '',
    hasClearPps: true,
    clearPpsDetail: '전체 (Full Body)',
    hasColorPps: false,
    colorPpsDetail: '',
    price: '5,500,000',
    issueDate: new Date().toISOString().slice(0, 10),
    warrantyPeriodYears: 6,
    warrantyNo: generateWarrantyNo(),
    issuedBy: '(주) 코션스마트센터',
    status: 'active' as 'active' | 'expired' | 'cancelled',
    notes: ''
  });

  const reloadData = () => {
    setWarranties(getWarranties());
  };

  useEffect(() => {
    reloadData();
  }, []);

  // 외부(상담 신청서)에서 전달된 사전 정보가 있을 때 폼 열기
  useEffect(() => {
    if (initialPrefill) {
      setFormData((prev) => ({
        ...prev,
        customerName: initialPrefill.customerName || prev.customerName,
        customerPhone: initialPrefill.customerPhone || prev.customerPhone,
        carModel: initialPrefill.carModel || prev.carModel,
        warrantyNo: generateWarrantyNo(),
        issueDate: new Date().toISOString().slice(0, 10),
        notes: initialPrefill.notes || ''
      }));
      setEditingId(null);
      setIsFormOpen(true);
      if (onClearPrefill) onClearPrefill();
    }
  }, [initialPrefill]);

  // 신규 발급 모달 열기
  const handleOpenCreateModal = () => {
    setEditingId(null);
    setFormData({
      customerName: '',
      customerPhone: '',
      customerAddress: '',
      carModel: '',
      carPlate: '',
      carColor: '',
      vin: '',
      hasClearPps: true,
      clearPpsDetail: '전체 (Full Body)',
      hasColorPps: false,
      colorPpsDetail: '',
      price: '5,500,000',
      issueDate: new Date().toISOString().slice(0, 10),
      warrantyPeriodYears: 6,
      warrantyNo: generateWarrantyNo(),
      issuedBy: '(주) 코션스마트센터',
      status: 'active',
      notes: ''
    });
    setIsFormOpen(true);
  };

  // 수정 모달 열기
  const handleOpenEditModal = (item: WarrantyItem) => {
    setEditingId(item.id);
    setFormData({
      customerName: item.customerName,
      customerPhone: item.customerPhone,
      customerAddress: item.customerAddress || '',
      carModel: item.carModel,
      carPlate: item.carPlate,
      carColor: item.carColor || '',
      vin: item.vin || '',
      hasClearPps: item.hasClearPps,
      clearPpsDetail: item.clearPpsDetail || '',
      hasColorPps: item.hasColorPps,
      colorPpsDetail: item.colorPpsDetail || '',
      price: item.price,
      issueDate: item.issueDate,
      warrantyPeriodYears: item.warrantyPeriodYears || 6,
      warrantyNo: item.warrantyNo,
      issuedBy: item.issuedBy || '(주) 코션스마트센터',
      status: item.status,
      notes: item.notes || ''
    });
    setIsFormOpen(true);
  };

  // 폼 제출 (저장/발급)
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName.trim()) {
      alert('고객명을 입력해 주세요.');
      return;
    }
    if (!formData.customerPhone.trim()) {
      alert('고객 연락처를 입력해 주세요.');
      return;
    }
    if (!formData.carModel.trim()) {
      alert('차종을 입력해 주세요.');
      return;
    }
    if (!formData.carPlate.trim()) {
      alert('차량번호를 입력해 주세요.');
      return;
    }
    if (!formData.hasClearPps && !formData.hasColorPps) {
      alert('시공 제품(투명PPS 또는 컬러PPS)을 최소 1개 이상 선택해 주세요.');
      return;
    }

    if (editingId) {
      // 수정
      const updated = updateWarranty(editingId, formData);
      if (updated) {
        reloadData();
        setIsFormOpen(false);
        showToast(`보증서(${formData.warrantyNo})가 성공적으로 수정되었습니다.`);
      }
    } else {
      // 신규 발급
      const created = saveWarranty(formData);
      reloadData();
      setIsFormOpen(false);
      // 발급 성공 모달 표시
      setIssuedSuccessWarranty(created);
    }
  };

  // 삭제 처리
  const handleDelete = (id: string, no: string, name: string) => {
    if (window.confirm(`[${no}] ${name} 고객님의 보증서 내역을 삭제하시겠습니까?`)) {
      deleteWarranty(id);
      reloadData();
      showToast('보증서 내역이 삭제되었습니다.');
    }
  };

  // 카카오톡 전송 / 공유
  const handleKakaoShare = (item: WarrantyItem) => {
    const shareMessage = createWarrantyShareMessage(item);
    const viewUrl = getWarrantyViewUrl(item.warrantyNo);

    // 카카오 SDK 사용 가능한 경우
    if (typeof window !== 'undefined' && (window as any).Kakao?.Share) {
      try {
        (window as any).Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: `[코션스마트센터] 공식 전자 품질 보증서`,
            description: `${item.customerName} 고객님 (${item.carPlate} / ${item.carModel})\n독일 CARDIP 정품 PPS 시공 보증서가 발급되었습니다.`,
            imageUrl: `${window.location.origin}/images/warranty/warranty_front.png`,
            link: {
              mobileWebUrl: viewUrl,
              webUrl: viewUrl
            }
          },
          buttons: [
            {
              title: '전자 보증서 확인하기',
              link: {
                mobileWebUrl: viewUrl,
                webUrl: viewUrl
              }
            }
          ]
        });
        showToast('카카오톡 전송 창이 열렸습니다.');
        return;
      } catch (err) {
        console.warn('Kakao Share direct error', err);
      }
    }

    // 기본 클립보드 복사
    navigator.clipboard.writeText(shareMessage).then(() => {
      showToast('고객 카톡 전송용 보증서 안내문구가 복사되었습니다! 카톡 채팅방에 붙여넣기(Ctrl+V) 해주세요.');
    });
  };

  // 보증서 열람 링크 복사
  const handleCopyLink = (item: WarrantyItem) => {
    const url = getWarrantyViewUrl(item.warrantyNo);
    navigator.clipboard.writeText(url).then(() => {
      showToast('보증서 확인 링크가 클립보드에 복사되었습니다. (문자 전송 가능)');
    });
  };

  // 필터링 및 검색
  const filteredWarranties = useMemo(() => {
    return warranties.filter((item) => {
      const q = searchTerm.trim().toLowerCase();
      const matchSearch =
        q === '' ||
        item.customerName.toLowerCase().includes(q) ||
        item.customerPhone.includes(q) ||
        item.carModel.toLowerCase().includes(q) ||
        item.carPlate.toLowerCase().includes(q) ||
        item.warrantyNo.toLowerCase().includes(q) ||
        (item.vin && item.vin.toLowerCase().includes(q));

      const matchProduct =
        productFilter === 'all' ||
        (productFilter === 'clear' && item.hasClearPps) ||
        (productFilter === 'color' && item.hasColorPps);

      const matchStatus = statusFilter === 'all' || item.status === statusFilter;

      return matchSearch && matchProduct && matchStatus;
    });
  }, [warranties, searchTerm, productFilter, statusFilter]);

  // 통계 계산
  const stats = useMemo(() => {
    const total = warranties.length;
    const clearCount = warranties.filter((w) => w.hasClearPps).length;
    const colorCount = warranties.filter((w) => w.hasColorPps).length;
    const activeCount = warranties.filter((w) => w.status === 'active').length;
    return { total, clearCount, colorCount, activeCount };
  }, [warranties]);

  return (
    <div className="space-y-6">
      {/* ── 토스트 메시지 ── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs sm:text-sm font-semibold flex items-center gap-2.5 max-w-md"
          >
            <i className="ri-checkbox-circle-fill text-emerald-400 text-base" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 1. 보증서 발급 통계 카드 ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 전체 보증서 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">총 발급 보증서</span>
            <span className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600">
              <i className="ri-shield-check-fill" />
            </span>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-slate-900">
            {stats.total} <span className="text-xs font-medium text-slate-500">건</span>
          </div>
        </div>

        {/* 투명 PPS */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">투명 PPS 시공</span>
            <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <i className="ri-drop-line" />
            </span>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-blue-600">
            {stats.clearCount} <span className="text-xs font-medium text-slate-500">건</span>
          </div>
        </div>

        {/* 컬러 PPS */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">컬러 PPS 시공</span>
            <span className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <i className="ri-palette-line" />
            </span>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-purple-600">
            {stats.colorCount} <span className="text-xs font-medium text-slate-500">건</span>
          </div>
        </div>

        {/* 유효 보증서 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">유효 보증 상태</span>
            <span className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <i className="ri-verified-badge-line" />
            </span>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-emerald-600">
            {stats.activeCount} <span className="text-xs font-medium text-slate-500">건</span>
          </div>
        </div>
      </div>

      {/* ── 2. 검색, 필터 및 발급 버튼 바 ── */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-3 justify-between">
        {/* 검색창 */}
        <div className="relative w-full md:w-80">
          <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="고객명, 차량번호, 차종, 보증번호 검색..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <i className="ri-close-line" />
            </button>
          )}
        </div>

        {/* 필터 & 액션 버튼들 */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          {/* 제품 필터 */}
          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-red-500"
          >
            <option value="all">제품: 전체</option>
            <option value="clear">투명 PPS만</option>
            <option value="color">컬러 PPS만</option>
          </select>

          {/* 보증 상태 필터 */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-red-500"
          >
            <option value="all">상태: 전체</option>
            <option value="active">정상 유효</option>
            <option value="expired">만료</option>
            <option value="cancelled">취소</option>
          </select>

          {/* 엑셀 다운로드 */}
          <button
            onClick={exportWarrantiesToCSV}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            title="전체 보증서 발급 대장을 CSV 파일로 다운로드합니다"
          >
            <i className="ri-file-excel-2-line text-emerald-600 text-base" />
            <span className="hidden sm:inline">대장 엑셀저장</span>
          </button>

          {/* + 신규 보증서 발급 버튼 */}
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <i className="ri-add-line text-base" />
            <span>새 보증서 발급하기</span>
          </button>
        </div>
      </div>

      {/* ── 3. 보증서 목록 테이블 ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-[11px] sm:text-xs uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">보증번호</th>
                <th className="py-3.5 px-4">발급일 / 보증기간</th>
                <th className="py-3.5 px-4">고객정보</th>
                <th className="py-3.5 px-4">차량정보</th>
                <th className="py-3.5 px-4">시공 제품 및 상세</th>
                <th className="py-3.5 px-4">시공가격 (VAT별도)</th>
                <th className="py-3.5 px-4">상태</th>
                <th className="py-3.5 px-4 text-center">전송 & 관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredWarranties.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <i className="ri-shield-cross-line text-3xl block mb-2 text-slate-300" />
                    검색 조건에 맞는 보증서 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredWarranties.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* 보증번호 */}
                    <td className="py-3.5 px-4 font-mono font-bold text-red-600 whitespace-nowrap">
                      {item.warrantyNo}
                    </td>

                    {/* 발급일 / 보증기간 */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-900">{item.issueDate}</div>
                      <div className="text-[11px] text-slate-500">
                        {item.warrantyPeriodYears}년 보증
                      </div>
                    </td>

                    {/* 고객 정보 */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-bold text-slate-900">{item.customerName}</div>
                      <div className="text-[11px] font-mono text-slate-500">{item.customerPhone}</div>
                    </td>

                    {/* 차량 정보 */}
                    <td className="py-3.5 px-4">
                      <div className="font-black text-slate-900 flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 font-mono text-xs">
                          {item.carPlate}
                        </span>
                        <span>{item.carModel}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        {item.carColor && <span>색상: {item.carColor}</span>}
                        {item.vin && <span className="font-mono">차대: {item.vin}</span>}
                      </div>
                    </td>

                    {/* 시공 제품 및 상세 */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        {item.hasClearPps && (
                          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full mr-1.5">
                            <span>투명PPS</span>
                            {item.clearPpsDetail && <span className="text-slate-600 font-normal">({item.clearPpsDetail})</span>}
                          </div>
                        )}
                        {item.hasColorPps && (
                          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                            <span>컬러PPS</span>
                            {item.colorPpsDetail && <span className="text-slate-600 font-normal">({item.colorPpsDetail})</span>}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* 시공가격 */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {item.price ? `${item.price} 원` : '-'}
                    </td>

                    {/* 상태 */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        정상 발급
                      </span>
                    </td>

                    {/* 전송 & 액션 버튼들 */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* 💬 카카오톡 전송 */}
                        <button
                          onClick={() => handleKakaoShare(item)}
                          className="px-2.5 py-1.5 bg-[#FEE500] hover:bg-[#FDD835] text-[#3c1e1e] font-bold rounded-lg text-xs flex items-center gap-1 shadow-sm cursor-pointer transition-transform hover:scale-105"
                          title="고객 카카오톡으로 보증서 안내문구 전송"
                        >
                          <i className="ri-kakao-talk-fill text-xs" />
                          <span>카톡전송</span>
                        </button>

                        {/* 🔗 링크 복사 */}
                        <button
                          onClick={() => handleCopyLink(item)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs cursor-pointer transition-colors"
                          title="고객 전송용 모바일 보증서 링크 복사"
                        >
                          <i className="ri-file-copy-line text-sm" />
                        </button>

                        {/* 👁️ 보증서 보기 */}
                        <button
                          onClick={() => setViewingWarranty(item)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs cursor-pointer transition-colors"
                          title="보증서 화면 보기 및 인쇄"
                        >
                          <i className="ri-eye-line text-sm" />
                        </button>

                        {/* ✏️ 수정 */}
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-blue-600 rounded-lg text-xs cursor-pointer transition-colors"
                          title="보증서 정보 수정"
                        >
                          <i className="ri-edit-line text-sm" />
                        </button>

                        {/* 🗑️ 삭제 */}
                        <button
                          onClick={() => handleDelete(item.id, item.warrantyNo, item.customerName)}
                          className="p-1.5 bg-slate-100 hover:bg-red-50 text-red-600 rounded-lg text-xs cursor-pointer transition-colors"
                          title="보증서 삭제"
                        >
                          <i className="ri-delete-bin-line text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
         4. 보증서 발급 / 수정 폼 모달
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
            >
              {/* 모달 헤더 */}
              <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-xs">
                    CSC
                  </span>
                  <div>
                    <h3 className="font-bold text-base text-white">
                      {editingId ? '보증서 정보 수정' : '독일 CARDIP 정품 품질 보증서 발급'}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      고객 정보와 시공 내역을 입력하시면 관리자 DB에 영구 저장되고 카카오톡 전송이 가능합니다.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
                >
                  <i className="ri-close-line text-lg" />
                </button>
              </div>

              {/* 폼 본문 */}
              <form onSubmit={handleSubmitForm} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                {/* 1. 기본 보증서 번호 & 일자 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      보증일련번호 (WARRANTY NO)
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={formData.warrantyNo}
                        onChange={(e) => setFormData({ ...formData, warrantyNo: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-red-600 focus:outline-none focus:border-red-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, warrantyNo: generateWarrantyNo() })}
                        className="p-2 bg-slate-200 hover:bg-slate-300 rounded-xl text-xs text-slate-700"
                        title="새 일련번호 자동 생성"
                      >
                        <i className="ri-refresh-line" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      시공일자 (DATE OF ISSUE)
                    </label>
                    <input
                      type="date"
                      value={formData.issueDate}
                      onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      보증기간 (년)
                    </label>
                    <select
                      value={formData.warrantyPeriodYears}
                      onChange={(e) => setFormData({ ...formData, warrantyPeriodYears: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-red-500"
                    >
                      <option value={3}>3년 보증</option>
                      <option value={5}>5년 보증</option>
                      <option value={6}>6년 보증 (공식 기본)</option>
                      <option value={7}>7년 보증</option>
                      <option value={10}>10년 보증</option>
                    </select>
                  </div>
                </div>

                {/* 2. 고객 정보 */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <i className="ri-user-3-line text-red-600" />
                    <span>고객 정보</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-slate-600 block mb-1">
                        고객명 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        placeholder="예: 홍길동"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-600 block mb-1">
                        연락처 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.customerPhone}
                        onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                        placeholder="예: 010-1234-5678"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:border-red-500"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-medium text-slate-600 block mb-1">
                        주소 <span className="text-slate-400 text-[11px]">(선택 사항)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.customerAddress}
                        onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
                        placeholder="예: 경기도 성남시 분당구 판교역로"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. 차량 정보 */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <i className="ri-roadster-line text-red-600" />
                    <span>차량 정보</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-slate-600 block mb-1">
                        차종 / 모델명 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.carModel}
                        onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                        placeholder="예: 포르쉐 911 카레라, 벤츠 S580 등"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-600 block mb-1">
                        차량번호 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.carPlate}
                        onChange={(e) => setFormData({ ...formData, carPlate: e.target.value })}
                        placeholder="예: 123가 4567"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-red-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-600 block mb-1">
                        차량 색상 <span className="text-slate-400 text-[11px]">(선택 사항)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.carColor}
                        onChange={(e) => setFormData({ ...formData, carColor: e.target.value })}
                        placeholder="예: 화이트, 블랙, 크레용 등"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-600 block mb-1">
                        차대번호 (VIN) <span className="text-emerald-600 text-[11px]">알면 적고 모르면 패스</span>
                      </label>
                      <input
                        type="text"
                        value={formData.vin}
                        onChange={(e) => setFormData({ ...formData, vin: e.target.value.toUpperCase() })}
                        placeholder="알면 입력, 모르면 빈칸으로 남겨두세요"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. 제품 및 시공가격 */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <i className="ri-price-tag-3-line text-red-600" />
                    <span>제품 및 시공가격</span>
                  </h4>

                  <div className="space-y-3 bg-red-50/40 p-4 rounded-2xl border border-red-100">
                    {/* 투명 PPS */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-900 cursor-pointer w-44">
                        <input
                          type="checkbox"
                          checked={formData.hasClearPps}
                          onChange={(e) => setFormData({ ...formData, hasClearPps: e.target.checked })}
                          className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                        />
                        <span>독일 CARDIP 투명PPS</span>
                      </label>
                      {formData.hasClearPps && (
                        <input
                          type="text"
                          value={formData.clearPpsDetail}
                          onChange={(e) => setFormData({ ...formData, clearPpsDetail: e.target.value })}
                          placeholder="시공 부위: 예) 전체, 본넷+앞범퍼, 생활보호 등"
                          className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-red-500"
                        />
                      )}
                    </div>

                    {/* 컬러 PPS */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-900 cursor-pointer w-44">
                        <input
                          type="checkbox"
                          checked={formData.hasColorPps}
                          onChange={(e) => setFormData({ ...formData, hasColorPps: e.target.checked })}
                          className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                        />
                        <span>독일 CARDIP 컬러PPS</span>
                      </label>
                      {formData.hasColorPps && (
                        <input
                          type="text"
                          value={formData.colorPpsDetail}
                          onChange={(e) => setFormData({ ...formData, colorPpsDetail: e.target.value })}
                          placeholder="시공 부위/색상: 예) 사틴 블랙 전체, 본넷 등"
                          className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-red-500"
                        />
                      )}
                    </div>

                    {/* 시공가격 */}
                    <div className="pt-2 border-t border-red-100 flex items-center gap-3">
                      <label className="text-xs font-bold text-slate-900 w-28">
                        시공가격
                      </label>
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="text"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="예: 5,500,000"
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-red-500 text-right"
                        />
                        <span className="text-xs font-bold text-slate-600 whitespace-nowrap">원 (VAT 별도)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. 관리자 특이사항 메모 */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    관리자 시공 메모 / 특이사항 (내부 보관용)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={2}
                    placeholder="예: 도막 두께 260um 정밀 측정 완료, 휠 코팅 서비스 추가 제공 등"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500 resize-none"
                  />
                </div>

                {/* 하단 버튼들 */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <i className="ri-check-line text-sm" />
                    <span>{editingId ? '보증서 수정 완료' : '보증서 발급 및 저장'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
         5. 신규 발급 완료 모달 (카카오톡 바로 전송 & 링크 복사)
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {issuedSuccessWarranty && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-center p-6"
            >
              {/* 성공 아이콘 */}
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">
                <i className="ri-checkbox-circle-fill" />
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-1">
                정품 보증서 발급 완료!
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                관리자 DB에 안전하게 저장되었습니다. 이제 고객님의 핸드폰으로 보증서를 바로 전송하실 수 있습니다.
              </p>

              {/* 발급 요약 박스 */}
              <div className="bg-slate-50 rounded-2xl p-4 text-xs space-y-1.5 text-left border border-slate-200 mb-6 font-sans">
                <div className="flex justify-between">
                  <span className="text-slate-500">보증번호</span>
                  <span className="font-mono font-bold text-red-600">{issuedSuccessWarranty.warrantyNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">고객명</span>
                  <span className="font-bold text-slate-900">{issuedSuccessWarranty.customerName} 고객님</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">차량번호</span>
                  <span className="font-black text-slate-900">{issuedSuccessWarranty.carPlate} ({issuedSuccessWarranty.carModel})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">시공일자</span>
                  <span className="font-mono text-slate-700">{issuedSuccessWarranty.issueDate} ({issuedSuccessWarranty.warrantyPeriodYears}년 보증)</span>
                </div>
              </div>

              {/* 액션 버튼들 */}
              <div className="space-y-2.5">
                {/* 카카오톡으로 바로 보내기 */}
                <button
                  onClick={() => {
                    handleKakaoShare(issuedSuccessWarranty);
                  }}
                  className="w-full py-3.5 bg-[#FEE500] hover:bg-[#FDD835] text-[#3c1e1e] font-black rounded-2xl text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                >
                  <i className="ri-kakao-talk-fill text-lg" />
                  <span>고객 카카오톡으로 보증서 전송</span>
                </button>

                {/* 보증서 원본 화면 열람 및 인쇄 */}
                <button
                  onClick={() => {
                    const target = issuedSuccessWarranty;
                    setIssuedSuccessWarranty(null);
                    setViewingWarranty(target);
                  }}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow transition-colors cursor-pointer"
                >
                  <i className="ri-eye-line" />
                  <span>발급된 보증서 확인 / 인쇄 (A4)</span>
                </button>

                {/* 닫기 */}
                <button
                  onClick={() => setIssuedSuccessWarranty(null)}
                  className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  목록으로 돌아가기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
         6. 보증서 뷰어 팝업 (WarrantyViewer)
      ───────────────────────────────────────────────────────────── */}
      {viewingWarranty && (
        <WarrantyViewer
          warranty={viewingWarranty}
          onClose={() => setViewingWarranty(null)}
        />
      )}
    </div>
  );
};
