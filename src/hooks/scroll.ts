import { useState, useEffect } from 'react';
import { getScrollTarget } from '../utils/scroll';

export const useScrollTarget = (element: HTMLElement | null) => {
  const [scrollParent, setScrollParent] = useState<HTMLElement | Window>(window);

  useEffect(() => {
    if (element) {
      setScrollParent(getScrollTarget(element));
    }
  }, [element]);
  return scrollParent;
};
