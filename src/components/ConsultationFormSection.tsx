import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Car
} from 'lucide-react';

interface ConsultationFormSectionProps {
  initialService?: string;
}

export function ConsultationFormSection({ initialService }: ConsultationFormSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carModel: '',
    carType: 'sedan',
    service: initialService || 'AI 로봇 PPS / PPCS',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const carTypes = [
    { id: 'sedan', name: '세단 / 쿠페', image: '/images/readdy/car-silhouette-001.jpg' },
    { id: 'suv', name: 'SUV / RV', image: '/images/readdy/car-silhouette-002.jpg' },
    { id: 'supercar', name: '슈퍼카 / 스포츠', image: '/images/readdy/car-silhouette-003.jpg' }
  ];

  return (
    <section id="consultation-section" className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto relative border-t border-white/10">
      {/* Glow Effects */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Silhouette Banner (Readdy Reference Exact Component) */}
      <div className="mb-16 p-8 rounded-3xl bg-gradient-to-r from-neutral-950 via-[#111] to-neutral-950 border border-white/10 relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto relative z-10 mb-8">
          <h3 className="text-2xl sm:text-3xl font-black font-mono text-white">
            차량 종류별 맞춤 정밀 시공
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm mt-2">
            세단, 프리미엄 SUV부터 하이엔드 슈퍼카까지 차체 굴곡에 맞춘 1:1 맞춤 견적을 산출합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
          {carTypes.map((ct) => (
            <div
              key={ct.id}
              onClick={() => setFormData({ ...formData, carType: ct.id })}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-between text-center ${
                formData.carType === ct.id
                  ? 'bg-red-600/15 border-red-500 shadow-lg shadow-red-600/20'
                  : 'bg-black/40 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="h-20 flex items-center justify-center mb-2">
                <img
                  src={ct.image}
                  alt={ct.name}
                  className="max-h-16 w-auto object-contain filter invert opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
              <span className={`text-xs font-mono font-bold ${formData.carType === ct.id ? 'text-amber-400' : 'text-gray-300'}`}>
                {ct.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* Left Side: Contact Information & Direct Channels (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-red-500" />
              <span className="text-xs font-mono font-bold text-red-500 tracking-wider uppercase">
                FAST DIRECT CONSULTATION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-mono uppercase tracking-tight text-white leading-tight">
              실시간 견적 & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-white">
                전문 마스터 1:1 상담
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed font-sans">
              차량 관리, 판금도색, AI PPS 시공 등 궁금하신 사항을 남겨주시면 24년 경력의 전문 어드바이저가 빠르고 친절하게 맞춤 견적을 안내해 드립니다.
            </p>

            {/* Quick Contact Cards */}
            <div className="space-y-4 mt-8">
              <a
                href="tel:031-712-6665"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-red-500/40 hover:bg-white/[0.06] transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-gray-400">대표 전화 문의 (즉시 연결)</div>
                  <div className="text-lg font-bold font-mono text-white group-hover:text-amber-400 transition-colors">
                    031-712-6665
                  </div>
                </div>
              </a>

              <a
                href="http://pf.kakao.com/_FxINhX"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-black flex items-center justify-center font-black group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-amber-300">카카오톡 1:1 실시간 채널</div>
                  <div className="text-base font-bold text-amber-400 flex items-center gap-1">
                    카카오톡 실시간 상담 시작 →
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 shrink-0">
                  <MapPin className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-gray-400">코션스마트센터 위치</div>
                  <div className="text-sm font-bold text-gray-200">
                    경기도 광주시 태재로 26 (신현동)
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    분당 판교 10분 거리 / 수도권 픽업&드랍 무료
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-xs font-mono text-gray-500 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>운영시간: 평일 09:00 - 18:30 (주말 예약제 운영)</span>
          </div>
        </div>

        {/* Right Side: Interactive Consultation Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#141414] to-[#0c0c0c] border border-white/15 shadow-2xl relative overflow-hidden">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black font-mono text-white">
                  상담 신청이 성공적으로 접수되었습니다!
                </h3>
                <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  남겨주신 연락처(<strong className="text-amber-400">{formData.phone}</strong>)로 코션스마트센터 전문 어드바이저가 확인 후 신속하게 연락드리겠습니다.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all mt-4 cursor-pointer"
                >
                  추가 문의 작성하기
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                    ONLINE ESTIMATE FORM
                  </span>
                  <span className="text-xs font-mono text-red-400">* 필수 입력 항목</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-gray-300 mb-2">
                      고객명 / 직함 *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="예: 홍길동"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-gray-300 mb-2">
                      연락처 (휴대전화) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="예: 010-1234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Car Model */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-gray-300 mb-2">
                      차종 / 연식 (선택)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="예: 포르쉐 911 / 2023년식"
                        value={formData.carModel}
                        onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-red-500 transition-colors"
                      />
                      <Car className="w-4 h-4 text-gray-500 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Service Choice */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-gray-300 mb-2">
                      관심 서비스 선택 *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
                    >
                      <option value="AI 로봇 PPS / PPCS">AI 로봇 PPS / PPCS (신차 보호 & 컬러 체인지)</option>
                      <option value="수입차 전문 정비">수입차 전문 정비 (엔진/미션/소모품/진단)</option>
                      <option value="정밀 판금도색 / 사고수리">정밀 판금도색 / 사고수리 (자차·대물 보험수리)</option>
                      <option value="하이엔드 디테일링">하이엔드 디테일링 (광택 & 세라믹 코팅)</option>
                      <option value="마이바흐 듀오톤 도장">마이바흐 듀오톤 컬러PPS 시공</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-mono font-bold text-gray-300 mb-2">
                    상세 문의 내용 (차량 증상 또는 요청사항)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="시공을 희망하시는 부위나 사고 수리 내역, 문의사항을 자유롭게 적어주세요."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-red-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-mono text-sm font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-600/30 active:scale-[0.99] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>접수 처리 중...</span>
                  ) : (
                    <>
                      <span>무료 맞춤 견적 & 상담 신청하기</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-gray-500 text-center font-mono">
                  🔒 고객님의 개인정보는 상담 목적으로만 안전하게 사용되며 외부에 제공되지 않습니다.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
