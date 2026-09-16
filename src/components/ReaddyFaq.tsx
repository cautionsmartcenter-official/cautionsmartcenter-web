import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, CheckCircle2, Search, PhoneCall, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: 'PPS' | 'CurveRobot' | '사고수리/도색' | '보험처리/보증' | '예약/픽업';
  popular?: boolean;
}

// FAQ 데이터 (추후 실제 자주 묻는 질문 내용으로 등록 예정)
const FAQ_DATA: FaqItem[] = [];


interface ReaddyFaqProps {
  onNavigateToContact?: () => void;
  onNavigateToNotice?: () => void;
}

export function ReaddyFaq({ onNavigateToContact, onNavigateToNotice: _onNavigateToNotice }: ReaddyFaqProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = ['전체', 'PPS', 'CurveRobot', '사고수리/도색', '보험처리/보증', '예약/픽업'];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = selectedCategory === '전체' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 mb-4 shadow-sm">
            <HelpCircle className="w-4 h-4 text-red-600" />
            <span className="text-xs font-bold text-red-600 tracking-widest uppercase">
              COMMUNITY & FAQ
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase mb-4">
            자주 묻는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">질문 (FAQ)</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            PPS 시공, CurveRobot 도장, 사고수리, 보험처리, 무상 픽업서비스 등 고객님께서 자주 궁금해하시는 질문을 정리했습니다.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenIndex(null);
                }}
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
              placeholder="궁금한 질문 검색..."
              className="w-full bg-white border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 rounded-full px-4 py-2.5 pl-10 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'border-red-300 bg-white shadow-lg ring-1 ring-red-100'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                      <span
                        className={`text-xs font-black px-2.5 py-1 rounded-md shrink-0 ${
                          isOpen
                            ? 'bg-red-600 text-white'
                            : 'bg-red-50 text-red-600 border border-red-100'
                        }`}
                      >
                        Q
                      </span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-semibold text-slate-500">
                            {faq.category}
                          </span>
                          {faq.popular && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5 text-amber-500" /> 자주 묻는 질문
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 font-sans leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-red-600' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 border-t border-slate-100 bg-slate-50/70">
                          <div className="flex items-start gap-3 pt-5 text-slate-700 text-sm sm:text-base leading-relaxed">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="whitespace-pre-line">{faq.answer}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                <HelpCircle className="w-6 h-6" />
              </div>
              <p className="text-slate-700 font-semibold mb-1">
                {searchQuery || selectedCategory !== '전체'
                  ? '조건에 일치하는 질문이 없습니다.'
                  : '등록된 자주 묻는 질문이 없습니다.'}
              </p>
              <p className="text-xs text-slate-400">
                {searchQuery || selectedCategory !== '전체'
                  ? '다른 검색어나 카테고리를 선택해 보세요.'
                  : '자주 묻는 질문(FAQ) 내용이 곧 업데이트될 예정입니다.'}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Support Consultation Banner */}
        <div className="mt-16 bg-gradient-to-br from-slate-900 via-slate-900 to-red-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/30 text-red-300 rounded-full text-xs font-bold mb-3 border border-red-500/40">
                <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                <span>1:1 맞춤형 무료 견적 지원</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                찾으시는 질문이 없으신가요?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                전담 시공 마스터와 사고처리 전문가가 고객님의 차량 상태와 예산에 맞춰 실시간으로 친절하게 답변해 드립니다.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <a
                href="tel:031-712-6665"
                className="flex-1 sm:flex-initial px-5 py-3 bg-white/10 hover:bg-white text-white hover:text-slate-900 border border-white/20 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-red-400" />
                <span>031-712-6665</span>
              </a>

              <a
                href="http://pf.kakao.com/_FxINhX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-md shadow-amber-400/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>카카오톡 상담</span>
              </a>

              {onNavigateToContact && (
                <button
                  onClick={onNavigateToContact}
                  className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-md shadow-red-600/30 whitespace-nowrap"
                >
                  온라인 상담 신청
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
