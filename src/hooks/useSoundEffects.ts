import { useRef, useCallback } from 'react';

/**
 * Lightweight sound effects using the Web Audio API.
 * No external files needed — all sounds are synthesized.
 */

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.15,
) {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

/** Soft pop — cell division / new generation */
function pop() {
  playTone(600, 0.08, 'sine', 0.12);
  setTimeout(() => playTone(800, 0.06, 'sine', 0.08), 40);
}

/** Alert chime — antibiotics / pollution / mating season / human selection */
function alert() {
  playTone(440, 0.15, 'triangle', 0.15);
  setTimeout(() => playTone(550, 0.15, 'triangle', 0.12), 120);
  setTimeout(() => playTone(660, 0.2, 'triangle', 0.1), 240);
}

/** Mutation sparkle */
function mutation() {
  playTone(1200, 0.1, 'sine', 0.08);
  setTimeout(() => playTone(1500, 0.08, 'sine', 0.06), 60);
  setTimeout(() => playTone(1800, 0.12, 'sine', 0.05), 120);
}

/** Death / extinction thud */
function death() {
  playTone(150, 0.2, 'square', 0.08);
}

/** Victory / completion fanfare */
function complete() {
  playTone(523, 0.15, 'triangle', 0.12);
  setTimeout(() => playTone(659, 0.15, 'triangle', 0.12), 150);
  setTimeout(() => playTone(784, 0.25, 'triangle', 0.1), 300);
}

/** Step forward tick */
function tick() {
  playTone(1000, 0.03, 'sine', 0.06);
}

export type SoundName = 'pop' | 'alert' | 'mutation' | 'death' | 'complete' | 'tick';

const sounds: Record<SoundName, () => void> = {
  pop,
  alert,
  mutation,
  death,
  complete,
  tick,
};

export function useSoundEffects() {
  const muted = useRef(false);

  const play = useCallback((name: SoundName) => {
    if (muted.current) return;
    try {
      sounds[name]();
    } catch {
      // AudioContext may not be available
    }
  }, []);

  const toggleMute = useCallback(() => {
    muted.current = !muted.current;
    return !muted.current; // returns new "sound on" state
  }, []);

  const isMuted = useCallback(() => muted.current, []);

  return { play, toggleMute, isMuted };
}
