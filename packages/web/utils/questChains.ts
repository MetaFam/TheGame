import { Values } from '@metafam/utils';
import { contracts, metadata } from '@quest-chains/sdk';
import bridge from 'assets/quests/bridge.png';
import builders from 'assets/quests/builders.png';
import design from 'assets/quests/design.png';
import octopus from 'assets/quests/octopus.png';
import patron from 'assets/quests/patron.png';
import rogue from 'assets/quests/rogue.png';
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

export const Difficulty = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
};
export const Time = {
  SHORT: 'Short',
  MEDIUM: 'Medium',
  LONG: 'Long',
};

export type QuestChainType = Values<typeof QuestChains>;

type QuestChainInfo = {
  chainId: string;
  address: string;
  title: string;
  description: string;
  icon: string;
  difficulty: string;
  time: string;
};

export const QuestChainDetails: Record<QuestChainType, QuestChainInfo> = {
  // Engaged Octo's path: https://questchains.xyz/chain/0x89/0xea512722CC047bfDbe90a1a2750491e89a818CA7
  [QuestChains.ENGAGED_OCTOS_PATH]: {
    chainId: '0x89',
    address: '0xea512722cc047bfdbe90a1a2750491e89a818ca7',
    title: `Engaged Octo's Path`,
    description:
      'This is a general questline for anyone who is interested in joining & contributing to MetaGame.',
    icon: octopus.src,
    difficulty: Difficulty.EASY,
    time: Time.LONG,
  },
  // Builder's path: https://questchains.xyz/chain/0x89/0x8d23ef86e502b4c24d1ae4bf96249721903cbc71
  [QuestChains.BUILDERS_PATH]: {
    chainId: '0x89',
    address: '0x8d23ef86e502b4c24d1ae4bf96249721903cbc71',
    title: "Builder's path",
    description:
      'This is a questline for getting onboarded to MetaGame as a builder, it requires knowledge of TypeScript.',
    icon: builders.src,
    difficulty: Difficulty.EASY,
    time: Time.LONG,
  },
  // Designer's path: https://questchains.xyz/chain/0x89/0x32079721deef91dae71fc8ebcfabc73702f7b137
  [QuestChains.DESIGNERS_PATH]: {
    chainId: '0x89',
    address: '0x32079721deef91dae71fc8ebcfabc73702f7b137',
    title: "Designer's path",
    description:
      'This is a questline for getting onboarded into MetaGame as a designer of experiences & interfaces.',
    icon: design.src,
    difficulty: Difficulty.EASY,
    time: Time.MEDIUM,
  },
  // Rogue's path: https://questchains.xyz/chain/0x89/0xF0a2E8e05555F187E1d2b5ACabA925598477F173
  [QuestChains.ROGUES_PATH]: {
    chainId: '0x89',
    address: '0xF0a2E8e05555F187E1d2b5ACabA925598477F173',
    title: "Rogue's path",
    description:
      'This is a questline for those who like to chart their own path or just aren’t sure how to contribute.',
    icon: rogue.src,
    difficulty: Difficulty.EASY,
    time: Time.MEDIUM,
  },
  // Bridgebuilder's path: https://questchains.xyz/chain/0x89/0xf7fbc471cbae68bf3833ff820c926ffe3c5bf0f7
  [QuestChains.BRIDGEBUILDERS_PATH]: {
    chainId: '0x89',
    address: '0xf7fbc471cbae68bf3833ff820c926ffe3c5bf0f7',
    title: "Bridgebuilder's path",
    description:
      'This is a questline for those who are interested in building bridges between MetaGame & other communities.',
    icon: bridge.src,
    difficulty: Difficulty.HARD,
    time: Time.LONG,
  },
  // Patron's path: https://questchains.xyz/chain/0x89/0x372C28C97fcb2600d025Bf536C9738A08fF8022b
  [QuestChains.PATRONS_PATH]: {
    chainId: '0x89',
    address: '0x372C28C97fcb2600d025Bf536C9738A08fF8022b',
    title: "Patron's path",
    description:
      'This is a questline for those too busy to actively contribute to MetaGame; those interested in watering Trees.',
    icon: patron.src,
    difficulty: Difficulty.EASY,
    time: Time.SHORT,
  },
};

export const metadataUploader = new metadata.MetadataUploader();

export type Metadata = metadata.Metadata;
