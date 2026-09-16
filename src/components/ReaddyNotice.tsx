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

// 공지사항 데이터 (추후 실제 공지 및 이벤트 소식으로 등록 예정)
const NOTICE_DATA: NoticeItem[] = [];


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
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Breadcrumb & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 mb-4 shadow-sm">
            <Bell className="w-4 h-4 text-red-600 animate-bounce" />
            <span className="text-xs font-bold text-red-600 tracking-widest uppercase">
              COMMUNITY & NOTICE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase mb-4">
            코션스마트센터 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">공지사항</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
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
              className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-10 mb-12 shadow-xl relative overflow-hidden ring-1 ring-slate-100"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

              <button
                onClick={() => setActiveNotice(null)}
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors cursor-pointer group font-medium"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>목록으로 돌아가기</span>
              </button>

              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded-full text-xs font-bold">
                  {activeNotice.category}
                </span>
                {activeNotice.tag && (
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-full text-xs font-medium">
                    {activeNotice.tag}
                  </span>
                )}
                <span className="text-xs text-slate-400 ml-auto flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {activeNotice.date}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  조회 {activeNotice.views}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 mb-6 leading-snug">
                {activeNotice.title}
              </h2>

              {activeNotice.highlights && activeNotice.highlights.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8 space-y-2.5">
                  <div className="text-xs font-bold text-amber-700 uppercase flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>핵심 안내 포인트</span>
                  </div>
                  {activeNotice.highlights.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line border-t border-slate-100 pt-6">
                {activeNotice.content.trim()}
              </div>

              <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-red-600" />
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
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 shadow-sm'
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
              className="w-full bg-white border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 rounded-full px-4 py-2.5 pl-10 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
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
                className={`group p-5 sm:p-6 rounded-2xl bg-white border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md ${
                  notice.isImportant
                    ? 'border-red-200 bg-gradient-to-r from-red-50/40 via-white to-white hover:border-red-300 ring-1 ring-red-100'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-black shrink-0 ${
                      notice.isImportant
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {notice.category}
                  </span>

                  <div>
                    <div className="flex items-center gap-2 mb-1 sm:mb-0">
                      {notice.isImportant && (
                        <span className="text-[10px] sm:text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1">
                          <Tag className="w-3 h-3 text-red-500" /> 중요
                        </span>
                      )}
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                        {notice.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 text-xs text-slate-500 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {notice.date}
                    </span>
                    <span className="hidden sm:flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      {notice.views}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                <Bell className="w-6 h-6" />
              </div>
              <p className="text-slate-700 font-semibold mb-1">
                {searchQuery || selectedCategory !== '전체'
                  ? '조건에 일치하는 공지사항이 없습니다.'
                  : '등록된 공지사항이 없습니다.'}
              </p>
              <p className="text-xs text-slate-400">
                {searchQuery || selectedCategory !== '전체'
                  ? '다른 검색어나 카테고리를 선택해 보세요.'
                  : '새로운 소식 및 프로모션이 준비되는 대로 안내해 드리겠습니다.'}
              </p>
            </div>
          )}
        </div>

        {/* Quick Link to FAQ or Consultation */}
        <div className="mt-16 bg-gradient-to-br from-slate-900 via-slate-900 to-red-950 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white mb-1">
              더 궁금한 내용이나 빠른 상담이 필요하신가요?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              자주 묻는 질문(FAQ)을 확인하시거나 1:1 온라인 견적 상담을 신청해 보세요.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onNavigateToFaq && (
              <button
                onClick={onNavigateToFaq}
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-white/10 hover:bg-white text-white hover:text-slate-900 text-xs sm:text-sm font-bold rounded-full border border-white/20 transition-all cursor-pointer whitespace-nowrap"
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
