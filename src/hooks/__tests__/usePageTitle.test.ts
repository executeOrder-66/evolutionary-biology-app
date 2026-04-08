import { describe, it, expect, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePageTitle } from '../usePageTitle';

const BASE_TITLE = 'EvoSim — Evolution Laboratory';

describe('usePageTitle', () => {
  afterEach(() => {
    document.title = '';
  });

  it('sets document.title with suffix', () => {
    renderHook(() => usePageTitle('Antibiotic Resistance'));
    expect(document.title).toBe('Antibiotic Resistance | EvoSim');
  });

  it('uses base title when no argument', () => {
    renderHook(() => usePageTitle());
    expect(document.title).toBe(BASE_TITLE);
  });

  it('resets title on unmount', () => {
    const { unmount } = renderHook(() => usePageTitle('Some Page'));
    expect(document.title).toBe('Some Page | EvoSim');

    unmount();
    expect(document.title).toBe(BASE_TITLE);
  });
});
