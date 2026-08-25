import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CAR_DATABASE } from '../config/carData';

interface ReaddyContactSectionProps {
  initialService?: string;
}

export const ReaddyContactSection: React.FC<ReaddyContactSectionProps> = ({ initialService }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    brand: '',
    model: '',
    codeName: '',
    customModel: '',
    service: initialService || '',
    message: ''
  });

  React.useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // 현재 선택된 브랜드의 모델 리스트
  const currentBrandObj = CAR_DATABASE.find((b) => b.id === formData.brand);
  const availableModels = currentBrandObj ? currentBrandObj.models : [];

  // 현재 선택된 모델의 섀시 코드명 리스트
  const currentModelObj = availableModels.find((m) => m.name === formData.model);
  const availableCodeNames = currentModelObj ? currentModelObj.codeNames : [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'brand') {
      setFormData({
        ...formData,
        brand: value,
        model: '',
        codeName: '',
        customModel: ''
      });
    } else if (name === 'model') {
      setFormData({
        ...formData,
        model: value,
        codeName: '',
        customModel: ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    setTimeout(() => {
      setIsSubmitting(false);
      setStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        brand: '',
        model: '',
        codeName: '',
        customModel: '',
        service: '',
        message: ''
      });
    }, 600);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white text-dark">
      <div className="mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 bg-primary rounded-full mb-6 shadow-sm">
              <span className="text-xs font-semibold text-white tracking-wider">CONTACT US</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
              상담 신청하기
            </h2>

            <p className="text-base text-gray-600 leading-relaxed mb-12">
              차량 관리에 대한 궁금한 점이나 서비스 문의사항을 남겨주세요. 섀시 코드명(Chassis Code)별 맞춤형 시공 노하우와 정확한 견적을 빠르게 안내해 드립니다.
            </p>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <i className="ri-phone-line text-primary text-xl" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">전화 문의</div>
                  <a href="tel:031-712-6665" className="text-base text-gray-600 hover:text-primary font-medium">
                    031-712-6665
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <i className="ri-mail-line text-primary text-xl" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">이메일</div>
                  <a href="mailto:info@cautioncenter.com" className="text-base text-gray-600 hover:text-primary">
                    info@cautioncenter.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <i className="ri-map-pin-line text-primary text-xl" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">주소</div>
                  <div className="text-base text-gray-600">
                    경기도 광주시 태재로 26 (신현동) / 분당 본점
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <i className="ri-time-line text-primary text-xl" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">운영 시간</div>
                  <div className="text-base text-gray-600">평일 09:00 - 18:30</div>
                  <div className="text-sm text-gray-500">주말 및 공휴일 예약제 운영</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
              {/* Customer Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  이름 *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors text-gray-900"
                  placeholder="홍길동"
                />
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors text-gray-900"
                    placeholder="010-1234-5678"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors text-gray-900"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              {/* 🚗 3-Step Smart Chassis Code Selector */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Chassis Code Selector
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium">제조사 · 모델 · 섀시코드명</span>
                </div>

                {/* Step 1: Brand & Step 2: Model */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="brand" className="block text-xs font-bold text-gray-800 mb-1.5">
                      차량 제조사 (브랜드) *
                    </label>
                    <select
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer text-gray-900 font-medium"
                    >
                      <option value="">제조사를 선택하세요</option>
                      {CAR_DATABASE.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.nameKr} ({b.name})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="model" className="block text-xs font-bold text-gray-800 mb-1.5">
                      상세 모델명 *
                    </label>
                    <select
                      id="model"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      disabled={!formData.brand}
                      required
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer text-gray-900 font-medium disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {!formData.brand ? '제조사를 먼저 선택해주세요' : '모델을 선택하세요'}
                      </option>
                      {availableModels.map((m) => (
                        <option key={m.name} value={m.name}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Step 3: Chassis Code (바디 / 섀시 코드명) */}
                <div>
                  <label htmlFor="codeName" className="block text-xs font-bold text-gray-800 mb-1.5">
                    섀시 / 바디 코드명 (Chassis Code) *
                  </label>
                  <select
                    id="codeName"
                    name="codeName"
                    value={formData.codeName}
                    onChange={handleChange}
                    disabled={!formData.model}
                    required
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer text-gray-900 font-medium disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {!formData.model ? '모델을 먼저 선택해주세요' : '코드명을 선택하세요 (예: 992.2, W223, G80 M3 등)'}
                    </option>
                    {availableCodeNames.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                    <option value="기타 / 직접 입력">기타 / 세부 코드명 직접 입력</option>
                  </select>
                </div>

                {/* Optional Custom Input if '기타' or not listed */}
                {(formData.codeName.includes('기타') || formData.brand === 'other') && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-1"
                  >
                    <input
                      type="text"
                      name="customModel"
                      value={formData.customModel}
                      onChange={handleChange}
                      placeholder="차종명 또는 바디 코드명을 직접 입력해주세요 (예: BMW G80 M3 컴페티션)"
                      className="w-full px-3.5 py-2.5 bg-white border border-primary/40 rounded-xl text-sm focus:outline-none focus:border-primary text-gray-900"
                    />
                  </motion.div>
                )}
              </div>

              {/* Service Selection */}
              <div>
                <label htmlFor="service" className="block text-sm font-semibold text-gray-900 mb-2">
                  관심 서비스 *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer text-gray-900"
                >
                  <option value="">선택해주세요</option>
                  <option value="PPS (Paint Protection Spray)">PPS (Paint Protection Spray) - CARDIP 뿌리는 페인트</option>
                  <option value="수입차 정비">수입차 전문 정비 (메인터넌스 / 오버홀)</option>
                  <option value="판금도색">판금도색 (정밀 조색 복원)</option>
                  <option value="디테일링">프리미엄 디테일링 (광택 / 유리막 코팅)</option>
                  <option value="기타">기타 복합 시공 상담</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  문의 내용
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors resize-none text-gray-900"
                  placeholder="문의하실 내용이나 차량 상태를 편하게 입력해주세요 (최대 500자)"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer shadow-md hover:shadow-lg active:scale-95"
              >
                {isSubmitting ? '상담 접수 중...' : '맞춤 견적 & 상담 신청하기'}
              </button>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-xl text-center"
                >
                  <p className="text-sm text-green-800 font-bold">
                    ✓ 섀시 코드 기반 맞춤 견적 문의가 성공적으로 접수되었습니다.
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    담당 마스터 엔지니어가 확인 후 빠르게 연락드리겠습니다.
                  </p>
                </motion.div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-center">
                  <p className="text-sm text-red-800 font-medium">
                    문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.
                  </p>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
