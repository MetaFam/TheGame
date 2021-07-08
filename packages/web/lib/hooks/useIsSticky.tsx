import { RefObject, useEffect, useState } from 'react';

export const useIsSticky = (ref: RefObject<HTMLDivElement>): boolean => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(entry.intersectionRatio < 1),
      { threshold: [1] },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isSticky;
};
