import { useRef, useCallback } from 'react';

const MIN_SWIPE_DISTANCE = 50;

/**
 * Detects left/right swipe gestures on a touch device.
 * Returns touch event handlers to spread onto a container element.
 */
export function useSwipeNavigation(
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
) {
  const startX = useRef(0);
  const startY = useRef(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX.current;
      const dy = e.changedTouches[0].clientY - startY.current;

      // Only trigger if horizontal movement is dominant and exceeds threshold
      if (Math.abs(dx) > MIN_SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) onSwipeLeft();
        else onSwipeRight();
      }
    },
    [onSwipeLeft, onSwipeRight],
  );

  return { onTouchStart, onTouchEnd };
}
