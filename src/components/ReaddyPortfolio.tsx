import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface PortfolioItem {
  id: string;
  category: 'pps' | 'color-pps' | 'paint' | 'repair' | 'detailing';
  categoryName: string;
  title: string;
  carModel: string;
  image: string;
  tags: string[];
  summary: string;
  details: string[];
}

export const PORTFOLIO_DATA: PortfolioItem[] = [
  // 1. PPS (투명)
  {
    id: 'pps-1',
    category: 'pps',
    categoryName: 'PPS',
    title: '포르쉐 911 GT3 RS 풀바디 투명 PPS 시공',
    carModel: 'Porsche 911 GT3 RS (992)',
    image: '/images/readdy/service-hero-ai.jpg',
    tags: ['투명 PPS', '무황변', '자가 복원', 'AI 로봇 시공'],
    summary: '초고속 트랙 주행에 최적화된 완벽한 스톤칩 방어 및 굴곡 부위 무절개 일체형 시공',
    details: [
      '스톤칩 및 미세 스크래치 100% 자가 치유(Self-Healing)',
      '필름 컷팅선 없는 엣지 마감 및 분무 도포 방식',
      '고광택 및 초발수 하이엔드 피니시'
    ]
  },
  {
    id: 'pps-2',
    category: 'pps',
    categoryName: 'PPS',
    title: '람보르기니 우루스 퍼포만테 전체 PPS 보호',
    carModel: 'Lamborghini Urus Performante',
    image: '/images/readdy/service-detail-ai-img.jpg',
    tags: ['전체 PPS', '초발수 코팅', '도장면 100% 보호'],
    summary: '복잡한 카본 파츠와 캐릭터 라인을 완벽하게 감싸는 초정밀 두께 제어 시공',
    details: [
      '공기역학 파츠 및 카본 패키지 완전 보호',
      '자외선(UV) 차단 및 산화 방지 코팅층 형성',
      '세차 및 유지관리 편의성 극대화'
    ]
  },

  // 2. 컬러 PPS
  {
    id: 'color-pps-1',
    category: 'color-pps',
    categoryName: '컬러 PPS',
    title: '페라리 296 GTB 사틴 미드나잇 블루 컬러 PPS',
    carModel: 'Ferrari 296 GTB',
    image: '/images/readdy/service-detail-paint-001.jpg',
    tags: ['컬러 PPS', 'CARDIP', '사틴 피니시', '순정 도장 보존'],
    summary: '도장면 손상 없이 언제든 떼어낼 수 있는 CARDIP Peelable Paint 커스텀 컬러 체인지',
    details: [
      '원하는 컬러로 완벽 변신 + 보호 성능 동시 제공',
      '원복 시 본딩 잔여물 없이 100% 필오프(Peelable)',
      '도장 부스 내 초정밀 열처리 공정'
    ]
  },
  {
    id: 'color-pps-2',
    category: 'color-pps',
    categoryName: '컬러 PPS',
    title: '메르세데스-AMG GT 4도어 매트 블랙 컬러 PPS',
    carModel: 'Mercedes-AMG GT 63 S (X290)',
    image: '/images/readdy/service-paint-001.jpg',
    tags: ['매트 블랙', '컬러 체인지', '뿌리는 페인트'],
    summary: '묵직하고 카리스마 넘치는 매트 질감과 오리지널 실버 컬러 100% 보존',
    details: [
      '이음새 없는 균일한 무광 매트 텍스처',
      '외부 충격에 강한 고탄성 폴리머 보호막',
      '시공 후 정밀 광택 및 휠 클리닝 케어'
    ]
  },

  // 3. 판금도색
  {
    id: 'paint-1',
    category: 'paint',
    categoryName: '판금도색',
    title: '메르세데스-마이바흐 S680 휀더 정밀 조색 복원',
    carModel: 'Mercedes-Maybach S 680 (Z223)',
    image: '/images/readdy/service-hero-paint.jpg',
    tags: ['정밀 조색', '수용성 도료', '원형 복원', '열처리 건조'],
    summary: '글라슈리트 정품 수용성 도료와 컴퓨터 디지털 스펙트로미터 색상 매칭',
    details: [
      '이색감 0.0%의 완벽한 팩토리 컬러 매칭',
      '알루미늄 바디 판금 전용 장비 복원',
      '원적외선 챔버 내 규정 온도 열처리'
    ]
  },
  {
    id: 'paint-2',
    category: 'paint',
    categoryName: '판금도색',
    title: 'BMW M3 컴페티션 리어 범퍼 & 디퓨저 복원',
    carModel: 'BMW M3 Competition (G80)',
    image: '/images/readdy/service-detail-paint-img.jpg',
    tags: ['판금도색', '오리지널 퀄리티', '단차 0% 복원'],
    summary: '외장 복원 및 M 전용 고광택 클리어 코팅으로 신차급 광도 재현',
    details: [
      '미세 단차 교정 및 정밀 센서 캘리브레이션',
      'HS 하이솔리드 프리미엄 클리어 도포',
      '도장면 오렌지필 완벽 레벨링 폴리싱'
    ]
  },

  // 4. 정비수리
  {
    id: 'repair-1',
    category: 'repair',
    categoryName: '정비수리',
    title: '포르쉐 파나메라 터보 S 메이저 메인터넌스',
    carModel: 'Porsche Panamera Turbo S (971)',
    image: '/images/readdy/service-hero-repair.jpg',
    tags: ['메이저 정비', '포르쉐 정품 진단', '소모품 교환', '하체 부싱'],
    summary: 'PIWIS 전용 진단기를 통한 120개 항목 정밀 점검 및 점화·흡배기 메인터넌스',
    details: [
      'PIWIS-III 전용 스캐너 풀 시스템 스캔',
      '정품 점화플러그 및 코일, 모빌1 레이싱 엔진오일',
      '에어 서스펜션 정밀 캘리브레이션'
    ]
  },
  {
    id: 'repair-2',
    category: 'repair',
    categoryName: '정비수리',
    title: 'BMW M5 F90 미션 오일 & 디퍼런셜 오버홀',
    carModel: 'BMW M5 (F90)',
    image: '/images/readdy/service-detail-repair-img.jpg',
    tags: ['ZF 8단 미션', 'M 디퍼런셜', '정밀 오버홀'],
    summary: 'M 드라이브트레인 완벽 성능 유지를 위한 ZF 순정 오일 및 가스켓 풀 교환',
    details: [
      'ZF 순정 필터 일체형 팬 및 전용 플루이드 정량 주입',
      'M xDrive 트랜스퍼 케이스 오일 교환',
      '주행 어댑테이션 리셋 및 로드 테스트'
    ]
  },

  // 5. 디테일링
  {
    id: 'detailing-1',
    category: 'detailing',
    categoryName: '디테일링',
    title: '롤스로이스 고스트 프라이빗 듀얼 수성 광택 & 세라믹 코팅',
    carModel: 'Rolls-Royce Ghost Series II',
    image: '/images/readdy/service-hero-detailing.jpg',
    tags: ['수성 광택', '9H 세라믹 코팅', '가죽 클리닝', '실내 케어'],
    summary: '클리어코트 삭감 없는 수성 컴파운딩과 최고 등급 9H 하드 세라믹 코팅',
    details: [
      '스월마크 99% 제거 및 딥 글로스(Deep Gloss) 복원',
      '2코트 9H 세라믹 코팅으로 초발수 방오막 형성',
      '풀 그레인 천연 가죽 시트 컨디셔닝 케어'
    ]
  },
  {
    id: 'detailing-2',
    category: 'detailing',
    categoryName: '디테일링',
    title: '애스턴마틴 DB12 마스터 디테일링 패키지',
    carModel: 'Aston Martin DB12',
    image: '/images/readdy/service-detail-detailing-img.jpg',
    tags: ['유리막 코팅', '엔진룸 클리닝', '휠 캘리퍼 코팅'],
    summary: '외장 페인트, 유리, 휠, 엔진룸까지 신차 이상의 상태로 완성하는 마스터 패키지',
    details: [
      '나노 세라믹 윈도우 발수 코팅',
      '브레이크 분진 고열 저항 캘리퍼 코팅',
      '실내 알칸타라 및 가죽 풀 디테일링'
    ]
  }
];

