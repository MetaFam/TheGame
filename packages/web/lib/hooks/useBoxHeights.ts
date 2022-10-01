import { Maybe } from '@metafam/utils';
import { useEffect, useState } from 'react';
import { getBoxKey } from 'utils/boxTypes';

export const useBoxHeights = (items: Array<Maybe<HTMLElement>>) => {
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
      if (item) {
        const target = item.children[0] as HTMLElement;
        const key = getBoxKey(target);
        if (key && target) {
          newHeights[key] = target.scrollHeight;
          observer.observe(target);
        } else {
          // eslint-disable-next-line no-console
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
