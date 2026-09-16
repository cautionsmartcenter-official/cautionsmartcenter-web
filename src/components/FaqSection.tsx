import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

// FAQ 데이터 (추후 실제 질문 등록 예정)
const FAQ_DATA: FaqItem[] = [];


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
        {FAQ_DATA.length > 0 ? (
          FAQ_DATA.map((faq, idx) => {
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
          })
        ) : (
          <div className="text-center py-16 rounded-2xl border border-white/10 bg-[#0e0e0e] text-gray-400 text-sm">
            등록된 자주 묻는 질문이 없습니다.
          </div>
        )}
      </div>
    </section>
  );
}
