import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    question: 'AI 로봇 PPS 시공 후 나중에 뗄 때 원래 차량 도장에 손상이 전혀 없나요?',
    answer: '네, 100% 안전합니다. 코션의 AI 로봇 PPS(Peelable Paint Protection System)는 화학적 본드가 아닌 특수 액상 탄성 수지가 경화되어 보호막을 형성하므로, 제거 시 끈적이는 본드 잔여물이 남지 않고 신차 출고 당시의 원 도장면 그대로 깔끔하게 박리됩니다.',
    category: 'AI PPS'
  },
  {
    question: '기존 일반 필름 랩핑이나 PPF와의 가장 결정적인 차이점은 무엇인가요?',
    answer: '기존 필름은 수작업 칼질로 인한 차체 스크래치 위험과 모서리 들뜸, 시간이 지남에 따른 황변 현상이 발생합니다. 반면 AI 로봇 PPS는 스프레이 방식으로 칼을 일절 쓰지 않으며, AI가 마이크론 단위의 균일한 두께로 도포하여 복잡한 에어덕트와 굴곡까지 완벽하게 밀착 마감됩니다.',
    category: '기술 비교'
  },
  {
    question: '시공 소요 시간은 얼마나 걸리며 픽업&딜리버리 서비스가 지원되나요?',
    answer: 'AI 로봇 자동화 공정 덕분에 일반 수작업 대비 작업 시간이 약 50% 단축됩니다. 부위별로 상이하나 통상 1~2일 내에 완료되며, 수도권 전 지역 무료 픽업 & 드랍 딜리버리 및 수리 기간 중 대차 서비스를 지원해 드립니다.',
    category: '서비스/일정'
  },
  {
    question: '사고 수리 및 판금도색 시 자차 및 대물 보험 처리가 가능한가요?',
    answer: '네, 전 보험사 사고수리 지정 협력 정비공장으로서 자차 및 대물 보험처리가 100% 가능합니다. 99.9% 디지털 분광 조색기와 최신 수용성 열처리 부스를 통해 사고 전 신차 상태로 완벽 복원해 드립니다.',
    category: '사고/보험'
  },
  {
    question: '품질 보증 기간과 사후 관리는 어떻게 진행되나요?',
    answer: '코션스마트센터에서 시공된 모든 차량에는 공식 정품 전자 보증서가 발급되며, 최대 5년간 무상 보증을 지원합니다. 또한 정기 점검 및 디테일링 케어 혜택을 함께 제공해 드립니다.',
    category: '품질 보증'
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-5xl mx-auto relative border-t border-white/10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
          <HelpCircle className="w-4 h-4 text-red-500" />
          <span className="text-xs font-mono font-bold text-red-500 tracking-wider uppercase">
            FREQUENTLY ASKED QUESTIONS
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black font-mono uppercase tracking-tight text-white leading-tight">
          자주 묻는 질문 (FAQ)
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-3">
          궁금하신 사항에 대해 명쾌하게 답변해 드립니다.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {FAQ_DATA.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-[#0e0e0e] overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-red-500 bg-red-500/10 px-2.5 py-1 rounded-md border border-red-500/20 shrink-0">
                    Q
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white font-sans">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-amber-400' : ''
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
                    <div className="p-6 pt-0 border-t border-white/5 text-gray-300 text-sm leading-relaxed font-sans bg-black/30">
                      <div className="flex items-start gap-2.5 pt-4">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{faq.answer}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
