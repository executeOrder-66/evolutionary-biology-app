import { useEffect } from 'react';

const BASE_TITLE = 'EvoSim — Evolution Laboratory';

/**
 * Sets the document title on mount. Resets to base on unmount.
 */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | EvoSim` : BASE_TITLE;
    return () => {
      document.title = BASE_TITLE;
    };
  }, [title]);
}
