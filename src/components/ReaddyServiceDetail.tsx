import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck } from 'lucide-react';

export interface ServiceDetailData {
  id: string;
  title: string;
  engTitle?: string;
  subtitle: string;
  description: string;
  heroImage: string;
  features: string[];
  detailImage: string;
  details: { title: string; desc: string }[];
  process: { step: number; title: string; desc: string }[];
  relatedServices: string[];
}

export const SERVICE_DETAILS_DATA: Record<string, ServiceDetailData> = {
  repair: {
    id: 'repair',
    title: '수입차 정비',
    subtitle: 'Import Car Repair',
    description: '전문 기술진의 정밀한 진단과 정비로 수입차의 최상의 컨디션을 유지합니다. 브랜드별 특화된 정비 노하우와 최신 장비를 통해 완벽한 서비스를 제공합니다.',
    heroImage: '/images/readdy/service-hero-repair.jpg',
    features: [
      '엔진 및 변속기 정비',
      '전자장비 진단 및 수리',
      '브레이크 시스템 점검',
      '정기 점검 및 소모품 교체',
      '에어컨 시스템 정비',
      '서스펜션 및 조향장치 점검'
    ],
    detailImage: '/images/readdy/service-detail-repair-img.jpg',
    details: [
      {
        title: '엔진 정비',
        desc: 'BMW, 벤츠, 아우디, 포르쉐 등 각 브랜드별 특화된 엔진 진단 및 정비 서비스를 제공합니다. 최신 진단 장비로 정확한 문제 파악 후 최적의 정비 솔루션을 제안드립니다.'
      },
      {
        title: '변속기 정비',
        desc: '자동 및 수동 변속기의 모든 문제를 신속하고 정확하게 해결합니다. 미션 오일 교환부터 복잡한 내부 수리까지 전문가의 손길로 완벽하게 처리해드립니다.'
      },
      {
        title: '전자장비 진단',
        desc: '첨단 전자 진단 장비를 활용하여 차량의 모든 전자 시스템을 정밀하게 분석합니다. 경고등 점검부터 복잡한 전자제어 장치까지 완벽하게 대응합니다.'
      }
    ],
    process: [
      { step: 1, title: '예약 접수', desc: '전화 또는 온라인으로 예약을 접수합니다' },
      { step: 2, title: '차량 입고', desc: '예약 시간에 맞춰 차량을 입고합니다' },
      { step: 3, title: '정밀 진단', desc: '최신 장비로 차량 상태를 정밀 진단합니다' },
      { step: 4, title: '정비 작업', desc: '전문 기술진이 정비 작업을 진행합니다' },
      { step: 5, title: '검수 및 인도', desc: '철저한 검수 후 차량을 인도합니다' }
    ],
    relatedServices: ['paint', 'detailing', 'ai-tech']
  },
  paint: {
    id: 'paint',
    title: '판금도색',
    subtitle: 'Body Paint & Repair',
    description: '완벽한 색상 매칭과 정밀한 판금 작업으로 차량을 새것처럼 복원합니다. 첨단 색상 분석 시스템과 숙련된 기술로 원래의 아름다움을 되찾아드립니다.',
    heroImage: '/images/readdy/service-hero-paint.jpg',
    features: [
      '정밀 색상 매칭 시스템',
      '무진동 판금 작업',
      '친환경 도료 사용',
      '완벽한 광택 마감',
      'UV 코팅 보호',
      '풀 보디 도색'
    ],
    detailImage: '/images/readdy/service-detail-paint-img.jpg',
    details: [
      {
        title: '정밀 색상 매칭',
        desc: '첨단 색상 분석기를 사용하여 원래의 색상을 99.9% 정확하게 재현합니다. 모든 브랜드와 색상 코드를 완벽하게 매칭하여 자연스러운 마감을 보장합니다.'
      },
      {
        title: '판금 복원',
        desc: '충격으로 변형된 차체를 원래 상태로 정밀하게 복원합니다. 무진동 판금 기술로 차량의 강도와 외관을 동시에 완벽하게 되살립니다.'
      },
      {
        title: '프리미엄 도색',
        desc: '친환경 고품질 도료를 사용하여 건강하고 아름다운 마감을 제공합니다. 다층 도색 공법으로 깊이 있는 광택과 내구성을 동시에 확보합니다.'
      }
    ],
    process: [
      { step: 1, title: '손상 부위 확인', desc: '차량 손상 부위를 정밀하게 확인합니다' },
      { step: 2, title: '판금 작업', desc: '변형된 부위를 정밀하게 판금 복원합니다' },
      { step: 3, title: '색상 분석', desc: '첨단 장비로 원래 색상을 정밀 분석합니다' },
      { step: 4, title: '도색 작업', desc: '프리미엄 도료로 완벽하게 도색합니다' },
      { step: 5, title: '광택 마감', desc: '광택 작업으로 완벽한 마무리를 합니다' }
    ],
    relatedServices: ['repair', 'detailing', 'ai-tech']
  },
  detailing: {
    id: 'detailing',
    title: '디테일링',
    subtitle: 'Premium Detailing',
    description: '세심한 손길로 차량의 모든 부분을 완벽하게 관리하는 프리미엄 케어 서비스입니다. 외관부터 내부까지 철저한 클리닝과 보호 작업을 진행합니다.',
    heroImage: '/images/readdy/service-hero-detailing.jpg',
    features: [
      '외관 폴리싱 및 코팅',
      '실내 클리닝 및 살균',
      '엔진룸 세척',
      '유리막 코팅',
      '가죽 시트 케어',
      '휠 및 타이어 관리'
    ],
    detailImage: '/images/readdy/service-detail-detailing-img.jpg',
    details: [
      {
        title: '외관 케어',
        desc: '전문 폴리싱 기법으로 스크래치와 스월 마크를 제거하고, 프리미엄 코팅제로 광택과 보호력을 동시에 극대화합니다. 차량의 외관을 최상의 상태로 유지합니다.'
      },
      {
        title: '실내 클리닝',
        desc: '가죽 시트부터 카펫까지 차량 내부를 깊이 있게 클리닝합니다. 살균 처리로 위생적인 실내 환경을 만들어드립니다.'
      },
      {
        title: '유리막 코팅',
        desc: '나노 기술 기반 유리막 코팅으로 차량 표면에 강력한 보호막을 형성합니다. 오염물질과 스크래치로부터 차량을 효과적으로 보호합니다.'
      }
    ],
    process: [
      { step: 1, title: '차량 검수', desc: '차량 상태를 꼼꼼하게 검수합니다' },
      { step: 2, title: '세차 및 클레잉', desc: '철저한 세차와 클레잉으로 오염물을 제거합니다' },
      { step: 3, title: '폴리싱', desc: '전문 기술로 표면을 폴리싱합니다' },
      { step: 4, title: '코팅', desc: '프리미엄 코팅제를 적용합니다' },
      { step: 5, title: '실내 클리닝', desc: '실내를 깊이 있게 클리닝합니다' }
    ],
    relatedServices: ['repair', 'paint', 'pps-clear']
  },
  'pps-clear': {
    id: 'pps-clear',
    title: '투명 PPS',
    engTitle: '(Paint Protection Spray)',
    subtitle: '최첨단 AI 분사 무절개 투명 도장 보호',
    description: '독일 정품 CARDIP® PPS를 기반으로 250µm+ 도막 두께의 투명 보호층을 형성합니다. 칼을 전혀 대지 않는 무절개 스프레이 방식으로 시공되어 스톤칩과 스크래치를 완벽 차단하며, 필요 시 도장면 손상 없이 언제든 깔끔하게 벗겨낼 수 있습니다.',
    heroImage: '/images/readdy/service-hero-ai.jpg',
    features: [
      '독일 정품 CARDIP® PPS 11단계 정밀 시공',
      '칼 없이 완성하는 Seamless 시공 (AI 로봇 정밀 분사)',
      '250µm+ 도막 두께와 높은 스톤칩 저항성 (DIN ISO 20567-1)',
      '무접착 방식으로 깔끔하게 벗겨지는 시스템 (도장면 손상 없는 제거)',
      '균일한 표면 레벨링과 높은 투명도',
      '수성 친환경 도료 시스템 & Non-Yellowing 특성'
    ],
    detailImage: '/images/readdy/service-detail-ai-img.jpg',
    details: [
      {
        title: '독일 CARDIP® Aqua+ Pro Clear 5050 도료',
        desc: '독일 Colosol Coatings GmbH 본사에서 연구·생산되는 규격 제품으로, 높은 스톤칩 저항성과 투명한 마감을 갖춘 PPS 베이스 도료 시스템입니다.'
      },
      {
        title: '칼 없이 완성하는 Seamless 시공',
        desc: '차체 표면에 칼을 대지 않는 액상 분사 도포 방식으로 시공하여 칼로 인한 손상 우려를 없애고, 복잡한 곡면과 에어로 파츠까지 이음새 없이 자연스럽게 마감합니다.'
      },
      {
        title: '무접착 방식으로 깔끔하게 벗겨지는 시스템',
        desc: '접착제 없이 도포되어 필요 시 도장면에서 깔끔하게 제거할 수 있는 Peelable Paint 시스템으로 원도장면을 안전하게 보존합니다.'
      }
    ],
    process: [
      { step: 1, title: '차량 세척 및 표면 정리', desc: '도장면 유분과 미세 오염물을 세정하여 시공 준비를 진행합니다' },
      { step: 2, title: '차량 분석 및 마스킹', desc: '차량 굴곡을 확인하고 시공 부위를 정밀하게 마스킹합니다' },
      { step: 3, title: 'Aqua+ 5050 도포', desc: '250µm+ 도막 두께를 갖춘 투명 보호 베이스 도료를 균일하게 분사합니다' },
      { step: 4, title: '프리미엄 클리어코트 코팅', desc: '표면 보호와 광택을 위한 Self-Healing 클리어코트를 도포합니다' },
      { step: 5, title: '경화 및 최종 검수', desc: '도막 상태와 마감 품질을 철저히 확인 후 출고합니다' }
    ],
    relatedServices: ['pps-color', 'detailing', 'repair']
  },
  'pps-color': {
    id: 'pps-color',
    title: '컬러 PPS',
    engTitle: '(Color Paint Protection Spray)',
    subtitle: '원도장 손상 없는 프리미엄 컬러 체인지',
    description: '독일 정품 CARDIP® 원료를 바탕으로 슈퍼카 순정 컬러부터 마이바흐 투톤까지 실제 도색 수준의 깊은 색감을 완성합니다. 기존 도장면을 샌딩 없이 100% 안전 보존하며, 추후 원복 시 흔적 없이 깔끔하게 벗겨낼 수 있는 혁신적인 컬러 솔루션입니다.',
    heroImage: '/images/readdy/brand-hero-001.jpg',
    features: [
      '독일 정품 CARDIP® 컬러 도료 11단계 정밀 시공',
      '슈퍼카 순정 컬러코드 정밀 조색 & 마이바흐 투톤 구현',
      '칼을 사용하지 않는 분사 방식으로 차량 손상 방지',
      '실제 도색 수준의 표면 질감과 깊이 있는 광택',
      '무접착 방식으로 깔끔하게 벗겨지는 시스템 (원도장면 보존)',
      '외장 컬러 변경과 스톤칩 보호 동시 구현'
    ],
    detailImage: '/images/readdy/brand-tech-main-001.jpg',
    details: [
      {
        title: '정밀 조색 시스템 & 다양한 컬러 구현',
        desc: '포르쉐·페라리 등 순정 컬러코드부터 사틴, 메탈릭, 펄 등 고객이 원하는 맞춤 색상을 도색 수준의 깊이 있는 질감으로 구현합니다.'
      },
      {
        title: '마이바흐 투톤(Two-Tone) 기술',
        desc: '코션스마트센터의 정밀 코치라인 분할 기술을 통해 마이바흐, 롤스로이스 등의 명품 투톤 스타일을 도장면 손상 없이 완성합니다.'
      },
      {
        title: '컬러 체인지와 도장 보호를 동시에 구현',
        desc: '보호 베이스층 위에 컬러와 Self-Healing 클리어코트가 결합되어, 외장 컬러 변경과 스톤칩 보호 성능을 함께 제공합니다.'
      }
    ],
    process: [
      { step: 1, title: '컬러 상담 및 조색', desc: '고객 맞춤형 컬러 배합을 결정하고 정밀 조색을 진행합니다' },
      { step: 2, title: '차량 세척 및 마스킹', desc: '시공 부위를 세정하고 라인에 맞춰 정밀하게 마스킹합니다' },
      { step: 3, title: 'PPS 탄성 베이스 도포', desc: '추후 손상 없이 깨끗하게 벗겨지도록 보호 베이스층을 균일하게 분사합니다' },
      { step: 4, title: 'Color & 클리어코트 코팅', desc: '선택 컬러 및 Self-Healing 클리어코트를 순차 도포합니다' },
      { step: 5, title: '경화 및 정밀 피니싱', desc: '표면 마감과 품질을 꼼꼼하게 검수한 후 차량을 인도합니다' }
    ],
    relatedServices: ['pps-clear', 'detailing', 'paint']
  },
  'ai-tech': {
    id: 'ai-tech',
    title: '투명 PPS',
    engTitle: '(Paint Protection Spray)',
    subtitle: '독일 정품 CARDIP® PPS (Aqua+ Pro Clear 5050)',
    description: '독일 정품 CARDIP® 도료와 4세대 AI 로봇 스프레이 시스템으로 구현하는 차세대 페인트 보호 솔루션으로 완벽한 무절개 보호를 제공합니다.',
    heroImage: '/images/readdy/service-hero-ai.jpg',
    features: [
      'AI 로봇 정밀 분사 시공',
      '균일한 마이크론 코팅 두께',
      '장기 내구성 및 스톤칩 방어',
      '빠른 작업 시간 및 원복 가능',
      '스마트 품질 관리',
      '친환경 프리미엄 도료'
    ],
    detailImage: '/images/readdy/service-detail-ai-img.jpg',
    details: [
      {
        title: 'AI 정밀 시공',
        desc: 'AI 로봇이 차량의 곡면과 각도를 실시간으로 분석하여 인간의 한계를 뛰어넘는 정밀한 코팅을 시행합니다.'
      },
      {
        title: '스마트 품질 관리',
        desc: '작업 중 실시간으로 코팅 상태를 모니터링하고, AI가 최적의 조건을 자동으로 조정합니다.'
      },
      {
        title: '차세대 보호 솔루션 (CARDIP)',
        desc: '기존 PPF 필름의 황변과 본드 고착 단점을 극복한 친환경 수용성/유성 보호 솔루션입니다.'
      }
    ],
    process: [
      { step: 1, title: '차량 스캐닝', desc: 'AI가 차량 표면을 3D 스캐닝합니다' },
      { step: 2, title: '코팅 계획 수립', desc: '데이터 기반 최적의 코팅 계획을 수립합니다' },
      { step: 3, title: 'AI 로봇 시공', desc: 'AI 로봇이 정밀하게 코팅을 시공합니다' },
      { step: 4, title: '실시간 품질 체크', desc: '작업 중 실시간 품질을 검증합니다' },
      { step: 5, title: '최종 검수', desc: '완벽한 품질을 확인 후 인도합니다' }
    ],
    relatedServices: ['pps-color', 'detailing', 'repair']
  }
};

