import { Values } from '@metafam/utils';
import { contracts, metadata } from '@quest-chains/sdk';
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

export const QuestChains = {
  ENGAGED_OCTOS_PATH: 'engaged-octos-path',
  BUILDERS_PATH: 'builders-path',
  DESIGNERS_PATH: 'designers-path',
  PATRONS_PATH: 'patrons-path',
  BRIDGEBUILDERS_PATH: 'bridgebuilders-path',
  ROGUES_PATH: 'rogues-path',
};

export type QuestChainType = Values<typeof QuestChains>;

type QuestChainInfo = { chainId: string; address: string };

export const QuestChainDetails: Record<QuestChainType, QuestChainInfo> = {
  // Engaged Octo's path: https://questchains.xyz/chain/0x89/0xea512722CC047bfDbe90a1a2750491e89a818CA7
  [QuestChains.ENGAGED_OCTOS_PATH]: {
    chainId: '0x89',
    address: '0xea512722cc047bfdbe90a1a2750491e89a818ca7',
  },
  // Builder's path: https://questchains.xyz/chain/0x89/0x8d23ef86e502b4c24d1ae4bf96249721903cbc71
  [QuestChains.BUILDERS_PATH]: {
    chainId: '0x89',
    address: '0x8d23ef86e502b4c24d1ae4bf96249721903cbc71',
  },
  // Designer's path: https://questchains.xyz/chain/0x89/0x32079721deef91dae71fc8ebcfabc73702f7b137
  [QuestChains.DESIGNERS_PATH]: {
    chainId: '0x89',
    address: '0x32079721deef91dae71fc8ebcfabc73702f7b137',
  },
  // Patron's path: https://questchains.xyz/chain/0x89/0x372C28C97fcb2600d025Bf536C9738A08fF8022b
  [QuestChains.PATRONS_PATH]: {
    chainId: '0x89',
    address: '0x372C28C97fcb2600d025Bf536C9738A08fF8022b',
  },
  // Bridgebuilder's path: https://questchains.xyz/chain/0x89/0xf7fbc471cbae68bf3833ff820c926ffe3c5bf0f7
  [QuestChains.BRIDGEBUILDERS_PATH]: {
    chainId: '0x89',
    address: '0xf7fbc471cbae68bf3833ff820c926ffe3c5bf0f7',
  },
  // Rogue's path: https://questchains.xyz/chain/0x89/0xF0a2E8e05555F187E1d2b5ACabA925598477F173
  [QuestChains.ROGUES_PATH]: {
    chainId: '0x89',
    address: '0xF0a2E8e05555F187E1d2b5ACabA925598477F173',
  },
};

export const metadataUploader = new metadata.MetadataUploader();

export type Metadata = metadata.Metadata;
