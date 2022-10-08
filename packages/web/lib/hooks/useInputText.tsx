import { MutableRefObject, useCallback, useRef } from 'react';

export const useInputText = (
  defaultText?: string | null | undefined,
): [MutableRefObject<string>, (txt: string) => void] => {
  const textRef = useRef<string>(defaultText ?? '');
  const setText = useCallback((txt: string) => {
    textRef.current = txt;
  }, []);
  return [textRef, setText];
};
