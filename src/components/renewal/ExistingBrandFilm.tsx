import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

/** Uses the repository's existing video, with the original image underneath as its fallback. */
export function ExistingBrandFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [foreground, setForeground] = useState(!document.hidden);
  const [requested, setRequested] = useState(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState(false);
  const saveData = (navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData;
  const allowed = !reduced && !saveData;
  useEffect(() => {
    const observer = new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting), {threshold:0.15});
    if(root.current) observer.observe(root.current);
    const handler=()=>setForeground(!document.hidden);
    document.addEventListener('visibilitychange',handler);
    return ()=>{observer.disconnect();document.removeEventListener('visibilitychange',handler);};
  },[]);
  useEffect(() => {
    if(!visible || !allowed) return;
    const timer=setTimeout(()=>setRequested(true),800);
    return ()=>clearTimeout(timer);
  },[visible,allowed]);
  useEffect(() => {
    if(!video.current) return;
    if(visible && foreground && allowed && !paused && requested && !error) {
      video.current.play().catch(()=>setPaused(true));
    } else video.current.pause();
  },[visible,foreground,allowed,paused,requested,error]);
  return <div ref={root} className="renewal-brand-film">
    {requested && !error && <video ref={video} src="/videos/caution_intro.mp4" muted loop playsInline preload="metadata"
      className={ready?'is-ready':''} onPlaying={()=>setReady(true)} onError={()=>setError(true)} aria-hidden="true" tabIndex={-1}/>}
    {allowed && requested && !error && <button type="button" className="renewal-film-control" onClick={()=>setPaused(value=>!value)} aria-label={paused?'브랜드 영상 재생':'브랜드 영상 일시정지'}>
      {paused?<Play size={16}/>:<Pause size={16}/>}<span>{paused?'영상 재생':'영상 일시정지'}</span>
    </button>}
  </div>;
}
