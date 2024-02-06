import { RefObject, useEffect, useState } from 'react';

export const useIsSticky = (ref: RefObject<HTMLDivElement>): boolean => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 1 !== isSticky) {
          setIsSticky(entry.intersectionRatio < 1);
        }
      },
      { threshold: [1] },
    );
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      observer.disconnect();
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return isSticky;
};
