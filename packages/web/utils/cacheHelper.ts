import { Maybe } from '@metafam/utils';
import { useAtom } from 'jotai';
import { profileAtom } from 'lib/store';
import { useMemo } from 'react';

export const isProxy = Symbol('isProxy');

export const useProfileOverride = (
  source: Maybe<Record<string | symbol, unknown>>,
) => {
  const [profile] = useAtom(profileAtom);

  return useMemo(() => {
    if (source == null || source[isProxy]) {
      return source;
    }

    return new Proxy(source, {
      get(target, name, receiver) {
        if (name === isProxy) return true;

        let ret = profile[name.toString()];
        if (ret === undefined) {
          ret = Reflect.get(target, name, receiver);
        }
        return ret;
      },
    });
  }, [source, profile]);
};
