import { useEffect, useRef } from 'react';

export * from './useProfileField';
export * from './useSaveCeramicProfile';
export * from './useUser';
export * from './useWeb3';

// https://www.joshwcomeau.com/react/the-perils-of-rehydration/
export const useMounted = (): boolean => {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return mounted.current;
};
