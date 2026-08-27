import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Calendar, Eye, ChevronRight, ArrowLeft, Tag, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export interface NoticeItem {
  id: number;
  category: '공지' | '이벤트' | '기술소식' | '안내';
  title: string;
  date: string;
  views: number;
  isImportant?: boolean;
  content: string;
  highlights?: string[];
  tag?: string;
}

const NOTICE_DATA: NoticeItem[] = [
  {
    id: 1,
    category: '기술소식',
    isImportant: true,
    title: '최첨단 4세대 AI 로봇 자동화 PPS 스프레이 시스템 2호기 증설 도입',
    date: '2026.02.15',
    views: 1420,
    tag: '신규 설비',
    highlights: [
      '마이크론(μm) 단위 초정밀 AI 비전 센서 기반 균일 도포',
      '도장면 손상 0% - 칼을 쓰지 않는 무스크래치 스프레이 공법',
      '작업 시간 50% 단축으로 당일/익일 빠른 출고 가능'
    ],
    content: `
      코션스마트센터가 더욱 완벽한 프리미엄 시공 퀄리티와 빠른 출고 일정을 위해 '4세대 AI 로봇 자동화 PPS(Peelable Paint Protection Spray) 2호기'를 추가 증설 도입하였습니다.

      기존 1호기 대비 3D 레이저 스캐닝 해상도가 200% 향상되어 슈퍼카, 하이퍼카의 복잡한 굴곡과 에어덕트 부위까지 오차 없는 완벽한 두께로 시공됩니다.

      앞으로도 코션스마트센터는 대한민국 최고의 수입차 외장관리 및 사고수리 테크놀로지를 선도하겠습니다.
    `
  },
  {
    id: 2,
    category: '이벤트',
    isImportant: true,
    title: '2026 프리미엄 수입차 봄맞이 무상 정밀점검 & AI PPS 특별 프로모션',
    date: '2026.02.01',
    views: 980,
    tag: '프로모션',
    highlights: [
      '수입차 전 차종 120개 항목 컴퓨터 정밀 진단 무상 지원',
      'AI 로봇 PPS 프론트 패키지 시공 시 프리미엄 유리막 코팅 무료 업그레이드',
      '보험 수리 고객 대상 자차 자기부담금 최대 50% 지원 혜택'
    ],
    content: `
      다가오는 봄 드라이빙 시즌을 맞이하여 코션스마트센터를 찾아주시는 고객님들을 위한 스페셜 프로모션을 진행합니다.

      겨울철 염화칼슘으로 손상된 하부 및 도장면 정밀 케어와 함께 신차급 광택을 유지할 수 있는 AI 로봇 PPS 시공 혜택을 놓치지 마세요.

      ■ 행사 기간: 2026년 2월 1일 ~ 2026년 3월 31일까지
      ■ 대상: 수입차 및 국산 프리미엄 전 차종 (사전 예약 필수)
    `
  },
  {
    id: 3,
    category: '안내',
    isImportant: false,
    title: '수도권 전 지역 1:1 프리미엄 도어투도어 무료 픽업 & 딜리버리 서비스 안내',
    date: '2026.01.20',
    views: 754,
    tag: '고객 편의',
    highlights: [
      '분당, 판교, 강남, 서초, 용인, 수원 등 수도권 전 지역 지원',
      '전문 탁송 기사님을 통한 100% 안전 책임 운송',
      '수리 및 시공 기간 중 동급 수입차 무상 대차 서비스 연계'
    ],
    content: `
      바쁜 직장인 및 전문직 고객님들의 소중한 시간을 지켜드리기 위해, 코션스마트센터의 '1:1 맞춤형 픽업 & 딜리버리 서비스'가 더욱 강화되었습니다.

      자택이나 직장에서 계신 곳으로 전담 인력이 방문하여 차량을 안전하게 입고 및 시공 후 다시 원하시는 장소로 인도해 드립니다.

      온라인 견적 문의 또는 유선 상담 시 '픽업 요청'을 말씀해 주시면 편리하게 이용하실 수 있습니다.
    `
  },
  {
    id: 4,
    category: '공지',
    isImportant: false,
    title: '전 보험사 공식 협력 지정점 100% 자차/대물 원스톱 보험처리 가이드',
    date: '2026.01.10',
    views: 1120,
    tag: '보험 수리',
    highlights: [
      '국내 전 손해보험사 공식 협력업체 등록',
      '사고 접수부터 렌트카 대차, 미수선 처리 및 보증서 발급 원스톱 진행',
      '99.9% 분광 조색기와 공식 수용성 페인트를 사용한 완벽 복원'
    ],
    content: `
      사고 발생 시 당황하지 마시고 코션스마트센터로 연락 주시면, 사고 처리 전문가가 초기 과실 비율 상담부터 보험사 접수 대행, 최고 수준의 수리까지 일괄 전담해 드립니다.

      자차 보험 수리 시 자기부담금 지원 및 렌트카 지원 혜택을 제공하오니 언제든 24시간 사고 긴급 상담 창구를 이용해 주시기 바랍니다.
    `
  },
  {
    id: 5,
    category: '공지',
    isImportant: false,
    title: '코션스마트센터 고객 상담 센터 운영 시간 및 오시는 길 안내',
    date: '2026.01.02',
    views: 630,
    tag: '운영 안내',
    highlights: [
      '평일 08:30 ~ 19:00 / 토요일 09:00 ~ 16:00 (일요일/공휴일 예약제)',
      '경기도 광주시 태재로 26 (분당 서현역 10분 거리)',
      '24시간 카카오톡 실시간 상담 채널 연중무휴 가동'
    ],
    content: `
      코션스마트센터 본점 센터 운영 시간 안내입니다.

      ■ 평일: 08:30 ~ 19:00 (당일 입고 및 출고 가능)
      ■ 토요일: 09:00 ~ 16:00
      ■ 일요일 및 공휴일: 사전 예약 차량 우선 시공 및 긴급 사고차량 입고 대기

      고객센터 유선 전화(031-712-6665) 또는 카카오톡 플러스친구를 통해 24시간 실시간 상담이 가능합니다.
    `
  }
];

