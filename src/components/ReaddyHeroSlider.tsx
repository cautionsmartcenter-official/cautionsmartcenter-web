import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';

export interface SlideItem {
  id: number;
  image: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
}

const HERO_SLIDES: SlideItem[] = [
  {
    id: 1,
    image: '/images/hero/slide1.png',
    tag: 'SIGNATURE COLOR CHANGE PPS',
    title: '마이바흐 투톤PPS',
    subtitle: 'MAYBACH S-CLASS TWO-TONE',
    description: '순정 투톤의 품격과 도장면 보호를 동시에 완성하는 최고급 Peelable Paint 피러블페인트 컬러PPS 노틱블루 | 라이트로즈골드'
  },
  {
    id: 2,
    image: '/images/hero/slide2.png',
    tag: 'SIGNATURE COLOR CHANGE PPS',
    title: '마이바흐 투톤PPS',
    subtitle: 'MAYBACH S-CLASS TWO-TONE',
    description: '순정 투톤의 품격과 도장면 보호를 동시에 완성하는 최고급 Peelable Paint 피러블페인트 컬러PPS 베르데실버 | 오팔라이트화이트'
  },
  {
    id: 3,
    image: '/images/hero/slide3.png',
    tag: 'MATTE PROTECTION SYSTEM',
    title: 'BMW X7 무광PPS',
    subtitle: 'BMW X7 MATT PPS',
    description: '원도장 손상 없이 고급스러운 반무광 사틴 질감으로 전환하는 무광 보호 솔루션 MATT PPS'
  },
  {
    id: 4,
    image: '/images/hero/slide4.png',
    tag: 'SUPERCAR SEAMLESS PROTECTION',
    title: '람보르기니 아벤타도르 컬러PPS',
    subtitle: 'LAMBORGHINI AVENTADOR AD PERSONAM',
    description: '복잡한 에어로 파츠와 극단적 곡면까지 칼 없이 완성하는 컬러PPS 비올라피네오 | 비올라 헤스티아'
  }
];


const SLIDE_DURATION = 11000;
interface ReaddyHeroSliderProps { onNavigateToContact: () => void }

/** Original pictures and copy; only presentation and playback are renewed. */
export const ReaddyHeroSlider: React.FC<ReaddyHeroSliderProps> = ({ onNavigateToContact }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(!document.hidden);
  const [isInteracting, setIsInteracting] = useState(false);
  const reduced = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const touchStart = useRef<{x:number;y:number}|null>(null);
  const elapsed = useRef(0);
  const progress = useRef<HTMLSpanElement>(null);
  const playing = isPlaying && isVisible && isPageVisible && !isInteracting && !reduced;
  const change = useCallback((idx: number) => {
    elapsed.current = 0;
    setCurrentIndex((idx + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);
  const choose = (idx: number) => { setIsPlaying(false); change(idx); };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {threshold:0.15});
    if (root.current) observer.observe(root.current);
    const visibility = () => setIsPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => {observer.disconnect(); document.removeEventListener('visibilitychange', visibility);};
  }, []);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      elapsed.current += Math.min(now - previous, 100);
      previous = now;
      if (progress.current) progress.current.style.transform = `scaleX(${Math.min(elapsed.current / SLIDE_DURATION, 1)})`;
      if (elapsed.current >= SLIDE_DURATION) { change(currentIndex + 1); return; }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, currentIndex, change]);

  const currentSlide = HERO_SLIDES[currentIndex];
  return (
    <section ref={root} className="signature-hero" aria-roledescription="carousel" aria-label="코션 시그니처 시공"
      data-playing={playing} onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsInteracting(false); }}>
      <div className="signature-stage" onTouchStart={(event) => {const t=event.touches[0];touchStart.current={x:t.clientX,y:t.clientY};}}
        onTouchEnd={(event) => {const start=touchStart.current;const t=event.changedTouches[0];if(start && Math.abs(t.clientX-start.x)>50 && Math.abs(t.clientX-start.x)>Math.abs(t.clientY-start.y)) choose(currentIndex+(t.clientX<start.x?1:-1));touchStart.current=null;}}>
        <div className="signature-images" aria-hidden="true">
          {HERO_SLIDES.map((slide, idx) => (
            <div key={slide.id} className={`signature-image ${idx===currentIndex?'is-active':''}`}>
              <img src={slide.image} alt="" loading={idx===0?'eager':'lazy'} decoding="async" width="1672" height="940" />
            </div>
          ))}
        </div>
        <div className="signature-shade" />
        <div className="signature-headline" aria-live={playing?'off':'polite'} aria-atomic="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={currentSlide.id} initial={{opacity:1}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:0.2}}>
              <p className="signature-eyebrow"><span />{currentSlide.tag}</p>
              <h1 className="signature-title" aria-label={currentSlide.title}>{currentSlide.title.split(' ').map((word, idx)=>(
                <span className="caption-mask" key={idx}><span className="caption-word" style={{animationDelay:`${idx*90}ms`}}>{word}{idx < currentSlide.title.split(' ').length - 1 ? ' ' : ''}</span></span>
              ))}</h1>
              <h2 className="signature-subtitle">{currentSlide.subtitle}</h2>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="signature-controls">
          <span className="signature-count"><b>{String(currentIndex+1).padStart(2,'0')}</b><span>/ {'04'}</span></span>
          <button type="button" onClick={()=>choose(currentIndex-1)} aria-label="이전 슬라이드"><ArrowLeft size={19}/></button>
          <button type="button" onClick={()=>setIsPlaying(value=>!value)} aria-label={isPlaying&&!reduced?'슬라이드 자동 재생 정지':'슬라이드 자동 재생'} aria-pressed={isPlaying&&!reduced} disabled={!!reduced}>
            {isPlaying&&!reduced?<Pause size={17}/>:<Play size={17}/>}
            {isPlaying&&!reduced?<span className="sr-only">일시정지</span>:<span className="sr-only">재생</span>}
          </button>
          <button type="button" onClick={()=>choose(currentIndex+1)} aria-label="다음 슬라이드"><ArrowRight size={19}/></button>
        </div>
      </div>
      <div className="signature-caption">
        <p key={currentSlide.id} className="signature-description">{currentSlide.description}</p>
        <div className="signature-actions">
          <a href="#services" className="signature-primary"><span>서비스 알아보기</span><ArrowRight size={18}/></a>
          <button type="button" onClick={onNavigateToContact} className="signature-secondary"><span className="hidden sm:inline">무료 견적·상담 신청</span><span className="sm:hidden">무료 견적·상담</span><ArrowRight size={18}/></button>
        </div>
      </div>
      <div className="signature-index" aria-label="차량 장면 선택">
        {HERO_SLIDES.map((slide,idx)=>(
          <button type="button" key={slide.id} onClick={()=>choose(idx)} aria-label={`${idx+1}. ${slide.title}`} aria-current={idx===currentIndex?'true':undefined} className={idx===currentIndex?'is-active':''}>
            <span className="signature-index-number">0{idx+1}</span><span className="signature-index-title">{slide.title}</span>
            <span className="signature-track"><span key={`${idx}-${currentIndex}`} ref={idx===currentIndex?progress:undefined} style={{transform:idx===currentIndex?'scaleX(0)':'scaleX(0)'}} /></span>
          </button>
        ))}
      </div>
    </section>
  );
};
