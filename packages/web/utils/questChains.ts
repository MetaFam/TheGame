import { Values } from '@metafam/utils';
import { contracts, metadata } from '@quest-chains/sdk';
import daos from 'assets/houses/daos.png';
import dapps from 'assets/houses/dapps.png';
import definance from 'assets/houses/definance.png';
import ethereum from 'assets/houses/ethereum.png';
import nfts from 'assets/houses/nfts.png';
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

export const QuestChainsRoles = {
  ENGAGED_OCTOS_PATH: 'engaged-octos-path',
  BUILDERS_PATH: 'builders-path',
  DESIGNERS_PATH: 'designers-path',
  PATRONS_PATH: 'patrons-path',
  BRIDGEBUILDERS_PATH: 'bridgebuilders-path',
  ROGUES_PATH: 'rogues-path',
};

export const QuestChainsGreatHouses = {
  HOUSE_OF_ETHEREUM: 'house-of-ethereum',
  HOUSE_OF_DAOS: 'house-of-daos',
  HOUSE_OF_DAPPS: 'house-of-dapps',
  HOUSE_OF_NFTS: 'house-of-nfts',
  HOUSE_OF_DEFINANCE: 'house-of-definance',
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

export type QuestChainType =
  | Values<typeof QuestChainsRoles>
  | Values<typeof QuestChainsGreatHouses>;

type QuestChainInfo = {
  chainId: string;
  address: string;
  title: string;
  description: string;
  image: string;
  difficulty?: string;
  time?: string;
};

export const QuestChainRolesDetails: Record<QuestChainType, QuestChainInfo> = {
  // Engaged Octo's path: https://questchains.xyz/chain/0x89/0xea512722CC047bfDbe90a1a2750491e89a818CA7
  [QuestChainsRoles.ENGAGED_OCTOS_PATH]: {
    chainId: '0x89',
    address: '0xea512722cc047bfdbe90a1a2750491e89a818ca7',
    title: `Engaged Octo's Path`,
    description:
      'This is a general questline for anyone who is interested in joining & contributing to MetaGame.',
    image: octopus.src,
    difficulty: Difficulty.EASY,
    time: Time.LONG,
  },
  // Builder's path: https://questchains.xyz/chain/0x89/0x8d23ef86e502b4c24d1ae4bf96249721903cbc71
  [QuestChainsRoles.BUILDERS_PATH]: {
    chainId: '0x89',
    address: '0x8d23ef86e502b4c24d1ae4bf96249721903cbc71',
    title: "Builder's path",
    description:
      'This is a questline for getting onboarded to MetaGame as a builder, it requires knowledge of TypeScript.',
    image: builders.src,
    difficulty: Difficulty.EASY,
    time: Time.LONG,
  },
  // Designer's path: https://questchains.xyz/chain/0x89/0x32079721deef91dae71fc8ebcfabc73702f7b137
  [QuestChainsRoles.DESIGNERS_PATH]: {
    chainId: '0x89',
    address: '0x32079721deef91dae71fc8ebcfabc73702f7b137',
    title: "Designer's path",
    description:
      'This is a questline for getting onboarded into MetaGame as a designer of experiences & interfaces.',
    image: design.src,
    difficulty: Difficulty.EASY,
    time: Time.MEDIUM,
  },
  // Rogue's path: https://questchains.xyz/chain/0x89/0xF0a2E8e05555F187E1d2b5ACabA925598477F173
  [QuestChainsRoles.ROGUES_PATH]: {
    chainId: '0x89',
    address: '0xF0a2E8e05555F187E1d2b5ACabA925598477F173',
    title: "Rogue's path",
    description:
      'This is a questline for those who like to chart their own path or just aren’t sure how to contribute.',
    image: rogue.src,
    difficulty: Difficulty.EASY,
    time: Time.MEDIUM,
  },
  // Bridgebuilder's path: https://questchains.xyz/chain/0x89/0xf7fbc471cbae68bf3833ff820c926ffe3c5bf0f7
  [QuestChainsRoles.BRIDGEBUILDERS_PATH]: {
    chainId: '0x89',
    address: '0xf7fbc471cbae68bf3833ff820c926ffe3c5bf0f7',
    title: "Bridgebuilder's path",
    description:
      'This is a questline for those who are interested in building bridges between MetaGame & other communities.',
    image: bridge.src,
    difficulty: Difficulty.HARD,
    time: Time.LONG,
  },
  // Patron's path: https://questchains.xyz/chain/0x89/0x372C28C97fcb2600d025Bf536C9738A08fF8022b
  [QuestChainsRoles.PATRONS_PATH]: {
    chainId: '0x89',
    address: '0x372C28C97fcb2600d025Bf536C9738A08fF8022b',
    title: "Patron's path",
    description:
      'This is a questline for those too busy to actively contribute to MetaGame; those interested in watering Trees.',
    image: patron.src,
    difficulty: Difficulty.EASY,
    time: Time.SHORT,
  },
};

export const QuestChainGreatHousesDetails: Record<
  QuestChainType,
  QuestChainInfo
> = {
  // Builder's path: https://questchains.xyz/chain/0x89/0x8d23ef86e502b4c24d1ae4bf96249721903cbc71
  // difficulty and time are redundant, should be removed
  [QuestChainsGreatHouses.HOUSE_OF_ETHEREUM]: {
    chainId: '0x89',
    address: '0xa5c36c62ead5d3551aaf7765ee68e6f0ea3b3e1c',
    title: 'House of Ethereum',
    description:
      'House of Ethereum is about helping you understand the significance of this technology we keep on talking about.',
    image: ethereum.src,
  },
  // Engaged Octo's path: https://questchains.xyz/chain/0x89/0xea512722CC047bfDbe90a1a2750491e89a818CA7
  [QuestChainsGreatHouses.HOUSE_OF_DAOS]: {
    chainId: '0x89',
    address: '0x4742ebadaf69aff1b16909a691af4bcd30db0b4a',
    title: `House of DAOs`,
    description:
      'House of DAOs gives you an understanding of Decentralized Autonomous Organizations & how to build them.',
    image: daos.src,
  },
  [QuestChainsGreatHouses.HOUSE_OF_DAPPS]: {
    chainId: '0x89',
    address: '0x67bd46a611d044ee947286b7c4d93c64d4c1a6d0',
    title: `House of dApps`,
    description:
      'House of dApps is about making you see the endless possibilities of decentralized composable applications.',
    image: dapps.src,
  },
  [QuestChainsGreatHouses.HOUSE_OF_NFTS]: {
    chainId: '0x89',
    address: '0xd58ffe9a24f76eeb63e1b44bc95766e2253e4d92',
    title: `House of NFTs`,
    description:
      'House of NFTs shows you what the fuss is about & lists all the different NFT usecases beyond overpriced art pieces.',
    image: nfts.src,
  },
  [QuestChainsGreatHouses.HOUSE_OF_DEFINANCE]: {
    chainId: '0x89',
    address: '0x26b49ceeb0dfdc5c619c4e853bd51d8e1e02d18c',
    title: 'House of DeFinance',
    description:
      'House of DeFinance is here to help you see how a new financial system is being built & how banks will be made obsolete.',
    image: definance.src,
  },
};

export const metadataUploader = new metadata.MetadataUploader();

export type Metadata = metadata.Metadata;
