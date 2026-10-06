import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThreeCarCanvas } from './ThreeCarCanvas';

interface Supercar3DShowroomProps {
  onNavigateToContact?: () => void;
  onClose?: () => void;
}

interface VehiclePreset {
  id: string;
  name: string;
  subTitle: string;
  category: string;
  tag: string;
  filmType: string;
  accentColor: string;
  description: string;
  specWarranty: string;
  specGloss: string;
  specThickness: string;
  topDownImage?: string;
  frames: {
    angle: number;
    label: string;
    image: string;
  }[];
}

const VEHICLES: VehiclePreset[] = [
  {
    id: 'maybach-two-tone',
    name: '마이바흐 S680',
    subTitle: 'Nautical Blue & Rose Gold Bespoke Two-Tone',
    category: 'ROYAL LUXURY SEDAN',
    tag: 'SIGNATURE BESPOKE PPS',
    filmType: 'Caution Smart Spray PPS (시그니처 투톤)',
    accentColor: '#d4a373',
    topDownImage: '/images/showroom/maybach_exact_top_down.jpg',
    description:
      '상단 노틱 딥 블루와 하단 로즈 골드의 완벽한 조화. 코션스마트센터 특허 스프레이 PPS로 도장 경계면 단차 없이 100% 거울 같은 유리알 광택을 완성했습니다.',
    specWarranty: '평생 무상 보증 (정품 보증서 발급)',
    specGloss: '99.8 GU (Mirror Crystal)',
    specThickness: '180µm 고밀도 탄성 보호막',
    frames: [
      { angle: 0, label: '전방 (0° Front)', image: '/images/showroom/maybach_direct_front.jpg' },
      { angle: 45, label: '전측면 (45° Front-Right)', image: '/images/showroom/maybach_front.jpg' },
      { angle: 90, label: '우측면 (90° Right Profile)', image: '/images/showroom/maybach_side.jpg' },
      { angle: 135, label: '후측면 (135° Rear-Right)', image: '/images/showroom/maybach_rear.jpg' },
      { angle: 180, label: '후방 (180° Rear)', image: '/images/showroom/maybach_direct_rear.jpg' },
      { angle: 315, label: '좌측면 (315° Front-Left)', image: '/images/showroom/maybach_front_three_quarter_left.jpg' },
    ],
  },
  {
    id: 'lamborghini-viola',
    name: '람보르기니 레부엘토',
    subTitle: 'Viola Pasifae & Exposed Gloss Carbon Aero',
    category: 'V12 HYBRID SUPERCAR',
    tag: 'EXOTIC HIGH-METALLIC PPS',
    filmType: 'Caution High-Gloss Ceramic PPS (사이버 테크랩)',
    accentColor: '#a855f7',
    topDownImage: '/images/showroom/maybach_exact_top_down.jpg',
    description:
      '네온 불빛 아래 더욱 눈부신 비올라 파시파에 퍼플 메탈릭 PPS. 복잡한 슈퍼카 공기역학 에어로 파츠와 카본을 칼 흠집 없이 완벽 보호합니다.',
    specWarranty: '10년 무황변 책임 보증',
    specGloss: '99.5 GU (Super Metallic)',
    specThickness: '200µm 하이엔드 방탄 보호막',
    frames: [
      { angle: 0, label: '전방 (0° Front)', image: '/images/showroom/lambo_direct_front.jpg' },
      { angle: 45, label: '전측면 (45° Front-Right)', image: '/images/showroom/lamborghini_front.jpg' },
      { angle: 90, label: '우측면 (90° Right Profile)', image: '/images/showroom/lambo_side.jpg' },
      { angle: 135, label: '후측면 (135° Rear-Right)', image: '/images/showroom/lambo_rear_three_quarter.jpg' },
      { angle: 180, label: '후방 (180° Rear)', image: '/images/showroom/lambo_rear.jpg' },
      { angle: 315, label: '좌측면 (315° Front-Left)', image: '/images/showroom/lambo_front_three_quarter_left.jpg' },
    ],
  },
  {
    id: 'bmw-x7-matte',
    name: 'BMW X7 M60i',
    subTitle: 'Frozen Pure Grey Satin Matte & Shadowline',
    category: 'FLAGSHIP LUXURY SUV',
    tag: 'SATIN MATTE PROTECTION',
    filmType: 'Caution Satin Silky Matte PPS (건축 라운지)',
    accentColor: '#38bdf8',
    topDownImage: '/images/showroom/maybach_exact_top_down.jpg',
    description:
      '어쿠스틱 우드 루버 월과 버티컬 무드 조명이 어우러진 프라이빗 라운지. 빛을 부드럽게 머금는 실키 무광 사틴 질감과 스크래치 자가복원 기능을 선사합니다.',
    specWarranty: '7년 무상 안심 보증',
    specGloss: '25 GU (Silky Satin Matte)',
    specThickness: '190µm 매트 나노 코트',
    frames: [
      { angle: 0, label: '전방 (0° Front)', image: '/images/showroom/bmw_x7_direct_front.jpg' },
      { angle: 45, label: '스튜디오 쿼터 (45° Front-Right)', image: '/images/showroom/bmw_x7_front.jpg' },
      { angle: 90, label: '우측면 (90° Right Profile)', image: '/images/showroom/bmw_x7_side.jpg' },
      { angle: 135, label: '후측면 (135° Rear-Right)', image: '/images/showroom/bmw_x7_rear_three_quarter.jpg' },
      { angle: 180, label: '후방 (180° Rear)', image: '/images/showroom/bmw_x7_rear.jpg' },
      { angle: 315, label: '좌측면 (315° Front-Left)', image: '/images/showroom/bmw_x7_front_three_quarter_left.jpg' },
    ],
  },
];

