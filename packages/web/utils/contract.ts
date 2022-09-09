import { contracts } from '@quest-chains/sdk';
import { Signer } from 'ethers';

export const getQuestChainContract = (
  address: string,
  version: string,
  signer: Signer,
): contracts.V1.QuestChain | contracts.V0.QuestChain => {
  if (version === '0') {
    return contracts.V0.QuestChain__factory.connect(
      address,
      signer,
    ) as contracts.V0.QuestChain;
  }
  if (version === '1') {
    return contracts.V1.QuestChain__factory.connect(
      address,
      signer,
    ) as contracts.V1.QuestChain;
  }
  throw new Error('Unsupported Quest Chain version');
};
