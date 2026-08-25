import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench, 
  Paintbrush, 
  Sparkles, 
  Bot, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  ChevronRight,
  Sparkle
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  badge: string;
  title: string;
  engTitle: string;
  desc: string;
  icon: any;
  accentColor: string;
  mainImage: string;
  subImage: string;
  features: string[];
  specs: { label: string; value: string }[];
  highlight: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'ai-pps',
    badge: 'FLAGSHIP INNOVATION',
    title: 'AI 로봇 PPS / PPCS',
    engTitle: 'AI Robot Peelable Paint Protection',
    desc: '기존 필름 랩핑의 한계를 완벽히 극복한 스프레이 방식의 차세대 페인트 보호막. AI 로봇이 초미세 노즐로 도막 두께를 100% 균일하게 도포하며, 칼선이나 들뜸 없이 언제든 손상 없이 박리(Peelable) 가능합니다.',
    icon: Bot,
    accentColor: '#EF4444',
    mainImage: '/images/readdy/service-ai-001.jpg',
    subImage: '/images/readdy/service-detail-ai-img.jpg',
    features: [
      '스프레이 분사 방식으로 칼자국 및 필름 들뜸 원천 차단',
      'AI 로봇 경로 제어로 100% 균일한 마이크론 도막 형성',
      '원 도장면 손상 없는 100% 깔끔한 박리(Peelable) 지원',
      '셀프 힐링(스크래치 자동 복원) 및 초발수 UV 차단'
    ],
    specs: [
      { label: '시공 정밀도', value: '99.9%' },
      { label: '도막 균일도', value: '±2.5μm' },
      { label: '작업 소요 시간', value: '기존 대비 50% 단축' },
      { label: '보증 기간', value: '최대 5년 품질 보증' }
    ],
    highlight: '특허받은 AI 로봇 자동화 공정'
  },
  {
    id: 'repair',
    badge: 'MASTER MAINTENANCE',
    title: '수입차 전문 정비',
    engTitle: 'Import Car Precision Repair',
    desc: '24년 축적된 슈퍼카 및 수입차 정비 노하우. 브랜드별 전용 첨단 진단기와 특수 공구를 통해 엔진, 변속기, 전자장비의 근본적인 원인을 정밀 진단하고 정석대로 수리합니다.',
    icon: Wrench,
    accentColor: '#3B82F6',
    mainImage: '/images/readdy/service-repair-001.jpg',
    subImage: '/images/readdy/service-detail-repair-img.jpg',
    features: [
      '포르쉐, 람보르기니, 페라리, BMW, 벤츠 전용 진단 스캐너 보유',
      '엔진 및 미션 오버홀 & 정밀 캘리브레이션',
      '고전압 EV/하이브리드 시스템 및 첨단 전자제어 진단',
      '정품 규격 부품 사용 및 철저한 정비 이력 관리'
    ],
    specs: [
      { label: '정비 기술진', value: '24년 경력 마스터 엔지니어' },
      { label: '진단 장비', value: 'OEM 전용 진단기 100% 완비' },
      { label: '사후 관리', value: '정비 내역 보증서 발급' },
      { label: '무료 서비스', value: '수도권 픽업 & 딜리버리' }
    ],
    highlight: '브랜드 전용 공식 진단 시스템 완비'
  },
  {
    id: 'paint',
    badge: 'COLOR MASTERY',
    title: '정밀 판금 & 도색',
    engTitle: 'Body Paint & Collision Repair',
    desc: '첨단 분광 측색기로 기존 차량의 색상을 99.9% 완벽 재현합니다. 수용성 친환경 바스프(BASF) 글라슈리트 도료와 무진동 정밀 판금 복원으로 원래의 강성과 광택을 완벽 복원합니다.',
    icon: Paintbrush,
    accentColor: '#F59E0B',
    mainImage: '/images/readdy/service-paint-001.jpg',
    subImage: '/images/readdy/service-detail-paint-img.jpg',
    features: [
      '디지털 분광 분석기를 통한 99.9% 완벽 조색 매칭',
      '차체 강성을 보존하는 무진동 정밀 판금 복원 시스템',
      '최고급 친환경 수용성 프리미엄 도료(BASF Glasurit) 적용',
      '원적외선 고온 열처리 부스에서 완성되는 영구 광택'
    ],
    specs: [
      { label: '색상 일치율', value: '99.9% 정밀 매칭' },
      { label: '열처리 방식', value: '최신 원적외선 순환 부스' },
      { label: '사용 도료', value: '독일 프리미엄 수용성 바스프' },
      { label: '복원 품질', value: '신차 출고 수준 단차 교정' }
    ],
    highlight: '디지털 분광 측색 99.9% 색상 재현'
  },
  {
    id: 'detailing',
    badge: 'ULTIMATE FINISH',
    title: '하이엔드 디테일링',
    engTitle: 'Premium Detailing & Coating',
    desc: '단순한 세차를 넘어선 예술적 케어. 특수 광택 조명 아래에서 스크래치와 스월마크를 미크론 단위로 제거하고 최고급 나노 세라믹 코팅으로 깊이 있는 슬릭감과 광채를 선사합니다.',
    icon: Sparkles,
    accentColor: '#10B981',
    mainImage: '/images/readdy/service-detail-001.jpg',
    subImage: '/images/readdy/service-detail-detailing-img.jpg',
    features: [
      '페인트 도막 두께 측정 기반의 3단계 듀얼 수성 광택',
      '초발수 방오 9H 하드니스 나노 세라믹 글래스 코팅',
      '최고급 나파 가죽 전용 클리닝 및 침투형 가죽 코팅',
      '엔진룸 & 휠 하우스 특수 드라이아이스 스팀 세척'
    ],
    specs: [
      { label: '광택 방식', value: '3-Step 듀얼 수성 폴리싱' },
      { label: '코팅 경도', value: '9H+ 고경도 세라믹' },
      { label: '실내 케어', value: '친환경 가죽 전용 트리트먼트' },
      { label: '지속력', value: '최대 24개월 방오 발수 유지' }
    ],
    highlight: '특수 조명 하 미세 스월 99% 제거'
  }
];

