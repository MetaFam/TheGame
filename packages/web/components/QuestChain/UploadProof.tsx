import {
  Stack,
  StatusedSubmitButton,
  Text,
  ToastId,
  Tooltip,
  useBreakpointValue,
  useDisclosure,
  useToast,
  UseToastOptions,
} from '@metafam/ds';
import { contracts, graphql, helpers } from '@quest-chains/sdk';
import { useCarouselContext } from 'components/Carousel/CarouselContext';
import { useWeb3 } from 'lib/hooks';
import { useDropFiles, useDropImage } from 'lib/hooks/useDropFiles';
import { useInputText } from 'lib/hooks/useInputText';
import React, { useCallback, useRef, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';
import { NETWORK_INFO } from 'utils/networks';
import {
  getQuestChainContract,
  Metadata,
  metadataUploader,
} from 'utils/questChains';
import { useAccount } from 'wagmi';

import { MarkdownEditor } from '../MarkdownEditor';
import { UploadFilesForm } from './UploadFilesForm';
import { UploadImageForm } from './UploadImageForm';

export const UploadProof: React.FC<{
  refresh: () => void;
  questId: string;
  name: string;
  questChain: graphql.QuestChainInfoFragment;
}> = ({ refresh, questId, name, questChain }) => {
  const { provider } = useWeb3();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chainId, address, chain } = useAccount();
  const { setIsSubmittingProof } = useCarouselContext();

  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>(undefined);

  const addToast = useCallback(
    (options: UseToastOptions) => {
      if (toastIdRef.current) {
        toast.close(toastIdRef.current);
      }
      toastIdRef.current = toast(options);
    },
    [toast, toastIdRef],
  );

  const [isSubmitting, setSubmitting] = useState(false);

  const [proofDescRef, setProofDescription] = useInputText();

  const dropFilesProps = useDropFiles();

  const { files } = dropFilesProps;

  const dropImageProps = useDropImage();

  const buttonSize = useBreakpointValue({ base: 'sm', lg: 'md' });

  const { imageFile } = dropImageProps;

  const onModalClose = useCallback(() => {
    onClose();
    setIsSubmittingProof(false);
  }, [onClose, setIsSubmittingProof]);

  const onSubmit = useCallback(async () => {
    if (
      !chainId ||
      `${chainId}` !== questChain.chainId ||
      !provider ||
      !proofDescRef.current
    )
      return;

    setSubmitting(true);
    addToast({
      description: 'Uploading metadata to IPFS via web3.storage',
      duration: null,
      isClosable: true,
    });
    try {
      const [filesHash, imageHash] = await Promise.all([
        files.length ? await metadataUploader.uploadFiles(files) : '',
        imageFile ? await metadataUploader.uploadFiles([imageFile]) : '',
      ]);
      const metadata: Metadata = {
        name: `Submission - QuestChain - ${questChain.name} - Quest - ${questId}. ${name} User - ${address}`,
        description: proofDescRef.current,
        image_url: imageHash ? `ipfs://${imageHash}` : undefined,
        external_url: filesHash ? `ipfs://${filesHash}` : undefined,
      };

      const hash = await metadataUploader.uploadMetadata(metadata);
      const details = `ipfs://${hash}`;
      addToast({
        description:
          'Waiting for Confirmation - Confirm the transaction in your Wallet',
        duration: null,
        isClosable: true,
      });

      const contract = getQuestChainContract(
        questChain.address,
        questChain.version,
        provider.getSigner(),
      );
      const tx = await (questChain.version === '0'
        ? (contract as contracts.V0.QuestChain).submitProof(questId, details)
        : (contract as contracts.V1.QuestChain).submitProofs([0], [details]));
      addToast({
        description: 'Transaction submitted. Waiting for 1 block confirmation',
        duration: null,
        isClosable: true,
      });
      const receipt = await tx.wait(1);
      addToast({
        description:
          'Transaction confirmed. Waiting for The Graph to index the transaction data.',
        duration: null,
        isClosable: true,
      });
      await helpers.waitUntilSubgraphIndexed(`${chainId}`, receipt.blockNumber);
      addToast({
        description: `Successfully submitted proof`,
        duration: 5000,
        isClosable: true,
      });
      onModalClose();
      refresh();
    } catch (error) {
      addToast({
        description:
          (error as { error?: Error }).error?.message ??
          (error as Error).message,
        duration: 2000,
        isClosable: true,
      });
      console.error(error);
      errorHandler(error as Error);
    }

    setSubmitting(false);
  }, [
    chainId,
    questChain.chainId,
    questChain.name,
    questChain.address,
    questChain.version,
    provider,
    proofDescRef,
    addToast,
    files,
    imageFile,
    questId,
    name,
    address,
    onModalClose,
    refresh,
  ]);

  return (
    <Stack
      w="full"
      borderTop="1px solid var(--white-alpha-300, rgba(255, 255, 255, 0.16))"
      background="var(--black-alpha-300, rgba(0, 0, 0, 0.16))"
      p={10}
    >
      <Text>Proof of completion</Text>
      <MarkdownEditor
        value={proofDescRef.current}
        onChange={setProofDescription}
      />
      <UploadImageForm
        {...dropImageProps}
        imageProps={{ maxH: '12rem' }}
        formControlProps={{ mb: 4 }}
      />
      <UploadFilesForm {...dropFilesProps} />

      <Tooltip
        shouldWrapChildren
        label={`Please connect or switch to ${
          NETWORK_INFO[questChain.chainId].label
        }`}
        isDisabled={`${chainId}` === questChain.chainId}
      >
        <StatusedSubmitButton
          px={[8, 12]}
          label="Submit Proof"
          onClick={() => {
            if (!chainId || `${chainId}` !== questChain.chainId) {
              addToast({
                description: `Wrong Chain, please switch to ${
                  NETWORK_INFO[questChain.chainId].label
                }`,
                duration: 2000,
                isClosable: true,
              });
              return;
            }
            if (!proofDescRef.current) {
              addToast({
                description: 'Proof description cannot be empty',
                duration: 2000,
                isClosable: true,
              });
              return;
            }

            onSubmit();
          }}
          {...{ status: isSubmitting ? 'Submitting...' : null }}
        />
      </Tooltip>
    </Stack>
  );
};
