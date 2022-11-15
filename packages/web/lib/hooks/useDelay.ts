import { useCallback, useRef } from 'react';

// eslint-disable-next-line  @typescript-eslint/ban-types
export const useDelay = (fn: Function, ms = 500): Function => {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const delayCallBack = useCallback(
    (...args: Array<unknown>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(fn.bind(this, ...args), ms);
    },
    [fn, ms],
  );

  return delayCallBack;
};
