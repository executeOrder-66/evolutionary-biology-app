import { useRef, useCallback, useEffect } from 'react';

/**
 * Browser-native text-to-speech voiceover using the Web Speech API.
 * Zero dependencies — works in Chrome, Edge, Safari, Firefox.
 */
export function useVoiceover() {
  const enabled = useRef(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (typeof speechSynthesis !== 'undefined') {
      speechSynthesis.cancel();
    }
    utteranceRef.current = null;
  }, []);

  const speak = useCallback((text: string) => {
    if (!enabled.current) return;
    if (typeof speechSynthesis === 'undefined') return;

    // Cancel any in-progress speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    // Prefer a natural-sounding English voice
    const voices = speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) => v.lang.startsWith('en') && v.name.includes('Google') && !v.name.includes('UK'),
    ) ??
      voices.find((v) => v.lang.startsWith('en') && v.localService) ??
      voices.find((v) => v.lang.startsWith('en'));
    if (preferred) utterance.voice = preferred;

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  }, []);

  const toggleVoice = useCallback(() => {
    enabled.current = !enabled.current;
    if (!enabled.current) stop();
    return enabled.current;
  }, [stop]);

  const isEnabled = useCallback(() => enabled.current, []);

  // Cleanup on unmount
  useEffect(() => stop, [stop]);

  return { speak, stop, toggleVoice, isEnabled };
}
