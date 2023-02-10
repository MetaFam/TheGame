import { useEffect, useState } from 'react';

export * from './useField';
export * from './useUser';
export * from './useWeb3';

// https://www.joshwcomeau.com/react/the-perils-of-rehydration/
export const useMounted = (): boolean => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);
  return mounted;
};