interface ReaddyServiceDetailProps {
  serviceId: string;
  onSelectService: (serviceId: string) => void;
  onNavigateHome: () => void;
  onNavigateToContact?: (serviceName: string) => void;
}

export const ReaddyServiceDetail: React.FC<ReaddyServiceDetailProps> = ({
  serviceId,
  onSelectService,
  onNavigateHome,
  onNavigateToContact
}) => {
  const service = SERVICE_DETAILS_DATA[serviceId] || SERVICE_DETAILS_DATA.repair;
  const related = service.relatedServices.map((id) => SERVICE_DETAILS_DATA[id]).filter(Boolean);

  return (
    <div className="min-h-screen bg-white text-dark">
      {/* 1. Detail Hero Banner */}
      <section className="relative min-h-[65vh] sm:min-h-[72vh] flex items-center justify-center bg-black overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover object-center opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />
        </div>

        <div className="relative z-10 mx-auto px-6 lg:px-12 max-w-5xl text-center pt-32 sm:pt-40 pb-20 sm:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-5 py-2 bg-primary rounded-full mb-5 sm:mb-6 shadow-md shadow-primary/30">
              <span className="text-xs font-bold text-white tracking-wider">{service.subtitle}</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-5 sm:mb-6 leading-tight tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              <span className="block">{service.title}</span>
              {service.engTitle && (
                <span className="block text-2xl sm:text-4xl lg:text-5xl font-bold text-white/95 mt-2 sm:mt-3 break-keep tracking-normal">
                  {service.engTitle}
                </span>
              )}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed drop-shadow">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Features Grid */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="mx-auto px-6 lg:px-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-block px-4 py-2 bg-gray-100 rounded-full mb-4">
              <span className="text-xs font-semibold text-dark tracking-wider">FEATURES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-dark mb-4 tracking-tight">
              서비스 특징
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors border border-gray-100"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                  <i className="ri-check-line text-primary text-lg font-bold" />
                </div>
                <h3 className="text-base font-bold text-dark">{feat}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Deep-Dive Details with Large Image */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-3xl overflow-hidden shadow-xl bg-black">
                <div className="w-full h-[400px]">
                  <img
                    src={service.detailImage}
                    alt={`${service.title} 상세`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-black text-dark mb-8 tracking-tight">
                전문적인 {service.title}
              </h2>
              <div className="space-y-6">
                {service.details.map((item, idx) => (
                  <div key={idx} className="border-l-4 border-primary pl-6">
                    <h3 className="text-lg font-bold text-dark mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3.5 CARDIP Official Material Tech Spec & 3-Way Comparison Table (Only for PPS & AI-Tech) */}
      {(service.id === 'pps-clear' || service.id === 'pps-color' || service.id === 'ai-tech') && (
        <section className="py-20 sm:py-28 bg-white text-gray-900 relative overflow-hidden border-y border-gray-100">
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
            {/* 11-Stage Precision Multi-Layer System (총 11회 도포 시공 구조) */}
            <div className="rounded-3xl bg-gray-50 border border-gray-200 p-6 sm:p-10 lg:p-12 mb-20 shadow-xl overflow-hidden">
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-50 border border-red-200 rounded-full mb-3">
                  <Layers className="w-3.5 h-3.5 text-red-600" />
                  <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-widest">
                    MULTI-LAYER ARCHITECTURE · 11-STAGE PRECISION SYSTEM
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
                  <span className="font-cardip font-black text-cardip-red">CARDIP®</span> PPS 정밀 시공 구조 (11단계 멀티레이어)
                </h3>
                <p className="text-xs sm:text-base text-gray-600 mt-3 max-w-2xl mx-auto leading-relaxed">
                  차량 원도장면을 100% 안전하게 보호하고 필요 시 도장 손상 없이 깔끔하게 벗겨지는 Peelable Paint 총 11회 정밀 분사 멀티레이어 도료 시스템
                </p>
              </div>

              {/* Graphic + Layer Visual Pointer Stack */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-200 mb-8 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left: 3D Layer Diagram Image */}
                  <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-gray-50 to-gray-100/70 rounded-2xl border border-gray-200 relative group">
                    <img
                      src="/images/cardip/image12.png"
                      alt="CARDIP 11회 도포 멀티레이어 시공 단면도"
                      className="max-h-72 w-auto object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white/90 backdrop-blur rounded-full border border-gray-200 text-xs font-medium text-gray-700 shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                      <span>독일 <span className="font-cardip font-black text-black">CARDIP®</span> 특허 멀티레이어 시공 단면도</span>
                    </div>
                  </div>

                  {/* Right: Layer Callout Stack matching Image 2's arrows */}
                  <div className="lg:col-span-6 space-y-2.5">
                    {/* Layer 5 */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-purple-50/70 border border-purple-200/80 hover:border-purple-300 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-purple-600 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">5</span>
                        <div>
                          <div className="text-sm font-bold text-gray-900">클리어코트 ClearCoat</div>
                          <div className="text-xs text-purple-700 font-medium">최종 표면 마감 및 최상위 보호층 (Self-Healing)</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-white text-purple-700 border border-purple-200 rounded-md text-xs font-bold whitespace-nowrap shadow-xs">
                        총 2회 도포
                      </span>
                    </div>

                    {/* Layer 4 */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-red-50/70 border border-red-200/80 hover:border-red-300 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-red-600 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">4</span>
                        <div>
                          <div className="text-sm font-bold text-gray-900">컬러 코팅 (Color Coat)</div>
                          <div className="text-xs text-red-700 font-medium">슈퍼카 순정 컬러 및 맞춤 컬러 적용 공정</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-white text-red-700 border border-red-200 rounded-md text-xs font-bold whitespace-nowrap shadow-xs">
                        총 2회 도포
                      </span>
                    </div>

                    {/* Layer 3 */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 hover:border-amber-300 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-amber-600 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">3</span>
                        <div>
                          <div className="text-sm font-bold text-gray-900">정밀 샌딩 (Sanding)</div>
                          <div className="text-xs text-amber-700 font-medium">중간 표면 정리 및 다음 공정을 위한 정밀 표면 준비</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-white text-amber-800 border border-amber-200 rounded-md text-xs font-bold whitespace-nowrap shadow-xs">
                        표면 정리
                      </span>
                    </div>

                    {/* Layer 2 */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 hover:border-blue-300 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">2</span>
                        <div>
                          <div className="text-sm font-bold text-gray-900">클리어코트 ClearCoat</div>
                          <div className="text-xs text-blue-700 font-medium">1차 도막 보호층 (베이스 보호 및 레벨링)</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-white text-blue-700 border border-blue-200 rounded-md text-xs font-bold whitespace-nowrap shadow-xs">
                        총 2회 도포
                      </span>
                    </div>

                    {/* Layer 1 */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-sky-50/70 border border-sky-200/80 hover:border-sky-300 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-sky-600 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">1</span>
                        <div>
                          <div className="text-sm font-bold text-gray-900">PPS BaseCoat (벗겨지는 베이스)</div>
                          <div className="text-xs text-sky-700 font-medium">기존 도장면 위에 형성되는 <span className="font-cardip font-bold text-black">CARDIP® PPS</span> 벗겨지는 보호 도막</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-white text-sky-700 border border-sky-200 rounded-md text-xs font-bold whitespace-nowrap shadow-xs">
                        총 5회 도포
                      </span>
                    </div>

                    {/* Layer 0 */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-100 border border-gray-300 hover:border-gray-400 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-gray-800 text-white font-mono font-black text-xs flex items-center justify-center shadow-sm">0</span>
                        <div>
                          <div className="text-sm font-bold text-gray-900">Original Paint (기존 도장)</div>
                          <div className="text-xs text-gray-600 font-medium">샌딩 없이 출고 상태 그대로 100% 안전 보존</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-white text-gray-700 border border-gray-300 rounded-md text-xs font-bold whitespace-nowrap shadow-xs">
                        원형 보존
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Red Total Banner: 총 11회 도포 (1:1 with Image 2) */}
              <div className="bg-gradient-to-r from-red-500/10 via-red-500/15 to-amber-500/10 border border-red-200 rounded-2xl p-6 sm:p-8 text-center shadow-sm">
                <div className="inline-block px-5 py-2 bg-red-600 text-white font-black text-lg sm:text-2xl rounded-full mb-2 shadow-md">
                  총 11회 도포
                </div>
                <div className="text-base sm:text-xl font-bold text-gray-900 mt-2">
                  PPS BaseCoat 5회 + ClearCoat 보호층 2회 + 컬러 코팅 2회 + 최종 ClearCoat 2회
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">
                  중간 정밀 샌딩 공정을 포함하여 오렌지필 없는 무결점 슈퍼카 도장면과 완벽한 보호 도막을 완성합니다.
                </p>
              </div>
            </div>

            {/* Comparison Table */}
            <div>
              <div className="text-center max-w-3xl mx-auto mb-10">
                <span className="text-xs font-mono font-bold text-red-500 bg-red-50 px-3.5 py-1.5 rounded-lg border border-red-100 uppercase tracking-widest inline-block mb-3">
                  COMPREHENSIVE COMPARISON
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-gray-900">
                  필름(PPF) vs 독일 <span className="font-cardip font-black text-cardip-red">CARDIP®</span> PPS 비교
                </h3>
              </div>

              {/* Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="py-4 px-6 text-xs sm:text-sm font-mono font-bold text-gray-600 uppercase">
                        비교 항목
                      </th>
                      <th className="py-4 px-6 text-xs sm:text-sm font-mono font-bold text-gray-600 uppercase border-l border-gray-200">
                        필름 (PPF)
                      </th>
                      <th className="py-4 px-6 text-xs sm:text-sm font-mono font-bold text-cardip-red uppercase bg-red-50/50 border-l border-red-100">
                        독일 <span className="font-cardip font-black text-cardip-red">CARDIP®</span> PPS (코션)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs sm:text-sm font-sans">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-bold text-gray-900 bg-gray-50/50">시공 방식 (칼 사용)</td>
                      <td className="py-4 px-6 text-gray-600 border-l border-gray-100">차량 표면 위 칼(나이프) 컷팅 방식</td>
                      <td className="py-4 px-6 text-gray-900 font-bold bg-red-50/30 border-l border-red-100 text-red-700">
                        ✓ 칼을 사용하지 않는 Seamless 시공 (AI 분사)
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-bold text-gray-900 bg-gray-50/50">마감 이음새 (모서리)</td>
                      <td className="py-4 px-6 text-gray-600 border-l border-gray-100">모서리 경계선 노출 및 때낌 우려</td>
                      <td className="py-4 px-6 text-gray-900 font-bold bg-red-50/30 border-l border-red-100 text-red-700">
                        ✓ 이음새 없는 자연스러운 마감
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-bold text-gray-900 bg-gray-50/50">복잡한 3D 형상 시공</td>
                      <td className="py-4 px-6 text-gray-600 border-l border-gray-100">에어로 파츠, 그릴 등 부위 분할 시공</td>
                      <td className="py-4 px-6 text-gray-900 font-bold bg-red-50/30 border-l border-red-100 text-red-700">
                        ✓ 라디에이터 그릴, 엠블럼 등 3D 형상 일체형 도포
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-bold text-gray-900 bg-gray-50/50">도막 두께 & 스톤칩 저항</td>
                      <td className="py-4 px-6 text-gray-600 border-l border-gray-100">약 150~180µm 필름 두께</td>
                      <td className="py-4 px-6 text-gray-900 font-bold bg-red-50/30 border-l border-red-100 text-red-700">
                        ✓ 250µm+ 도막 두께 (DIN ISO 20567-1 시험 기준)
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-bold text-gray-900 bg-gray-50/50">표면 질감 & 광택</td>
                      <td className="py-4 px-6 text-gray-600 border-l border-gray-100">필름 표면 오렌지필 및 광택 저하</td>
                      <td className="py-4 px-6 text-gray-900 font-bold bg-red-50/30 border-l border-red-100 text-red-700">
                        ✓ 균일한 표면 레벨링 및 고광택 마감
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-bold text-gray-900 bg-gray-50/50">제거 시 특성 (벗겨지는 방식)</td>
                      <td className="py-4 px-6 text-gray-600 border-l border-gray-100">점착제 잔여물 발생 및 제거 작업 소요</td>
                      <td className="py-4 px-6 text-gray-900 font-bold bg-red-50/30 border-l border-red-100 text-red-700">
                        ✓ 무접착 방식으로 깔끔하게 벗겨지는 시스템 (도장면 손상 없는 제거)
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-bold text-gray-900 bg-gray-50/50">사후 관리 및 광택</td>
                      <td className="py-4 px-6 text-gray-600 border-l border-gray-100">광택 작업 불가, 손상 시 재시공</td>
                      <td className="py-4 px-6 text-gray-900 font-bold bg-red-50/30 border-l border-red-100 text-red-700">
                        ✓ 샌딩, 광택(폴리싱), 코팅 작업 지원
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-bold text-gray-900 bg-gray-50/50">스크래치 자가치유</td>
                      <td className="py-4 px-6 text-gray-600 border-l border-gray-100">열 반응 코팅층 적용</td>
                      <td className="py-4 px-6 text-gray-900 font-bold bg-red-50/30 border-l border-red-100 text-red-700">
                        ✓ 프리미엄 클리어코트 Self-Healing (열 반응 자가치유)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. 5-Step Process */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="mx-auto px-6 lg:px-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-gray-100 rounded-full mb-4">
              <span className="text-xs font-semibold text-dark tracking-wider">PROCESS</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-dark mb-4 tracking-tight">
              서비스 프로세스
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {service.process.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className="bg-gray-50 rounded-2xl p-6 h-full border border-gray-100">
                  <div className="text-3xl font-black text-primary mb-3 font-mono">
                    {String(step.step).padStart(2, '0')}
                  </div>
                  <h3 className="text-base font-bold text-dark mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Dark CTA Section (Between Process and Related Services) */}
      <section className="py-20 sm:py-28 bg-[#111827] text-white text-center">
        <div className="mx-auto px-6 lg:px-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-5 tracking-tight">
              {service.id === 'detailing'
                ? '지금 디테일링을 경험해보세요'
                : service.id === 'repair'
                ? '지금 수입차 정비를 경험해보세요'
                : service.id === 'paint'
                ? '지금 판금도색을 경험해보세요'
                : service.id === 'pps-color'
                ? '지금 컬러 PPS를 경험해보세요'
                : '지금 투명 PPS를 경험해보세요'}
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-9 leading-relaxed max-w-2xl mx-auto">
              전문가 상담부터 최고의 서비스까지, CAUTION SMART CENTER가 함께합니다
            </p>
            <button
              onClick={() => {
                if (onNavigateToContact) {
                  const serviceParam =
                    service.id === 'repair'
                      ? '수입차 정비'
                      : service.id === 'paint'
                      ? '판금도색'
                      : service.id === 'detailing'
                      ? '디테일링'
                      : service.id === 'pps-color'
                      ? '컬러PPS'
                      : '투명PPS';
                  onNavigateToContact(serviceParam);
                } else {
                  onNavigateHome();
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }
              }}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-primary hover:bg-primary-dark text-white text-base font-bold rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
            >
              <span>상담 신청하기</span>
              <i className="ri-arrow-right-line text-lg" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 6. Related Services */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="mx-auto px-6 lg:px-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-black text-dark mb-4 tracking-tight">
              관련 서비스
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              CAUTION SMART CENTER의 다른 프리미엄 서비스도 함께 확인해보세요
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  onSelectService(rel.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group border border-gray-100"
              >
                <div className="w-full h-48 overflow-hidden bg-black">
                  <img
                    src={rel.heroImage}
                    alt={rel.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">
                    <span className="block">{rel.title}</span>
                    {rel.engTitle && (
                      <span className="block text-sm text-gray-500 font-medium mt-1 break-keep">
                        {rel.engTitle}
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
                    {rel.description}
                  </p>
                  <div className="flex items-center text-primary font-semibold text-sm gap-1 group-hover:gap-2 transition-all">
                    <span>자세히 보기</span>
                    <i className="ri-arrow-right-line" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={onNavigateHome}
              className="px-8 py-4 bg-dark text-white text-sm font-semibold rounded-full hover:bg-dark-light transition-all cursor-pointer shadow-md"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
