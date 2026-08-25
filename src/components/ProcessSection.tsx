import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarCheck, 
  Scan, 
  Bot, 
  Flame, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';

interface ProcessStep {
  step: string;
  title: string;
  engTitle: string;
  desc: string;
  icon: any;
  duration: string;
  keyPoints: string[];
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: '예약 및 사전 상담',
    engTitle: 'Consultation & Booking',
    desc: '온라인 및 유선 상담을 통해 고객님의 차종, 원하는 시공(정비, 판금도색, PPS/PPCS, 디테일링), 예산 및 일정에 최적화된 1:1 맞춤 컨설팅을 제공합니다.',
    icon: CalendarCheck,
    duration: '실시간 접수',
    keyPoints: ['차량 맞춤 견적 산출', '무료 픽업&딜리버리 예약', '1:1 전담 마스터 배정']
  },
  {
    step: '02',
    title: '차량 입고 & 3D 정밀 진단',
    engTitle: '3D Laser Scan & Check-in',
    desc: '입고 시 디지털 도막 측정기와 3D 레이저 스캐너로 차체 표면 상태, 도막 두께, 기존 손상 부위를 정밀 분석하여 최적의 AI 시공 경로를 프로그래밍합니다.',
    icon: Scan,
    duration: '입고 당일',
    keyPoints: ['도장면 도막 두께 전수 검사', '3D 차체 굴곡 데이터 추출', '마스킹 및 전처리 탈지 세척']
  },
  {
    step: '03',
    title: 'AI 로봇 초정밀 시공',
    engTitle: 'AI Robot Application',
    desc: '특허받은 6축 다관절 AI 로봇이 마이크론 단위의 균일한 두께로 스프레이를 정밀 분사합니다. 굴곡과 단차, 모서리까지 오차 없이 완벽하게 감쌉니다.',
    icon: Bot,
    duration: '1 ~ 2일 소요',
    keyPoints: ['6축 로봇 완벽 경로 제어', '오차 없는 마이크론 도막 형성', '칼선 없는 무손상 마감']
  },
  {
    step: '04',
    title: '원적외선 큐어링 & 디테일링',
    engTitle: 'Infrared Curing & Detailing',
    desc: '최신 원적외선 열처리 부스에서 도막을 완벽하게 경화시키고, 숙련된 디테일러가 표면 슬릭감과 광택도를 극대화하는 파이널 폴리싱을 진행합니다.',
    icon: Flame,
    duration: '큐어링 완료 즉시',
    keyPoints: ['원적외선 균일 열처리', '표면 방오·발수 코팅 완성', '실내외 정밀 살균 세척']
  },
  {
    step: '05',
    title: '최종 품질 검수 & 안심 인도',
    engTitle: 'Final QC & Warranty Delivery',
    desc: '검수 마스터의 40여 가지 엄격한 체크리스트 검수를 거친 후, 공식 시공 보증서 발급과 함께 고객님께 안전하게 차량을 인도해 드립니다.',
    icon: Award,
    duration: '출고 당일',
    keyPoints: ['40개 항목 정밀 QC 통과', '코션 정품 전자 보증서 발급', '철저한 사후 관리 서비스']
  }
];

export function ProcessSection() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(2); // Default AI Robot Step

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto relative border-t border-white/10">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
          <Clock className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase">
            5-STEP SMART WORKFLOW
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-mono uppercase tracking-tight text-white leading-tight">
          빈틈없는 완벽함, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-white">
            코션 5단계 스마트 시공 공정
          </span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed font-sans">
          예약부터 3D 스캔, AI 로봇 정밀 시공, 열처리 큐어링, 최종 품질 보증서 발급까지 한 치의 오차도 없는 원스톱 정밀 프로세스를 약속합니다.
        </p>
      </div>

      {/* 5-Step Process Horizontal Stepper Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10 mb-12">
        {PROCESS_STEPS.map((proc, idx) => {
          const Icon = proc.icon;
          const isSelected = activeStepIndex === idx;

          return (
            <motion.div
              key={proc.step}
              onClick={() => setActiveStepIndex(idx)}
              whileHover={{ y: -4 }}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-[#1c1414] to-[#0f0c0c] border-red-500/60 shadow-xl shadow-red-600/20'
                  : 'bg-[#0e0e0e]/80 border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xl font-black font-mono tracking-tighter ${
                      isSelected ? 'text-red-500' : 'text-gray-600'
                    }`}
                  >
                    {proc.step}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                      isSelected
                        ? 'bg-red-600/20 border-red-500 text-red-400'
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-bold font-mono text-white mb-1">
                  {proc.title}
                </h3>
                <p className="text-[11px] font-mono text-amber-400 mb-2">
                  {proc.duration}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5">
                <span
                  className={`text-[11px] font-mono font-bold flex items-center gap-1 ${
                    isSelected ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  공정 상세 확인 <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Step Detail Panel */}
      {PROCESS_STEPS[activeStepIndex] && (
        <motion.div
          key={activeStepIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl border border-white/15 bg-gradient-to-r from-[#141414] via-[#0f0f0f] to-[#121212] p-6 sm:p-10 shadow-2xl relative z-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-white font-mono font-black text-2xl shadow-lg shadow-red-600/30">
                {PROCESS_STEPS[activeStepIndex].step}
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                  STEP {PROCESS_STEPS[activeStepIndex].step} · {PROCESS_STEPS[activeStepIndex].engTitle}
                </span>
                <h4 className="text-2xl sm:text-3xl font-black font-mono text-white mt-0.5">
                  {PROCESS_STEPS[activeStepIndex].title}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
              <Clock className="w-4 h-4 text-red-500" />
              <span>예상 소요 시간: </span>
              <strong className="text-white">{PROCESS_STEPS[activeStepIndex].duration}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            <div className="lg:col-span-7">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans mb-4">
                {PROCESS_STEPS[activeStepIndex].desc}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2.5">
                <div className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  핵심 작업 포인트
                </div>
                {PROCESS_STEPS[activeStepIndex].keyPoints.map((pt, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
