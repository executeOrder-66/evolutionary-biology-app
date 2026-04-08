import { renderHook, act } from '@testing-library/react';
import { useSwipeNavigation } from '../useSwipeNavigation';

function makeTouchStart(clientX: number, clientY: number) {
  return { touches: [{ clientX, clientY }] } as unknown as React.TouchEvent;
}

function makeTouchEnd(clientX: number, clientY: number) {
  return { changedTouches: [{ clientX, clientY }] } as unknown as React.TouchEvent;
}

describe('useSwipeNavigation', () => {
  it('returns onTouchStart and onTouchEnd handlers', () => {
    const { result } = renderHook(() => useSwipeNavigation(() => {}, () => {}));

    expect(typeof result.current.onTouchStart).toBe('function');
    expect(typeof result.current.onTouchEnd).toBe('function');
  });

  it('left swipe triggers onSwipeLeft', () => {
    const onLeft = vi.fn();
    const onRight = vi.fn();
    const { result } = renderHook(() => useSwipeNavigation(onLeft, onRight));

    act(() => {
      result.current.onTouchStart(makeTouchStart(300, 200));
      result.current.onTouchEnd(makeTouchEnd(100, 200));
    });

    expect(onLeft).toHaveBeenCalledOnce();
    expect(onRight).not.toHaveBeenCalled();
  });

  it('right swipe triggers onSwipeRight', () => {
    const onLeft = vi.fn();
    const onRight = vi.fn();
    const { result } = renderHook(() => useSwipeNavigation(onLeft, onRight));

    act(() => {
      result.current.onTouchStart(makeTouchStart(100, 200));
      result.current.onTouchEnd(makeTouchEnd(300, 200));
    });

    expect(onRight).toHaveBeenCalledOnce();
    expect(onLeft).not.toHaveBeenCalled();
  });

  it('small movement does not trigger either callback', () => {
    const onLeft = vi.fn();
    const onRight = vi.fn();
    const { result } = renderHook(() => useSwipeNavigation(onLeft, onRight));

    act(() => {
      result.current.onTouchStart(makeTouchStart(200, 200));
      result.current.onTouchEnd(makeTouchEnd(220, 200));
    });

    expect(onLeft).not.toHaveBeenCalled();
    expect(onRight).not.toHaveBeenCalled();
  });

  it('vertical movement does not trigger horizontal swipe', () => {
    const onLeft = vi.fn();
    const onRight = vi.fn();
    const { result } = renderHook(() => useSwipeNavigation(onLeft, onRight));

    act(() => {
      result.current.onTouchStart(makeTouchStart(200, 100));
      result.current.onTouchEnd(makeTouchEnd(200, 400));
    });

    expect(onLeft).not.toHaveBeenCalled();
    expect(onRight).not.toHaveBeenCalled();
  });
});
