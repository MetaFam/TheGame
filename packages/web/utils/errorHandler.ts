import Honeybadger from '@honeybadger-io/js';
import { useToast } from '@metafam/ds';
import { useCallback } from 'react';
import { CombinedError } from 'urql';

import { CONFIG } from '../config';

export const errorHandler = (error: Error | CombinedError): void => {
  if (CONFIG.environment === 'production') {
    Honeybadger.notify(error);
  } else {
    console.error({ errorHandler: error });
  }
};

type DebugErrorReports = {
  debugErrorReports: () => void;
};

/**
 * @description A hook to test our error reporting service. Currently [Honeybadger](https://app.honeybadger.io/projects/104891/faults?q=-is%3Aresolved+-is%3Aignored&sort=last_seen_desc)
 * @returns `debugErrorReport` - Function to trigger an error to be reported
 * based on `urlParams`: `debug=unhandledError` or `debug=handledError`.
 */
export const useDebugErrorReports = (): DebugErrorReports => {
  const toast = useToast();

  const debugErrorReports = useCallback(() => {
    if (typeof window !== 'undefined') {
      const query = window.location.search;
      const urlParams = new URLSearchParams(query);
      const throwUnhandledError = urlParams.get('debug') === 'unhandledError';
      const throwHandledError = urlParams.get('debug') === 'handledError';
      const errorMessage = urlParams.get('message');

      if (throwUnhandledError) {
        console.error(errorMessage ?? 'Debug Unhandled error');
        throw new Error(errorMessage ?? 'Debug Unhandled error');
      }

      if (throwHandledError) {
        try {
          console.error(errorMessage ?? 'Debug Handled error');
          throw new Error(errorMessage ?? 'Debug Handled Error');
        } catch (err) {
          const error = err as Error;
          toast({
            title: 'Error debug',
            description: `Throwing handled error: ${error.message}.`,
            status: 'error',
            isClosable: true,
          });
          errorHandler(error);
        }
      }
    }
  }, [toast]);

  return {
    debugErrorReports,
  };
};
