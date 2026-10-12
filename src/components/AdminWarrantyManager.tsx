import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  type WarrantyItem,
  getWarranties,
  saveWarranty,
  updateWarranty,
  deleteWarranty,
  clearAllWarranties,
  exportWarrantiesToCSV,
  generateWarrantyNo,
  createWarrantyShareMessage,
  getWarrantyViewUrl,
  downloadWarrantyImage,
  downloadWarrantyPdf,
  copyTextToClipboard,
  formatPriceWithCommas
} from '../lib/warrantyStorage';
import {
  getKakaoKey,
  setKakaoKey,
  isKakaoReady,
  sendKakaoWarranty,
  initKakao
} from '../lib/kakao';
import {
  publishWarranty,
  deleteCloudWarranty,
  getCloudStatus,
  isAutoAlimtalkEnabled,
  setAutoAlimtalkEnabled,
  ServerUnavailableError,
  type CloudStatus
} from '../lib/warrantyCloud';
import { WarrantyViewer } from './WarrantyViewer';

// 솔라피에 승인 신청할 알림톡 템플릿 본문 (변수 이름은 서버 api/_lib/solapi.ts 와 반드시 일치)
const ALIMTALK_TEMPLATE_TEXT = `[코션스마트센터] PPS 시공 보증서 발급 안내

안녕하세요, #{고객명} 고객님.
코션스마트센터를 믿고 시공을 맡겨 주셔서 감사합니다.

고객님 차량의 PPS 시공 보증서가 발급되었습니다.

■ 차량번호 : #{차량번호} (#{차종})
■ 시공내역 : #{시공내역}
■ 보증기간 : #{보증기간}
■ 보증번호 : #{보증번호}

아래 [보증서 보기] 버튼을 누르시면 전자 보증서를 확인하고 이미지로 저장하실 수 있습니다.`;

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

  // 카카오 전송 모달 및 설정 모달
  const [sendingKakaoWarranty, setSendingKakaoWarranty] = useState<WarrantyItem | null>(null);
  const [isKakaoSettingsOpen, setIsKakaoSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'alimtalk' | 'kakao_js'>('alimtalk');
  const [kakaoKeyInput, setKakaoKeyInput] = useState('');
  const [isKakaoConfigured, setIsKakaoConfigured] = useState(false);

  // 카카오 공식 알림톡 (서버 자동 발송) 상태
  const [autoAlimtalk, setAutoAlimtalk] = useState<boolean>(() => isAutoAlimtalkEnabled());
  const [cloudStatus, setCloudStatus] = useState<CloudStatus | null>(null);
  const [cloudStatusError, setCloudStatusError] = useState<string>('');
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [isSendingAlimtalk, setIsSendingAlimtalk] = useState(false);
  const [issuedAlimtalk, setIssuedAlimtalk] = useState<{
    state: 'idle' | 'sending' | 'sent' | 'failed' | 'local';
    message: string;
  }>({ state: 'idle', message: '' });

  const isAlimtalkReady = Boolean(
    cloudStatus && cloudStatus.firestore.ok && Object.values(cloudStatus.alimtalk).every(Boolean)
  );
  const [isDownloading, setIsDownloading] = useState(false);

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
    // 서버 연동 상태 조용히 확인 (로컬 작업 모드면 그냥 넘어감)
    getCloudStatus()
      .then((s) => setCloudStatus(s))
      .catch(() => {});
    const key = getKakaoKey();
    setKakaoKeyInput(key);
    if (key) {
      initKakao(key);
      setIsKakaoConfigured(true);
    } else {
      setIsKakaoConfigured(isKakaoReady());
    }
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

  // 전송 모달(sendingKakaoWarranty)이 열릴 때 고객 안내 문구 자동 클립보드 복사
  useEffect(() => {
    if (sendingKakaoWarranty) {
      const msg = createWarrantyShareMessage(sendingKakaoWarranty);
      copyTextToClipboard(msg).then((copied) => {
        if (copied) {
          showToast(`📋 ${sendingKakaoWarranty.customerName} 고객님 보증서 안내문구가 자동 복사되었습니다! (채팅창에서 바로 붙여넣기 가능)`);
        }
      });
    }
  }, [sendingKakaoWarranty?.id]);

  // 카카오 키 저장 핸들러
  const handleSaveKakaoKey = (e: React.FormEvent) => {
    e.preventDefault();
    const success = setKakaoKey(kakaoKeyInput);
    if (success) {
      setIsKakaoConfigured(true);
      setIsKakaoSettingsOpen(false);
      showToast('카카오 JavaScript 키가 성공적으로 등록 및 활성화되었습니다!');
    } else {
      if (!kakaoKeyInput.trim()) {
        setIsKakaoConfigured(false);
        setIsKakaoSettingsOpen(false);
        showToast('카카오 키가 해제되었습니다. (클립보드 및 모바일 공유로 동작합니다)');
      } else {
        alert('카카오 키 등록 중 오류가 발생했습니다. 키를 다시 확인해 주세요.');
      }
    }
  };

  // 서버 연동 상태 점검 (설정 화면의 [연동 상태 확인] 버튼)
  const handleCheckCloudStatus = async () => {
    setIsCheckingStatus(true);
    setCloudStatusError('');
    try {
      setCloudStatus(await getCloudStatus());
    } catch (e) {
      setCloudStatus(null);
      setCloudStatusError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsCheckingStatus(false);
    }
  };

  // 보증서를 서버에 등록하고, send=true면 고객 번호로 카카오 알림톡 발송
  const handlePublishAndSend = async (
    item: WarrantyItem,
    send: boolean
  ): Promise<{ ok: boolean; local: boolean; message: string }> => {
    if (send) setIsSendingAlimtalk(true);
    try {
      const res = await publishWarranty(item, send);
      const patch: Partial<WarrantyItem> = { viewToken: res.token };
      if (send && res.alimtalk) {
        patch.alimtalkStatus = res.alimtalk.success ? 'sent' : 'failed';
        patch.alimtalkMessage = res.alimtalk.message;
        patch.alimtalkAt = new Date().toISOString();
      }
      const updated = updateWarranty(item.id, patch);
      reloadData();
      if (updated) {
        setSendingKakaoWarranty((prev) => (prev && prev.id === item.id ? updated : prev));
      }
      if (!send) return { ok: true, local: false, message: '서버 저장 완료' };
      if (res.alimtalk?.success) {
        return { ok: true, local: false, message: '카카오 알림톡 발송 완료' };
      }
      return { ok: false, local: false, message: res.alimtalk?.message || '알림톡 발송 실패' };
    } catch (e) {
      return {
        ok: false,
        local: e instanceof ServerUnavailableError,
        message: e instanceof Error ? e.message : String(e)
      };
    } finally {
      if (send) setIsSendingAlimtalk(false);
    }
  };

  // 전송 센터에서 [알림톡 자동 발송] 버튼
  const handleSendServerAlimtalk = async (item: WarrantyItem) => {
    if (
      item.alimtalkStatus === 'sent' &&
      !window.confirm(`${item.customerName} 고객님께 이미 알림톡을 보냈습니다. 한 번 더 보낼까요? (건당 비용 발생)`)
    ) {
      return;
    }
    const r = await handlePublishAndSend(item, true);
    if (r.ok) {
      showToast(`🎉 ${item.customerName} 고객님(${item.customerPhone})께 카카오 알림톡을 보냈습니다!`);
    } else {
      alert(`알림톡 발송 실패 안내:\n\n${r.message}\n\n급하시면 위의 [보증서 파일 다운로드 & 카톡 바로 연결]로 수동 전송해 주세요.`);
    }
  };

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
      price: formatPriceWithCommas(item.price),
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

    const dataToSave = {
      ...formData,
      price: formatPriceWithCommas(formData.price)
    };

    if (editingId) {
      const updated = updateWarranty(editingId, dataToSave);
      if (updated) {
        reloadData();
        setIsFormOpen(false);
        showToast(`보증서(${formData.warrantyNo})가 성공적으로 수정되었습니다.`);
        // 이미 고객에게 링크가 나간 보증서면, 고객이 보는 화면도 최신 내용으로 갱신 (재발송 없음)
        if (updated.viewToken) {
          handlePublishAndSend(updated, false).then((r) => {
            if (!r.ok && !r.local) showToast(`고객 화면 갱신 실패: ${r.message}`);
          });
        }
      }
    } else {
      const created = saveWarranty(dataToSave);
      reloadData();
      setIsFormOpen(false);
      setIssuedSuccessWarranty(created);

      // 발급과 동시에 카카오 알림톡 자동 발송 (설정에서 끌 수 있음)
      if (autoAlimtalk) {
        setIssuedAlimtalk({ state: 'sending', message: '' });
        handlePublishAndSend(created, true).then((r) => {
          setIssuedAlimtalk({
            state: r.ok ? 'sent' : r.local ? 'local' : 'failed',
            message: r.message
          });
        });
      } else {
        setIssuedAlimtalk({ state: 'idle', message: '' });
      }
    }
  };

  // 삭제 처리
  const handleDelete = (id: string, no: string, name: string) => {
    if (window.confirm(`[${no}] ${name} 고객님의 보증서 내역을 삭제하시겠습니까?`)) {
      const token = warranties.find((w) => w.id === id)?.viewToken;
      if (token) {
        // 고객 열람 링크도 함께 삭제 (실패해도 관리자 대장 삭제는 진행)
        deleteCloudWarranty(token).catch(() => {});
      }
      deleteWarranty(id);
      reloadData();
      showToast('보증서 내역이 삭제되었습니다.');
    }
  };

  // 전체 데이터 비우기 (초기화)
  const handleClearAllData = () => {
    if (window.confirm('기존에 저장된 모든 보증서 내역을 삭제하고 초기화하시겠습니까?\n(이전 내역이 모두 영구 삭제되며 되돌릴 수 없습니다.)')) {
      clearAllWarranties();
      reloadData();
      showToast('이전 보증서 내역이 모두 삭제되었습니다.');
    }
  };

  // 카카오톡 전송 실행 (SDK 또는 모바일 공유 또는 클립보드)
  const handleExecuteSendKakao = async (item: WarrantyItem) => {
    const res = await sendKakaoWarranty(item);
    showToast(res.message);
  };

  // 0. 보증서 1면(상세)+2면(약관) 합본 PDF 즉시 다운로드 & 안내문구 자동 복사 & 카톡 연계
  const handleDownloadPdf = async (item: WarrantyItem) => {
    setIsDownloading(true);

    // 1) 고객 전달용 안내 문구 클립보드 자동 복사
    const message = createWarrantyShareMessage(item);
    const copied = await copyTextToClipboard(message);

    // 2) 고화질 2페이지 단일 PDF 다운로드 실행
    const success = await downloadWarrantyPdf(item);
    setIsDownloading(false);

    if (success) {
      if (copied) {
        showToast(`🎉 보증서 PDF(1·2페이지 합본) 다운로드 & 안내문구 자동 복사 완료! 채널 채팅창이 열립니다.`);
      } else {
        showToast(`🎉 보증서 PDF(1·2페이지 합본) 다운로드 완료! 채널 채팅창이 열립니다.`);
      }

      // 3) 다운로드 완료 후 카카오 채널 1:1 채팅 관리자 센터 자동 오픈!
      setTimeout(() => {
        window.open('https://business.kakao.com/_FxlNhX/chats', '_blank');
      }, 500);
    } else {
      showToast('PDF 파일 생성 중 오류가 발생했습니다.');
    }
  };

  // 0-1. 고화질 PNG 이미지 2장(상세 + 약관) 개별 다운로드
  const handleDownloadImages = async (item: WarrantyItem) => {
    setIsDownloading(true);
    const message = createWarrantyShareMessage(item);
    await copyTextToClipboard(message);
    const success = await downloadWarrantyImage(item);
    setIsDownloading(false);

    if (success) {
      showToast(`🎉 보증서 이미지 2장(상세+약관) 다운로드 & 안내문구 복사 완료!`);
    } else {
      showToast('이미지 파일 생성 중 오류가 발생했습니다.');
    }
  };

  // 1. 카카오톡 채널 관리자 1:1 채팅으로 발송 (비용 0원)
  const handleSendChannelChat = async (item: WarrantyItem) => {
    const message = createWarrantyShareMessage(item);
    const copied = await copyTextToClipboard(message);
    if (copied) {
      showToast('✅ 보증서 안내문구가 복사되었습니다! 채널 채팅방에 붙여넣기(Ctrl+V)하세요.');
    } else {
      showToast('채널 채팅창으로 이동합니다.');
    }
    window.open('https://business.kakao.com/_FxlNhX/chats', '_blank');
  };

  // 2. 고객용 카카오 채널 1:1 채팅방 열기 (모바일 앱 연동용)
  const handleOpenClientChannelChat = async (item: WarrantyItem) => {
    const message = createWarrantyShareMessage(item);
    const copied = await copyTextToClipboard(message);
    if (copied) {
      showToast('✅ 보증서 문구가 복사되었습니다! 카톡 대화창에 붙여넣기하세요.');
    }
    window.open('https://pf.kakao.com/_FxlNhX/chat', '_blank');
  };

  // 보증서 열람 링크 복사
  const handleCopyLink = async (item: WarrantyItem) => {
    const url = getWarrantyViewUrl(item.warrantyNo);
    await copyTextToClipboard(url);
    showToast('보증서 확인 링크가 클립보드에 복사되었습니다. (문자 전송 가능)');
  };

  // 보증서 링크만 단독 복사
  const handleCopyOnlyLink = async (item: WarrantyItem) => {
    const url = getWarrantyViewUrl(item.warrantyNo);
    await copyTextToClipboard(url);
    showToast('🔗 전자보증서 바로가기 링크만 복사되었습니다.');
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

        {/* 투명PPS */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">투명PPS 시공</span>
            <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <i className="ri-drop-line" />
            </span>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-blue-600">
            {stats.clearCount} <span className="text-xs font-medium text-slate-500">건</span>
          </div>
        </div>

        {/* 컬러PPS */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">컬러PPS 시공</span>
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
            <option value="clear">투명PPS만</option>
            <option value="color">컬러PPS만</option>
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

          {/* 알림톡 / 카카오 키 설정 버튼 */}
          <button
            onClick={() => {
              setSettingsTab('alimtalk');
              setIsKakaoSettingsOpen(true);
            }}
            className="px-3 py-2 bg-[#FEE500]/25 hover:bg-[#FEE500]/40 text-[#3c1e1e] border border-[#FEE500]/60 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="고객 번호 다이렉트 알림톡 및 카카오톡 설정"
          >
            <i className="ri-kakao-talk-fill text-base text-[#3c1e1e]" />
            <span className="hidden sm:inline">알림톡/카카오 연동</span>
            <span
              className={`w-2 h-2 rounded-full ${
                isAlimtalkReady
                  ? 'bg-emerald-500 ring-2 ring-emerald-300'
                  : isKakaoConfigured
                  ? 'bg-blue-500'
                  : 'bg-amber-500'
              }`}
            />
          </button>

          {/* 엑셀 다운로드 */}
          <button
            onClick={exportWarrantiesToCSV}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            title="전체 보증서 발급 대장을 CSV 파일로 다운로드합니다"
          >
            <i className="ri-file-excel-2-line text-emerald-600 text-base" />
            <span className="hidden sm:inline">대장 엑셀저장</span>
          </button>

          {/* 이전 데이터 전체 비우기 */}
          {warranties.length > 0 && (
            <button
              onClick={handleClearAllData}
              className="px-3 py-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer border border-transparent hover:border-red-200"
              title="이전 보증서 목록을 전체 삭제하고 초기화합니다"
            >
              <i className="ri-delete-bin-line text-slate-500 hover:text-red-600 text-base" />
              <span className="hidden sm:inline">이전 데이터 비우기</span>
            </button>
          )}

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
                      {item.price ? `${formatPriceWithCommas(item.price)} 원` : '-'}
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
                        {/* 💬 카카오톡 전송 센터 열기 */}
                        <button
                          onClick={() => setSendingKakaoWarranty(item)}
                          className="px-2.5 py-1.5 bg-[#FEE500] hover:bg-[#FDD835] text-[#3c1e1e] font-bold rounded-lg text-xs flex items-center gap-1 shadow-sm cursor-pointer transition-transform hover:scale-105"
                          title="카카오톡 또는 문자로 고객에게 보증서 전송"
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
                    {/* 투명PPS */}
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

                    {/* 컬러PPS */}
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
                          inputMode="numeric"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: formatPriceWithCommas(e.target.value) })}
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
         5. 카카오톡 전송 센터 모달 (SendKakaoModal) - 채널 1:1 무료 발송 중심
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {sendingKakaoWarranty && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800"
            >
              {/* 모달 상단 */}
              <div className="bg-[#FEE500] px-6 py-4 flex items-center justify-between text-[#3c1e1e]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#3c1e1e] text-[#FEE500] flex items-center justify-center shadow-sm">
                    <i className="ri-kakao-talk-fill text-2xl" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-base">카카오톡 보증서 전송 센터</h3>
                      <span className="bg-[#3c1e1e] text-[#FEE500] text-[10px] font-black px-2 py-0.5 rounded-full">
                        비용 0원
                      </span>
                    </div>
                    <p className="text-[11px] font-medium opacity-85">
                      코션스마트센터 카카오 채널 및 무료 문자로 보증서를 전달합니다.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSendingKakaoWarranty(null)}
                  className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <i className="ri-close-line text-lg" />
                </button>
              </div>

              {/* 모달 본문 */}
              <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                {/* 고객 정보 요약 배너 */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">수신 고객</span>
                    <strong className="text-slate-900 text-sm">{sendingKakaoWarranty.customerName} 고객님</strong>
                    <span className="font-mono text-slate-600 block">{sendingKakaoWarranty.customerPhone}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 block text-[10px]">시공 차량</span>
                    <span className="font-bold text-red-600">{sendingKakaoWarranty.carPlate}</span>
                    <span className="text-slate-600 block text-[11px]">{sendingKakaoWarranty.carModel}</span>
                  </div>
                </div>

                {/* 비용 0원 무료 채널 발송 안내 배너 */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-950 flex items-start gap-2.5">
                  <i className="ri-checkbox-circle-fill text-emerald-600 text-lg flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-emerald-900 mb-0.5">
                      개인 로그인 / 유료 과금 없는 완전 무료(0원) 발송
                    </strong>
                    <p className="text-[11px] text-emerald-800 leading-relaxed">
                      아래 <strong>[채널 1:1 채팅으로 보내기]</strong>를 누르면 안내문구가 자동 복사되고 카카오 채널 채팅창이 열립니다. 채팅창에서 <strong>[붙여넣기(Ctrl+V)]</strong>만 하시면 우리 채널 이름으로 안전하게 전송됩니다.
                    </p>
                  </div>
                </div>

                {/* 발송 메시지 미리보기 박스 */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <i className="ri-chat-poll-line text-amber-600" />
                      <span>고객 전달 메시지 미리보기</span>
                    </label>
                    <button
                      type="button"
                      onClick={async () => {
                        const copied = await copyTextToClipboard(createWarrantyShareMessage(sendingKakaoWarranty));
                        if (copied) {
                          showToast('✅ 안내문구 전체가 복사되었습니다!');
                        } else {
                          showToast('복사에 실패했습니다. 아래 내용을 직접 드래그해서 복사해 주세요.');
                        }
                      }}
                      className="text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                    >
                      <i className="ri-file-copy-line text-xs" />
                      <span>전체 복사</span>
                    </button>
                  </div>
                  <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-xs text-slate-800 font-sans whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto select-all shadow-inner">
                    {createWarrantyShareMessage(sendingKakaoWarranty)}
                  </div>
                </div>

                {/* ────────────────── 주요 발송 버튼들 ────────────────── */}
                <div className="space-y-2.5 pt-1">
                  {/* 메인 버튼 1 (추천): 보증서 1·2페이지 합본 PDF 다운로드 & 카톡 전송 바로 연계 */}
                  <button
                    onClick={() => handleDownloadPdf(sendingKakaoWarranty)}
                    disabled={isDownloading}
                    className="w-full py-4 px-4 bg-gradient-to-r from-red-600 via-rose-700 to-slate-900 hover:from-red-700 hover:to-slate-950 text-white font-black rounded-2xl text-sm sm:text-base flex flex-col items-center justify-center gap-0.5 shadow-xl shadow-red-900/25 hover:scale-[1.01] transition-all cursor-pointer border border-red-500/40"
                  >
                    <div className="flex items-center gap-2">
                      {isDownloading ? (
                        <i className="ri-loader-4-line animate-spin text-2xl text-yellow-300" />
                      ) : (
                        <i className="ri-file-pdf-fill text-2xl text-yellow-300" />
                      )}
                      <span>{isDownloading ? '보증서 PDF 생성 & 카톡 연결 중...' : '보증서 PDF(1면 상세 + 2면 약관 합본) 다운로드 & 카톡 연결'}</span>
                      <span className="text-[10px] bg-yellow-400 text-slate-900 px-2 py-0.5 rounded-full font-bold">
                        PDF 1개 파일
                      </span>
                    </div>
                    <span className="text-[11px] text-red-200 font-normal">
                      1면(상세) + 2면(약관) 총 2페이지가 1개 파일로 저장 + 안내문구 자동 복사 + 채널 채팅창 오픈!
                    </span>
                  </button>

                  {/* 메인 버튼 2: 우리 카카오 채널 1:1 채팅으로 보내기 (비용 0원) */}
                  <button
                    onClick={() => handleSendChannelChat(sendingKakaoWarranty)}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-[#FEE500] to-amber-400 hover:from-[#FDD835] hover:to-amber-500 text-[#3c1e1e] font-black rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-all cursor-pointer border border-yellow-300"
                  >
                    <i className="ri-kakao-talk-fill text-xl text-[#3c1e1e]" />
                    <span>우리 카카오 채널 1:1 채팅창 열기 + 문구 자동 복사</span>
                    <span className="text-[10px] bg-[#3c1e1e] text-[#FEE500] px-2 py-0.5 rounded-full font-bold">
                      비용 0원
                    </span>
                  </button>

                  {/* 메인 버튼 3: 보증서 원본 보기 & PDF 인쇄/저장 */}
                  <button
                    onClick={() => {
                      setViewingWarranty(sendingKakaoWarranty);
                      setSendingKakaoWarranty(null);
                    }}
                    className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow transition-all cursor-pointer border border-slate-700"
                  >
                    <i className="ri-printer-line text-lg text-emerald-400" />
                    <span>보증서 원본 전체 열람 & A4 인쇄</span>
                  </button>

                  {/* 메인 버튼 4: 스마트폰 무료 문자(SMS) 즉시 전송 */}
                  <a
                    href={`sms:${sendingKakaoWarranty.customerPhone}?body=${encodeURIComponent(
                      createWarrantyShareMessage(sendingKakaoWarranty)
                    )}`}
                    onClick={async () => {
                      await copyTextToClipboard(createWarrantyShareMessage(sendingKakaoWarranty));
                    }}
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow transition-all cursor-pointer text-center"
                  >
                    <i className="ri-message-2-line text-lg" />
                    <span>스마트폰 무료 문자(SMS) 즉시 전송 (문구 자동 삽입)</span>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                      통신사 무료문자 활용
                    </span>
                  </a>

                  {/* 보조 옵션 4개 그리드 */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {/* 안내 문구 복사 */}
                    <button
                      onClick={async () => {
                        const copied = await copyTextToClipboard(createWarrantyShareMessage(sendingKakaoWarranty));
                        if (copied) {
                          showToast('✅ 안내문구가 복사되었습니다. 원하는 채팅창에 붙여넣기(Ctrl+V)하세요.');
                        } else {
                          showToast('복사에 실패했습니다. 내용을 직접 드래그해 복사하세요.');
                        }
                      }}
                      className="py-2.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer border border-slate-200"
                    >
                      <i className="ri-file-copy-line text-slate-700 text-base" />
                      <span>안내문구 복사</span>
                    </button>

                    {/* PNG 이미지 2장 개별 다운로드 */}
                    <button
                      onClick={() => handleDownloadImages(sendingKakaoWarranty)}
                      disabled={isDownloading}
                      className="py-2.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer border border-slate-200"
                      title="1면(상세)과 2면(약관)을 PNG 이미지 파일 2장으로 각각 저장"
                    >
                      <i className="ri-image-line text-slate-700 text-base" />
                      <span>이미지 2장(PNG)</span>
                    </button>

                    {/* 보증서 단일 링크 복사 */}
                    <button
                      onClick={() => handleCopyOnlyLink(sendingKakaoWarranty)}
                      className="py-2.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer border border-slate-200"
                    >
                      <i className="ri-links-line text-blue-600 text-base" />
                      <span>보증서 링크만</span>
                    </button>

                    {/* 고객용 카톡 채널 열기 */}
                    <button
                      onClick={() => handleOpenClientChannelChat(sendingKakaoWarranty)}
                      className="py-2.5 px-2 bg-yellow-50 hover:bg-yellow-100 text-slate-800 font-bold rounded-xl text-xs flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer border border-yellow-200"
                      title="모바일 카카오톡 앱으로 코션 채널 1:1 대화창 열기"
                    >
                      <i className="ri-chat-smile-2-line text-yellow-700 text-base" />
                      <span>모바일 채널방</span>
                    </button>

                    {/* 개인 카카오톡 공유 (선택) */}
                    <button
                      onClick={() => handleExecuteSendKakao(sendingKakaoWarranty)}
                      className="py-2.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer border border-slate-200"
                      title="개인 카카오톡 계정으로 친구에게 공유"
                    >
                      <i className="ri-share-forward-line text-slate-600 text-base" />
                      <span>개인카톡 공유</span>
                    </button>
                  </div>
                </div>

                {/* ────────────────── 카카오 공식 알림톡 자동 발송 (서버) ────────────────── */}
                <div className="pt-3 border-t border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <i className="ri-robot-2-line text-red-600" />
                      <span>카카오 공식 알림톡 자동 발송 (건당 약 7~15원)</span>
                    </span>
                    <button
                      onClick={() => {
                        setSettingsTab('alimtalk');
                        setIsKakaoSettingsOpen(true);
                      }}
                      className="font-bold text-red-600 hover:underline cursor-pointer"
                    >
                      연동 상태 보기
                    </button>
                  </div>

                  {sendingKakaoWarranty.alimtalkStatus && (
                    <div
                      className={`text-[11px] px-3 py-2 rounded-xl border ${
                        sendingKakaoWarranty.alimtalkStatus === 'sent'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-red-50 border-red-200 text-red-800'
                      }`}
                    >
                      {sendingKakaoWarranty.alimtalkStatus === 'sent' ? '✅ 알림톡 발송됨' : '⚠️ 지난 발송 실패'}
                      {sendingKakaoWarranty.alimtalkAt &&
                        ` · ${new Date(sendingKakaoWarranty.alimtalkAt).toLocaleString('ko-KR')}`}
                      {sendingKakaoWarranty.alimtalkStatus === 'failed' && sendingKakaoWarranty.alimtalkMessage && (
                        <span className="block mt-0.5 opacity-80">{sendingKakaoWarranty.alimtalkMessage}</span>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => handleSendServerAlimtalk(sendingKakaoWarranty)}
                    disabled={isSendingAlimtalk}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    {isSendingAlimtalk ? (
                      <>
                        <i className="ri-loader-4-line animate-spin" />
                        <span>알림톡 보내는 중...</span>
                      </>
                    ) : (
                      <>
                        <i className="ri-send-plane-fill text-yellow-400" />
                        <span>
                          {sendingKakaoWarranty.customerPhone} 번호로 알림톡 보내기 ([보증서 보기] 버튼 포함)
                        </span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    * 인터넷에 배포된 사이트에서만 동작합니다. 고객은 채널 친구가 아니어도 받으며, 버튼을 누르면 본인 보증서 화면이 열립니다.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
         6. 카카오 JavaScript 키 설정 모달
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isKakaoSettingsOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800"
            >
              <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="ri-shield-flash-line text-xl text-yellow-400" />
                  <div>
                    <h3 className="font-bold text-base text-white">카카오톡 & 알림톡 연동 센터</h3>
                    <p className="text-[11px] text-slate-400">
                      고객 번호로 다이렉트 자동 발송(알림톡) 또는 카카오 공유 방식을 설정합니다.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsKakaoSettingsOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
                >
                  <i className="ri-close-line text-lg" />
                </button>
              </div>

              {/* 상단 탭 전환: 알림톡 vs JS Key */}
              <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3">
                <button
                  type="button"
                  onClick={() => setSettingsTab('alimtalk')}
                  className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                    settingsTab === 'alimtalk'
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <i className="ri-send-plane-fill text-sm" />
                  <span>1. 카카오 공식 알림톡 (자동 발송 - 추천)</span>
                  <span
                    className={`w-2 h-2 rounded-full ${isAlimtalkReady ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setSettingsTab('kakao_js')}
                  className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                    settingsTab === 'kakao_js'
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <i className="ri-kakao-talk-fill text-sm text-yellow-600" />
                  <span>2. 카카오 JavaScript 키 (공유용)</span>
                  <span
                    className={`w-2 h-2 rounded-full ${isKakaoConfigured ? 'bg-blue-500' : 'bg-slate-300'}`}
                  />
                </button>
              </div>

              {/* ── 탭 1: 카카오 공식 알림톡 (서버 자동 발송) ── */}
              {settingsTab === 'alimtalk' && (
                <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
                    <i className="ri-lightbulb-fill text-amber-600 text-lg flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold mb-0.5">보증서 발급 = 고객 카톡 자동 도착</strong>
                      보증서를 발급하면 고객 전화번호로 <strong>코션스마트센터 채널 이름의 알림톡</strong>이 자동으로 갑니다.
                      [보증서 보기] 버튼을 누르면 고객 본인의 보증서 화면이 열립니다. 비밀키는 서버(Vercel)에만 보관되어 안전합니다.
                    </div>
                  </div>

                  {/* 자동 발송 스위치 */}
                  <label className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer">
                    <span className="text-xs">
                      <strong className="block text-slate-900">발급할 때 알림톡 자동 발송</strong>
                      <span className="text-slate-500 text-[11px]">끄면 전송 센터에서 버튼으로 직접 보냅니다.</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={autoAlimtalk}
                      onChange={(e) => {
                        setAutoAlimtalk(e.target.checked);
                        setAutoAlimtalkEnabled(e.target.checked);
                        showToast(e.target.checked ? '알림톡 자동 발송을 켰습니다.' : '알림톡 자동 발송을 껐습니다.');
                      }}
                      className="w-5 h-5 accent-red-600"
                    />
                  </label>

                  {/* 서버 연동 상태 */}
                  <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <i className="ri-server-line text-red-600" />
                        <span>서버 연동 상태</span>
                        <span
                          className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-black ${
                            isAlimtalkReady ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {isAlimtalkReady ? '발송 준비 완료' : '설정 필요'}
                        </span>
                      </h4>
                      <button
                        type="button"
                        onClick={handleCheckCloudStatus}
                        disabled={isCheckingStatus}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[10px] font-bold cursor-pointer flex items-center gap-1"
                      >
                        <i className={`ri-refresh-line ${isCheckingStatus ? 'animate-spin' : ''}`} />
                        <span>연동 상태 확인</span>
                      </button>
                    </div>

                    {cloudStatusError && (
                      <p className="text-[11px] text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                        {cloudStatusError}
                      </p>
                    )}

                    {cloudStatus ? (
                      <ul className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
                        <li className={cloudStatus.firestore.ok ? 'text-emerald-700' : 'text-red-600'}>
                          {cloudStatus.firestore.ok ? '✓' : '✗'} 데이터 서버(Firebase)
                        </li>
                        {Object.entries(cloudStatus.alimtalk).map(([k, ok]) => (
                          <li key={k} className={ok ? 'text-emerald-700' : 'text-red-600'}>
                            {ok ? '✓' : '✗'} {k}
                          </li>
                        ))}
                        {cloudStatus.firestore.error && (
                          <li className="col-span-2 text-red-600 font-sans">{cloudStatus.firestore.error}</li>
                        )}
                      </ul>
                    ) : (
                      !cloudStatusError && (
                        <p className="text-[11px] text-slate-500">
                          [연동 상태 확인]을 누르면 서버 설정이 끝났는지 항목별로 보여드립니다.
                        </p>
                      )
                    )}
                  </div>

                  {/* 템플릿 신청 문구 */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2 text-slate-700">
                    <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                      <i className="ri-file-text-line text-red-600" />
                      <span>솔라피 알림톡 템플릿 신청 문구</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      솔라피 [카카오톡 → 템플릿 관리]에 아래 문구를 그대로 붙여넣고 승인 신청하세요. 버튼은 <strong>웹링크</strong>로 추가합니다.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(ALIMTALK_TEMPLATE_TEXT).then(() => {
                            showToast('템플릿 본문이 복사되었습니다. 솔라피에 붙여넣으세요!');
                          });
                        }}
                        className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-[11px] font-bold text-slate-700 cursor-pointer flex items-center gap-1 shadow-sm"
                      >
                        <i className="ri-file-copy-line" />
                        <span>본문 복사</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const url = `${cloudStatus?.siteUrl || window.location.origin}/w/#{토큰}`;
                          navigator.clipboard.writeText(url).then(() => {
                            showToast('버튼 링크 주소가 복사되었습니다. (모바일·PC 링크 둘 다 같은 주소)');
                          });
                        }}
                        className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-[11px] font-bold text-slate-700 cursor-pointer flex items-center gap-1 shadow-sm"
                      >
                        <i className="ri-link" />
                        <span>버튼 링크 복사</span>
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono break-all">
                      버튼명: 보증서 보기 / 링크: {cloudStatus?.siteUrl || window.location.origin}/w/#{'{토큰}'}
                    </p>
                  </div>

                  <div className="pt-1 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => setIsKakaoSettingsOpen(false)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      닫기
                    </button>
                  </div>
                </div>
              )}

              {/* ── 탭 2: 카카오 JavaScript 키 설정 ── */}
              {settingsTab === 'kakao_js' && (
                <form onSubmit={handleSaveKakaoKey} className="p-6 space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      카카오 JavaScript 키 (developers.kakao.com)
                    </label>
                    <input
                      type="text"
                      value={kakaoKeyInput}
                      onChange={(e) => setKakaoKeyInput(e.target.value)}
                      placeholder="예: a1b2c3d4e5f6g7h8i9j0..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:border-red-500"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      * 이 방식은 관리자의 스마트폰 카카오톡과 연동된 개인 계정으로 로그인해야 발송됩니다.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsKakaoSettingsOpen(false)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      닫기
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow cursor-pointer"
                    >
                      JS 키 저장하기
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
         7. 신규 발급 완료 모달
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
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">
                <i className="ri-checkbox-circle-fill" />
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-1">
                정품 보증서 발급 완료!
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                관리자 대장에 저장되었습니다.
              </p>

              {/* 알림톡 자동 발송 결과 */}
              {issuedAlimtalk.state !== 'idle' && (
                <div
                  className={`mb-4 px-3.5 py-2.5 rounded-2xl border text-xs text-left flex items-start gap-2 ${
                    issuedAlimtalk.state === 'sent'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : issuedAlimtalk.state === 'sending'
                      ? 'bg-slate-50 border-slate-200 text-slate-700'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  <i
                    className={`text-base flex-shrink-0 ${
                      issuedAlimtalk.state === 'sending'
                        ? 'ri-loader-4-line animate-spin'
                        : issuedAlimtalk.state === 'sent'
                        ? 'ri-checkbox-circle-fill'
                        : 'ri-error-warning-line'
                    }`}
                  />
                  <div>
                    <strong className="block">
                      {issuedAlimtalk.state === 'sending' && '고객 카톡으로 알림톡 보내는 중...'}
                      {issuedAlimtalk.state === 'sent' && '고객 카톡으로 알림톡이 자동 발송되었습니다!'}
                      {issuedAlimtalk.state === 'failed' && '알림톡 자동 발송 실패 → 아래 버튼으로 수동 전송해 주세요'}
                      {issuedAlimtalk.state === 'local' && '자동 발송은 인터넷 배포 후 동작 → 지금은 아래 버튼으로 전송'}
                    </strong>
                    {issuedAlimtalk.state === 'failed' && (
                      <span className="block mt-0.5 opacity-80 break-all">{issuedAlimtalk.message}</span>
                    )}
                  </div>
                </div>
              )}

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

              <div className="space-y-2.5">
                {/* 카카오톡 전송 센터 열기 */}
                <button
                  onClick={() => {
                    const target = issuedSuccessWarranty;
                    setIssuedSuccessWarranty(null);
                    setSendingKakaoWarranty(target);
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
         8. 보증서 뷰어 팝업 (WarrantyViewer)
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
