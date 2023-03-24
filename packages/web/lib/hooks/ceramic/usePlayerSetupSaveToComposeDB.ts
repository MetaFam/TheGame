import { useToast } from '@metafam/ds';
import {
  ComposeDBField,
  ComposeDBImageMetadata,
  composeDBProfileFieldAvatar,
  composeDBProfileFieldFiveColorDisposition,
  dispositionFor,
  getMimeType,
  HasuraImageFieldKey,
  isHasuraImageField,
  Maybe,
  profileMapping,
} from '@metafam/utils';
import { useSetupFlow } from 'contexts/SetupContext';
import { useInsertCacheInvalidationMutation } from 'graphql/autogen/types';
import { PlayerProfile } from 'graphql/types';
import { CeramicError } from 'lib/errors';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';
import { getImageDimensions } from 'utils/imageHelpers';
import { uploadFile } from 'utils/uploadHelpers';

import { FileReaderData } from '../useImageReader';
import { useUser } from '../useUser';
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

            const ipfsHash = await uploadFile(file);

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
    ],
  );

  return {
    onSubmit,
    status,
  };
}

export const hasuraToComposeDBProfile = (
  profile: PlayerProfile,
  images: Record<HasuraImageFieldKey, Maybe<ComposeDBImageMetadata>>,
) => {
  // todo we should be able to make this typesafe
  const composeDBPayload: Record<string, unknown> = {};

  Object.entries(profileMapping).forEach(([hasuraID, composeDBID]) => {
    const composeDBKey = composeDBID as ComposeDBField;
    const hasuraKey = hasuraID as keyof typeof profileMapping;
    if (isHasuraImageField(hasuraKey)) {
      const imageMetadata = images[hasuraKey as HasuraImageFieldKey];
      if (imageMetadata) {
        composeDBPayload[composeDBKey] = imageMetadata;
      }
    } else {
      const hasuraValue = profile[hasuraKey];
      if (hasuraValue != null) {
        if (composeDBKey === composeDBProfileFieldFiveColorDisposition) {
          const maskString = dispositionFor(hasuraValue as number);
          if (maskString) {
            composeDBPayload[composeDBKey] = maskString;
          }
        } else {
          composeDBPayload[composeDBKey] = hasuraValue;
        }
      }
    }
  });

  return composeDBPayload;
};
