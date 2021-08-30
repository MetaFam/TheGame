import { RefObject, useEffect, useState } from 'react';

export const useOnScreen = (ref: RefObject<HTMLDivElement>): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      console.log(entry);
      setIntersecting(entry.isIntersecting && entry.intersectionRatio < 1);
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref]);
  console.log({ isIntersecting });

  return isIntersecting;
};
