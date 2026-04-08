import { useEffect } from 'react';
import { useSimulationStore } from '../store/simulationStore';

/**
 * Global keyboard shortcuts for the simulation.
 * Space  = play / pause
 * →      = step forward one generation
 * R      = reset simulation
 * +/=    = speed up
 * -      = slow down
 *
 * Shortcuts are ignored when an input/textarea/select is focused.
 */
export function useKeyboardShortcuts() {
  const scenario = useSimulationStore((s) => s.scenario);

  useEffect(() => {
    if (!scenario) return;

    function handleKeyDown(e: KeyboardEvent) {
      // Don't intercept when typing in inputs
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      const { status, play, pause, reset, stepForward, speed, setSpeed } =
        useSimulationStore.getState();

      switch (e.key) {
        case ' ':
          e.preventDefault();
          if (status === 'running') pause();
          else if (status !== 'completed') play();
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (status !== 'running' && status !== 'completed') stepForward();
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          reset();
          break;
        case '+':
        case '=':
          e.preventDefault();
          setSpeed(Math.min(5, speed + 0.25));
          break;
        case '-':
          e.preventDefault();
          setSpeed(Math.max(0.25, speed - 0.25));
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scenario]);
}
