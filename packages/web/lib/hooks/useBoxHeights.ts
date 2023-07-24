import { Maybe } from '@metafam/utils';
import type { PropsWithChildren } from 'react';
import { ReactElement, useEffect, useState } from 'react';
import { getBoxKey } from 'utils/boxTypes';

export const useBoxHeights = (
  items: Array<Maybe<PropsWithChildren<ReactElement>>>,
) => {
  const [heights, setHeights] = useState<Record<string, number>>({});

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setHeights((oldHeights) => {
        const entryHeights = Object.fromEntries(
          entries.map(({ target }) => [
            getBoxKey(target as HTMLElement),
            target.scrollHeight, // entry.contentRect.height,
          ]),
        );
        return { ...oldHeights, ...entryHeights };
      });
    });

    const newHeights: Record<string, number> = {};
    items.forEach((item) => {
      if (item && Array.isArray(item.children)) {
        const target = item.children[0] as HTMLElement;
        const key = getBoxKey(target);
        if (key && target) {
          newHeights[key] = target.scrollHeight;
          observer.observe(target);
        } else {
          console.warn(`Invalid box data, missing:`, target, key);
        }
      }
    });
    setHeights(newHeights);

    return () => {
      observer.disconnect();
    };
  }, [items]);

  return heights;
};
