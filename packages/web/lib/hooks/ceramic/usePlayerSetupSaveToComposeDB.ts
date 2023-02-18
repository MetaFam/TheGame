import { useToast } from '@metafam/ds';
import {
  ComposeDBField,
  ComposeDBImageMetadata,
  ComposeDBPayloadValue,
  composeDBProfileFieldFiveColorDisposition,
  dispositionFor,
  HasuraImageFieldKey,
  isComposeDBImageField,
  Maybe,
  profileMapping,
} from '@metafam/utils';
import { useSetupFlow } from 'contexts/SetupContext';
import { Profile } from 'graphql/autogen/types';
import { CeramicError } from 'lib/errors';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';

import { useSaveToComposeDB } from './useSaveToComposeDB';

export function usePlayerSetupSaveToComposeDB<T = ComposeDBPayloadValue>({
  isChanged,
  onComplete = undefined,
}: {
  isChanged: boolean;
  onComplete?: (nodeId?: string) => void;
}) {
  const toast = useToast();
  const { onNextPress } = useSetupFlow();
  const [status, setStatus] = useState<Maybe<string | ReactElement>>();

  const { save: saveToComposeDB, status: saveStatus } = useSaveToComposeDB();

  const persist = useCallback(
    (values: Record<string, T>) => {
      setStatus('Saving to Ceramic…');
      return saveToComposeDB(values);
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
        let nodeId;

        if (!isChanged) {
          setStatus('No Change. Skipping Save…');
          await new Promise((resolve) => {
            setTimeout(resolve, 10);
          });
        } else if (persist) {
          setStatus('Saving…');
          nodeId = await persist(values);
        }

        if (onComplete) {
          onComplete(nodeId);
        } else {
          onNextPress();
        }
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
    [isChanged, onComplete, onNextPress, persist, toast],
  );

  return {
    onSubmit,
    status,
  };
}

export const hasuraToComposeDBProfile = (
  profile: Profile,
  images: Record<HasuraImageFieldKey, Maybe<ComposeDBImageMetadata>>,
) => {
  // todo we should be able to make this typesafe
  const composeDBPayload: Record<string, unknown> = {};

  Object.entries(profileMapping).forEach(([hasuraID, composeDBID]) => {
    const composeDBKey = composeDBID as ComposeDBField;
    const hasuraKey = hasuraID as keyof typeof profileMapping;
    const hasuraValue = profile[hasuraKey];
    if (hasuraValue != null) {
      if (composeDBKey === composeDBProfileFieldFiveColorDisposition) {
        const maskString = dispositionFor(hasuraValue as number);
        if (maskString) {
          composeDBPayload[composeDBKey] = maskString;
        }
      } else if (isComposeDBImageField(composeDBKey)) {
        const hasuraImage = images[hasuraKey as HasuraImageFieldKey];
        if (hasuraImage) {
          composeDBPayload[composeDBKey] = hasuraImage;
        }
      } else {
        composeDBPayload[composeDBKey] = hasuraValue;
      }
    }
  });

  return composeDBPayload;
};
