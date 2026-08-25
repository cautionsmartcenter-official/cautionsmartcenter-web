import React from 'react';
import { motion } from 'framer-motion';

export const ReaddyCtaSection: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-32 bg-dark overflow-hidden text-white">
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 mx-auto px-6 lg:px-12 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight">
            지금 바로 시작하세요
          </h2>
          <p className="text-sm sm:text-lg text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto">
            전문가 상담부터 AI 시공까지, 원스톱 서비스
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-primary text-white text-sm sm:text-base font-bold rounded-full hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer group"
          >
            <span>무료 상담 신청하기</span>
            <i className="ri-arrow-right-line text-lg sm:text-xl group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* 3 German Big 3 Realistic 4K Studio Renders (Mercedes-Benz, BMW, Audi) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 sm:mt-16 flex items-center justify-center gap-3 sm:gap-6 lg:gap-8 px-2"
        >
          {/* Mercedes-Benz E-Class */}
          <div className="flex-1 max-w-[280px] sm:max-w-[340px] rounded-2xl overflow-hidden group">
            <img
              src="/images/cars/german3_benz.jpg"
              alt="Mercedes-Benz E-Class White Studio Render"
              className="w-full h-auto object-cover rounded-xl sm:rounded-2xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* BMW 5 Series Metallic Blue */}
          <div className="flex-1 max-w-[280px] sm:max-w-[340px] rounded-2xl overflow-hidden group">
            <img
              src="/images/cars/german3_bmw.jpg"
              alt="BMW 5 Series Blue Studio Render"
              className="w-full h-auto object-cover rounded-xl sm:rounded-2xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Audi RS7 Nardo Grey */}
          <div className="flex-1 max-w-[280px] sm:max-w-[340px] rounded-2xl overflow-hidden group">
            <img
              src="/images/cars/german3_audi.jpg"
              alt="Audi RS7 Nardo Grey Studio Render"
              className="w-full h-auto object-cover rounded-xl sm:rounded-2xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
