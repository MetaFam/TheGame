import { Values } from '@metafam/utils';
import { contracts, metadata } from '@quest-chains/sdk';
import daos from 'assets/houses/daos.png';
import dapps from 'assets/houses/dapps.png';
import definance from 'assets/houses/definance.png';
import ethereum from 'assets/houses/ethereum.png';
import nfts from 'assets/houses/nfts.png';
import P1 from 'assets/playbooks/P1.png';
import P2 from 'assets/playbooks/P2.png';
import P3 from 'assets/playbooks/P3.png';
import P4 from 'assets/playbooks/P4.png';
import P5 from 'assets/playbooks/P5.png';
import P6 from 'assets/playbooks/P6.png';
import P7 from 'assets/playbooks/P7.png';
import P8 from 'assets/playbooks/P8.png';
import P9 from 'assets/playbooks/P9.png';
import P10 from 'assets/playbooks/P10.png';
import P11 from 'assets/playbooks/P11.png';
import P12 from 'assets/playbooks/P12.png';
import P13 from 'assets/playbooks/P13.png';
import P14 from 'assets/playbooks/P14.png';
import P15 from 'assets/playbooks/P15.png';
import P16 from 'assets/playbooks/P16.png';
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

export const QuestChainsPlaybooks = {
  MEME_DRIVEN_ORGANIZATIONS: 'meme-driven-organizations',
  INSTALL_A_WEB3_WALLET_AND_GET_GAS: 'install-a-web3-wallet-and-get-gas',
  BUILDING_A_STRONG_DAO_FOUNDATION_ESSENTIAL_QUESTIONS_FROM_DAO_CANVAS:
    'building-a-strong-dao-foundation-essential-questions-from-dao-canvas',
  GUILDING_101_A_STARTER_KIT_FOR_SUCCESSFUL_TEAMS:
    'guilding-101-a-starter-kit-for-successful-teams',
  BUILDING_SUCCESSFUL_TEAMS: 'building-successful-teams',
  ADDING_VALUE_TO_A_DAO_WITHOUT_TECHNICAL_SKILLS_UNLOCK_YOUR_POTENTIAL:
    'adding-value-to-a-dao-without-technical-skills-unlock-your-potential',
  HOW_TO_COACH_ETH: 'how-to-coach-eth',
  ENTERING_DAOS_AS_A_WRITER: 'entering-daos-as-a-writer',
  HOW_TO_BECOME_AN_ETHEREUM_DEVELOPER: 'how-to-become-an-ethereum-developer',
  BECOME_A_BUIDLER_ON_ETHEREUM: 'become-a-buidler-on-ethereum',
  HOW_TO_PLAY_TWITTER: 'how-to-play-twitter',
  UNDERSTANDING_IMPOSTER_SYNDROME: 'understanding-imposter-syndrome',
  HOW_TO_JOIN_A_DAO_COMMUNITY: 'how-to-join-a-dao-community',
  HOW_TO_BUILD_A_NETWORK_FOR_IMPACT: 'how-to-build-a-network-for-impact',
  HANDLING_FOMO_IN_WEB3: 'handling-fomo-in-web3',
  MGXP_METAGAME_EXPERIENCE_POINTS: 'mgxp-metagame-experience-points',
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

export const QuestChainPlaybooksDetails: Record<
  QuestChainType,
  QuestChainInfo
> = {
  [QuestChainsPlaybooks.MEME_DRIVEN_ORGANIZATIONS]: {
    address: '0xd39a3d0eb714a2f62dd57f95af7fadc216f64e8e',
    chainId: '0x89',
    title: 'Meme Driven Organizations',
    description:
      'Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text ',
    image: P1.src,
  },
  [QuestChainsPlaybooks.INSTALL_A_WEB3_WALLET_AND_GET_GAS]: {
    address: '0xa1e05963535a060bfc2e9332c3fa7467c1ed607b',
    chainId: '0x89',
    title: 'Install a Web3 Wallet and get gas',
    description:
      'Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text ',
    image: P2.src,
  },
  [QuestChainsPlaybooks.BUILDING_A_STRONG_DAO_FOUNDATION_ESSENTIAL_QUESTIONS_FROM_DAO_CANVAS]:
    {
      address: '0x29fca34daa48dcf2ba63c4a417ad4ef95a952e46',
      chainId: '0x89',
      title:
        'Building a strong DAO foundation: Essential questions from DAO Canvas',
      description:
        'Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text ',
      image: P3.src,
    },
  [QuestChainsPlaybooks.GUILDING_101_A_STARTER_KIT_FOR_SUCCESSFUL_TEAMS]: {
    address: '0x340804f8ea5d5d660b7f3fa8f2c37408920bf7fe',
    chainId: '0x89',
    title: 'Guilding 101: A starter-kit for successful teams',
    description:
      'Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text ',
    image: P4.src,
  },
  [QuestChainsPlaybooks.BUILDING_SUCCESSFUL_TEAMS]: {
    address: '0xd52fdc2ce552c73cdbbc6dbdc6ff739d3ad919ca',
    chainId: '0x89',
    title: 'Building Successful Teams',
    description:
      'Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text ',
    image: P5.src,
  },
  [QuestChainsPlaybooks.ADDING_VALUE_TO_A_DAO_WITHOUT_TECHNICAL_SKILLS_UNLOCK_YOUR_POTENTIAL]:
    {
      address: '0x90a44808a7b4efc4e5ef09747c60c530551c47cf',
      chainId: '0x89',
      title:
        'Adding Value to a DAO Without Technical Skills: Unlock Your Potential',
      description:
        'Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text ',
      image: P6.src,
    },
  [QuestChainsPlaybooks.HOW_TO_COACH_ETH]: {
    address: '0xba480bc74150fa05e9d1c815e7f4dd03bab82e85',
    chainId: '0x89',
    title: 'How to Coach Eth',
    description:
      'Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text ',
    image: P7.src,
  },
  [QuestChainsPlaybooks.ENTERING_DAOS_AS_A_WRITER]: {
    address: '0xa5b4578b954e75287a409974ba15b9a7e5e47ab3',
    chainId: '0x89',
    title: 'Entering DAOs as a Writer',
    description:
      'Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text ',
    image: P8.src,
  },
  [QuestChainsPlaybooks.HOW_TO_BECOME_AN_ETHEREUM_DEVELOPER]: {
    address: '0x64baec377babbbb62419af890e459d0a26b11074',
    chainId: '0x89',
    title: 'How to become an Ethereum Developer',
    description:
      'Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text ',
    image: P9.src,
  },
  [QuestChainsPlaybooks.BECOME_A_BUIDLER_ON_ETHEREUM]: {
    address: '0xe62bda16bc819840e6369fd3b5db528929932b01',
    chainId: '0x89',
    title: 'Become a buidler on Ethereum',
    description:
      'Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text ',
    image: P10.src,
  },
  [QuestChainsPlaybooks.HOW_TO_PLAY_TWITTER]: {
    address: '0xd14c9ca6ebd0d8941340b5b57ca3640b0196a61d',
    chainId: '0x89',
    title: 'How to Play Twitter',
    description:
      'Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text ',
    image: P11.src,
  },
  [QuestChainsPlaybooks.UNDERSTANDING_IMPOSTER_SYNDROME]: {
    address: '0xed2c1ed50438379770c0a7e21150810786ebdfd8',
    chainId: '0x89',
    title: 'Understanding Imposter Syndrome',
    description:
      'Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text ',
    image: P12.src,
  },
  [QuestChainsPlaybooks.HOW_TO_JOIN_A_DAO_COMMUNITY]: {
    address: '0x7e5a92f7f440e4d29558913bbea7343f5593b6d3',
    chainId: '0x89',
    title: 'How to join a DAO community',
    description:
      'Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text ',
    image: P13.src,
  },
  [QuestChainsPlaybooks.HOW_TO_BUILD_A_NETWORK_FOR_IMPACT]: {
    address: '0xe388d673dcb58b6216d869801710e498fe37f24c',
    chainId: '0x89',
    title: 'How to build a network for impact',
    description:
      'Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text ',
    image: P14.src,
  },
  [QuestChainsPlaybooks.HANDLING_FOMO_IN_WEB3]: {
    address: '0xad8b64dc695b676e03d49e819d2153ad9465db83',
    chainId: '0x89',
    title: 'Handling FOMO in Web3',
    description:
      'Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text ',
    image: P15.src,
  },
  [QuestChainsPlaybooks.MGXP_METAGAME_EXPERIENCE_POINTS]: {
    address: '0x0872df6d8a2f92bf4c5c033be8eea0fd4b3ca39c',
    chainId: '0x89',
    title: 'MGXP Metagame Experience Points',
    description:
      'Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text ',
    image: P16.src,
  },
};

export const metadataUploader = new metadata.MetadataUploader();

export type Metadata = metadata.Metadata;