// ─── Helper: angle of the nearest frame center ───
function nearestFrameCenter(frames: VehiclePreset['frames'], angle: number) {
  let best = 0;
  let bestDist = 999;
  frames.forEach((f, i) => {
    let d = Math.abs(f.angle - angle);
    if (d > 180) d = 360 - d;
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  });
  return { idx: best, dist: bestDist };
}

export const Supercar3DShowroom: React.FC<Supercar3DShowroomProps> = ({ onNavigateToContact, onClose }) => {
  const [activeVehicleIndex, setActiveVehicleIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'3d-surround' | '4k-gallery'>('3d-surround');
  const [autoRotate, setAutoRotate] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showRadarGuides, setShowRadarGuides] = useState(true);

  // ── All continuous values as REFS for 60fps direct DOM updates ──
  const rotAngle = useRef(0);
  const camPitch = useRef(0);
  const zoomLev = useRef(1.0);
  const velX = useRef(0);
  const velY = useRef(0);
  const dragging = useRef(false);
  const reflX = useRef(50);
  const reflY = useRef(30);

  // Drag anchors
  const dragAnchorX = useRef(0);
  const dragAnchorY = useRef(0);
  const dragAnchorAngle = useRef(0);
  const dragAnchorPitch = useRef(0);
  const lastMX = useRef(0);
  const lastMY = useRef(0);
  const lastMT = useRef(0);

  // DOM refs for direct manipulation
  const containerRef = useRef<HTMLDivElement | null>(null);
  const baseImgRef = useRef<HTMLImageElement | null>(null);
  const gimbalRef = useRef<HTMLDivElement | null>(null);
  const floorRef = useRef<HTMLDivElement | null>(null);
  const radarSweepRef = useRef<HTMLDivElement | null>(null);
  const radarConicRef = useRef<HTMLDivElement | null>(null);
  const compassCarRef = useRef<HTMLDivElement | null>(null);
  const reflectionRef = useRef<HTMLDivElement | null>(null);

  const animFrameId = useRef<number | null>(null);

  const vehicle = VEHICLES[activeVehicleIndex];
  const frames = vehicle.frames;
  const sortedFrames = [...frames].sort((a, b) => a.angle - b.angle);

  // Preload all images
  useEffect(() => {
    VEHICLES.forEach((v) => {
      v.frames.forEach((f) => {
        const img = new Image();
        img.src = f.image;
      });
      if (v.topDownImage) {
        const topImg = new Image();
        topImg.src = v.topDownImage;
      }
    });
  }, []);

  // ── Flight Simulation Dynamics (Pitch / Roll / Yaw) ──
  const pitchDeg = useRef(0);
  const targetPitchDeg = useRef(0);
  const rollDeg = useRef(0);
  const targetRollDeg = useRef(0);

  // ═══════════════════════════════════════════════════════════
  // CORE 60FPS RENDER LOOP — Direct DOM, no React setState
  // ═══════════════════════════════════════════════════════════
  useEffect(() => {
    let prevNearestIdx = -1;
    const loop = () => {
      // Auto-rotation when enabled
      if (autoRotate && !dragging.current) {
        rotAngle.current = (rotAngle.current + 0.35) % 360;
      }

      // Inertia on release
      if (!dragging.current && Math.abs(velX.current) > 0.05) {
        rotAngle.current = ((rotAngle.current + velX.current * 0.85) % 360 + 360) % 360;
        velX.current *= 0.93;
      }

      // Smooth flight spring interpolation (Auto-leveling)
      pitchDeg.current += (targetPitchDeg.current - pitchDeg.current) * 0.14;
      rollDeg.current += (targetRollDeg.current - rollDeg.current) * 0.14;

      const angle = rotAngle.current;
      const zoom = isZoomed ? 1.85 : zoomLev.current;

      // ── Find nearest frame (single image, NO crossfade) ──
      const nearest = nearestFrameCenter(sortedFrames, angle);

      // ── Update DOM directly (no React re-render!) ──

      // 1. Single image: show ONLY the nearest frame. Immediate swap.
      if (baseImgRef.current) {
        if (nearest.idx !== prevNearestIdx) {
          baseImgRef.current.src = sortedFrames[nearest.idx].image;
          prevNearestIdx = nearest.idx;
        }
      }

      // 2. Gimbal: 3D Flight Simulation applied to the CAR ONLY (Pitch + Roll Banking + Zoom)
      if (gimbalRef.current) {
        gimbalRef.current.style.transform =
          `perspective(1000px) scale(${zoom}) rotateX(${pitchDeg.current.toFixed(2)}deg) rotateZ(${rollDeg.current.toFixed(2)}deg)`;
      }

      // 3. Floor grid & Studio background remain 100% stable / static floor stage
      if (floorRef.current) {
        floorRef.current.style.transform = `rotateX(65deg)`;
      }

      // 4. Radar sweep ring
      if (radarSweepRef.current) {
        radarSweepRef.current.style.transform = `rotate(${angle}deg)`;
      }

      // 5. Radar conic gradient
      if (radarConicRef.current) {
        radarConicRef.current.style.background =
          `conic-gradient(from ${angle}deg, rgba(212,163,115,0.2) 0deg, transparent 50deg, transparent 360deg)`;
      }

      // 6. Compass car rotation
      if (compassCarRef.current) {
        compassCarRef.current.style.transform = `rotate(${angle}deg)`;
      }

      // 7. Reflection highlight
      if (reflectionRef.current) {
        reflectionRef.current.style.background =
          `radial-gradient(ellipse 550px 320px at ${reflX.current}% ${reflY.current}%, rgba(255,255,255,0.18) 0%, ${vehicle.accentColor}20 45%, transparent 75%)`;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [activeVehicleIndex, autoRotate, isZoomed, sortedFrames, vehicle.accentColor]);

  // ═══════════════════════════════════════════════════════════
  // MOUSE / TOUCH HANDLERS — update refs only, no setState
  // ═══════════════════════════════════════════════════════════
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
    zoomLev.current = Math.max(0.85, Math.min(2.4, zoomLev.current - e.deltaY * 0.0015));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    setAutoRotate(false);
    velX.current = 0;
    velY.current = 0;
    dragAnchorX.current = e.clientX;
    dragAnchorY.current = e.clientY;
    lastMX.current = e.clientX;
    lastMY.current = e.clientY;
    lastMT.current = performance.now();
    dragAnchorAngle.current = rotAngle.current;
    dragAnchorPitch.current = camPitch.current;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const ww = window.innerWidth;
    const wh = window.innerHeight;

    reflX.current = (e.clientX / ww) * 100;
    reflY.current = (e.clientY / wh) * 100;

    if (!dragging.current) return;

    const now = performance.now();
    const dt = Math.max(now - lastMT.current, 1);

    // Velocity for inertia on release
    velX.current = ((e.clientX - lastMX.current) / dt) * 1.5;
    velY.current = ((lastMY.current - e.clientY) / dt) * 1.2;

    lastMX.current = e.clientX;
    lastMY.current = e.clientY;
    lastMT.current = now;

    // 1. Horizontal Yaw (360-degree rotation)
    const deltaX = e.clientX - dragAnchorX.current;
    const angleMoved = (deltaX / (ww * 0.55)) * 360;
    rotAngle.current = ((dragAnchorAngle.current + angleMoved) % 360 + 360) % 360;

    // 2. Flight Simulation Pitch (Stick Push/Pull: Nose Down/Up)
    const deltaY = e.clientY - dragAnchorY.current;
    targetPitchDeg.current = Math.max(-15, Math.min(15, -(deltaY / (wh * 0.45)) * 18));

    // 3. Flight Simulation Roll Banking (Wing Tilting into Turns)
    targetRollDeg.current = Math.max(-6, Math.min(6, velX.current * 1.5));
  }, []);

  const handleMouseUp = useCallback(() => {
    dragging.current = false;
    // Auto-leveling spring back to flat horizontal plane
    targetPitchDeg.current = 0;
    targetRollDeg.current = 0;
  }, []);

  // Touch
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    dragging.current = true;
    setAutoRotate(false);
    velX.current = 0;
    velY.current = 0;
    const t = e.touches[0];
    dragAnchorX.current = t.clientX;
    dragAnchorY.current = t.clientY;
    lastMX.current = t.clientX;
    lastMY.current = t.clientY;
    lastMT.current = performance.now();
    dragAnchorAngle.current = rotAngle.current;
    dragAnchorPitch.current = camPitch.current;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragging.current) return;
    const now = performance.now();
    const t = e.touches[0];
    const dt = Math.max(now - lastMT.current, 1);

    velX.current = ((t.clientX - lastMX.current) / dt) * 1.5;
    velY.current = ((lastMY.current - t.clientY) / dt) * 1.2;

    lastMX.current = t.clientX;
    lastMY.current = t.clientY;
    lastMT.current = now;

    const ww = window.innerWidth;
    const wh = window.innerHeight;

    const deltaX = t.clientX - dragAnchorX.current;
    const deltaY = t.clientY - dragAnchorY.current;

    // Yaw
    const angleMoved = (deltaX / (ww * 0.55)) * 360;
    rotAngle.current = ((dragAnchorAngle.current + angleMoved) % 360 + 360) % 360;

    // Pitch & Roll
    targetPitchDeg.current = Math.max(-15, Math.min(15, -(deltaY / (wh * 0.45)) * 18));
    targetRollDeg.current = Math.max(-6, Math.min(6, velX.current * 1.5));
  }, []);

  const handleTouchEnd = useCallback(() => {
    dragging.current = false;
    targetPitchDeg.current = 0;
    targetRollDeg.current = 0;
  }, []);

  const jumpToAngle = useCallback((angle: number) => {
    rotAngle.current = angle;
    camPitch.current = 0;
    velX.current = 0;
    velY.current = 0;
    setAutoRotate(false);
  }, []);

  // Cursor style via direct DOM
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onDown = () => { el.style.cursor = 'grabbing'; };
    const onUp = () => { el.style.cursor = 'grab'; };
    el.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      el.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  // ESC key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="fixed inset-0 w-screen h-screen z-50 bg-[#060608] text-white select-none overflow-hidden flex flex-col justify-between font-sans"
      style={{ cursor: 'grab' }}
    >
      {/* ════════ 1. ORBIT STAGE ════════ */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
      >
        {/* Dynamic Studio Background Ambient Glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-40"
          style={{
            background:
              activeVehicleIndex === 0
                ? 'radial-gradient(ellipse at 50% 35%, rgba(212,163,115,0.28) 0%, rgba(10,25,49,0.45) 50%, transparent 80%)'
                : activeVehicleIndex === 1
                ? 'radial-gradient(ellipse at 50% 35%, rgba(168,85,247,0.3) 0%, rgba(30,10,50,0.6) 50%, transparent 80%)'
                : 'radial-gradient(ellipse at 50% 35%, rgba(56,189,248,0.25) 0%, rgba(20,22,28,0.65) 50%, transparent 80%)',
          }}
        />

        {/* 3D Depth Spatial Floor Matrix */}
        <div
          ref={floorRef}
          className="absolute inset-[-20%] w-[140%] h-[140%] pointer-events-none opacity-20"
          style={{
            perspective: 1000,
            willChange: 'transform',
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 1.2px, transparent 1.2px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* ── AROUND VIEW SONAR / RADAR RINGS ── */}
        <AnimatePresence>
          {showRadarGuides && (
            <div
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
              style={{
                perspective: 900,
                transform: `rotateX(${55}deg) translateY(${120}px)`,
              }}
            >
              <div className="absolute w-[660px] h-[660px] rounded-full border border-emerald-500/20 animate-pulse" />
              <div className="absolute w-[520px] h-[520px] rounded-full border border-amber-400/35" />
              <div className="absolute w-[390px] h-[390px] rounded-full border border-red-500/40" />

              <div
                ref={radarSweepRef}
                className="absolute w-[460px] h-[460px] rounded-full border-t-2 border-b-2 border-cyan-400/60"
                style={{ willChange: 'transform' }}
              />

              <div
                ref={radarConicRef}
                className="absolute w-[520px] h-[520px] rounded-full"
                style={{ willChange: 'background' }}
              />

              <span className="absolute top-[6%] text-[10px] font-mono tracking-widest text-emerald-400/70">
                2.0m SAFE ZONE
              </span>
              <span className="absolute top-[16%] text-[10px] font-mono tracking-widest text-amber-400/80">
                1.0m CAUTION
              </span>
              <span className="absolute top-[26%] text-[10px] font-mono tracking-widest text-red-400/80">
                0.5m PPS CONTACT
              </span>
            </div>
          )}
        </AnimatePresence>

        {/* ── MODE 1: Three.js Real-time 3D Surround View (Background fixed, Car rotates XYZ) ── */}
        {viewMode === '3d-surround' && (
          <ThreeCarCanvas
            vehicleId={vehicle.id}
            accentColor={vehicle.accentColor}
            autoRotate={autoRotate}
            filmType={vehicle.filmType}
            onAngleChange={(angle) => {
              rotAngle.current = angle;
            }}
          />
        )}

        {/* ── MODE 2: 4K Studio Photographic Frame Gallery ── */}
        {viewMode === '4k-gallery' && (
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none p-4 md:p-8">
            <div
              ref={gimbalRef}
              className="relative w-full max-w-6xl h-[65vh] md:h-[75vh] flex items-center justify-center pointer-events-none"
              style={{
                willChange: 'transform',
                transformOrigin: '50% 65%',
              }}
            >
              {/* Real High-Res Vehicle Frame */}
              <img
                ref={baseImgRef}
                src={sortedFrames[0]?.image}
                alt={vehicle.name}
                className="w-full h-full object-contain object-center max-w-full max-h-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] select-none pointer-events-none"
                draggable={false}
              />

              {/* Real-time PPS Glass Reflection Light (Follows mouse dynamically) */}
              <div
                ref={reflectionRef}
                className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-300 rounded-2xl"
                style={{ willChange: 'background' }}
              />

              {/* PPS Nano-Shield Fine Matrix Texture */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:28px_28px] rounded-2xl" />
            </div>
          </div>
        )}
      </div>

      {/* ════════ 2. TOP HEADER ════════ */}
      <div className="relative z-30 w-full p-5 md:p-8 flex items-center justify-between bg-gradient-to-b from-black/95 via-black/60 to-transparent pointer-events-auto">
        <div className="flex items-center gap-3 md:gap-4">
          <div
            className="w-3.5 h-3.5 rounded-full ring-2 ring-white/30 animate-pulse"
            style={{ backgroundColor: vehicle.accentColor }}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-amber-400 font-extrabold flex items-center gap-1.5">
                <i className="ri-radar-line text-sm text-amber-400" />
                360° MARBLE ORBIT SHOWROOM
              </span>
              <span className="px-2 py-0.5 text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded">
                LIVE 3D
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-0.5 flex items-center gap-3">
              <span>{vehicle.name}</span>
              <span className="text-xs md:text-sm font-normal text-white/50 hidden sm:inline">
                {vehicle.subTitle}
              </span>
            </h1>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* View Mode Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-black/70 border border-white/20 backdrop-blur-xl">
            <button
              onClick={() => setViewMode('3d-surround')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === '3d-surround'
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <i className="ri-box-3-line" />
              <span>3D 시뮬레이션</span>
            </button>
            <button
              onClick={() => setViewMode('4k-gallery')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === '4k-gallery'
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <i className="ri-image-line" />
              <span>4K 실사 화보</span>
            </button>
          </div>

          <button
            onClick={() => {
              zoomLev.current = 1.0;
              camPitch.current = 0;
              setIsZoomed(false);
            }}
            className="px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 bg-black/60 text-white/75 border-white/15 hover:text-white backdrop-blur-xl"
            title="시점 및 줌 원위치 리셋"
          >
            <i className="ri-refresh-line text-sm" />
            <span className="hidden sm:inline">리셋</span>
          </button>

          <button
            onClick={() => setShowRadarGuides(!showRadarGuides)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 backdrop-blur-xl ${
              showRadarGuides
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-black/60 text-white/50 border-white/15 hover:text-white'
            }`}
          >
            <i className="ri-compass-3-line text-sm" />
            <span className="hidden sm:inline">어라운드 가이드</span>
          </button>

          <button
            onClick={() => {
              setAutoRotate(!autoRotate);
              velX.current = 0;
            }}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all backdrop-blur-xl ${
              autoRotate
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-black/60 text-white/60 border-white/20 hover:text-white'
            }`}
          >
            {autoRotate ? '회전 멈춤' : '자동 360°'}
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-black/60 text-white/80 border border-white/20 hover:border-red-400 hover:text-red-300 transition-all backdrop-blur-xl group"
              title="쇼룸 닫기 (ESC)"
            >
              <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── TOP SLIM INTERACTIVE CONTROL HINT ── */}
      <div className="relative z-30 flex justify-center pointer-events-none -mt-3 mb-1 px-4">
        <div className="px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl flex items-center gap-2.5 text-[11px] text-white/75 pointer-events-auto shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span className="font-bold text-amber-300">
            {viewMode === '3d-surround' ? '3D 리얼타임 비행 시뮬레이션' : '4K 실사 화보 모드'}
          </span>
          <span className="text-white/20">|</span>
          <span>
            {viewMode === '3d-surround'
              ? '마우스 드래그: 자동차만 X·Y·Z 360° 회전 & 비행 뱅킹 틸트 (배경 고정) · 휠: 줌인'
              : '마우스 좌우 드래그: 360° 실사 화보 연속 감상 · 휠: 도장면 확대'}
          </span>
        </div>
      </div>

      {/* ════════ 3. AROUND VIEW MINI COMPASS HUD ════════ */}
      <div className="absolute top-24 right-6 md:right-8 z-30 pointer-events-auto flex flex-col items-end gap-3">
        <div className="p-3.5 rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/20 shadow-2xl flex flex-col items-center">
          <div className="text-[9px] font-mono tracking-widest text-amber-300 mb-2 uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            TOP-DOWN AVM
          </div>

          <div className="relative w-28 h-28 rounded-full border border-white/20 flex items-center justify-center overflow-hidden bg-black/60">
            <div className="absolute inset-0 rounded-full border border-dashed border-amber-400/30" />

            <button onClick={() => jumpToAngle(0)} className="absolute top-1 text-[9px] font-mono text-white/80 hover:text-amber-300">
              전방 0°
            </button>
            <button onClick={() => jumpToAngle(90)} className="absolute right-1 text-[9px] font-mono text-white/80 hover:text-amber-300">
              우 90°
            </button>
            <button onClick={() => jumpToAngle(180)} className="absolute bottom-1 text-[9px] font-mono text-white/80 hover:text-amber-300">
              후방 180°
            </button>
            <button onClick={() => jumpToAngle(270)} className="absolute left-1 text-[9px] font-mono text-white/80 hover:text-amber-300">
              좌 270°
            </button>

            <div
              ref={compassCarRef}
              className="relative w-12 h-20 flex items-center justify-center"
              style={{ willChange: 'transform' }}
            >
              {vehicle.topDownImage ? (
                <img
                  src={vehicle.topDownImage}
                  alt="Top Down Car View"
                  className="w-full h-full object-contain filter invert contrast-125 opacity-80"
                />
              ) : (
                <div className="w-9 h-16 rounded-xl border border-white/60 bg-white/10 flex items-center justify-center">
                  <span className="text-[8px] font-mono text-white/60">CAR</span>
                </div>
              )}
              <div className="absolute -top-3 w-0.5 h-3 bg-amber-400 animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1.5 mt-2.5 w-full">
            {[
              { label: '전면', angle: 0 },
              { label: '측면', angle: 90 },
              { label: '후측', angle: 135 },
              { label: '후면', angle: 180 },
            ].map((btn) => (
              <button
                key={btn.angle}
                onClick={() => jumpToAngle(btn.angle)}
                className="py-1 text-[9px] font-bold rounded border transition-colors bg-white/5 text-white/70 border-white/10 hover:bg-white/15"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ════════ 4. PPS HUD SPEC (LEFT SIDE) ════════ */}
      <div className="relative z-30 px-6 md:px-8 pointer-events-none hidden md:block">
        <motion.div
          key={vehicle.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-sm p-5 rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/15 pointer-events-auto shadow-2xl"
        >
          <div
            className="text-[11px] font-black uppercase tracking-widest mb-1 flex items-center justify-between"
            style={{ color: vehicle.accentColor }}
          >
            <span>{vehicle.tag}</span>
            <span className="text-[10px] text-white/40 font-mono">SONAR ACCURACY 99.9%</span>
          </div>
          <div className="text-base font-bold text-white mb-2">{vehicle.filmType}</div>
          <p className="text-xs text-white/75 leading-relaxed mb-4">{vehicle.description}</p>

          <div className="space-y-2 text-xs border-t border-white/10 pt-3 font-mono">
            <div className="flex justify-between items-center">
              <span className="text-white/50">표면 광택도 (GLOSS):</span>
              <span className="font-bold text-white">{vehicle.specGloss}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/50">보호 필름 두께:</span>
              <span className="font-bold text-white">{vehicle.specThickness}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/50">보증 기간 (WARRANTY):</span>
              <span className="font-bold text-amber-300">{vehicle.specWarranty}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ════════ 5. BOTTOM VEHICLE SELECTOR & CTA ════════ */}
      <div className="relative z-30 w-full p-5 md:p-8 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-1">
            {VEHICLES.map((v, idx) => {
              const isSelected = activeVehicleIndex === idx;
              return (
                <button
                  key={v.id}
                  onClick={() => {
                    setActiveVehicleIndex(idx);
                    rotAngle.current = 0;
                    camPitch.current = 0;
                    velX.current = 0;
                    velY.current = 0;
                    setAutoRotate(false);
                    setIsZoomed(false);
                  }}
                  className={`px-4 md:px-5 py-3 rounded-2xl text-left transition-all flex items-center gap-3.5 whitespace-nowrap border backdrop-blur-2xl ${
                    isSelected
                      ? 'bg-white/15 border-white text-white shadow-2xl scale-[1.02]'
                      : 'bg-black/60 border-white/10 text-white/60 hover:text-white hover:border-white/30'
                  }`}
                >
                  <div
                    className="w-3.5 h-3.5 rounded-full ring-2 ring-white/30"
                    style={{ backgroundColor: v.accentColor }}
                  />
                  <div>
                    <div className="text-xs md:text-sm font-extrabold">{v.name}</div>
                    <div className="text-[10px] text-white/50 font-medium">{v.category}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={onNavigateToContact}
            className="w-full md:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-sm tracking-wide shadow-2xl shadow-amber-500/30 transition-all flex items-center justify-center gap-2.5 active:scale-95"
          >
            <span>{vehicle.name} 맞춤 시공 견적 문의</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
