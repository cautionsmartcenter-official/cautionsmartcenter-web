// ============================================================
// Real-time Notification Sound & Web Notification Engine
// Web Audio API를 활용한 무결점 알림음 및 브라우저 푸시 알림
// ============================================================

let audioCtx: AudioContext | null = null;

// AudioContext 초기화 (사용자 인터랙션 시 자동 활성화)
const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

const SOUND_PREF_KEY = 'caution_admin_sound_enabled';

export const isSoundEnabled = (): boolean => {
  if (typeof window === 'undefined') return true;
  const val = localStorage.getItem(SOUND_PREF_KEY);
  return val === null ? true : val === 'true';
};

export const setSoundEnabled = (enabled: boolean): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SOUND_PREF_KEY, enabled ? 'true' : 'false');
};

/**
 * 맑고 고급스러운 2중 딩동 차임벨 알림음 (Web Audio API 순수 합성)
 * 외부 mp3 파일 없이 100% 브라우저 자체 합성음으로 iOS Safari / Android Chrome / PC 완벽 지원
 */
export const playChimeSound = async (): Promise<boolean> => {
  if (!isSoundEnabled()) return false;

  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const now = ctx.currentTime;

    // 1st Ding: D5 (587.33 Hz)
    playTone(ctx, 587.33, now, 0.45, 0.28);
    // Harmonics for rich bell tone
    playTone(ctx, 1174.66, now, 0.35, 0.12);

    // 2nd Dong: A5 (880.00 Hz)
    playTone(ctx, 880.00, now + 0.18, 0.65, 0.32);
    // Harmonics
    playTone(ctx, 1760.00, now + 0.18, 0.5, 0.15);

    return true;
  } catch (err) {
    console.warn('Audio playback not allowed or failed:', err);
    return false;
  }
};

const playTone = (
  ctx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  peakGain: number
) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, startTime);

  // Smooth attack & decay envelope
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
};

/**
 * 브라우저 웹 푸시 알림 권한 요청
 */
export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (err) {
    console.warn('Failed to request notification permission:', err);
    return 'denied';
  }
};

export const getNotificationPermission = (): NotificationPermission => {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission;
};

/**
 * 브라우저 시스템 알림창 띄우기 (화면이 꺼져있거나 다른 탭일 때도 알림)
 */
export const sendBrowserNotification = (
  title: string,
  body: string,
  onClick?: () => void
): void => {
  if (typeof window === 'undefined' || !('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  try {
    const notif = new Notification(title, {
      body,
      icon: '/images/favicon.ico',
      badge: '/images/favicon.ico',
      tag: 'caution-new-consultation',
      requireInteraction: true,
    });

    notif.onclick = () => {
      window.focus();
      if (onClick) onClick();
      notif.close();
    };
  } catch (err) {
    console.warn('Failed to send browser notification:', err);
  }
};
