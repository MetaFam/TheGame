import { RefObject, useEffect, useState } from 'react';

export const useOnScreen = (
  ref: RefObject<HTMLDivElement>,
  rootMargin = '0px',
): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      {
        rootMargin,
      },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin]);

  return isIntersecting;
};
