import { useToast } from '@metafam/ds';
import {
  ComposeDBImageMetadata,
  composeDBProfileFieldAvatar,
  getMimeType,
  Maybe,
} from '@metafam/utils';
import { ReactElement, useCallback, useEffect, useState } from 'react';

import { useSetupFlow } from '#contexts/SetupContext';
import { useInsertCacheInvalidationMutation } from '#graphql/autogen/hasura-sdk';
import { CeramicError } from '#lib/errors';
import { errorHandler } from '#utils/errorHandler';
import { getImageDimensions } from '#utils/imageHelpers';

import { FileReaderData } from '../useImageReader';
import { useUser } from '../useUser';
import { useWeb3 } from '../useWeb3';
import { useSaveToComposeDB } from './useSaveToComposeDB';

export type PlayerSetupSaveToComposeDBProps = {
  isChanged: boolean;
  onComplete?: (nodeId?: string) => void;
  pickedFile?: FileReaderData;
};

export function usePlayerSetupSaveToComposeDB({
  isChanged,
  onComplete = undefined,
  pickedFile: fileData,
}: PlayerSetupSaveToComposeDBProps) {
  const toast = useToast();
  const { user } = useUser();
  const { onNextPress } = useSetupFlow();
  const [status, setStatus] = useState<Maybe<string | ReactElement>>();
  const { w3storage } = useWeb3();
  const { save: saveToComposeDB, status: saveStatus } = useSaveToComposeDB();
  const [, invalidateCache] = useInsertCacheInvalidationMutation();

  useEffect(() => {
    if (saveStatus === 'authenticating') {
      setStatus('Authenticating DID…');
    }
  }, [saveStatus]);

  const onSubmit = useCallback(
    async (values: Record<string, unknown>) => {
      try {
        let nodeId;

        if (!isChanged) {
          setStatus('No Change. Skipping Save…');
          await new Promise((resolve) => {
            setTimeout(resolve, 10);
          });
        } else {
          const payload = { ...values };
          if (fileData?.file != null) {
            // We have a file, thus this must be the avatar image. Here, we just
            // compute a whole new ComposeDBImageMetadata object and don't use any information
            // from the form
            setStatus('Uploading images to web3.storage…');

            const { file, dataURL } = fileData;

            const ipfsHash = await w3storage?.uploadFile(file);

            setStatus('Calculating image metadata…');

            const imageMetadata = {
              url: `ipfs://${ipfsHash}`,
              mimeType: getMimeType(dataURL),
            } as ComposeDBImageMetadata;

            const { width, height } = await getImageDimensions(dataURL);
            if (width && height) {
              imageMetadata.width = width;
              imageMetadata.height = height;
            }
            // composeDB doesn't like nulls
            const cleanImageMetadata = Object.fromEntries(
              Object.entries(imageMetadata).filter(([, v]) => v != null),
            );
            payload[composeDBProfileFieldAvatar] = cleanImageMetadata;
          }

          setStatus('Saving to ComposeDB…');
          nodeId = await saveToComposeDB(payload);

          if (user) {
            setStatus('Invalidating Cache…');
            await invalidateCache({ playerId: user.id });
          }
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
    [
      fileData,
      invalidateCache,
      isChanged,
      onComplete,
      onNextPress,
      saveToComposeDB,
      toast,
      user,
      w3storage,
    ],
  );

  return {
    onSubmit,
    status,
  };
}
