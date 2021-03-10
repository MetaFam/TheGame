import copyToClipboard from 'copy-to-clipboard';
import { useCallback,useEffect, useState } from 'react';

const DEFAULT_DELAY = 3000;

export const useCopyToClipboard = (
  delay = DEFAULT_DELAY,
): [boolean, (text: string) => void] => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return () => undefined;

    const id = setTimeout(() => {
      setCopied(false);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [delay, copied]);

  const handleCopy = useCallback((text: string) => {
    setCopied(true);
    copyToClipboard(text);
  }, []);

  return [copied, handleCopy];
};
