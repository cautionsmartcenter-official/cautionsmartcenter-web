import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getSchedules,
  saveSchedule,
  updateSchedule,
  deleteSchedule,
  updateScheduleStatus,
  type ScheduleItem
} from '../lib/scheduleStorage';
import { getWarranties, type WarrantyItem } from '../lib/warrantyStorage';

interface AdminCalendarProps {
  onIssueWarranty?: (prefill: {
    carPlate: string;
    carModel: string;
    customerName: string;
    customerPhone: string;
    notes?: string;
  }) => void;
  initialPrefill?: Partial<ScheduleItem> | null;
  onClearPrefill?: () => void;
}

const SERVICE_OPTIONS = [
  '투명PPS (전체 바디 보호)',
  '투명PPS (본넷 + 프론트 패키지)',
  '투명PPS (생활보호 패키지)',
  '컬러PPS (전체 스프레이 랩핑)',
  '컬러PPS (루프스킨 / 부분 포인트)',
  '사고수리 & 판금도색 (정밀 복원)',
  '광택 & 프리미엄 유리막 코팅',
  '기타 커스텀 / 복합 시공'
];

const STATUS_CONFIG: Record<
  ScheduleItem['status'],
  { label: string; badgeClass: string; dotClass: string; bg: string; text: string }
> = {
  reserved: {
    label: '입고 예약',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    dotClass: 'bg-blue-500',
    bg: 'bg-blue-100/90 text-blue-900 border-blue-300 hover:bg-blue-200',
    text: 'text-blue-700'
  },
  in_progress: {
    label: '시공 진행중',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-300 font-bold',
    dotClass: 'bg-amber-500 animate-ping',
    bg: 'bg-amber-100 text-amber-950 border-amber-400 hover:bg-amber-200 font-bold shadow-sm',
    text: 'text-amber-700'
  },
  completed: {
    label: '출고/완료',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotClass: 'bg-emerald-500',
    bg: 'bg-emerald-100/90 text-emerald-900 border-emerald-300 hover:bg-emerald-200',
    text: 'text-emerald-700'
  },
  cancelled: {
    label: '예약 취소',
    badgeClass: 'bg-slate-100 text-slate-500 border-slate-200',
    dotClass: 'bg-slate-400',
    bg: 'bg-slate-100 text-slate-500 border-slate-200 line-through opacity-60',
    text: 'text-slate-400'
  }
};

