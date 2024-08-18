import {
  chakra,
  MarkdownEditor,
  Stack,
  StatusedSubmitButton,
  Text,
  ToastId,
  useDisclosure,
  useToast,
  UseToastOptions,
} from '@metafam/ds';
import { graphql, helpers } from '@quest-chains/sdk';
import { useRouter } from 'next/router';
import React, { useCallback, useRef, useState } from 'react';
import {
  Metadata,
  metadataUploader,
  useQuestChainContract,
} from 'utils/questChains';
import { useAccount } from 'wagmi';

import { useCarouselContext } from '#components/Carousel/CarouselContext';
import { SwitchNetworkButton } from '#components/SwitchNetworkButton';
import { useDropFiles, useDropImage } from '#lib/hooks/useDropFiles';
import { useViemClients } from '#lib/hooks/useEthersProvider';
import { useInputText } from '#lib/hooks/useInputText';
import { errorHandler } from '#utils/errorHandler';
import { getHexChainId, NETWORK_INFO } from '#utils/networks';

export type ToastInfo = {
  close: boolean;
  id: ToastId;
};

export const UploadProof: React.FC<{
  questId: string;
  name: string;
  questChain: graphql.QuestChainInfoFragment;
  onComplete?: (successful: boolean) => void;
}> = ({ questId, name, questChain, onComplete }) => {
  const viemClients = useViemClients();
  const { onClose } = useDisclosure();
  const { chainId, address, chain } = useAccount();
  const { setIsSubmittingProof } = useCarouselContext();
  const debug = !!useRouter().query.debug;

  const toast = useToast({ isClosable: true });
  const lastToast = useRef<ToastInfo>();

  const addToast = useCallback(
    (options: UseToastOptions) => {
      if (lastToast.current?.close) {
        toast.close(lastToast.current.id);
      }
      lastToast.current = {
        close: options.duration === null,
        id: toast(options),
      };
    },
    [toast],
  );

  const [isSubmitting, setSubmitting] = useState(false);
  const [proofDescRef, setProofDescription] = useInputText();
  const { files } = useDropFiles();
  const { imageFile } = useDropImage();

  const onModalClose = useCallback(() => {
    onClose();
    setIsSubmittingProof(false);
  }, [onClose, setIsSubmittingProof]);

  const contract = useQuestChainContract(questChain.address);

  const onSubmit = useCallback(async () => {
    try {
      if (!chainId) throw new Error('Missing chain id.');
      if (!proofDescRef.current) throw new Error('Proof description is empty.');

      setSubmitting(true);

      const filesCount = files.length + (imageFile ? 1 : 0);

      addToast({
        description: `Uploading ${filesCount} file${
          filesCount !== 1 ? 's' : ''
        } to IPFS at Web3.Storage.`,
        duration: null,
      });

      const [filesHash, imageHash] = await Promise.all([
        files.length > 0 ? await metadataUploader.uploadFiles(files) : null,
        imageFile ? await metadataUploader.uploadFiles([imageFile]) : null,
      ]);

      const quest = questChain.quests.find(({ id }) => id === questId);

      if (!quest) {
        throw new Error(`Quest "${questId}" not found.`);
      }

      addToast({
        description: 'Uploading metadata to IPFS via web3.storage.',
        duration: null,
      });

      const metadata: Metadata = {
        name: `Submission - QuestChain - ${questChain.name} - Quest - ${questId} - ${name} User - ${address}`,
        description: proofDescRef.current,
      };
      if (imageHash) metadata.image_url = `ipfs://${imageHash}`;
      if (filesHash) metadata.external_url = `ipfs://${filesHash}`;

      // eslint-disable-next-line no-console
      if (debug) console.debug({ metadata });

      const hash = await metadataUploader.uploadMetadata(metadata);
      const details = `ipfs://${hash}`;

      addToast({
        description: (
          <Stack>
            <Text>
              Wrote metadata to{' '}
              <chakra.a href={details} color="purple.600" target="_blank">
                {details}
              </chakra.a>.
            </Text>
            <Text>
              Simulating Mint: Confirm the transaction in your wallet.
            </Text>
          </Stack>
        ),
        duration: 3_000,
      });

      // eslint-disable-next-line no-console
      if (debug) console.debug({ quest });

      if(!address) throw new Error('Missing address.')

      const { request } = await contract.simulate.submitProofs(
        [[BigInt(quest.questId)], [details]],
        { account: address },
      );
      
      // eslint-disable-next-line no-console
      if(debug) console.debug({ request })

      const txHash = await viemClients.wallet.writeContract(
        request as typeof request & { account: string }
      );
      
      addToast({
        description: `Transaction ${txHash} submitted. Waiting for 1 block confirmation.`,
        duration: null,
      });
      const receipt = await viemClients.public.waitForTransactionReceipt({ hash: txHash });
      addToast({
        description: (
          'Transaction confirmed. Waiting for The Graph to index the transaction data.'
        ),
        duration: null,
      });
      await helpers.waitUntilSubgraphIndexed(`0x${chainId.toString(16)}`, Number(receipt.blockNumber));
      addToast({
        description: `Successfully submitted proof.`,
        duration: 5_000,
      });
      onModalClose();
      onComplete?.(true);
    } catch (error) {
      addToast({
        description:
          (error as { error?: Error }).error?.message ??
          (error as Error).message,
        status: 'error',
        duration: 10_000,
      });
      console.error({ error });
      errorHandler(error as Error);
      // eslint-disable-next-line no-console
      if(debug) console.debug('Calling onComplete(false) from UploadProof')
      onComplete?.(false);
    }

    setSubmitting(false);
  }, [
    chainId,
    proofDescRef,
    files,
    imageFile,
    addToast,
    questChain.quests,
    questChain.name,
    questId,
    name,
    address,
    debug,
    contract.write,
    viemClients.public,
    onModalClose,
    onComplete,
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
      {Number(questChain.chainId) !== chainId ? (
        <SwitchNetworkButton chainId={questChain.chainId} />
      ) : (
        <StatusedSubmitButton
          px={[8, 12]}
          label="Submit Proof"
          onClick={() => {
            if (!chainId || getHexChainId(chain?.name) !== questChain.chainId) {
              addToast({
                description: `Wrong chain, please switch to ${
                  NETWORK_INFO[questChain.chainId].label
                }.`,
                status: 'warning',
                duration: 8_000,
              });
            } else if (!proofDescRef.current) {
              addToast({
                description: 'Proof description cannot be empty.',
                status: 'error',
                duration: 8_000,
              });
            } else {
              onSubmit();
            }
          }}
          {...{ status: isSubmitting ? 'Submitting…' : null }}
        />
      )}
    </Stack>
  );
};
