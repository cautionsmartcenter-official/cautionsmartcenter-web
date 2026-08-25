import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carModel: '',
    serviceType: 'PPS | 컬러PPS',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      alert('상담 및 시공 문의가 정상 접수되었습니다. 담당 테크니션이 신속히 연락드리겠습니다.');
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        carModel: '',
        serviceType: 'PPS | 컬러PPS',
        message: '',
      });
    }, 500);
  };

  return (
    <div className="w-full bg-[#050505] text-white pt-24 pb-20 font-sans min-h-screen">
      {/* ── Page Header ── */}
      <section className="py-16 px-6 sm:px-12 max-w-7xl mx-auto border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="text-red-500 font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 bg-red-500/10 rounded border border-red-500/20">
              Partnership & Location
            </span>
            <h1 className="text-4xl sm:text-6xl font-black font-mono uppercase tracking-tight mt-3 text-white">
              CONTACT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">US</span>
            </h1>
          </div>
          <p className="text-gray-400 text-sm sm:text-base max-w-md font-sans leading-relaxed">
            분당 수입차 사고수리 및 외장관리 전문. 분당, 수원, 용인 픽업 & 드랍 서비스를 함께 제공합니다.
          </p>
        </motion.div>
      </section>

      {/* ── 1. Partnership Banner (partnership_contact.png) ── */}
      <section className="py-16 px-6 sm:px-12 max-w-7xl mx-auto">
        <motion.div
          className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative mb-16 group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="/images/partnership_contact.png"
            alt="비즈니스 파트너십 문의"
            className="w-full h-auto object-cover sharp-img"
          />
          {/* 이미지속 메일/카카오톡 링크 활성화 바 */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-wrap gap-3 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/20 shadow-2xl">
            <a
              href="mailto:cautionsmartcenter@gmail.com"
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md"
            >
              <span>✉️ 이메일 제휴 문의</span>
            </a>
            <a
              href="http://pf.kakao.com/_FxINhX"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-400 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all"
            >
              <span>💬 카카오톡 바로상담</span>
            </a>
          </div>
        </motion.div>

        {/* ── 2. Interactive Form & Quick Contact Cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Side */}
          <motion.div
            className="lg:col-span-7 bg-white/5 border border-white/15 p-8 sm:p-10 rounded-2xl backdrop-blur-xl shadow-2xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white mb-2">
              온라인 견적 및 시공 문의
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mb-8 font-sans">
              차종과 원하시는 시공 내용을 남겨주시면 맞춤 견적서를 안내해드립니다.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono font-bold text-gray-300 uppercase mb-2">성함 / 업체명 *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="홍길동"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-gray-300 uppercase mb-2">연락처 *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="010-0000-0000"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono font-bold text-gray-300 uppercase mb-2">차종 / 연식 *</label>
                  <input
                    type="text"
                    required
                    value={formData.carModel}
                    onChange={e => setFormData({ ...formData, carModel: e.target.value })}
                    placeholder="예: 람보르기니 우루스 2024"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-gray-300 uppercase mb-2">희망 시공 서비스</label>
                  <select
                    value={formData.serviceType}
                    onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors font-sans"
                  >
                    <option value="PPS | 컬러PPS">PPS | 컬러PPS (스프레이 보호/컬러)</option>
                    <option value="수입차 정비수리">수입차 정비수리</option>
                    <option value="판금도색">판금도색 (사고복원)</option>
                    <option value="프리미엄 디테일링">프리미엄 디테일링 / 세라믹코팅</option>
                    <option value="기타 파트너십">비즈니스 파트너십 문의</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-gray-300 uppercase mb-2">문의 내용</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="원하시는 시공 부위나 문의사항을 자유롭게 작성해 주세요."
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full py-4 bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white rounded-xl font-mono font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-red-600/30 cursor-pointer border-none"
              >
                {submitted ? '전송 중...' : '문의사항 제출하기 →'}
              </button>
            </form>
          </motion.div>

          {/* Quick Direct Link Side */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="p-6 rounded-2xl bg-white/5 border border-white/15 space-y-4">
              <h3 className="text-lg font-bold font-mono text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                빠른 직접 연결
              </h3>
              
              <a
                href="tel:031-712-6665"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-white/10 transition-all text-white group"
              >
                <span className="text-2xl">📞</span>
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Phone Contact</span>
                  <span className="text-lg font-bold font-mono group-hover:text-amber-400 transition-colors">+82-031-712-6665</span>
                </div>
              </a>

              <a
                href="mailto:cautionsmartcenter@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-white/10 transition-all text-white group"
              >
                <span className="text-2xl">✉️</span>
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Email Contact</span>
                  <span className="text-sm font-bold font-mono group-hover:text-amber-400 transition-colors">cautionsmartcenter@gmail.com</span>
                </div>
              </a>

              <a
                href="http://pf.kakao.com/_FxINhX"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all text-amber-400 group"
              >
                <span className="text-2xl">💬</span>
                <div>
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider block">Kakao Talk Channel</span>
                  <span className="text-sm font-bold font-mono">카카오톡 채널 상담하기</span>
                </div>
              </a>
            </div>

            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/15 space-y-3">
              <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest font-bold">Center Location</span>
              <h4 className="text-base font-bold text-white">코션스마트센터 위치</h4>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                경기도 광주시 태재로 26 (신현동)
              </p>
              <p className="text-xs text-gray-500">
                (분당, 수원, 용인 등 무료 픽업 & 드랍 서비스 운영)
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. Footer Contact Banner (contact_footer_info.png + Interactive Hotspots) ── */}
      <section className="py-12 px-6 sm:px-12 max-w-7xl mx-auto">
        <motion.div
          className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="/images/contact_footer_info.png"
            alt="Thanks for your attention & Contact details"
            className="w-full h-auto object-cover sharp-img"
          />
          {/* 이미지속 이메일 / 전화번호 / 카카오톡 활성화 오버레이 바 */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:right-6 sm:left-auto flex flex-wrap gap-3 bg-black/85 backdrop-blur-md p-3 rounded-xl border border-white/20 shadow-2xl">
            <a
              href="mailto:cautionsmartcenter@gmail.com"
              className="px-4 py-2 rounded-lg bg-red-600/90 hover:bg-red-500 text-white font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2"
            >
              ✉️ 메일 (cautionsmartcenter@gmail.com)
            </a>
            <a
              href="tel:031-712-6665"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2"
            >
              📞 전화 (031-712-6665)
            </a>
            <a
              href="http://pf.kakao.com/_FxINhX"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg"
            >
              💬 카카오톡 오픈상담
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ContactPage;
