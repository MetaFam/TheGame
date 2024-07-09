import {
  Image,
  StatusedSubmitButton,
  Text,
  ToastId,
  useToast,
  UseToastOptions,
  VStack,
} from '@metafam/ds';
import { graphql, helpers } from '@quest-chains/sdk';
import { useWeb3 } from 'lib/hooks';
import React, { useCallback, useRef, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';
import {
  QuestChainPlaybooksDetails,
  QuestChainType,
  useQuestChainContract,
} from 'utils/questChains';

type MintNFTTileProps = {
  name: QuestChainType;
  questChain: graphql.QuestChainInfoFragment;
  completed: number;
  onSuccess?: () => void;
};

export const MintNFTTile: React.FC<MintNFTTileProps> = ({
  name,
  questChain,
  completed,
  onSuccess,
}) => {
  const { viemClients, chainId, address } = useWeb3();

  const toast = useToast({ isClosable: true });
  const toastIdRef = useRef<ToastId>();

  const addToast = useCallback(
    (options: UseToastOptions) => {
      if (toastIdRef.current) {
        toast.close(toastIdRef.current);
      }
      toastIdRef.current = toast(options);
    },
    [toast, toastIdRef],
  );

  const [isMinting, setMinting] = useState(false);
  const contract = useQuestChainContract(questChain.address);
  const onMint = useCallback(async () => {
    try {
      if (!chainId || questChain.chainId !== chainId) {
        throw new Error(`Wrong chain id: "${chainId}".`);
      }
      if (!address) {
        throw new Error('No client address found.');
      }
      if (!viemClients?.public) {
        throw new Error('Viem public client not initialized.');
      }

      setMinting(true);
      addToast({
        description:
          'Waiting for Confirmation: Confirm the transaction in your wallet.',
        duration: null,
      });

      const txHash = await contract.write.mintToken();
      addToast({
        description: 'Transaction submitted. Waiting for 1 block confirmation.',
        duration: null,
      });
      const receipt = await viemClients.public.waitForTransactionReceipt({
        hash: txHash,
      });
      addToast({
        description:
          'Transaction confirmed. Waiting for The Graph to index the transaction data.',
        duration: null,
      });
      await helpers.waitUntilSubgraphIndexed(
        chainId,
        Number(receipt.blockNumber),
      );
      addToast({
        description: `Successfully minted your NFT.`,
        duration: 5_000,
      });
      onSuccess?.();
    } catch (error) {
      addToast({
        description:
          (error as { error?: Error }).error?.message ??
          (error as Error).message,
        duration: 7_000,
      });
      errorHandler(error as Error);
    } finally {
      setMinting(false);
    }
  }, [
    chainId,
    questChain.chainId,
    address,
    viemClients?.public,
    addToast,
    contract.write,
    onSuccess,
  ]);

  const details = QuestChainPlaybooksDetails[name];
  const image = details?.image;

  return (
    <VStack
      w="100%"
      maxW="48rem"
      p={8}
      borderRadius={8}
      bg="whiteAlpha.200"
      backdropFilter="blur(7px)"
      color="white"
      textAlign="center"
      spacing={4}
    >
      <Image src={image} alt="Success" h="13.75rem" />
      <Text>
        {`You have successfully finished ${
          completed > 1 ? `all ${completed} quests` : 'all quests'
        } from ${questChain.name ?? 'this path'}.`}
      </Text>
      <StatusedSubmitButton
        isLoading={isMinting}
        onClick={onMint}
        label="Mint Your NFT"
      />
    </VStack>
  );
};
