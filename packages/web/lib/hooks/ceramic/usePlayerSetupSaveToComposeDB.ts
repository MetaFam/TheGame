import { useToast } from '@metafam/ds';
import { ComposeDBPayloadValue, Maybe } from '@metafam/utils';
import { useSetupFlow } from 'contexts/SetupContext';
import { CeramicError } from 'lib/errors';
import { ReactElement, useCallback, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';

import { useSaveToComposeDB } from './useSaveToComposeDB';

export function usePlayerSetupSaveToComposeDB<T = ComposeDBPayloadValue>({
  mutationQuery,
  isChanged,
  onClose = undefined,
}: {
  mutationQuery: string;
  isChanged: boolean;
  onClose?: () => void;
}) {
  const toast = useToast();
  const { onNextPress } = useSetupFlow();
  const [status, setStatus] = useState<Maybe<string | ReactElement>>();

  const saveToComposeDB = useSaveToComposeDB({
    setStatus,
  });

  const persist = useCallback(
    async (values: Record<string, T>) => {
      const mutationPayload: Record<string, unknown> = {
        input: {
          content: values,
        },
      };

      setStatus('Saving to Ceramic…');
      await saveToComposeDB({
        mutationQuery,
        values: mutationPayload,
      });
    },
    [mutationQuery, saveToComposeDB],
  );

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
