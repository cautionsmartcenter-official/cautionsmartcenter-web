import React from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Sparkles, Youtube, CheckCircle2 } from 'lucide-react';

export const ReaddyYouTubeSection: React.FC = () => {
  const youtubeUrl = 'https://www.youtube.com/@cautionsmartcenter_official';

  const showcaseVideos = [
    {
      id: 'curverobot',
      title: 'CurveRobot 지능형 로봇 정밀 도장 공정',
      category: 'CurveRobot™',
      desc: '3D 레이저 스캐닝 기반 마이크론 단위의 균일한 도포와 무결점 스프레이 공정',
      image: '/images/curverobot_urus_booth.jpg',
      badge: '로봇 자동화'
    },
    {
      id: 'pps',
      title: '독일 정품 CARDIP® PPS 도장 보호막 시공',
      category: 'CARDIP® PPS',
      desc: '칼을 쓰지 않는 Seamless 분사 공법과 완벽한 원상 복구 Peelable Paint 성능',
      image: '/images/readdy/service-detail-ai-img.jpg',
      badge: '페인트 보호'
    },
    {
      id: 'restoration',
      title: '하이엔드 수입차 & 슈퍼카 정밀 복원 스토리',
      category: '사고수리 & 판금도색',
      desc: '99.9% 분광 조색기와 공식 수용성 페인트로 완성하는 신차급 복원 비포 & 애프터',
      image: '/images/readdy/portfolio-001.jpg',
      badge: '프리미엄 복원'
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-neutral-950 text-white relative overflow-hidden border-t border-white/10">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/15 border border-red-500/30 mb-4">
              <Youtube className="w-4 h-4 text-red-500" />
              <span className="text-xs font-mono font-bold text-red-400 tracking-wider uppercase">
                OFFICIAL YOUTUBE CHANNEL
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans uppercase tracking-tight text-white leading-tight">
              코션스마트센터 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-400">공식 시공 영상</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
              독보적인 <strong className="text-white">CurveRobot</strong> 지능형 도장 기술과 독일 <strong className="text-white font-cardip font-black">CARDIP®</strong> PPS, 프리미엄 수입차 복원의 전 과정을 생생한 영상으로 직접 확인하세요.
            </p>
          </div>

          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-lg shadow-red-600/30 group whitespace-nowrap cursor-pointer shrink-0 self-start md:self-auto"
          >
            <Youtube className="w-4 h-4" />
            <span>유튜브 채널 바로가기</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Video Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {showcaseVideos.map((video, idx) => (
            <motion.a
              key={video.id}
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative rounded-2xl sm:rounded-3xl bg-neutral-900/80 border border-white/10 hover:border-red-500/40 overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col"
            >
              {/* Thumbnail Container with Play Overlay */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <img
                  src={video.image}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/40 to-transparent" />

                {/* Badge */}
                <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-bold text-gray-200">
                  {video.badge}
                </div>

                {/* Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 block mb-1.5">
                    {video.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug mb-2">
                    {video.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-2">
                    {video.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 group-hover:text-white transition-colors">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                    <span>공식 채널에서 시청</span>
                  </span>
                  <span className="flex items-center gap-1 text-red-400 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>영상 보기</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Channel Banner Callout */}
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-red-950/40 via-neutral-900 to-neutral-900 border border-red-500/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-red-600/30">
              <Youtube className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-0.5">
                <span className="text-xs font-mono font-bold text-red-400">@cautionsmartcenter_official</span>
                <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[10px] font-bold">공식 채널</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300">
                구독과 좋아요를 누르시면 최신 시공 영상과 프로모션 소식을 가장 먼저 받아보실 수 있습니다.
              </p>
            </div>
          </div>

          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-gray-100 text-black text-xs sm:text-sm font-black rounded-full transition-all text-center whitespace-nowrap shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-red-600" />
            <span>유튜브 채널 구독하기</span>
          </a>
        </div>
      </div>
    </section>
  );
};
