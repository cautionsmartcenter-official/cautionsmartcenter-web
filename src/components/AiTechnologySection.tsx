import { motion } from 'framer-motion';
import { 
  Bot, 
  Cpu, 
  Layers, 
  Gauge, 
  Check, 
  X, 
  Sparkles, 
  RotateCcw,
  Sliders,
  ShieldCheck
} from 'lucide-react';

interface ComparisonFeature {
  title: string;
  traditionalFilm: string;
  sprayPps: string;
  aiRobotPpcs: string;
  winner: 'ai';
}

const COMPARISON_DATA: ComparisonFeature[] = [
  {
    title: '시공 방식 (Application)',
    traditionalFilm: '수작업 필름 부착 (칼 재단 필요)',
    sprayPps: '수동 스프레이 도포 (작업자 편차 발생)',
    aiRobotPpcs: '초정밀 6축 AI 다관절 로봇 자동 분사',
    winner: 'ai'
  },
  {
    title: '차체 손상 위험 (Knife Cut)',
    traditionalFilm: '칼 커팅으로 인한 도장면 손상 위험 높음',
    sprayPps: '칼 사용 없음 (도장 안전)',
    aiRobotPpcs: '칼 100% 미사용 / 센서 안전거리 유지',
    winner: 'ai'
  },
  {
    title: '도막 균일도 (Thickness)',
    traditionalFilm: '곡면 부위 필름 늘어남으로 두께 불균일',
    sprayPps: '사람 손에 따른 두께 편차 존재',
    aiRobotPpcs: '마이크론(μm) 단위 오차 없는 100% 균일 도막',
    winner: 'ai'
  },
  {
    title: '마감 완성도 & 들뜸 (Edge Finish)',
    traditionalFilm: '단차 및 모서리 부위 시간 경과 시 들뜸 발생',
    sprayPps: '자연스러운 곡면 밀착 마감',
    aiRobotPpcs: '복잡한 에어로파츠·에어덕트까지 완벽 감싸기',
    winner: 'ai'
  },
  {
    title: '제거 용이성 (Peelability)',
    traditionalFilm: '본드 잔여물 및 원 도장면 칠 뜯김 위험',
    sprayPps: '손쉬운 필름형 박리 가능',
    aiRobotPpcs: '본드 잔여물 0% / 언제든 신차 도장 100% 원복',
    winner: 'ai'
  },
  {
    title: '광택감 & 슬릭감 (Gloss & Clarity)',
    traditionalFilm: '오렌지필 및 자외선 황변 현상 취약',
    sprayPps: '순정 수준의 맑은 심층 광택',
    aiRobotPpcs: '순정 이상의 초고광택 + 자가 복원(셀프 힐링)',
    winner: 'ai'
  }
];

export function AiTechnologySection() {
  const stats = [
    { label: 'AI 시공 정밀도', value: '99.9%', desc: '6축 다관절 로봇 경로 제어', icon: Cpu },
    { label: '도막 균일성', value: '±2.5μm', desc: '초미세 스프레이 노즐 분사', icon: Layers },
    { label: '시공 시간 단축', value: '50% ↓', desc: '자동화 공정으로 신속 시공', icon: Gauge },
    { label: '본드 잔여물', value: '0%', desc: '100% 무손상 Peelable 박리', icon: RotateCcw },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto relative border-t border-white/10">
      {/* Background Neon Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Readdy Style 2-Column AI Tech Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        {/* Left: Main AI Robot High-Res Image with Overlay Badge */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl group bg-black">
            <img
              src="/images/readdy/ai-tech-main-001.jpg"
              alt="AI 로봇 스프레이 시공"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 aspect-[4/3]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Bottom-right Floating Badge (Readdy Reference Exact Style) */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-black/90 backdrop-blur-xl border border-red-500/40 p-4 sm:p-5 rounded-2xl shadow-2xl flex items-center gap-4">
              <div className="w-1.5 h-12 bg-gradient-to-b from-red-500 to-amber-400 rounded-full" />
              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white">99.9%</div>
                <div className="text-xs font-mono text-gray-400">AI 정밀도 (Precision)</div>
                <div className="text-[10px] text-amber-400 font-mono">특허 AI 로봇 제어</div>
              </div>
            </div>
          </div>

          {/* Sub Silhouette Element */}
          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl bg-red-600/20 border border-red-500/30 backdrop-blur-md flex items-center justify-center p-3 hidden sm:flex pointer-events-none">
            <img
              src="/images/readdy/robot-silhouette-001.jpg"
              alt="Robot icon"
              className="w-full h-full object-contain filter invert opacity-80"
            />
          </div>
        </div>

        {/* Right: Copy & Key Value Props */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
            <Bot className="w-4 h-4 text-red-500 animate-bounce" />
            <span className="text-xs font-mono font-bold text-red-500 tracking-wider uppercase">
              PATENTED AI ROBOT TECHNOLOGY
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-mono uppercase tracking-tight text-white leading-tight">
            AI 로봇이 만드는 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-white">
              완벽한 무손상 페인트 보호막
            </span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
            기존 랩핑 필름의 칼자국, 황변, 모서리 들뜸을 완벽히 해결했습니다. CAUTION의 AI 로봇 기술은 미세한 굴곡과 복잡한 에어로파츠까지 균일하게 시공하여 차량의 도장을 안전하게 보호합니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              '정밀한 6축 AI 로봇 시공',
              '마이크론 단위 균일한 코팅 두께',
              '기존 대비 50% 빠른 작업 시간',
              '원 도장 칠 손상 0% 박리(Peelable)'
            ].map((feat, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                <ShieldCheck className="w-4 h-4 text-red-500 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-[#0f0f0f]/80 backdrop-blur-md border border-white/10 hover:border-red-500/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5 text-red-500" />
              </div>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight group-hover:text-amber-400 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs font-mono font-bold text-gray-300 mt-1 uppercase">
                {stat.label}
              </div>
              <div className="text-[11px] text-gray-500 mt-1 font-sans">
                {stat.desc}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* High-Tech Comparison Table */}
      <div className="rounded-3xl border border-white/15 bg-[#0c0c0c] overflow-hidden shadow-2xl p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sliders className="w-4 h-4" /> PERFORMANCE BENCHMARK
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
              기존 필름 랩핑 VS AI 로봇 PPCS 기술 비교
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-mono font-bold">
            <Sparkles className="w-4 h-4" />
            코션 AI 독점 특허 기술
          </div>
        </div>

        {/* Comparison Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-white/10 text-xs font-mono uppercase text-gray-400">
                <th className="py-4 px-4 font-bold">비교 항목</th>
                <th className="py-4 px-4 font-bold text-gray-400">기존 필름 랩핑 / PPF</th>
                <th className="py-4 px-4 font-bold text-gray-300">일반 스프레이 PPS</th>
                <th className="py-4 px-4 font-bold text-amber-400 bg-red-600/10 rounded-t-xl border-t border-x border-red-500/30">
                  <div className="flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-red-500" />
                    CAUTION AI 로봇 PPCS
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs sm:text-sm font-sans">
              {COMPARISON_DATA.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 font-bold text-white font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    {item.title}
                  </td>
                  <td className="py-4 px-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{item.traditionalFilm}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-[10px] shrink-0">▲</span>
                      <span>{item.sprayPps}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold text-white bg-red-600/10 border-x border-red-500/20 last:rounded-b-xl">
                    <div className="flex items-center gap-2 text-amber-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 font-black" />
                      <span>{item.aiRobotPpcs}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
