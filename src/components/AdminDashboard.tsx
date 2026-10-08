import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getConsultations,
  updateConsultationStatus,
  updateConsultationNotes,
  deleteConsultation,
  clearAllConsultations,
  exportConsultationsToCSV,
  subscribeToNewConsultations,
  type ConsultationItem
} from '../lib/consultationStorage';
import {
  playChimeSound,
  isSoundEnabled,
  setSoundEnabled,
  requestNotificationPermission,
  getNotificationPermission,
  sendBrowserNotification
} from '../lib/notificationSound';
import { AdminWarrantyManager } from './AdminWarrantyManager';
import { AdminCalendar } from './AdminCalendar';
import { exportWarrantiesToCSV } from '../lib/warrantyStorage';
import { getSchedules } from '../lib/scheduleStorage';

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

  // 탭 섹션: 상담 접수 vs 시공 캘린더 vs 전자 보증서
  const [adminSection, setAdminSection] = useState<'consultations' | 'calendar' | 'warranties'>('consultations');
  const [warrantyPrefill, setWarrantyPrefill] = useState<any>(null);
  const [calendarPrefill, setCalendarPrefill] = useState<any>(null);
  const [scheduleCount, setScheduleCount] = useState<number>(0);

  const [consultations, setConsultations] = useState<ConsultationItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');

  // 상세 보기 및 메모 모달 대상
  const [selectedItem, setSelectedItem] = useState<ConsultationItem | null>(null);
  const [currentNote, setCurrentNote] = useState('');

  // ── 실시간 알림 시스템 상태 ──
  const [soundOn, setSoundOn] = useState<boolean>(() => isSoundEnabled());
  const [realtimeAlert, setRealtimeAlert] = useState<ConsultationItem | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>(() => getNotificationPermission());

  // 데이터 로드
  const reloadData = () => {
    const data = getConsultations();
    setConsultations(data);
    setScheduleCount(getSchedules().length);
  };

  // 실시간 새 상담 접수 리스너 등록
  useEffect(() => {
    if (!isAuthenticated) return;

    reloadData();

    // 새 상담 접수 시 사운드 알람 + 브라우저 푸시 + 팝업 배너 표시
    const unsubscribe = subscribeToNewConsultations((newItem) => {
      reloadData();
      playChimeSound();
      sendBrowserNotification(
        '[코션스마트센터] 새 견적 상담 신청 도착!',
        `${newItem.name} 고객님 | ${newItem.brand} ${newItem.model} | ${newItem.phone}`,
        () => {
          setAdminSection('consultations');
          setSelectedItem(newItem);
          setCurrentNote(newItem.notes || '');
        }
      );
      setRealtimeAlert(newItem);
    });

    return () => {
      unsubscribe();
    };
  }, [isAuthenticated]);

  // 실시간 팝업 배너 자동 닫힘 타이머 (15초)
  useEffect(() => {
    if (!realtimeAlert) return;
    const timer = setTimeout(() => {
      setRealtimeAlert(null);
    }, 15000);
    return () => clearTimeout(timer);
  }, [realtimeAlert]);

  // 로그인 핸들러
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === DEFAULT_ADMIN_PW) {
      sessionStorage.setItem('caution_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
      // 로그인 시 오디오 엔진 활성화 및 성공 알림음
      playChimeSound();
    } else {
      setAuthError('관리자 비밀번호가 일치하지 않습니다. (기본: caution2026!)');
    }
  };

  // 알림음 ON/OFF 토글 핸들러
  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) {
      playChimeSound();
    }
  };

  // 알림 테스트 핸들러 (모바일/PC 알림음 및 팝업 즉시 시뮬레이션)
  const handleTestAlert = () => {
    playChimeSound();
    const testItem: ConsultationItem = {
      id: 'test-' + Date.now(),
      createdAt: new Date().toISOString(),
      name: '홍길동 (테스트 신청)',
      phone: '010-1234-5678',
      email: 'customer@example.com',
      brand: 'Mercedes-Benz',
      model: 'Maybach GLS600',
      codeName: 'X167 (마이바흐 투톤)',
      service: '투명PPS',
      message: '테스트용 실시간 알람입니다. 관리자 페이지를 켜놓았을 때 딩동 소리와 팝업 배너가 정상 동작하는지 확인합니다.',
      status: 'new',
      notes: '실시간 알람 테스트 데이터',
      isRead: false
    };
    setRealtimeAlert(testItem);
    sendBrowserNotification(
      '[코션스마트센터] 새 견적 상담 신청 도착!',
      '홍길동 (테스트 신청) | Mercedes-Benz Maybach GLS600 | 010-1234-5678'
    );
  };

  // 브라우저 웹 푸시 권한 요청 핸들러
  const handleRequestPushPermission = async () => {
    const perm = await requestNotificationPermission();
    setPermissionStatus(perm);
    if (perm === 'granted') {
      sendBrowserNotification(
        '[코션스마트센터] 브라우저 알림 설정 완료',
        '새로운 상담 신청이 접수되면 스마트폰 화면 상단이나 PC 알림으로 즉시 안내해 드립니다.'
      );
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

  // 전체 상담 내역 초기화/비우기 핸들러
  const handleClearConsultations = () => {
    if (window.confirm('기존 접수된 모든 상담 내역을 삭제하고 초기화하시겠습니까?\n(삭제 후에는 복구할 수 없습니다.)')) {
      clearAllConsultations();
      reloadData();
      if (selectedItem) {
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
              실시간 고객 견적 접수 & 공식 정품 전자보증서 발급 시스템
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                관리자 비밀번호
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="비밀번호 입력 (기본: caution2026!)"
                  className="w-full px-4 py-3.5 bg-slate-950 border border-slate-700 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  autoFocus
                />
              </div>
              {authError && (
                <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                  <i className="ri-error-warning-line" />
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-primary/30 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>대시보드 로그인</span>
              <i className="ri-arrow-right-line" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <button
              onClick={onExit}
              className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <i className="ri-arrow-left-line" />
              <span>홈페이지로 돌아가기</span>
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
      {/* ── Top Header (모바일 & 데스크톱 완벽 반응형) ── */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* 상단 메인 바: 로고 & 유틸리티 버튼 */}
          <div className="h-14 sm:h-16 flex items-center justify-between gap-2">
            {/* 좌측: ADMIN 뱃지 & 타이틀 */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-primary text-white text-[11px] sm:text-xs font-black rounded-md tracking-wider">
                ADMIN
              </span>
              <h1 className="text-sm sm:text-base font-black tracking-tight text-white flex items-center gap-1.5 truncate">
                코션스마트센터 <span className="text-slate-400 font-normal hidden xs:inline text-xs">관리자</span>
              </h1>
            </div>

            {/* 데스크톱 전용 탭 바 (lg 이상 넓은 화면에서만 인라인 표시) */}
            <div className="hidden lg:flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setAdminSection('consultations')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  adminSection === 'consultations'
                    ? 'bg-primary text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <i className="ri-inbox-line" />
                <span>상담 접수</span>
                <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">{stats.total}</span>
              </button>

              <button
                onClick={() => setAdminSection('calendar')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  adminSection === 'calendar'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <i className="ri-calendar-event-line text-blue-300" />
                <span>시공 캘린더</span>
                {scheduleCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">{scheduleCount}</span>
                )}
              </button>

              <button
                onClick={() => setAdminSection('warranties')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  adminSection === 'warranties'
                    ? 'bg-red-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <i className="ri-shield-check-fill text-yellow-300" />
                <span>정품 전자보증서</span>
              </button>
            </div>

            {/* 우측 유틸리티 버튼 모음 */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* 소리 알림 ON/OFF */}
              <button
                onClick={handleToggleSound}
                className={`p-2 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1 cursor-pointer ${
                  soundOn
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/70 hover:bg-emerald-900/60 shadow-sm'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                }`}
                title={soundOn ? '실시간 알림음 켜짐 (클릭 시 무음)' : '실시간 알림음 꺼짐 (클릭 시 소리 켬)'}
              >
                <i className={soundOn ? 'ri-volume-up-fill text-emerald-400 text-sm' : 'ri-volume-mute-fill text-slate-400 text-sm'} />
                <span className="hidden md:inline">{soundOn ? '소리 ON' : '무음'}</span>
              </button>

              {/* 알림 테스트 버튼 */}
              <button
                onClick={handleTestAlert}
                className="p-2 sm:px-2.5 sm:py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                title="알림 테스트 (딩동 소리 + 팝업)"
              >
                <i className="ri-notification-badge-fill text-amber-400 text-sm" />
                <span className="hidden md:inline">알림 테스트</span>
              </button>

              {/* 브라우저 푸시 알림 켜기 버튼 (미허용 시에만 노출) */}
              {permissionStatus !== 'granted' && (
                <button
                  onClick={handleRequestPushPermission}
                  className="p-2 sm:px-2.5 sm:py-1.5 bg-indigo-900/60 hover:bg-indigo-900/90 text-indigo-200 text-xs font-semibold rounded-lg border border-indigo-700/70 transition-colors flex items-center gap-1 cursor-pointer"
                  title="브라우저 푸시 알림 켜기"
                >
                  <i className="ri-notification-3-line text-indigo-300 text-sm" />
                  <span className="hidden lg:inline">푸시 알림</span>
                </button>
              )}

              {/* 상담 섹션일 때 엑셀 다운로드 */}
              {adminSection === 'consultations' && (
                <button
                  onClick={exportConsultationsToCSV}
                  className="p-2 sm:px-2.5 sm:py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                  title="상담 내역 엑셀 다운로드"
                >
                  <i className="ri-file-excel-2-line text-emerald-400 text-sm" />
                  <span className="hidden sm:inline">엑셀</span>
                </button>
              )}

              {/* 보증서 섹션일 때 보증서 대장 엑셀 다운로드 */}
              {adminSection === 'warranties' && (
                <button
                  onClick={exportWarrantiesToCSV}
                  className="p-2 sm:px-2.5 sm:py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                  title="보증서 발급 대장 엑셀 다운로드"
                >
                  <i className="ri-file-excel-2-line text-emerald-400 text-sm" />
                  <span className="hidden sm:inline">대장 엑셀</span>
                </button>
              )}

              {/* 홈페이지 바로가기 */}
              <button
                onClick={onExit}
                className="p-2 sm:px-2.5 sm:py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                title="홈페이지로 이동"
              >
                <i className="ri-home-4-line text-sm" />
                <span className="hidden md:inline">홈페이지</span>
              </button>

              {/* 로그아웃 */}
              <button
                onClick={handleLogout}
                className="p-2 sm:px-2.5 sm:py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                title="로그아웃"
              >
                <i className="ri-logout-box-r-line text-sm" />
                <span className="hidden md:inline">로그아웃</span>
              </button>
            </div>
          </div>

          {/* 모바일 & 태블릿 전용 하단 탭 바 (글자 세로 꺾임 완전 해결) */}
          <div className="lg:hidden pb-3 pt-1">
            <div className="grid grid-cols-3 gap-1 bg-slate-800/95 p-1 rounded-xl border border-slate-700/80 shadow-inner">
              <button
                onClick={() => setAdminSection('consultations')}
                className={`py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  adminSection === 'consultations'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <i className="ri-inbox-line text-sm shrink-0" />
                <span className="truncate">상담 접수</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  adminSection === 'consultations' ? 'bg-white/25 text-white' : 'bg-slate-700 text-slate-300'
                }`}>
                  {stats.total}
                </span>
              </button>

              <button
                onClick={() => setAdminSection('calendar')}
                className={`py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  adminSection === 'calendar'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <i className="ri-calendar-event-line text-blue-300 text-sm shrink-0" />
                <span className="truncate">시공 캘린더</span>
                {scheduleCount > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                    adminSection === 'calendar' ? 'bg-white/25 text-white' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {scheduleCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setAdminSection('warranties')}
                className={`py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  adminSection === 'warranties'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <i className="ri-shield-check-fill text-yellow-300 text-sm shrink-0" />
                <span className="truncate">전자보증서</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── 실시간 새 상담 접수 알림 팝업 배너 (플로팅) ── */}
      <AnimatePresence>
        {realtimeAlert && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-lg bg-slate-900/95 border-2 border-red-500 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl text-white"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                <i className="ri-notification-3-fill text-xl animate-bounce" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider animate-pulse">
                    신규 상담 접수
                  </span>
                  <span className="text-xs text-slate-400">방금 전</span>
                </div>
                <h4 className="text-base font-bold text-white truncate">
                  {realtimeAlert.name} 고객님 ({realtimeAlert.phone})
                </h4>
                <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                  {realtimeAlert.brand} {realtimeAlert.model} {realtimeAlert.codeName ? `· ${realtimeAlert.codeName}` : ''} | <span className="text-yellow-400 font-bold">{realtimeAlert.service}</span>
                </p>
                {realtimeAlert.message && (
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1 italic bg-slate-800/80 p-1.5 rounded-lg border border-slate-700">
                    "{realtimeAlert.message}"
                  </p>
                )}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => {
                      setAdminSection('consultations');
                      setSelectedItem(realtimeAlert);
                      setCurrentNote(realtimeAlert.notes || '');
                      setRealtimeAlert(null);
                    }}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-md"
                  >
                    <i className="ri-eye-line" />
                    <span>지금 확인하기</span>
                  </button>
                  <button
                    onClick={() => setRealtimeAlert(null)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    닫기
                  </button>
                </div>
              </div>
              <button
                onClick={() => setRealtimeAlert(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                title="닫기"
              >
                <i className="ri-close-line text-lg" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Dashboard Body ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ─────────────────────────────────────────────────────────────
           A. 정품 전자 보증서 관리 섹션
        ───────────────────────────────────────────────────────────── */}
        {adminSection === 'warranties' ? (
          <AdminWarrantyManager
            initialPrefill={warrantyPrefill}
            onClearPrefill={() => setWarrantyPrefill(null)}
          />
        ) : adminSection === 'calendar' ? (
          /* ─────────────────────────────────────────────────────────────
             B. 시공 예약 캘린더 관리 섹션 (차량번호 중심)
          ───────────────────────────────────────────────────────────── */
          <AdminCalendar
            onIssueWarranty={(prefill) => {
              setWarrantyPrefill(prefill);
              setAdminSection('warranties');
            }}
            initialPrefill={calendarPrefill}
            onClearPrefill={() => setCalendarPrefill(null)}
          />
        ) : (
          /* ─────────────────────────────────────────────────────────────
             C. 상담 & 견적 접수 관리 섹션
          ───────────────────────────────────────────────────────────── */
          <div>
            {/* ── 1. 통계 카드 섹션 (모바일 2열 최적화) ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-5 sm:mb-8">
              {/* 전체 접수 */}
              <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-500">총 상담 접수</span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <i className="ri-inbox-line text-sm" />
                  </span>
                </div>
                <div className="mt-2 sm:mt-3 text-xl sm:text-3xl font-black text-slate-900">
                  {stats.total} <span className="text-xs font-medium text-slate-500">건</span>
                </div>
              </div>

              {/* 신규 미확인 */}
              <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-red-200 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-bold text-red-600">신규 대기</span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 animate-pulse">
                    <i className="ri-notification-3-line text-sm" />
                  </span>
                </div>
                <div className="mt-2 sm:mt-3 text-xl sm:text-3xl font-black text-red-600">
                  {stats.newCount} <span className="text-xs font-medium text-slate-500">건</span>
                </div>
              </div>

              {/* 상담/견적 진행중 */}
              <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-amber-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-bold text-amber-600">상담 & 견적 중</span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <i className="ri-customer-service-2-line text-sm" />
                  </span>
                </div>
                <div className="mt-2 sm:mt-3 text-xl sm:text-3xl font-black text-amber-600">
                  {stats.inProgress} <span className="text-xs font-medium text-slate-500">건</span>
                </div>
              </div>

              {/* 시공 예약/완료 */}
              <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-emerald-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-bold text-emerald-600">예약 & 완료</span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <i className="ri-checkbox-circle-line text-sm" />
                  </span>
                </div>
                <div className="mt-2 sm:mt-3 text-xl sm:text-3xl font-black text-emerald-600">
                  {stats.completed} <span className="text-xs font-medium text-slate-500">건</span>
                </div>
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
                  placeholder="고객명, 연락처, 차종, 문의 검색..."
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

              {/* 상태 필터 및 서비스 필터 */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                {/* 상태별 필터 */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-primary"
                >
                  <option value="all">진행상태: 전체</option>
                  <option value="new">신규 접수</option>
                  <option value="contacted">상담 진행중</option>
                  <option value="quoted">견적 발송</option>
                  <option value="reserved">시공 예약</option>
                  <option value="completed">시공 완료</option>
                  <option value="cancelled">취소/보류</option>
                </select>

                {/* 서비스별 필터 */}
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-primary"
                >
                  <option value="all">시공종류: 전체</option>
                  <option value="투명PPS">투명PPS</option>
                  <option value="컬러PPS">컬러PPS</option>
                  <option value="사고수리">사고수리 & 판금도색</option>
                  <option value="광택">광택 & 유리막 코팅</option>
                </select>

                <button
                  onClick={reloadData}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer"
                  title="새로고침"
                >
                  <i className="ri-refresh-line text-base" />
                </button>

                {consultations.length > 0 && (
                  <button
                    onClick={handleClearConsultations}
                    className="px-3 py-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer border border-transparent hover:border-red-200"
                    title="전체 상담 내역을 삭제하고 초기화합니다"
                  >
                    <i className="ri-delete-bin-line text-slate-500 hover:text-red-600 text-sm" />
                    <span className="hidden sm:inline">상담 내역 비우기</span>
                  </button>
                )}
              </div>
            </div>

            {/* ── 3-A. 모바일 전용 카드형 리스트 (가로 스크롤 없이 한눈에 보기 완벽 지원) ── */}
            <div className="block md:hidden space-y-3">
              {filteredList.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400">
                  <i className="ri-file-search-line text-3xl block mb-2 text-slate-300" />
                  해당 조건의 상담 접수 내역이 없습니다.
                </div>
              ) : (
                filteredList.map((item) => {
                  const statusMeta = STATUS_LABELS[item.status] || STATUS_LABELS.new;
                  const dateFormatted = new Date(item.createdAt).toLocaleString('ko-KR', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedItem(item);
                        setCurrentNote(item.notes || '');
                      }}
                      className={`bg-white rounded-2xl border p-4 shadow-sm transition-all cursor-pointer space-y-3 ${
                        item.status === 'new'
                          ? 'border-red-300 bg-red-50/15 ring-1 ring-red-200'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* 카드 상단: 상태 선택 드롭다운 & 접수일시 */}
                      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(item.id, e.target.value as ConsultationItem['status'])
                          }
                          className={`text-xs font-bold px-3 py-1 rounded-full border ${statusMeta.bg} ${statusMeta.color} focus:outline-none cursor-pointer shadow-sm`}
                        >
                          <option value="new">신규 접수</option>
                          <option value="contacted">상담 진행중</option>
                          <option value="quoted">견적 발송</option>
                          <option value="reserved">시공 예약</option>
                          <option value="completed">시공 완료</option>
                          <option value="cancelled">취소/보류</option>
                        </select>

                        <span className="text-[11px] text-slate-400 font-mono">
                          {dateFormatted}
                        </span>
                      </div>

                      {/* 고객명 & 연락처 & 희망시공 */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-base font-bold text-slate-900">{item.name}</span>
                            {item.status === 'new' && (
                              <span className="px-1.5 py-0.2 bg-red-600 text-white text-[10px] font-black rounded-full animate-pulse">
                                NEW
                              </span>
                            )}
                          </div>
                          <a
                            href={`tel:${item.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs text-primary font-bold hover:underline mt-0.5"
                            title="전화 걸기"
                          >
                            <i className="ri-phone-fill text-xs" />
                            <span>{item.phone}</span>
                          </a>
                        </div>

                        {/* 희망 시공 배지 */}
                        <div className="text-right">
                          <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-bold border border-slate-200">
                            {item.service || '일반 상담'}
                          </span>
                        </div>
                      </div>

                      {/* 차량 정보 요약 */}
                      <div className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">차량정보</span>
                        <span className="font-bold text-slate-800 text-right truncate max-w-[220px]">
                          {item.brand ? `${item.brand} ` : ''}{item.model || '미입력'}
                          {item.codeName ? ` (${item.codeName})` : ''}
                        </span>
                      </div>

                      {/* 고객 문의 내용 */}
                      {item.message && (
                        <div className="text-xs text-slate-600 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100 line-clamp-2 leading-relaxed">
                          <span className="font-bold text-slate-700 mr-1">문의:</span>
                          "{item.message}"
                        </div>
                      )}

                      {/* 관리자 메모가 있는 경우 표시 */}
                      {item.notes && (
                        <div className="text-xs text-amber-800 bg-amber-50/80 p-2 rounded-xl border border-amber-200 flex items-start gap-1.5">
                          <i className="ri-file-text-line text-amber-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item.notes}</span>
                        </div>
                      )}

                      {/* 하단 관리 단축 액션 버튼 */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setCurrentNote(item.notes || '');
                          }}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <i className="ri-file-list-3-line text-slate-500" />
                          <span>상세 / 메모</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setCalendarPrefill({
                                customerName: item.name,
                                customerPhone: item.phone,
                                carModel: [item.brand, item.model, item.codeName].filter(Boolean).join(' '),
                                serviceType: item.service || '',
                                notes: `상담 접수 번호(${item.id}) 연계: ${item.message || ''}`
                              });
                              setAdminSection('calendar');
                            }}
                            className="px-2.5 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                            title="시공 예약 캘린더 등록"
                          >
                            <i className="ri-calendar-event-line" />
                            <span>예약</span>
                          </button>

                          <button
                            onClick={() => {
                              setWarrantyPrefill({
                                customerName: item.name,
                                customerPhone: item.phone,
                                carModel: [item.brand, item.model, item.codeName].filter(Boolean).join(' '),
                                notes: `상담 접수 번호(${item.id}) 연계`
                              });
                              setAdminSection('warranties');
                            }}
                            className="px-2.5 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                            title="정품 전자보증서 발급"
                          >
                            <i className="ri-shield-check-line" />
                            <span>보증서</span>
                          </button>

                          <button
                            onClick={() => handleDelete(item.id, item.name)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="삭제"
                          >
                            <i className="ri-delete-bin-line text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* ── 3-B. 데스크톱 전용 테이블 (md 이상 넓은 화면에서만 표시) ── */}
            <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-[11px] sm:text-xs uppercase tracking-wider font-semibold">
                      <th className="py-3.5 px-4 whitespace-nowrap">상태</th>
                      <th className="py-3.5 px-4 whitespace-nowrap">접수일시</th>
                      <th className="py-3.5 px-4 whitespace-nowrap">고객명 / 연락처</th>
                      <th className="py-3.5 px-4 whitespace-nowrap">차량정보</th>
                      <th className="py-3.5 px-4 whitespace-nowrap">희망 시공</th>
                      <th className="py-3.5 px-4 min-w-[220px]">문의 내용 및 상담 메모</th>
                      <th className="py-3.5 px-4 text-center whitespace-nowrap w-36 min-w-[140px]">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredList.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          <i className="ri-file-search-line text-3xl block mb-2 text-slate-300" />
                          해당 조건의 상담 접수 내역이 없습니다.
                        </td>
                      </tr>
                    ) : (
                      filteredList.map((item) => {
                        const statusMeta = STATUS_LABELS[item.status] || STATUS_LABELS.new;
                        const dateFormatted = new Date(item.createdAt).toLocaleString('ko-KR', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        });

                        return (
                          <tr
                            key={item.id}
                            className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                            onClick={() => {
                              setSelectedItem(item);
                              setCurrentNote(item.notes || '');
                            }}
                          >
                            {/* 상태 뱃지 및 드롭다운 */}
                            <td className="py-3.5 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                              <select
                                value={item.status}
                                onChange={(e) =>
                                  handleStatusChange(item.id, e.target.value as ConsultationItem['status'])
                                }
                                className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${statusMeta.bg} ${statusMeta.color} focus:outline-none cursor-pointer`}
                              >
                                <option value="new">신규 접수</option>
                                <option value="contacted">상담 진행중</option>
                                <option value="quoted">견적 발송</option>
                                <option value="reserved">시공 예약</option>
                                <option value="completed">시공 완료</option>
                                <option value="cancelled">취소/보류</option>
                              </select>
                            </td>

                            {/* 접수일시 */}
                            <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap font-mono text-[11px]">
                              {dateFormatted}
                            </td>

                            {/* 고객명 / 연락처 */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                {item.name}
                                {item.status === 'new' && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                                )}
                              </div>
                              <div className="text-slate-500 font-mono text-[11px]">{item.phone}</div>
                            </td>

                            {/* 차량정보 */}
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-slate-800 line-clamp-1">{item.model || '미입력'}</div>
                              {item.codeName && (
                                <div className="text-[11px] text-slate-500 font-mono">{item.codeName}</div>
                              )}
                            </td>

                            {/* 희망 시공 */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium text-xs">
                                {item.service || '일반 상담'}
                              </span>
                            </td>

                            {/* 문의 내용 및 상담 메모 (통합 정리) */}
                            <td className="py-3.5 px-4 min-w-[220px] max-w-sm">
                              <p className="text-slate-700 line-clamp-1 text-xs font-medium" title={item.message}>
                                {item.message || '-'}
                              </p>
                              {item.notes && (
                                <div
                                  className="mt-1 flex items-center gap-1 text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/80 w-fit max-w-[220px] truncate"
                                  title={item.notes}
                                >
                                  <i className="ri-sticky-note-line text-xs shrink-0 text-amber-600" />
                                  <span className="truncate">{item.notes}</span>
                                </div>
                              )}
                            </td>

                            {/* 관리 액션 버튼 */}
                            <td className="py-3.5 px-4 text-center whitespace-nowrap w-36 min-w-[140px]" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-center gap-1.5">
                                {/* 상세 보기 */}
                                <button
                                  onClick={() => {
                                    setSelectedItem(item);
                                    setCurrentNote(item.notes || '');
                                  }}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                                  title="상담 상세 내역 및 메모 확인/수정"
                                >
                                  <i className="ri-file-list-3-line text-base" />
                                </button>

                                {/* 캘린더 시공 일정 등록 단축 버튼 */}
                                <button
                                  onClick={() => {
                                    setCalendarPrefill({
                                      customerName: item.name,
                                      customerPhone: item.phone,
                                      carModel: [item.brand, item.model, item.codeName].filter(Boolean).join(' '),
                                      serviceType: item.service || '',
                                      notes: `상담 접수 번호(${item.id}) 연계: ${item.message || ''}`
                                    });
                                    setAdminSection('calendar');
                                  }}
                                  className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors cursor-pointer"
                                  title="이 상담 정보로 시공 예약 캘린더에 일정 등록"
                                >
                                  <i className="ri-calendar-event-line text-base" />
                                </button>

                                {/* 보증서 바로 발급 단축 버튼 */}
                                <button
                                  onClick={() => {
                                    setWarrantyPrefill({
                                      customerName: item.name,
                                      customerPhone: item.phone,
                                      carModel: [item.brand, item.model, item.codeName].filter(Boolean).join(' '),
                                      notes: `상담 접수 번호(${item.id}) 연계`
                                    });
                                    setAdminSection('warranties');
                                  }}
                                  className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                                  title="이 고객 정보로 정품 보증서 발급하기"
                                >
                                  <i className="ri-shield-check-line text-base" />
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
          </div>
        )}
      </main>

      {/* ── 4. 상담 상세 모달 & 관리자 메모 ── */}
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
                  <span className="text-slate-400 block mb-1">진행 상태</span>
                  <select
                    value={selectedItem.status}
                    onChange={(e) =>
                      handleStatusChange(selectedItem.id, e.target.value as ConsultationItem['status'])
                    }
                    className="font-bold text-slate-800 bg-white border border-slate-200 rounded-lg px-2 py-1 focus:outline-none"
                  >
                    <option value="new">신규 접수</option>
                    <option value="contacted">상담 진행중</option>
                    <option value="quoted">견적 발송</option>
                    <option value="reserved">시공 예약</option>
                    <option value="completed">시공 완료</option>
                    <option value="cancelled">취소/보류</option>
                  </select>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">차종</span>
                  <span className="font-bold text-slate-800">{selectedItem.model || '미입력'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">섀시 코드</span>
                  <span className="font-mono text-slate-700">{selectedItem.codeName || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">신청 시공</span>
                  <span className="font-bold text-red-600">{selectedItem.service || '미지정'}</span>
                </div>
              </div>

              {/* 고객 문의 전문 */}
              <div className="mb-6">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  고객 요청 / 문의 내용
                </label>
                <div className="p-4 bg-slate-100 rounded-2xl text-slate-800 text-sm whitespace-pre-wrap leading-relaxed border border-slate-200/80">
                  {selectedItem.message || '별도 문의 내용이 없습니다.'}
                </div>
              </div>

              {/* 캘린더 일정 등록 & 정품 보증서 바로 발급 버튼 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                <button
                  onClick={() => {
                    setCalendarPrefill({
                      customerName: selectedItem.name,
                      customerPhone: selectedItem.phone,
                      carModel: selectedItem.model || '',
                      serviceType: selectedItem.service || '',
                      notes: `온라인 상담 접수 연계: ${selectedItem.message || ''}`
                    });
                    setAdminSection('calendar');
                    setSelectedItem(null);
                  }}
                  className="py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                >
                  <i className="ri-calendar-event-line text-base text-blue-200" />
                  <span>시공 예약 캘린더에 등록</span>
                </button>

                <button
                  onClick={() => {
                    setWarrantyPrefill({
                      customerName: selectedItem.name,
                      customerPhone: selectedItem.phone,
                      carModel: selectedItem.model || '',
                      notes: `온라인 상담 접수 연계 (${selectedItem.service || 'CARDIP PPS'})`
                    });
                    setAdminSection('warranties');
                    setSelectedItem(null);
                  }}
                  className="py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                >
                  <i className="ri-shield-check-fill text-base text-yellow-300" />
                  <span>즉시 정품 보증서 발급하기</span>
                </button>
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
                  rows={3}
                  placeholder="예: 유선 상담 완료, 토요일 실차 입고 예약, 스톤칩 부위 추가 보강 요청 등"
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
