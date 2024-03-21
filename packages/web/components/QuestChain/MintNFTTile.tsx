import {
  Image,
  StatusedSubmitButton,
  Text,
  ToastId,
  useToast,
  UseToastOptions,
  VStack,
} from '@metafam/ds';
import { contracts, graphql, helpers } from '@quest-chains/sdk';
import { useWeb3 } from 'lib/hooks';
import React, { useCallback, useRef, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';
import {
  getQuestChainContract,
  QuestChainPlaybooksDetails,
  QuestChainType,
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
  const { provider, chainId, address } = useWeb3();

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

  const [isMinting, setMinting] = useState(false);
  const onMint = useCallback(async () => {
    if (!chainId || questChain.chainId !== chainId || !address || !provider)
      return;
    setMinting(true);
    addToast({
      description:
        'Waiting for Confirmation - Confirm the transaction in your Wallet',
      duration: null,
      isClosable: true,
    });
    try {
      const contract = getQuestChainContract(
        questChain.address,
        questChain.version,
        provider.getSigner(),
      );

      const tx = await (questChain.version === '0'
        ? (contract as contracts.V0.QuestChain).mintToken(address)
        : (contract as contracts.V1.QuestChain).mintToken());
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
      await helpers.waitUntilSubgraphIndexed(chainId, receipt.blockNumber);
      addToast({
        description: `Successfully minted your NFT`,
        duration: 5000,
        isClosable: true,
      });
      onSuccess?.();
    } catch (error) {
      addToast({
        description:
          (error as { error?: Error }).error?.message ??
          (error as Error).message,
        duration: 2000,
        isClosable: true,
      });
      errorHandler(error as Error);
    } finally {
      setMinting(false);
    }
  }, [onSuccess, questChain, address, chainId, provider, addToast]);

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
        label="MINT YOUR NFT"
      />
    </VStack>
  );
};
