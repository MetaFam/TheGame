import { useEffect, useRef, useState } from 'react';

const useFirstViewportEntry: any = (ref: any, observerOptions: any) => {
  const [entered, setEntered] = useState(false);
  const observer = useRef(
    new IntersectionObserver(
      ([entry]) => setEntered(entry.isIntersecting),
      observerOptions,
    ),
  );

  useEffect(() => {
    const element = ref.current;
    const ob = observer.current;
    if (entered) {
      ob.disconnect();
    }
    if (element && !entered) ob.observe(element);
  }, [entered, ref]);

  return entered;
};

export default useFirstViewportEntry;
