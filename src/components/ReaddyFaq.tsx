import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, CheckCircle2, Search, PhoneCall, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: 'AI 로봇 PPS' | '사고수리/도색' | '보험처리/보증' | '예약/픽업';
  popular?: boolean;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 1,
    category: 'AI 로봇 PPS',
    popular: true,
    question: 'AI 로봇 PPS 시공 후 나중에 제거할 때 원래 차량 도장에 손상이 전혀 없나요?',
    answer: '네, 100% 안전합니다. 코션의 AI 로봇 PPS(Paint Protection Spray)는 화학적 본드가 아닌 특수 액상 탄성 수지가 경화되어 보호막을 형성하므로, 제거 시 끈적이는 본드 잔여물이 일절 남지 않고 신차 출고 당시의 원 도장면 그대로 깔끔하게 박리됩니다.'
  },
  {
    id: 2,
    category: 'AI 로봇 PPS',
    popular: true,
    question: '기존 일반 필름 랩핑이나 PPF와의 가장 결정적인 차이점은 무엇인가요?',
    answer: '기존 필름은 수작업 칼질로 인한 차체 스크래치 위험과 모서리 들뜸, 시간이 지남에 따른 황변 현상이 발생합니다. 반면 AI 로봇 PPS는 스프레이 분사 방식으로 칼을 일절 쓰지 않으며, AI가 마이크론 단위의 균일한 두께로 도포하여 복잡한 에어덕트와 굴곡까지 완벽하게 밀착 마감됩니다.'
  },
  {
    id: 3,
    category: '사고수리/도색',
    popular: true,
    question: '사고 수리 및 판금도색 시 자차 및 대물 보험 처리가 가능한가요?',
    answer: '네, 국내 전 손해보험사 사고수리 지정 협력 정비공장으로서 자차 및 대물 보험처리가 100% 가능합니다. 99.9% 디지털 분광 조색기와 최신 수용성 열처리 부스를 통해 사고 전 신차 상태로 완벽 복원해 드립니다.'
  },
  {
    id: 4,
    category: '예약/픽업',
    popular: true,
    question: '시공 소요 시간은 얼마나 걸리며 픽업 & 딜리버리 서비스가 지원되나요?',
    answer: 'AI 로봇 자동화 공정 덕분에 일반 수작업 대비 작업 시간이 약 50% 단축됩니다. 부위별로 상이하나 통상 1~2일 내에 완료되며, 수도권 전 지역 무료 1:1 도어투도어 픽업 & 드랍 딜리버리 및 수리 기간 중 동급 수입차 대차 서비스를 지원해 드립니다.'
  },
  {
    id: 5,
    category: '보험처리/보증',
    popular: false,
    question: '품질 보증 기간과 사후 관리는 어떻게 진행되나요?',
    answer: '코션스마트센터에서 시공된 모든 차량에는 공식 정품 전자 보증서가 발급되며, 최대 5년간 무상 보증을 지원합니다. 또한 시공 후 정기 점검 및 디테일링 케어 혜택을 함께 제공해 드립니다.'
  },
  {
    id: 6,
    category: 'AI 로봇 PPS',
    popular: false,
    question: '컬러 PPS로 차량 색상을 완전히 바꿀 수도 있나요?',
    answer: '네, 가능합니다. 순정 컬러를 보호하는 투명(Gloss/Matte) PPS뿐만 아니라, 포르쉐, 페라리, BMW M 등 최고급 수입차 순정 컬러와 커스텀 사틴/메탈릭 컬러의 [컬러 PPS] 시공이 가능하며, 원상복구가 언제든 자유롭습니다.'
  },
  {
    id: 7,
    category: '사고수리/도색',
    popular: false,
    question: '알루미늄 바디 및 탄소섬유(카본) 파츠도 완벽 복원이 가능한가요?',
    answer: '코션스마트센터는 슈퍼카 및 프리미엄 수입차 전용 알루미늄 판금 장비와 인버터 스폿 용접기를 보유하고 있어, 아우디 ASF, 재규어/랜드로버 등 특수 알루미늄 바디 복원도 완벽하게 수행합니다.'
  },
  {
    id: 8,
    category: '보험처리/보증',
    popular: false,
    question: '과실 비율이 확정되지 않은 사고의 경우 어떻게 진행해야 하나요?',
    answer: '사고 즉시 코션스마트센터로 연락 주시면 사고 전문 어드바이저가 초기 과실 산정 조언부터 보험사 접수, 무료 대차 배차까지 원스톱으로 처리해 드려 불필요한 분쟁과 손해를 최소화해 드립니다.'
  }
];

interface ReaddyFaqProps {
  onNavigateToContact?: () => void;
  onNavigateToNotice?: () => void;
}

export function ReaddyFaq({ onNavigateToContact, onNavigateToNotice: _onNavigateToNotice }: ReaddyFaqProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['전체', 'AI 로봇 PPS', '사고수리/도색', '보험처리/보증', '예약/픽업'];

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
            AI 로봇 PPS, 사고수리, 보험처리, 무상 픽업서비스 등 고객님께서 자주 궁금해하시는 질문을 정리했습니다.
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
                  setOpenIndex(0);
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
            <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl text-slate-400 text-sm shadow-sm">
              검색 조건에 맞는 질문이 없습니다.
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
