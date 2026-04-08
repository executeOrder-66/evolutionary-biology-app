import { useEffect, useCallback } from 'react';
import { useSwipeNavigation } from './useSwipeNavigation';

/**
 * Arrow-key + swipe navigation for guided story simulations.
 * ← / swipe-right = previous step
 * → / swipe-left  = next step
 * Space           = play/pause
 *
 * Returns touch handlers to spread onto the story container.
 */
export function useStoryKeyboard(
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>,
  totalSteps: number,
  playing: boolean,
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          setPlaying(false);
          setStep((s) => Math.min(totalSteps - 1, s + 1));
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setPlaying(false);
          setStep((s) => Math.max(0, s - 1));
          break;
        case ' ':
          e.preventDefault();
          if (step >= totalSteps - 1) {
            setStep(0);
            setPlaying(true);
          } else {
            setPlaying((p) => !p);
          }
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, setStep, totalSteps, playing, setPlaying]);

  const goNext = useCallback(() => {
    setPlaying(false);
    setStep((s) => Math.min(totalSteps - 1, s + 1));
  }, [setStep, setPlaying, totalSteps]);

  const goPrev = useCallback(() => {
    setPlaying(false);
    setStep((s) => Math.max(0, s - 1));
  }, [setStep, setPlaying]);

  const swipeHandlers = useSwipeNavigation(goNext, goPrev);

  return swipeHandlers;
}