const CATEGORIES = [
  { id: 'all', name: '전체보기' },
  { id: 'pps', name: 'PPS' },
  { id: 'color-pps', name: '컬러 PPS' },
  { id: 'paint', name: '판금도색' },
  { id: 'repair', name: '정비수리' },
  { id: 'detailing', name: '디테일링' }
];

interface ReaddyPortfolioProps {
  onNavigateToContact: (serviceName?: string) => void;
}

export const ReaddyPortfolio: React.FC<ReaddyPortfolioProps> = ({ onNavigateToContact }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const filteredItems =
    selectedCategory === 'all'
      ? PORTFOLIO_DATA
      : PORTFOLIO_DATA.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white text-dark">
      {/* ── 1. Portfolio Hero Banner ── */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex items-center justify-center bg-black overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="/images/readdy/brand-hero-clean.jpg"
            alt="Caution Portfolio"
            className="w-full h-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/75" />
        </div>

        <div className="relative z-10 mx-auto px-6 lg:px-12 max-w-5xl text-center pt-32 sm:pt-40 pb-20 sm:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 bg-primary rounded-full mb-6">
              <span className="text-xs font-semibold text-white tracking-wider">PORTFOLIO</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
              시공 갤러리 & 포트폴리오
            </h1>
            <p className="text-sm sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
              CAUTION SMART CENTER의 독보적인 기술력으로 완성된 슈퍼카 및 프리미엄 수입차 시공 사례를 확인해 보세요.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Category Filter Tabs ── */}
      <section className="py-8 bg-gray-50 border-b border-gray-200/80 sticky top-16 sm:top-20 z-30 backdrop-blur-md bg-gray-50/95">
        <div className="mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/30 scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Portfolio Grid ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col group cursor-pointer"
                  onClick={() => setActiveModalItem(item)}
                >
                  {/* Image Container */}
                  <div className="relative w-full h-64 overflow-hidden bg-black">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1.5 bg-black/70 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20">
                        {item.categoryName}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-primary mb-1.5 uppercase tracking-wider">
                        {item.carModel}
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-primary transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
                        {item.summary}
                      </p>
                    </div>

                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Action */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-xs font-bold text-gray-400 group-hover:text-dark transition-colors">
                          상세 시공기 보기
                        </span>
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                          <i className="ri-arrow-right-up-line text-base font-bold" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── 4. Portfolio Bottom Consultation Banner ── */}
      <section className="py-20 sm:py-28 bg-[#111827] text-white text-center">
        <div className="mx-auto px-6 lg:px-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-5 tracking-tight">
              내 차량에 딱 맞는 시공 견적이 궁금하신가요?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-9 leading-relaxed max-w-2xl mx-auto">
              PPS부터 판금도색, 메디컬 정비, 디테일링까지 최고 수준의 마스터가 1:1 맞춤 견적을 안내해 드립니다.
            </p>
            <button
              onClick={() => onNavigateToContact()}
              className="inline-flex items-center gap-2.5 px-9 py-4 bg-primary hover:bg-primary-dark text-white text-base font-bold rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
            >
              <span>포트폴리오 맞춤 견적 상담하기</span>
              <i className="ri-arrow-right-line text-lg" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── 5. Detail Lightbox Modal ── */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Content Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-white rounded-[32px] overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="닫기"
              >
                <i className="ri-close-line text-2xl" />
              </button>

              {/* Modal Image */}
              <div className="relative w-full h-72 sm:h-80 bg-black shrink-0">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-4 left-6">
                  <span className="px-3.5 py-1.5 bg-primary text-white text-xs font-bold rounded-full shadow">
                    {activeModalItem.categoryName}
                  </span>
                </div>
              </div>

              {/* Modal Details Body */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1">
                <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">
                  {activeModalItem.carModel}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
                  {activeModalItem.title}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed mb-6 font-medium">
                  {activeModalItem.summary}
                </p>

                <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100">
                  <div className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                    주요 작업 내역 & 기술 포인트
                  </div>
                  <ul className="space-y-2.5">
                    {activeModalItem.details.map((det, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-sm text-gray-700 font-medium">
                        <i className="ri-checkbox-circle-fill text-primary text-base shrink-0 mt-0.5" />
                        <span>{det}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      const serviceTarget =
                        activeModalItem.category === 'repair'
                          ? '수입차 정비'
                          : activeModalItem.category === 'paint'
                          ? '판금도색'
                          : activeModalItem.category === 'detailing'
                          ? '디테일링'
                          : 'PPS (Paint Protection Spray)';
                      setActiveModalItem(null);
                      onNavigateToContact(serviceTarget);
                    }}
                    className="flex-1 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-full transition-all text-center cursor-pointer shadow-lg shadow-primary/30"
                  >
                    이 시공으로 맞춤 견적 문의하기
                  </button>
                  <button
                    onClick={() => setActiveModalItem(null)}
                    className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-full transition-all text-center cursor-pointer"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
