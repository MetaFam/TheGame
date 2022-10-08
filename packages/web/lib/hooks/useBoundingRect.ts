import { MutableRefObject, useEffect, useRef, useState } from 'react';

const debounce = (
  limit: number,
  callback: () => void,
): ((e: Event) => void) => {
  let timeoutId: number;
  return (e: Event) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(callback, limit, e);
  };
};

type Dimension = {
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  x?: number;
  y?: number;
  right?: number;
  bottom?: number;
};

const getDimensionObject = (node: HTMLDivElement | null): Dimension => {
  if (!node) return {};
  const rect = node.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    x: rect.x,
    y: rect.y,
    right: rect.right,
    bottom: rect.bottom,
  };
};

export const useBoundingRect = (
  limit = 100,
): [MutableRefObject<HTMLDivElement | null>, Dimension] => {
  const [dimensions, setDOMRects] = useState<Dimension>({});

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ref.current) {
      const measure = () =>
        window.requestAnimationFrame(() =>
          setDOMRects(getDimensionObject(ref.current)),
        );

      measure();

      const listener = debounce(limit, measure);

      window.addEventListener('resize', listener);
      window.addEventListener('scroll', listener);
      return () => {
        window.removeEventListener('resize', listener);
        window.removeEventListener('scroll', listener);
      };
    }
    return () => undefined;
  }, [limit]);

  return [ref, dimensions];
};
