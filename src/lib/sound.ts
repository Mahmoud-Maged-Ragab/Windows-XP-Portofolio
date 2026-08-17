import { useSystemStore } from "@/store/systemStore";

type SoundType = "click" | "open" | "close" | "error" | "startup";

interface Note {
  freq: number;
  duration: number;
  type: OscillatorType;
}

const PRESETS: Record<SoundType, Note[]> = {
  click: [{ freq: 800, duration: 0.04, type: "sine" }],
  open: [
    { freq: 600, duration: 0.06, type: "sine" },
    { freq: 900, duration: 0.08, type: "sine" },
  ],
  close: [
    { freq: 500, duration: 0.06, type: "sine" },
    { freq: 300, duration: 0.08, type: "sine" },
  ],
  error: [{ freq: 220, duration: 0.15, type: "square" }],
  startup: [
    { freq: 440, duration: 0.1, type: "sine" },
    { freq: 660, duration: 0.15, type: "sine" },
  ],
};

let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtx) return null;
  if (!ctx) ctx = new AudioCtx();
  return ctx;
}

/** Tiny synthesized XP-style beeps — no audio files, respects systemStore.muted. */
export function playSound(type: SoundType) {
  if (useSystemStore.getState().muted) return;
  const audioCtx = getContext();
  if (!audioCtx) return;
  if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {});

  let t = audioCtx.currentTime;
  for (const note of PRESETS[type]) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = note.type;
    osc.frequency.value = note.freq;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.15, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + note.duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + note.duration + 0.02);
    t += note.duration * 0.8;
  }
}