interface CoreServicesSectionProps {
  onRequestQuote?: (serviceTitle: string) => void;
}

export function CoreServicesSection({ onRequestQuote }: CoreServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('ai-pps');
  const selectedService = SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
            <Sparkle className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-red-500 tracking-wider uppercase">
              ALL-IN-ONE MASTER SERVICES
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-mono uppercase tracking-tight text-white leading-tight">
            CORE SERVICE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-white">PORTFOLIO</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3 max-w-2xl">
            수입차 정비부터 세계 최초 AI 로봇 PPS 시공까지, 코션스마트센터만의 4대 프리미엄 토탈 솔루션을 만나보세요.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-neutral-900/90 backdrop-blur-md rounded-2xl border border-white/10 w-fit">
          {SERVICES_DATA.map((service) => {
            const Icon = service.icon;
            const isActive = activeTab === service.id;
            return (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-lg shadow-red-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{service.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Service Showcase Card with Reference Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedService.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#141414] to-[#0a0a0a] shadow-2xl p-6 sm:p-10"
        >
          {/* Top highlight bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/20 shadow-inner"
                style={{ backgroundColor: `${selectedService.accentColor}20` }}
              >
                <selectedService.icon className="w-7 h-7" style={{ color: selectedService.accentColor }} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md"
                    style={{ backgroundColor: `${selectedService.accentColor}20`, color: selectedService.accentColor }}
                  >
                    {selectedService.badge}
                  </span>
                  <span className="text-xs text-amber-400 font-mono flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {selectedService.highlight}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
                  {selectedService.title} <span className="text-sm text-gray-400 font-normal">({selectedService.engTitle})</span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {onRequestQuote && (
                <button
                  onClick={() => onRequestQuote(selectedService.title)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-mono text-xs font-bold transition-all shadow-md shadow-red-600/30 flex items-center gap-2 cursor-pointer"
                >
                  <span>이 서비스 실시간 견적 문의</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Description, Image & Detailed Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            {/* Left: Image with Glow & Overlay (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl group aspect-[4/3] bg-black">
                <img
                  src={selectedService.mainImage}
                  alt={selectedService.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white/90 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                  <span>현장 정밀 시공 샷</span>
                  <span className="text-amber-400">100% 실사</span>
                </div>
              </div>

              {/* Sub Thumbnail */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-lg aspect-[16/7] bg-black hidden sm:block">
                <img
                  src={selectedService.subImage}
                  alt={`${selectedService.title} 디테일`}
                  className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-black/30 pointer-events-none" />
              </div>
            </div>

            {/* Right: Description and Core Features & Specs (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              <div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                  {selectedService.desc}
                </p>

                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  KEY ADVANTAGES & FEATURES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {selectedService.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-200 leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Technical Spec Grid */}
                <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10 space-y-2.5">
                  <div className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider mb-2">
                    TECHNICAL SPECIFICATIONS
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedService.specs.map((sp, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.02] border border-white/5"
                      >
                        <span className="text-xs text-gray-400 font-mono">{sp.label}</span>
                        <span className="text-xs font-mono font-bold text-white bg-white/5 px-2 py-0.5 rounded border border-white/10">
                          {sp.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 4 Cards Quick Grid with Reference Image Thumbnails */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 relative z-10">
        {SERVICES_DATA.map((srv) => {
          const isSelected = activeTab === srv.id;
          const Icon = srv.icon;
          return (
            <div
              key={srv.id}
              onClick={() => setActiveTab(srv.id)}
              className={`group rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-red-600/10 border-red-500/60 shadow-xl shadow-red-600/20'
                  : 'bg-neutral-950/80 border-white/10 hover:border-white/20 hover:bg-neutral-900/80'
              }`}
            >
              {/* Card Image Thumbnail */}
              <div className="relative h-36 overflow-hidden bg-black">
                <img
                  src={srv.mainImage}
                  alt={srv.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/20 backdrop-blur-md"
                    style={{ backgroundColor: `${srv.accentColor}30` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: srv.accentColor }} />
                  </div>
                </div>
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                    {srv.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-base font-bold text-white font-mono">{srv.title}</h4>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{srv.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
