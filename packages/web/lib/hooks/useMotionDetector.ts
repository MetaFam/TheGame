import { Maybe } from '@metafam/utils';
import { useEffect, useState } from 'react';

export const useMotionDetector = (root: Maybe<HTMLElement>): boolean => {
  const [noMotion, setNoMotion] = useState(false);

  useEffect(() => {
    const mut = new MutationObserver(() => {
      if (root && root.classList.contains('no-motion')) {
        setNoMotion(true);
      } else {
        setNoMotion(false);
      }
    });
    if (typeof window !== 'undefined' && window.matchMedia !== undefined) {
      if (root) {
        mut.observe(root, {
          attributes: true,
        });
      }
    }

    return () => {
      mut.disconnect();
    };
  }, [root]);

  return noMotion;
};
