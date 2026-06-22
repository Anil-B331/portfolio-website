// Secure Web Audio API sound generator.
// Safe to compile, lightweight, and supports sandboxed iframes.

let audioCtx: AudioContext | null = null;
let soundEnabled = false;

export function initAudio() {
  if (audioCtx) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
    soundEnabled = true;
  } catch (e) {
    console.warn("Web Audio API not supported in this browser:", e);
  }
}

export function setSoundEnabled(enabled: boolean) {
  if (enabled && !audioCtx) {
    initAudio();
  }
  soundEnabled = enabled;
  if (audioCtx && enabled && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

export function isSoundEnabled() {
  return soundEnabled;
}

// 1. Sleek, high-frequency tick sound for general hover/tab click
export function playTick() {
  if (!soundEnabled || !audioCtx) return;
  if (audioCtx.state === "suspended") return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.05);

  gain.gain.setValueAtTime(0.015, audioCtx.currentTime); // Subtle
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.06);
}

// 2. High-tech "chirp" for success/command selection
export function playChirp() {
  if (!soundEnabled || !audioCtx) return;
  if (audioCtx.state === "suspended") return;

  const oscP = audioCtx.createOscillator();
  const oscS = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  oscP.type = "triangle";
  oscP.frequency.setValueAtTime(600, audioCtx.currentTime);
  oscP.frequency.exponentialRampToValueAtTime(1500, audioCtx.currentTime + 0.12);

  oscS.type = "sine";
  oscS.frequency.setValueAtTime(300, audioCtx.currentTime);
  oscS.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.15);

  gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);

  oscP.connect(gain);
  oscS.connect(gain);
  gain.connect(audioCtx.destination);

  oscP.start();
  oscS.start();
  oscP.stop(audioCtx.currentTime + 0.16);
  oscS.stop(audioCtx.currentTime + 0.16);
}

// 3. Immersive sport-car style acceleration growl (synthesized filter sweeper) for card expansions
export function playRev() {
  if (!soundEnabled || !audioCtx) return;
  if (audioCtx.state === "suspended") return;

  const osc = audioCtx.createOscillator();
  const filter = audioCtx.createBiquadFilter();
  const gain = audioCtx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(60, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 0.35);

  filter.type = "lowpass";
  filter.Q.setValueAtTime(8, audioCtx.currentTime);
  filter.frequency.setValueAtTime(150, audioCtx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.35);

  gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.42);
}