interface ReaddyNoticeProps {
  onNavigateToContact?: () => void;
  onNavigateToFaq?: () => void;
}

export function ReaddyNotice({ onNavigateToContact, onNavigateToFaq }: ReaddyNoticeProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNotice, setActiveNotice] = useState<NoticeItem | null>(null);

  const categories = ['전체', '공지', '이벤트', '기술소식', '안내'];

  const filteredNotices = NOTICE_DATA.filter((item) => {
    const matchesCategory = selectedCategory === '전체' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#070707] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Breadcrumb & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 mb-4 shadow-[0_0_15px_rgba(225,29,72,0.15)]">
            <Bell className="w-4 h-4 text-red-500 animate-bounce" />
            <span className="text-xs font-bold text-red-500 tracking-widest uppercase">
              COMMUNITY & NOTICE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase mb-4">
            코션 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">공지사항</span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            코션스마트센터의 새로운 기술 소식, 프로모션 혜택, 서비스 안내를 가장 빠르게 전해드립니다.
          </p>
        </div>

        {/* Detail Modal / Article View */}
        <AnimatePresence>
          {activeNotice && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-[#111] border border-white/15 rounded-2xl sm:rounded-3xl p-6 sm:p-10 mb-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

              <button
                onClick={() => setActiveNotice(null)}
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>목록으로 돌아가기</span>
              </button>

              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="px-3 py-1 bg-red-600/20 text-red-400 border border-red-500/30 rounded-full text-xs font-bold">
                  {activeNotice.category}
                </span>
                {activeNotice.tag && (
                  <span className="px-2.5 py-1 bg-white/10 text-gray-300 rounded-full text-xs font-medium">
                    {activeNotice.tag}
                  </span>
                )}
                <span className="text-xs text-gray-500 ml-auto flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {activeNotice.date}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  조회 {activeNotice.views}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-6 leading-snug">
                {activeNotice.title}
              </h2>

              {activeNotice.highlights && activeNotice.highlights.length > 0 && (
                <div className="bg-black/60 border border-white/10 rounded-xl p-5 mb-8 space-y-2.5">
                  <div className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>핵심 안내 포인트</span>
                  </div>
                  {activeNotice.highlights.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line border-t border-white/10 pt-6">
                {activeNotice.content.trim()}
              </div>

              <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  <span>코션스마트센터 공식 공지 | 문의 031-712-6665</span>
                </div>
                {onNavigateToContact && (
                  <button
                    onClick={onNavigateToContact}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer shadow-lg shadow-red-600/30"
                  >
                    관련 문의 / 상담 신청
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="공지사항 검색..."
              className="w-full bg-neutral-900 border border-white/10 focus:border-red-500 rounded-full px-4 py-2.5 pl-10 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Notice List Table / Cards */}
        <div className="space-y-3">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <motion.div
                key={notice.id}
                whileHover={{ scale: 1.005 }}
                onClick={() => {
                  setActiveNotice(notice);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className={`group p-5 sm:p-6 rounded-2xl bg-neutral-900/80 hover:bg-neutral-850 border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  notice.isImportant
                    ? 'border-red-600/30 bg-gradient-to-r from-red-950/20 to-neutral-900 shadow-md shadow-red-950/20'
                    : 'border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-black shrink-0 ${
                      notice.isImportant
                        ? 'bg-red-600 text-white'
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {notice.category}
                  </span>

                  <div>
                    <div className="flex items-center gap-2 mb-1 sm:mb-0">
                      {notice.isImportant && (
                        <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                          <Tag className="w-3 h-3" /> 중요
                        </span>
                      )}
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-red-400 transition-colors">
                        {notice.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 text-xs text-gray-400 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {notice.date}
                    </span>
                    <span className="hidden sm:flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {notice.views}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-16 bg-neutral-900/50 border border-white/5 rounded-2xl text-gray-500 text-sm">
              일치하는 공지사항이 없습니다.
            </div>
          )}
        </div>

        {/* Quick Link to FAQ or Consultation */}
        <div className="mt-16 bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-850 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white mb-1">
              더 궁금한 내용이나 빠른 상담이 필요하신가요?
            </h4>
            <p className="text-xs sm:text-sm text-gray-400">
              자주 묻는 질문(FAQ)을 확인하시거나 1:1 온라인 견적 상담을 신청해 보세요.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onNavigateToFaq && (
              <button
                onClick={onNavigateToFaq}
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs sm:text-sm font-bold rounded-full border border-white/10 transition-all cursor-pointer whitespace-nowrap"
              >
                자주 묻는 질문 보기
              </button>
            )}
            {onNavigateToContact && (
              <button
                onClick={onNavigateToContact}
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer shadow-lg shadow-red-600/30 whitespace-nowrap"
              >
                무료 견적 신청
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