export const AdminCalendar: React.FC<AdminCalendarProps> = ({
  onIssueWarranty,
  initialPrefill,
  onClearPrefill
}) => {
  // 오늘 날짜 기준 (2026년 가동)
  const today = useMemo(() => new Date(), []);
  const todayStr = useMemo(() => {
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, [today]);

  // 현재 보고 있는 연도 및 월
  const [currentYear, setCurrentYear] = useState<number>(() => today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(() => today.getMonth()); // 0 ~ 11

  // 데이터 상태
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [warranties, setWarranties] = useState<WarrantyItem[]>([]);
  const [showWarrantiesOnCalendar, setShowWarrantiesOnCalendar] = useState<boolean>(true);

  // 뷰 모드: 달력 vs 목록
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  // 필터 및 검색
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // 선택된 날짜 (클릭 시 해당 날짜의 작업 목록 표시)
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  // 모달 상태: 일정 등록/수정 모달
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);

  // 모달 상태: 일정 상세 확인 모달
  const [viewItem, setViewItem] = useState<ScheduleItem | null>(null);

  // 폼 입력 상태
  const [formData, setFormData] = useState({
    carPlate: '',
    carModel: '',
    carColor: '',
    customerName: '',
    customerPhone: '',
    date: todayStr,
    time: '10:00',
    deliveryDate: '',
    deliveryTime: '18:00',
    serviceType: SERVICE_OPTIONS[0],
    status: 'reserved' as ScheduleItem['status'],
    notes: ''
  });

  // 데이터 로드
  const reloadData = () => {
    setSchedules(getSchedules());
    setWarranties(getWarranties());
  };

  useEffect(() => {
    reloadData();
  }, []);

  // 외부(상담 내역 등)에서 사전 입력 데이터가 전달되었을 때
  useEffect(() => {
    if (initialPrefill) {
      setFormData({
        carPlate: initialPrefill.carPlate || '',
        carModel: initialPrefill.carModel || '',
        carColor: initialPrefill.carColor || '',
        customerName: initialPrefill.customerName || '',
        customerPhone: initialPrefill.customerPhone || '',
        date: initialPrefill.date || todayStr,
        time: initialPrefill.time || '10:00',
        deliveryDate: initialPrefill.deliveryDate || '',
        deliveryTime: initialPrefill.deliveryTime || '18:00',
        serviceType: initialPrefill.serviceType || SERVICE_OPTIONS[0],
        status: initialPrefill.status || 'reserved',
        notes: initialPrefill.notes || ''
      });
      setEditingItem(null);
      setIsModalOpen(true);
      if (onClearPrefill) onClearPrefill();
    }
  }, [initialPrefill, onClearPrefill, todayStr]);

  // 이전달 / 다음달 / 오늘 이동
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleGoToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setSelectedDate(todayStr);
  };

  // 모달 열기 (새 등록)
  const handleOpenNewModal = (defaultDate?: string) => {
    setEditingItem(null);
    setFormData({
      carPlate: '',
      carModel: '',
      carColor: '',
      customerName: '',
      customerPhone: '',
      date: defaultDate || selectedDate || todayStr,
      time: '10:00',
      deliveryDate: '',
      deliveryTime: '18:00',
      serviceType: SERVICE_OPTIONS[0],
      status: 'reserved',
      notes: ''
    });
    setIsModalOpen(true);
  };

  // 모달 열기 (수정)
  const handleOpenEditModal = (item: ScheduleItem) => {
    setEditingItem(item);
    setFormData({
      carPlate: item.carPlate,
      carModel: item.carModel,
      carColor: item.carColor || '',
      customerName: item.customerName,
      customerPhone: item.customerPhone,
      date: item.date,
      time: item.time,
      deliveryDate: item.deliveryDate || '',
      deliveryTime: item.deliveryTime || '18:00',
      serviceType: item.serviceType,
      status: item.status,
      notes: item.notes || ''
    });
    setViewItem(null);
    setIsModalOpen(true);
  };

  // 저장 핸들러
  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.carPlate.trim()) {
      alert('차량번호를 입력해주세요. (예: 12가 3456)');
      return;
    }
    if (!formData.carModel.trim()) {
      alert('차종을 입력해주세요. (예: 제네시스 G80)');
      return;
    }
    if (!formData.customerName.trim()) {
      alert('고객명을 입력해주세요.');
      return;
    }
    if (!formData.customerPhone.trim()) {
      alert('연락처를 입력해주세요.');
      return;
    }

    if (editingItem) {
      updateSchedule(editingItem.id, formData);
      alert(`[${formData.carPlate}] 시공 일정이 수정되었습니다.`);
    } else {
      saveSchedule(formData);
      alert(`[${formData.carPlate}] 시공 예약 일정이 등록되었습니다.`);
    }

    reloadData();
    setIsModalOpen(false);
    setSelectedDate(formData.date);
  };

  // 삭제 핸들러
  const handleDeleteItem = (id: string, carPlate: string) => {
    if (window.confirm(`[${carPlate}] 차량의 시공 일정을 삭제하시겠습니까?`)) {
      deleteSchedule(id);
      reloadData();
      if (viewItem && viewItem.id === id) {
        setViewItem(null);
      }
    }
  };

  // 상태 빠른 변경
  const handleQuickStatusChange = (id: string, newStatus: ScheduleItem['status']) => {
    updateScheduleStatus(id, newStatus);
    reloadData();
    if (viewItem && viewItem.id === id) {
      setViewItem((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // 통계 계산
  const stats = useMemo(() => {
    const todaySchedules = schedules.filter((s) => s.date === todayStr);
    const thisMonthPrefix = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
    const thisMonthSchedules = schedules.filter((s) => s.date.startsWith(thisMonthPrefix));

    return {
      todayCount: todaySchedules.length,
      todayInProgress: todaySchedules.filter((s) => s.status === 'in_progress').length,
      monthTotal: thisMonthSchedules.length,
      monthReserved: thisMonthSchedules.filter((s) => s.status === 'reserved').length,
      monthInProgress: thisMonthSchedules.filter((s) => s.status === 'in_progress').length,
      monthCompleted: thisMonthSchedules.filter((s) => s.status === 'completed').length
    };
  }, [schedules, todayStr, currentYear, currentMonth]);

  // 필터링된 일정 목록
  const filteredSchedules = useMemo(() => {
    return schedules.filter((item) => {
      // 1. 상태 필터
      if (statusFilter !== 'all' && item.status !== statusFilter) {
        return false;
      }
      // 2. 검색어 필터 (차량번호, 차종, 고객명, 연락처)
      if (searchTerm.trim() !== '') {
        const q = searchTerm.toLowerCase();
        const plateMatch = item.carPlate.toLowerCase().replace(/\s+/g, '').includes(q.replace(/\s+/g, ''));
        const modelMatch = item.carModel.toLowerCase().includes(q);
        const nameMatch = item.customerName.toLowerCase().includes(q);
        const phoneMatch = item.customerPhone.includes(q);
        const serviceMatch = item.serviceType.toLowerCase().includes(q);
        if (!plateMatch && !modelMatch && !nameMatch && !phoneMatch && !serviceMatch) {
          return false;
        }
      }
      return true;
    });
  }, [schedules, statusFilter, searchTerm]);

  // 날짜별 일정 매핑 (Map<YYYY-MM-DD, ScheduleItem[]>)
  const schedulesByDate = useMemo(() => {
    const map = new Map<string, ScheduleItem[]>();
    filteredSchedules.forEach((item) => {
      const list = map.get(item.date) || [];
      list.push(item);
      map.set(item.date, list);
    });
    return map;
  }, [filteredSchedules]);

  // 날짜별 발급 보증서 매핑 (Map<YYYY-MM-DD, WarrantyItem[]>)
  const warrantiesByDate = useMemo(() => {
    const map = new Map<string, WarrantyItem[]>();
    if (!showWarrantiesOnCalendar) return map;
    warranties.forEach((item) => {
      if (item.issueDate) {
        const list = map.get(item.issueDate) || [];
        list.push(item);
        map.set(item.issueDate, list);
      }
    });
    return map;
  }, [warranties, showWarrantiesOnCalendar]);

  // 캘린더 그리드 계산 (해당 월의 첫 날 요일, 마지막 날짜)
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const firstDayIndex = firstDayOfMonth.getDay(); // 0: 일요일 ~ 6: 토요일
    const totalDays = lastDayOfMonth.getDate();

    // 이전 달의 마지막 날짜들
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    const days: {
      dateStr: string;
      dayNumber: number;
      isCurrentMonth: boolean;
      isToday: boolean;
    }[] = [];

    // 이전 달 패딩
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevMonthLastDay - i;
      const prevMonth = currentMonth === 0 ? 12 : currentMonth;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const dateStr = `${prevYear}-${String(prevMonth).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      days.push({
        dateStr,
        dayNumber: dayNum,
        isCurrentMonth: false,
        isToday: dateStr === todayStr
      });
    }

    // 이번 달 날짜들
    for (let day = 1; day <= totalDays; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({
        dateStr,
        dayNumber: day,
        isCurrentMonth: true,
        isToday: dateStr === todayStr
      });
    }

    // 다음 달 패딩 (총 35칸 또는 42칸 채우기)
    const remainingSlots = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remainingSlots; i++) {
      const nextMonth = currentMonth === 11 ? 1 : currentMonth + 2;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      const dateStr = `${nextYear}-${String(nextMonth).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({
        dateStr,
        dayNumber: i,
        isCurrentMonth: false,
        isToday: dateStr === todayStr
      });
    }

    return days;
  }, [currentYear, currentMonth, todayStr]);

  // 선택된 날짜의 일정 목록
  const selectedDateSchedules = useMemo(() => {
    return schedules.filter((s) => s.date === selectedDate);
  }, [schedules, selectedDate]);

  const selectedDateWarranties = useMemo(() => {
    return warranties.filter((w) => w.issueDate === selectedDate);
  }, [warranties, selectedDate]);

  return (
    <div className="space-y-6">
      {/* ── 1. 상단 통계 현황 바 ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 오늘 입고/시공 차량 */}
        <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-700">오늘 입고/시공</span>
            <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <i className="ri-car-fill text-base" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-blue-900">{stats.todayCount}</span>
            <span className="text-xs font-semibold text-slate-500">대</span>
            {stats.todayInProgress > 0 && (
              <span className="ml-auto text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                시공중 {stats.todayInProgress}대
              </span>
            )}
          </div>
        </div>

        {/* 이번 달 총 예약 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">{currentMonth + 1}월 총 예약</span>
            <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
              <i className="ri-calendar-check-line text-base" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{stats.monthTotal}</span>
            <span className="text-xs font-semibold text-slate-500">건</span>
            <span className="ml-auto text-[11px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              대기 {stats.monthReserved}건
            </span>
          </div>
        </div>

        {/* 이번 달 시공 진행중 */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700">현재 시공중</span>
            <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <i className="ri-tools-fill text-base" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-700">{stats.monthInProgress}</span>
            <span className="text-xs font-semibold text-slate-500">대</span>
          </div>
        </div>

        {/* 이번 달 출고 완료 */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700">출고 완료</span>
            <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <i className="ri-checkbox-circle-fill text-base" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">{stats.monthCompleted}</span>
            <span className="text-xs font-semibold text-slate-500">대</span>
          </div>
        </div>
      </div>

      {/* ── 2. 달력 헤더 및 컨트롤 바 ── */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* 월 네비게이션 */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevMonth}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
              title="이전 달"
            >
              <i className="ri-arrow-left-s-line text-lg" />
            </button>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 px-2 min-w-[140px] text-center">
              {currentYear}년 {currentMonth + 1}월
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
              title="다음 달"
            >
              <i className="ri-arrow-right-s-line text-lg" />
            </button>
          </div>

          <button
            onClick={handleGoToday}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer border border-slate-200"
          >
            오늘
          </button>
        </div>

        {/* 검색 및 필터, 등록 버튼 */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          {/* 차량번호 빠른 검색창 */}
          <div className="relative flex-1 sm:w-64">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="차량번호 (예: 12가, 3456) 검색..."
              className="w-full pl-9 pr-7 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-500 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <i className="ri-close-line text-sm" />
              </button>
            )}
          </div>

          {/* 상태 필터 */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="all">상태: 전체</option>
            <option value="reserved">입고 예약</option>
            <option value="in_progress">시공 진행중</option>
            <option value="completed">출고/완료</option>
            <option value="cancelled">취소</option>
          </select>

          {/* 보증서 표시 토글 */}
          <button
            onClick={() => setShowWarrantiesOnCalendar(!showWarrantiesOnCalendar)}
            className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border flex items-center gap-1 ${
              showWarrantiesOnCalendar
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-slate-50 text-slate-400 border-slate-200'
            }`}
            title="보증서 발급 완료 차량 달력 표시 On/Off"
          >
            <i className="ri-shield-check-line text-sm" />
            <span className="hidden sm:inline">보증서 표시</span>
          </button>

          {/* 뷰 모드 전환 */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'calendar' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="달력 보기"
            >
              <i className="ri-calendar-line text-sm" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="목록 보기"
            >
              <i className="ri-list-check-2 text-sm" />
            </button>
          </div>

          {/* 새 시공 일정 등록 버튼 */}
          <button
            onClick={() => handleOpenNewModal(selectedDate)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <i className="ri-add-line text-base font-bold" />
            <span>새 시공 일정 등록</span>
          </button>
        </div>
      </div>

      {/* ── 3. 메인 콘텐츠 (월간 캘린더 그리드 or 목록) ── */}
      {viewMode === 'calendar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* A. 월간 달력 그리드 (3열 차지) */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/90 text-center py-2.5 text-xs font-bold tracking-wider">
              <span className="text-red-500">일 (SUN)</span>
              <span className="text-slate-700">월 (MON)</span>
              <span className="text-slate-700">화 (TUE)</span>
              <span className="text-slate-700">수 (WED)</span>
              <span className="text-slate-700">목 (THU)</span>
              <span className="text-slate-700">금 (FRI)</span>
              <span className="text-blue-500">토 (SAT)</span>
            </div>

            {/* 날짜 셀 그리드 */}
            <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-100">
              {calendarDays.map((dayItem, idx) => {
                const daySchedules = schedulesByDate.get(dayItem.dateStr) || [];
                const dayWarranties = warrantiesByDate.get(dayItem.dateStr) || [];
                const isSelected = selectedDate === dayItem.dateStr;
                const isSunday = idx % 7 === 0;
                const isSaturday = idx % 7 === 6;

                return (
                  <div
                    key={dayItem.dateStr}
                    onClick={() => setSelectedDate(dayItem.dateStr)}
                    className={`min-h-[110px] sm:min-h-[125px] p-1.5 sm:p-2 flex flex-col transition-all cursor-pointer relative group ${
                      !dayItem.isCurrentMonth ? 'bg-slate-50/50 opacity-40' : 'bg-white hover:bg-slate-50/80'
                    } ${isSelected ? 'ring-2 ring-blue-500 ring-inset bg-blue-50/20' : ''}`}
                  >
                    {/* 날짜 상단 번호 및 새 등록 버튼 */}
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-xs font-bold inline-flex items-center justify-center w-6 h-6 rounded-full ${
                          dayItem.isToday
                            ? 'bg-blue-600 text-white font-black shadow-sm'
                            : isSunday
                            ? 'text-red-500'
                            : isSaturday
                            ? 'text-blue-500'
                            : 'text-slate-800'
                        }`}
                      >
                        {dayItem.dayNumber}
                      </span>

                      {/* 호버 시 나타나는 + 빠른 등록 아이콘 */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenNewModal(dayItem.dateStr);
                        }}
                        className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded-md bg-blue-100 hover:bg-blue-600 text-blue-700 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                        title={`${dayItem.dateStr} 새 일정 등록`}
                      >
                        <i className="ri-add-line text-xs font-bold" />
                      </button>
                    </div>

                    {/* 일정 뱃지 목록 (차량번호를 가장 먼저 굵게 강조) */}
                    <div className="space-y-1 overflow-hidden flex-1">
                      {daySchedules.map((sch) => {
                        const statusMeta = STATUS_CONFIG[sch.status] || STATUS_CONFIG.reserved;
                        return (
                          <div
                            key={sch.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDate(sch.date);
                              setViewItem(sch);
                            }}
                            className={`px-1.5 py-0.5 rounded-md border text-[11px] leading-tight transition-all cursor-pointer truncate flex items-center gap-1 ${statusMeta.bg}`}
                            title={`[${sch.carPlate}] ${sch.carModel} - ${sch.serviceType} (${sch.customerName} 고객님 / ${sch.time})`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusMeta.dotClass}`} />
                            {/* 차량번호 핵심 강조 */}
                            <span className="font-black tracking-tight shrink-0">{sch.carPlate}</span>
                            <span className="text-[10px] text-slate-600 truncate hidden sm:inline">
                              {sch.carModel.split(' ')[0]}
                            </span>
                          </div>
                        );
                      })}

                      {/* 보증서 발급 완료 차량 (옵션) */}
                      {dayWarranties.map((war) => (
                        <div
                          key={war.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDate(war.issueDate);
                          }}
                          className="px-1.5 py-0.5 rounded-md border border-red-200 bg-red-50 text-red-700 text-[10px] leading-tight transition-all truncate flex items-center gap-1"
                          title={`[정품 보증서 발급] ${war.carPlate} (${war.carModel})`}
                        >
                          <i className="ri-shield-check-fill text-red-600 text-xs shrink-0" />
                          <span className="font-black shrink-0">{war.carPlate}</span>
                          <span className="truncate hidden sm:inline text-red-600/80">보증완료</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* B. 선택된 날짜 상세 패널 (우측 1열) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-col h-full">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                  선택 일자 차량 일정
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                  {selectedDate}{' '}
                  {selectedDate === todayStr && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 ml-1">
                      오늘
                    </span>
                  )}
                </h3>
              </div>

              <button
                onClick={() => handleOpenNewModal(selectedDate)}
                className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                title="이 날짜에 새 일정 추가"
              >
                <i className="ri-add-line" /> 추가
              </button>
            </div>

            {/* 일정 목록 */}
            <div className="space-y-3 overflow-y-auto max-h-[540px] pr-1 flex-1">
              {selectedDateSchedules.length === 0 && selectedDateWarranties.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <i className="ri-car-line text-3xl block mb-2 text-slate-300" />
                  <p className="text-xs font-medium">등록된 시공 일정이 없습니다.</p>
                  <button
                    onClick={() => handleOpenNewModal(selectedDate)}
                    className="mt-3 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    + 첫 차량 등록하기
                  </button>
                </div>
              ) : (
                <>
                  {/* 시공 예약 차량 카드 */}
                  {selectedDateSchedules.map((item) => {
                    const statusMeta = STATUS_CONFIG[item.status] || STATUS_CONFIG.reserved;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setViewItem(item)}
                        className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer bg-slate-50/50 hover:bg-white group"
                      >
                        {/* 차량번호 & 상태 */}
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          {/* 차량번호 최우선 강조 */}
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 bg-slate-900 text-white font-mono font-black text-xs rounded-md shadow-sm">
                              {item.carPlate}
                            </span>
                            <span className="font-bold text-xs text-slate-800 line-clamp-1">{item.carModel}</span>
                          </div>

                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusMeta.badgeClass}`}>
                            {statusMeta.label}
                          </span>
                        </div>

                        {/* 시공 내용 */}
                        <div className="text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                          <i className="ri-shield-star-line text-blue-600 text-xs shrink-0" />
                          <span className="truncate">{item.serviceType}</span>
                        </div>

                        {/* 시간 및 고객 정보 */}
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60 mt-2">
                          <span className="flex items-center gap-1">
                            <i className="ri-time-line text-slate-400" />
                            <span className="font-mono font-bold text-slate-700">{item.time}</span> 입고
                          </span>
                          <span className="font-medium text-slate-700">
                            {item.customerName} ({item.customerPhone.slice(-4)})
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* 보증서 발급 완료 차량 카드 */}
                  {selectedDateWarranties.map((war) => (
                    <div
                      key={war.id}
                      className="p-3 rounded-xl border border-red-200 bg-red-50/40 text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="px-2 py-0.5 bg-red-600 text-white font-mono font-black text-[11px] rounded-md">
                          {war.carPlate}
                        </span>
                        <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                          정품 보증서 발급
                        </span>
                      </div>
                      <div className="font-bold text-slate-800 text-xs">{war.carModel}</div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        {war.customerName} 고객님 ({war.warrantyNo})
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ── 목록 뷰 (List View) ── */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-[11px] sm:text-xs uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-4 whitespace-nowrap">상태</th>
                  <th className="py-3.5 px-4 whitespace-nowrap font-bold text-slate-800">차량번호</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">차종 / 색상</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">입고 날짜/시간</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">출고 예정</th>
                  <th className="py-3.5 px-4 min-w-[180px]">시공 항목</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">고객명 / 연락처</th>
                  <th className="py-3.5 px-4 text-center whitespace-nowrap w-24">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSchedules.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      <i className="ri-file-search-line text-3xl block mb-2 text-slate-300" />
                      조건에 일치하는 시공 예약 일정이 없습니다.
                    </td>
                  </tr>
                ) : (
                  filteredSchedules.map((item) => {
                    const statusMeta = STATUS_CONFIG[item.status] || STATUS_CONFIG.reserved;
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                        onClick={() => setViewItem(item)}
                      >
                        {/* 상태 */}
                        <td className="py-3 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={item.status}
                            onChange={(e) =>
                              handleQuickStatusChange(item.id, e.target.value as ScheduleItem['status'])
                            }
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${statusMeta.badgeClass} focus:outline-none cursor-pointer`}
                          >
                            <option value="reserved">입고 예약</option>
                            <option value="in_progress">시공 진행중</option>
                            <option value="completed">출고/완료</option>
                            <option value="cancelled">예약 취소</option>
                          </select>
                        </td>

                        {/* 차량번호 (가장 돋보이게) */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 bg-slate-900 text-white font-mono font-black text-xs sm:text-sm rounded-lg shadow-sm">
                            {item.carPlate}
                          </span>
                        </td>

                        {/* 차종 / 색상 */}
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900 line-clamp-1">{item.carModel}</div>
                          {item.carColor && (
                            <div className="text-[11px] text-slate-500">{item.carColor}</div>
                          )}
                        </td>

                        {/* 입고 날짜/시간 */}
                        <td className="py-3 px-4 whitespace-nowrap font-mono text-xs">
                          <div className="font-semibold text-slate-800">{item.date}</div>
                          <div className="text-slate-500">{item.time} 입고</div>
                        </td>

                        {/* 출고 예정 */}
                        <td className="py-3 px-4 whitespace-nowrap font-mono text-xs text-slate-600">
                          {item.deliveryDate ? (
                            <div>
                              <span>{item.deliveryDate}</span>
                              <span className="block text-[11px] text-slate-400">{item.deliveryTime || '18:00'}</span>
                            </div>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )}
                        </td>

                        {/* 시공 항목 */}
                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-800 text-xs">{item.serviceType}</span>
                          {item.notes && (
                            <div className="text-[11px] text-amber-700 truncate max-w-xs mt-0.5">
                              메모: {item.notes}
                            </div>
                          )}
                        </td>

                        {/* 고객명 / 연락처 */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="font-bold text-slate-800">{item.customerName}</div>
                          <a
                            href={`tel:${item.customerPhone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="font-mono text-xs text-blue-600 hover:underline"
                          >
                            {item.customerPhone}
                          </a>
                        </td>

                        {/* 액션 버튼 */}
                        <td className="py-3 px-4 text-center whitespace-nowrap w-24" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleOpenEditModal(item)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                              title="수정"
                            >
                              <i className="ri-edit-line text-sm" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id, item.carPlate)}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                              title="삭제"
                            >
                              <i className="ri-delete-bin-line text-sm" />
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
      )}

      {/* ── 4. 일정 상세 보기 모달 ── */}
      <AnimatePresence>
        {viewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden"
            >
              {/* 모달 상단 */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 bg-slate-900 text-white font-mono font-black text-sm sm:text-base rounded-xl shadow">
                    {viewItem.carPlate}
                  </span>
                  <div>
                    <h4 className="font-black text-slate-900 text-base">{viewItem.carModel}</h4>
                    <span className="text-[11px] text-slate-400">시공 일정 상세</span>
                  </div>
                </div>
                <button
                  onClick={() => setViewItem(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer"
                >
                  <i className="ri-close-line text-xl" />
                </button>
              </div>

              {/* 일정 세부 정보 */}
              <div className="space-y-4 my-5 text-xs sm:text-sm">
                {/* 상태 변경 */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                  <span className="font-bold text-slate-600">진행 상태</span>
                  <select
                    value={viewItem.status}
                    onChange={(e) =>
                      handleQuickStatusChange(viewItem.id, e.target.value as ScheduleItem['status'])
                    }
                    className={`font-bold px-3 py-1 rounded-xl border ${
                      STATUS_CONFIG[viewItem.status]?.badgeClass || ''
                    } focus:outline-none cursor-pointer text-xs`}
                  >
                    <option value="reserved">입고 예약</option>
                    <option value="in_progress">시공 진행중</option>
                    <option value="completed">출고/완료</option>
                    <option value="cancelled">예약 취소</option>
                  </select>
                </div>

                {/* 그리드 정보 */}
                <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5">고객명</span>
                    <span className="font-bold text-slate-900 text-sm">{viewItem.customerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">연락처</span>
                    <a href={`tel:${viewItem.customerPhone}`} className="font-bold text-blue-600 hover:underline">
                      {viewItem.customerPhone}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">입고 일시</span>
                    <span className="font-bold text-slate-800">
                      {viewItem.date} {viewItem.time}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">출고 예정</span>
                    <span className="font-bold text-slate-800">
                      {viewItem.deliveryDate || viewItem.date} {viewItem.deliveryTime || '18:00'}
                    </span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-200/70">
                    <span className="text-slate-400 block mb-0.5">시공 항목</span>
                    <span className="font-bold text-blue-900 text-sm">{viewItem.serviceType}</span>
                  </div>
                  {viewItem.carColor && (
                    <div className="col-span-2">
                      <span className="text-slate-400 block mb-0.5">차량 색상</span>
                      <span className="font-semibold text-slate-700">{viewItem.carColor}</span>
                    </div>
                  )}
                </div>

                {/* 작업 메모 */}
                {viewItem.notes && (
                  <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/70">
                    <span className="font-bold text-amber-900 block mb-1 flex items-center gap-1 text-xs">
                      <i className="ri-file-text-line" /> 작업 메모 및 특이사항
                    </span>
                    <p className="text-xs text-amber-950 leading-relaxed whitespace-pre-wrap">{viewItem.notes}</p>
                  </div>
                )}
              </div>

              {/* 하단 액션 버튼 */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                {/* 보증서 발급 연계 버튼 */}
                {onIssueWarranty && (
                  <button
                    onClick={() => {
                      onIssueWarranty({
                        carPlate: viewItem.carPlate,
                        carModel: viewItem.carModel,
                        customerName: viewItem.customerName,
                        customerPhone: viewItem.customerPhone,
                        notes: `시공 일정 연계 (${viewItem.serviceType})`
                      });
                      setViewItem(null);
                    }}
                    className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                  >
                    <i className="ri-shield-check-fill text-yellow-300 text-base" />
                    <span>이 차량 정보로 정품 보증서 발급하기</span>
                  </button>
                )}

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${viewItem.customerPhone}`}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <i className="ri-phone-fill" /> 전화 걸기
                  </a>
                  <button
                    onClick={() => handleOpenEditModal(viewItem)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <i className="ri-edit-line" /> 수정
                  </button>
                  <button
                    onClick={() => handleDeleteItem(viewItem.id, viewItem.carPlate)}
                    className="px-3.5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <i className="ri-delete-bin-line" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 5. 일정 등록/수정 모달 ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-7 shadow-2xl my-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {editingItem ? '시공 일정 수정' : '새 시공 일정 등록'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    달력에서 빠르게 확인할 수 있도록 차량번호와 시공 정보를 입력해주세요.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer"
                >
                  <i className="ri-close-line text-xl" />
                </button>
              </div>

              <form onSubmit={handleSaveSubmit} className="space-y-4 text-xs sm:text-sm">
                {/* 1. 차량 식별 정보 (가장 중요) */}
                <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
                    <i className="ri-car-fill text-blue-600 text-sm" />
                    <span>차량 정보 (달력 표시 핵심)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        차량번호 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.carPlate}
                        onChange={(e) => setFormData({ ...formData, carPlate: e.target.value })}
                        placeholder="예: 12가 3456 또는 340고 8821"
                        className="w-full px-3.5 py-2.5 bg-white border border-blue-300 rounded-xl font-mono font-black text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        차종 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.carModel}
                        onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                        placeholder="예: 포르쉐 911, 제네시스 G80"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-600 mb-1">차량 색상 (선택)</label>
                      <input
                        type="text"
                        value={formData.carColor}
                        onChange={(e) => setFormData({ ...formData, carColor: e.target.value })}
                        placeholder="예: 우유니 화이트, 크레용, 매트 블랙"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. 고객 정보 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      고객명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="고객 이름"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      연락처 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      placeholder="010-0000-0000"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* 3. 시공 항목 & 진행 상태 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">시공 항목</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">진행 상태</label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value as ScheduleItem['status'] })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="reserved">입고 예약</option>
                      <option value="in_progress">시공 진행중</option>
                      <option value="completed">출고/완료</option>
                      <option value="cancelled">예약 취소</option>
                    </select>
                  </div>
                </div>

                {/* 4. 입고 및 출고 일시 */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="col-span-1">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">입고 날짜</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">입고 시간</label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">출고 예정일</label>
                    <input
                      type="date"
                      value={formData.deliveryDate}
                      onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">출고 시간</label>
                    <input
                      type="time"
                      value={formData.deliveryTime}
                      onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                </div>

                {/* 5. 작업 메모 */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    작업 특이사항 / 메모 (선택)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="예: 앞범퍼 스톤칩 부위 터치업 후 시공, 루프 마스킹 주의, 보증서 발급 요청 등"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                {/* 하단 저장/취소 버튼 */}
                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <i className="ri-check-line text-base font-bold" />
                    <span>{editingItem ? '일정 수정 완료' : '시공 일정 저장'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
