import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getConsultations,
  updateConsultationStatus,
  updateConsultationNotes,
  deleteConsultation,
  exportConsultationsToCSV,
  type ConsultationItem
} from '../lib/consultationStorage';

interface AdminDashboardProps {
  onExit: () => void;
}

const DEFAULT_ADMIN_PW = 'caution2026!';

const STATUS_LABELS: Record<ConsultationItem['status'], { label: string; color: string; bg: string }> = {
  new: { label: '신규 접수', color: 'text-red-700 border-red-200', bg: 'bg-red-50' },
  contacted: { label: '상담 진행중', color: 'text-amber-700 border-amber-200', bg: 'bg-amber-50' },
  quoted: { label: '견적 발송', color: 'text-blue-700 border-blue-200', bg: 'bg-blue-50' },
  reserved: { label: '시공 예약', color: 'text-purple-700 border-purple-200', bg: 'bg-purple-50' },
  completed: { label: '시공 완료', color: 'text-green-700 border-green-200', bg: 'bg-green-50' },
  cancelled: { label: '취소/보류', color: 'text-gray-600 border-gray-200', bg: 'bg-gray-50' }
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('caution_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [consultations, setConsultations] = useState<ConsultationItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');

  // 상세 보기 및 메모 모달 대상
  const [selectedItem, setSelectedItem] = useState<ConsultationItem | null>(null);
  const [currentNote, setCurrentNote] = useState('');

  // 데이터 로드
  const reloadData = () => {
    const data = getConsultations();
    setConsultations(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      reloadData();
    }
  }, [isAuthenticated]);

  // 로그인 핸들러
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === DEFAULT_ADMIN_PW) {
      sessionStorage.setItem('caution_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('관리자 비밀번호가 일치하지 않습니다. (기본: caution2026!)');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('caution_admin_auth');
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  // 상태 변경 핸들러
  const handleStatusChange = (id: string, newStatus: ConsultationItem['status']) => {
    updateConsultationStatus(id, newStatus);
    reloadData();
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // 삭제 핸들러
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`[${name}] 고객님의 상담 내역을 삭제하시겠습니까?`)) {
      deleteConsultation(id);
      reloadData();
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem(null);
      }
    }
  };

  // 메모 저장 핸들러
  const handleSaveNote = () => {
    if (!selectedItem) return;
    updateConsultationNotes(selectedItem.id, currentNote);
    reloadData();
    setSelectedItem((prev) => (prev ? { ...prev, notes: currentNote } : null));
    alert('관리자 메모가 저장되었습니다.');
  };

  // 필터링된 리스트
  const filteredList = useMemo(() => {
    return consultations.filter((item) => {
      // 1. 검색어 필터
      const matchSearch =
        searchTerm.trim() === '' ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.model && item.model.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.codeName && item.codeName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.message && item.message.toLowerCase().includes(searchTerm.toLowerCase()));

      // 2. 상태 필터
      const matchStatus = statusFilter === 'all' || item.status === statusFilter;

      // 3. 서비스 필터
      const matchService =
        serviceFilter === 'all' ||
        (item.service && item.service.toLowerCase().includes(serviceFilter.toLowerCase()));

      return matchSearch && matchStatus && matchService;
    });
  }, [consultations, searchTerm, statusFilter, serviceFilter]);

  // 통계 수치 계산
  const stats = useMemo(() => {
    const total = consultations.length;
    const newCount = consultations.filter((c) => c.status === 'new').length;
    const inProgress = consultations.filter((c) => c.status === 'contacted' || c.status === 'quoted').length;
    const completed = consultations.filter((c) => c.status === 'reserved' || c.status === 'completed').length;
    return { total, newCount, inProgress, completed };
  }, [consultations]);

  /* ─────────────────────────────────────────────────────────────
     1. 로그인 화면 (미인증 상태)
  ───────────────────────────────────────────────────────────── */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          {/* 상단 엠블럼 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 text-primary mb-4 shadow-lg shadow-primary/20">
              <i className="ri-shield-keyhole-line text-3xl" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              코션스마트센터 관리자 로그인
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              실시간 고객 맞춤 견적 & 상담 신청 접수 관리 시스템
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                관리자 인증 비밀번호
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="비밀번호 입력 (기본: caution2026!)"
                  autoFocus
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              {authError && (
                <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                  <i className="ri-error-warning-line" /> {authError}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/30 active:scale-95 text-sm cursor-pointer"
              >
                관리자 대시보드 입장
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <button
              onClick={onExit}
              className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <i className="ri-arrow-left-line" /> 공식 웹사이트 홈으로 돌아가기
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     2. 관리자 대시보드 메인 화면
  ───────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">
      {/* ── Top Header ── */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-primary text-white text-xs font-black rounded-md tracking-wider">
              ADMIN
            </span>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                코션스마트센터 상담 접수 관리
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={exportConsultationsToCSV}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="상담 내역을 엑셀 CSV 파일로 저장합니다"
            >
              <i className="ri-file-excel-2-line text-emerald-400 text-sm" />
              <span className="hidden sm:inline">엑셀 다운로드</span>
            </button>

            <button
              onClick={onExit}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <i className="ri-home-4-line text-sm" />
              <span className="hidden sm:inline">홈페이지로 이동</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <i className="ri-logout-box-r-line text-sm" />
              <span className="hidden sm:inline">로그아웃</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Dashboard Body ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ── 1. 통계 카드 섹션 ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* 전체 접수 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">총 상담 접수</span>
              <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <i className="ri-inbox-line" />
              </span>
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-black text-slate-900">{stats.total} <span className="text-xs font-medium text-slate-500">건</span></div>
          </div>

          {/* 신규 미확인 */}
          <div className="bg-white p-5 rounded-2xl border border-red-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-600">신규 대기</span>
              <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 animate-pulse">
                <i className="ri-notification-3-line" />
              </span>
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-black text-red-600">{stats.newCount} <span className="text-xs font-medium text-slate-500">건</span></div>
          </div>

          {/* 상담/견적 진행중 */}
          <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-600">상담 & 견적 중</span>
              <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <i className="ri-customer-service-2-line" />
              </span>
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-black text-amber-600">{stats.inProgress} <span className="text-xs font-medium text-slate-500">건</span></div>
          </div>

          {/* 시공 예약/완료 */}
          <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600">예약 & 완료</span>
              <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <i className="ri-checkbox-circle-line" />
              </span>
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-black text-emerald-600">{stats.completed} <span className="text-xs font-medium text-slate-500">건</span></div>
          </div>
        </div>

        {/* ── 2. 검색 및 필터 바 ── */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-3 justify-between">
          {/* 검색창 */}
          <div className="relative w-full md:w-96">
            <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="고객명, 연락처, 차종, 섀시코드, 문의 검색..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
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

          {/* 필터 셀렉트 */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            {/* 상태 필터 */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary"
            >
              <option value="all">전체 상태</option>
              <option value="new">신규 접수</option>
              <option value="contacted">상담 진행중</option>
              <option value="quoted">견적 발송</option>
              <option value="reserved">시공 예약</option>
              <option value="completed">시공 완료</option>
              <option value="cancelled">취소/보류</option>
            </select>

            {/* 서비스 필터 */}
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary"
            >
              <option value="all">전체 서비스</option>
              <option value="투명PPS">투명PPS</option>
              <option value="컬러PPS">컬러PPS</option>
              <option value="판금도색">판금도색</option>
              <option value="디테일링">디테일링</option>
              <option value="기타">기타</option>
            </select>

            <button
              onClick={reloadData}
              className="p-2 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="새로고침"
            >
              <i className="ri-refresh-line text-lg" />
            </button>
          </div>
        </div>

        {/* ── 3. 상담 신청 리스트 테이블 ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-100/75 text-xs text-slate-500 uppercase border-b border-slate-200 font-bold tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">접수 일시</th>
                  <th className="py-3.5 px-4">고객 정보</th>
                  <th className="py-3.5 px-4">차량 정보 (섀시코드)</th>
                  <th className="py-3.5 px-4">관심 서비스</th>
                  <th className="py-3.5 px-4">진행 상태</th>
                  <th className="py-3.5 px-4 text-center">빠른 조치</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-slate-400">
                      <i className="ri-inbox-archive-line text-4xl block mb-2 text-slate-300" />
                      일치하는 상담 신청 내역이 없습니다.
                    </td>
                  </tr>
                ) : (
                  filteredList.map((item) => {
                    const statusObj = STATUS_LABELS[item.status] || STATUS_LABELS.new;
                    const dateFormatted = new Date(item.createdAt).toLocaleString('ko-KR', {
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    });

                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          item.status === 'new' ? 'bg-red-50/20' : ''
                        }`}
                      >
                        {/* 일시 */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="font-semibold text-slate-800">{dateFormatted}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{item.id.slice(0, 10)}</div>
                        </td>

                        {/* 고객 정보 */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            {item.name}
                            {item.status === 'new' && (
                              <span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-ping" />
                            )}
                          </div>
                          <div className="text-xs text-slate-600 font-mono mt-0.5">
                            <a href={`tel:${item.phone}`} className="hover:text-primary underline">
                              {item.phone}
                            </a>
                          </div>
                          {item.email && (
                            <div className="text-[11px] text-slate-400 truncate max-w-[160px]">
                              {item.email}
                            </div>
                          )}
                        </td>

                        {/* 차량 정보 */}
                        <td className="py-4 px-4">
                          <div className="font-semibold text-slate-900 text-xs">
                            {item.customModel || `${item.model || item.brand}`}
                          </div>
                          {item.codeName && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-mono font-bold rounded border border-slate-200">
                              {item.codeName}
                            </span>
                          )}
                        </td>

                        {/* 관심 서비스 */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`inline-block px-2.5 py-1 text-xs font-bold rounded-lg border ${
                              item.service.includes('컬러')
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : item.service.includes('투명')
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : 'bg-slate-100 text-slate-800 border-slate-200'
                            }`}
                          >
                            {item.service}
                          </span>
                        </td>

                        {/* 진행 상태 (드롭다운) */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <select
                            value={item.status}
                            onChange={(e) =>
                              handleStatusChange(item.id, e.target.value as ConsultationItem['status'])
                            }
                            className={`px-2.5 py-1 text-xs font-bold rounded-lg border focus:outline-none ${statusObj.bg} ${statusObj.color}`}
                          >
                            <option value="new">신규 접수</option>
                            <option value="contacted">상담 진행중</option>
                            <option value="quoted">견적 발송</option>
                            <option value="reserved">시공 예약</option>
                            <option value="completed">시공 완료</option>
                            <option value="cancelled">취소/보류</option>
                          </select>
                        </td>

                        {/* 빠른 조치 버튼 */}
                        <td className="py-4 px-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* 통화 */}
                            <a
                              href={`tel:${item.phone}`}
                              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                              title={`${item.phone} 바로 통화 연결`}
                            >
                              <i className="ri-phone-fill text-base" />
                            </a>

                            {/* 카톡 채널 연결 */}
                            <a
                              href="http://pf.kakao.com/_FxlNhX/chat"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-[#FEE500]/30 text-[#3A1D1D] hover:bg-[#FEE500] transition-colors"
                              title="카카오톡 채널 채팅창 열기"
                            >
                              <i className="ri-chat-3-fill text-base" />
                            </a>

                            {/* 상세 및 메모 */}
                            <button
                              onClick={() => {
                                setSelectedItem(item);
                                setCurrentNote(item.notes || '');
                              }}
                              className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer relative"
                              title="상세 문의 내용 및 메모"
                            >
                              <i className="ri-file-list-3-line text-base" />
                              {item.notes && (
                                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary rounded-full" />
                              )}
                            </button>

                            {/* 삭제 */}
                            <button
                              onClick={() => handleDelete(item.id, item.name)}
                              className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer"
                              title="상담 내역 삭제"
                            >
                              <i className="ri-delete-bin-line text-base" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ── 4. 상세 모달 & 관리자 메모 ── */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    상담 신청 상세 정보
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-0.5">
                    {selectedItem.name} 고객님
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer"
                >
                  <i className="ri-close-line text-xl" />
                </button>
              </div>

              {/* 기본 항목 요약 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6 p-4 bg-slate-50 rounded-2xl text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">연락처</span>
                  <a href={`tel:${selectedItem.phone}`} className="font-bold text-primary text-sm hover:underline">
                    {selectedItem.phone}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">이메일</span>
                  <span className="font-medium text-slate-700">{selectedItem.email || '미입력'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">신청 서비스</span>
                  <span className="font-bold text-slate-800">{selectedItem.service}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">차량 모델</span>
                  <span className="font-bold text-slate-800">{selectedItem.customModel || selectedItem.model}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">섀시 코드명</span>
                  <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 inline-block">
                    {selectedItem.codeName || '직접입력'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">접수 시각</span>
                  <span className="text-slate-600 font-medium">
                    {new Date(selectedItem.createdAt).toLocaleString('ko-KR')}
                  </span>
                </div>
              </div>

              {/* 고객 문의 내용 */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  고객 전달 문의 내용
                </label>
                <div className="p-4 bg-slate-100 rounded-xl text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {selectedItem.message || '별도 문의 내용이 없습니다.'}
                </div>
              </div>

              {/* 관리자 메모 작성 */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <i className="ri-edit-line text-primary" /> 내부 관리자 상담 메모 (회사 전용)
                  </label>
                  <span className="text-[11px] text-slate-400">고객에게 노출되지 않습니다</span>
                </div>
                <textarea
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  rows={4}
                  placeholder="예: 9월 10일 유선 상담 완료, 입고 일정 확정 후 재연락 요망, 카톡으로 스톤칩 사진 수신함 등"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary resize-none"
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleSaveNote}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow"
                  >
                    메모 저장하기
                  </button>
                </div>
              </div>

              {/* 하단 바로 연락 액션 */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2.5">
                <a
                  href={`tel:${selectedItem.phone}`}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <i className="ri-phone-fill text-sm" /> 전화 걸기 ({selectedItem.phone})
                </a>
                <a
                  href={`sms:${selectedItem.phone}`}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
                >
                  <i className="ri-message-2-line text-sm" /> 문자 발송
                </a>
                <a
                  href="http://pf.kakao.com/_FxlNhX/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-[#FEE500] hover:bg-[#FDD835] text-[#371D1E] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
                >
                  <i className="ri-chat-3-fill text-sm" /> 카카오톡 상담창
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
