import { useToast } from '@metafam/ds';
import { ComposeDBPayloadValue, Maybe } from '@metafam/utils';
import { useSetupFlow } from 'contexts/SetupContext';
import { CeramicError } from 'lib/errors';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';

import { useSaveToComposeDB } from './useSaveToComposeDB';

export function usePlayerSetupSaveToComposeDB<T = ComposeDBPayloadValue>({
  isChanged,
  onClose = undefined,
}: {
  isChanged: boolean;
  onClose?: () => void;
}) {
  const toast = useToast();
  const { onNextPress } = useSetupFlow();
  const [status, setStatus] = useState<Maybe<string | ReactElement>>();

  const { save: saveToComposeDB, status: saveStatus } = useSaveToComposeDB();

  const persist = useCallback(
    async (values: Record<string, T>) => {
      setStatus('Saving to Ceramic…');
      await saveToComposeDB({
        values,
      });
    },
    [saveToComposeDB],
  );

  useEffect(() => {
    if (saveStatus === 'authenticating') {
      setStatus('Authenticating DID…');
    }
  }, [saveStatus]);

  const onSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (values: Record<string, T>) => {
      try {
        if (!isChanged) {
          setStatus('No Change. Skipping Save…');
          await new Promise((resolve) => {
            setTimeout(resolve, 10);
          });
        } else if (persist) {
          setStatus('Saving…');
          await persist(values);
        }

        (onClose ?? onNextPress)();
      } catch (err) {
        const heading = err instanceof CeramicError ? 'Ceramic Error' : 'Error';
        toast({
          title: heading,
          description: (err as Error).message,
          status: 'error',
          isClosable: true,
          duration: 12000,
        });
        errorHandler(err as Error);
        setStatus(null);
      }
    },
    [isChanged, onClose, onNextPress, persist, toast],
  );

  return {
    onSubmit,
    status,
  };
}
