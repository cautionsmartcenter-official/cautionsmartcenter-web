import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink, Sparkles, Youtube, X, Maximize2, Film, Flame } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  desc: string;
  thumbnail: string;
  isShort?: boolean;
}

export const ReaddyYouTubeSection: React.FC = () => {
  const youtubeUrl = 'https://www.youtube.com/@cautionsmartcenter_official';
  const [activeTab, setActiveTab] = useState<'featured' | 'shorts'>('featured');
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [modalVideo, setModalVideo] = useState<VideoItem | null>(null);

  // 공식 추천 본편 롱폼 영상 (실제 채널 최고 인기 & 핵심 기술 영상)
  const featuredVideos: VideoItem[] = [
    {
      id: '2QwoCYNrx4I',
      title: '"독일 본토보다 뛰어납니다!" 까다로운 독일 본사 대표가 한국 코션에 와서 감탄한 이유 🇩🇪',
      category: '독일 본사 공식 인증',
      badge: '글로벌 기술 인증',
      desc: '독일 CARDIP® 본사 대표가 직접 코션스마트센터를 방문하여 도장 시설과 무결점 시공 기술력을 검증하고 아시아 최고를 인정한 공식 영상',
      thumbnail: 'https://img.youtube.com/vi/2QwoCYNrx4I/maxresdefault.jpg'
    },
    {
      id: '7LKa7GJrOGg',
      title: '3억 원대 마이바흐 GLS600에 "상단 칼라하리골드" 칠했더니 미친 핏감 실화?! 👑✨',
      category: '마이바흐 시그니처 투톤',
      badge: '대표 시공 사례',
      desc: '마이바흐 정품 출고 라인을 1mm 오차 없이 정밀 계측하고, 칼자국 없이 도장면 위에 완성한 칼라하리 골드 분무 도포 투톤 시공 실황',
      thumbnail: 'https://img.youtube.com/vi/7LKa7GJrOGg/maxresdefault.jpg'
    },
    {
      id: '3Girz9VCUkg',
      title: '마이바흐 3대 동시 비교! PPS vs PPF vs 랩핑, 내 차에 딱 맞는 외장 관리는?',
      category: '외장 관리 3종 비교',
      badge: '필독 시공 가이드',
      desc: '찢어지고 황변 오는 필름과 뿌리는 보호막의 차이! 마이바흐 3대를 나란히 놓고 직접 비교 분석한 국내 유일 3종 전문 센터 가이드',
      thumbnail: 'https://img.youtube.com/vi/3Girz9VCUkg/maxresdefault.jpg'
    },
    {
      id: 'GtgO0-ilPvQ',
      title: '주차장에서 긁힌 2억짜리 벤츠 G450d… 투명 보호막을 벗기자 도장은 멀쩡했다?! (소름 반전)',
      category: '신차 투명 PPS 보호',
      badge: '실차 보호 검증',
      desc: '일상 주차 충격과 험로 스톤칩으로부터 순정 도장을 100% 무손상으로 지켜낸 투명 PPS의 놀라운 필오프(Peel-off) 박리 및 원상복구 현장',
      thumbnail: 'https://img.youtube.com/vi/GtgO0-ilPvQ/maxresdefault.jpg'
    }
  ];

  // 공식 인기 쇼츠 4편 (1분 핵심 시공 팁)
  const shortsVideos: VideoItem[] = [
    {
      id: 'sqwWe22PyyU',
      title: '신차 지바겐에 칼을 대는 이유? #shorts',
      category: '벤츠 G바겐',
      badge: '신차 전체보호',
      desc: '수억 원대 신차 도장면에 칼날 대신 무절개 분무 공법으로 보호막을 입히는 혁신적인 시공 과정',
      thumbnail: 'https://img.youtube.com/vi/sqwWe22PyyU/hqdefault.jpg',
      isShort: true
    },
    {
      id: 'Byl47MMlk-k',
      title: '마이바흐 끝판왕 투톤, 로즈골드 랩핑 아닙니다 #shorts',
      category: '마이바흐 비스포크',
      badge: '로즈골드 투톤',
      desc: '일반 필름 랩핑의 이질감 없이 순정 메탈릭 도장 광택을 그대로 재현한 로즈골드 투톤 마스터피스',
      thumbnail: 'https://img.youtube.com/vi/Byl47MMlk-k/hqdefault.jpg',
      isShort: true
    },
    {
      id: 'TpzjACHFQU0',
      title: '3억짜리 애스턴마틴 DBX에 일반 랩핑하면 땅을 치고 후회하는 이유 😱 #shorts',
      category: '애스턴마틴 DBX',
      badge: '슈퍼 SUV 보호',
      desc: '곡면과 엣지가 많은 슈퍼 SUV에 칼자국과 필름 들뜸 없이 완벽 밀착되는 스프레이 PPS의 차이',
      thumbnail: 'https://img.youtube.com/vi/TpzjACHFQU0/hqdefault.jpg',
      isShort: true
    },
    {
      id: 'Bob6i5v8hmw',
      title: '시속 250km 서킷 돌빵, 칼질 없이 막았다? #shorts',
      category: '고성능 스포츠카',
      badge: '스톤칩 완벽방어',
      desc: '초고속 주행 스톤칩과 트랙 주행 충격을 완벽하게 튕겨내는 탄성 보호 도막의 놀라운 방어력',
      thumbnail: 'https://img.youtube.com/vi/Bob6i5v8hmw/hqdefault.jpg',
      isShort: true
    }
  ];

  const currentVideos = activeTab === 'featured' ? featuredVideos : shortsVideos;

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-neutral-950 text-white relative overflow-hidden border-t border-white/10" id="youtube-section">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/15 border border-red-500/30 mb-4">
              <Youtube className="w-4 h-4 text-red-500" />
              <span className="text-xs font-mono font-bold text-red-400 tracking-wider uppercase">
                OFFICIAL YOUTUBE MEDIA
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans uppercase tracking-tight text-white leading-tight">
              영상으로 증명하는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-400">압도적 기술력</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
              독일 본사 대표가 직접 방문해 극찬한 <strong className="text-white font-cardip font-black">CARDIP®</strong> 시공력부터 
              3억 마이바흐 투톤, PPS vs PPF 3종 실차 비교까지 백 마디 말보다 확실한 영상으로 직접 확인하세요.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-lg shadow-red-600/30 group whitespace-nowrap cursor-pointer shrink-0"
            >
              <Youtube className="w-4 h-4" />
              <span>유튜브 채널 바로가기</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2.5 mb-8 border-b border-white/10 pb-4">
          <button
            type="button"
            onClick={() => {
              setActiveTab('featured');
              setPlayingVideoId(null);
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'featured'
                ? 'bg-white text-black shadow-md'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Film className="w-4 h-4 text-red-600" />
            <span>공식 추천 영상 ({featuredVideos.length})</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('shorts');
              setPlayingVideoId(null);
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'shorts'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>1분 핵심 쇼츠 ({shortsVideos.length})</span>
          </button>
        </div>

        {/* Video Grid */}
        <div className={`grid gap-6 lg:gap-8 mb-14 ${
          activeTab === 'featured' 
            ? 'grid-cols-1 md:grid-cols-2' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        }`}>
          {currentVideos.map((video, idx) => {
            const isPlayingInline = playingVideoId === video.id;

            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="group relative rounded-2xl sm:rounded-3xl bg-neutral-900/90 border border-white/10 hover:border-red-500/40 overflow-hidden shadow-xl hover:shadow-2xl transition-all flex flex-col"
              >
                {/* Video / Thumbnail Container */}
                <div className={`relative w-full overflow-hidden bg-black ${
                  video.isShort ? 'aspect-[9/14]' : 'aspect-video'
                }`}>
                  {isPlayingInline ? (
                    // ── Inline YouTube Player ──
                    <div className="w-full h-full relative">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
                        title={video.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingVideoId(null);
                        }}
                        className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/80 hover:bg-black text-white text-[11px] font-bold backdrop-blur-md border border-white/20 flex items-center gap-1 z-20 cursor-pointer"
                        title="플레이어 닫기"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>닫기</span>
                      </button>
                    </div>
                  ) : (
                    // ── Thumbnail with Custom Play Overlay ──
                    <div
                      className="w-full h-full relative cursor-pointer group"
                      onClick={() => setPlayingVideoId(video.id)}
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/30 to-black/20" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                        <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-bold text-white shadow-md">
                          {video.badge}
                        </span>
                        
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalVideo(video);
                          }}
                          className="pointer-events-auto p-1.5 rounded-full bg-black/70 hover:bg-red-600 text-gray-300 hover:text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                          title="큰 화면으로 보기"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Animated Center Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative flex items-center justify-center">
                          {/* Pulsing ring */}
                          <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600/30 animate-ping pointer-events-none" />
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl shadow-red-600/50 group-hover:scale-110 group-hover:bg-red-500 transition-all duration-300">
                            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
                          </div>
                        </div>
                      </div>

                      {/* Hover Play Guide */}
                      <div className="absolute bottom-3 left-3 right-3 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="inline-block px-3 py-1 rounded-full bg-black/85 backdrop-blur-md text-[11px] font-bold text-gray-200 border border-white/15">
                          클릭하여 바로 재생 ▶
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Text Information */}
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

                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                    <button
                      type="button"
                      onClick={() => setPlayingVideoId(video.id)}
                      className="inline-flex items-center gap-1.5 text-white hover:text-red-400 font-bold transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                      <span>{isPlayingInline ? '재생 중' : '사이트에서 재생'}</span>
                    </button>

                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                      title="YouTube 앱/웹에서 시청"
                    >
                      <span>YouTube에서 보기</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
                구독과 알림 설정을 하시면 매주 업데이트되는 슈퍼카 시공 현장과 시공 팁을 가장 먼저 만나보실 수 있습니다.
              </p>
            </div>
          </div>

          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-gray-100 text-black text-xs sm:text-sm font-black rounded-full transition-all text-center whitespace-nowrap shadow-md cursor-pointer flex items-center justify-center gap-2 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-red-600" />
            <span>유튜브 채널 구독하기</span>
          </a>
        </div>
      </div>

      {/* ── Modal Lightbox Player (큰 화면 재생) ── */}
      <AnimatePresence>
        {modalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10"
            onClick={() => setModalVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-neutral-900 border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-neutral-950/80">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-400 text-xs font-bold shrink-0">
                    {modalVideo.badge}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white truncate">
                    {modalVideo.title}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => setModalVideo(null)}
                  className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer shrink-0 ml-3"
                  title="닫기 (ESC)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Video Frame */}
              <div className={`w-full bg-black ${modalVideo.isShort ? 'aspect-[9/14] max-h-[75vh] mx-auto' : 'aspect-video'}`}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${modalVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={modalVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-neutral-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-400 border-t border-white/10">
                <p className="line-clamp-1">{modalVideo.desc}</p>
                <a
                  href={`https://www.youtube.com/watch?v=${modalVideo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-red-600 text-white font-bold transition-all shrink-0 cursor-pointer"
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span>YouTube에서 열기</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
