import type { Values } from '@metafam/utils';
import { metadata } from '@quest-chains/sdk';
import bestdaocontributor from 'assets/academy/best-dao-contributor.webp';
import biases from 'assets/academy/biases.webp';
import bridgebuilder from 'assets/academy/bridgebuilder.webp';
import builder from 'assets/academy/builder.webp';
import coordinape from 'assets/academy/coordinape.webp';
import daos from 'assets/academy/daos.webp';
import daosummoner from 'assets/academy/daosummoner.webp';
import daowriter from 'assets/academy/daowriter.webp';
import dapps from 'assets/academy/dapps.webp';
import defi from 'assets/academy/defi.webp';
import designer from 'assets/academy/designer.webp';
import effectivemeetingrunner from 'assets/academy/effective-meeting-runner.webp';
import ethereum from 'assets/academy/ethereum.webp';
import gameb from 'assets/academy/gameb.webp';
import goodquests from 'assets/academy/goodquests.webp';
import guilder from 'assets/academy/guilder.webp';
import impactnetworks from 'assets/academy/impact-networks.webp';
import imposter from 'assets/academy/imposter.webp';
import journaling from 'assets/academy/journaling.webp';
import mastertabs from 'assets/academy/master-tabs.webp';
import memedriven from 'assets/academy/memedriven.webp';
import metacrisis from 'assets/academy/metacrisis.webp';
import metamodernist from 'assets/academy/metamodernist.webp';
import moloch from 'assets/academy/moloch.webp';
import nfts from 'assets/academy/nfts.webp';
import patron from 'assets/academy/patron.webp';
import playtwitter from 'assets/academy/play-twitter.webp';
import playbookwriter from 'assets/academy/playbook-writer.webp';
import player from 'assets/academy/player.webp';
import riteofpassage from 'assets/academy/riteofpassage.webp';
import submitPlaybook from 'assets/academy/submit-playbook.webp';
import team from 'assets/academy/team.webp';
import time from 'assets/academy/time.webp';
import web3builder from 'assets/academy/web3builder.webp';
import questChainsABI from 'contracts/QuestChains.instance.abi.json' assert { type: 'json' };
import { useWeb3 } from 'lib/hooks';
import { getContract } from 'viem';

export const useQuestChainContract = (address: string) => {
  const { viemClients } = useWeb3();
  if (!viemClients) throw new Error('No Viem client found.');
  return getContract({
    abi: questChainsABI,
    address: address as `0x${string}`,
    client: viemClients,
  });
};

// Playbook Categories
export const QuestChainsCategories = {
  FOR_METAGAME: 'for-metagame',
  META: 'meta',
  WEB3_BASICS: 'web3-basics',
  HOW_TO_DAO: 'how-to-dao',
  SELF_ACTUALIZATION: 'self-actualization',
  WELLBEING_SELF_IMPROVEMENT: 'wellbeing-self-improvement',
  RANDOM: 'random',
  ALL: 'all',
} as const;

// Playbook Playbooks
export const QuestChainsPlaybooks = {
  SUBMIT_A_PLAYBOOK: 'submit-a-playbook',
  RITE_OF_PASSAGE: 'rite-of-passage',
  PLAYERS_PATH: 'rogues-path',
  PATRONS_PATH: 'patrons-path',
  GUILDERS_PATH: 'guilders-path',
  BUILDERS_PATH: 'builders-path',
  BRIDGEBUILDERS_PATH: 'bridgebuilders-path',
  DESIGNERS_PATH: 'designers-path',
  WTF_IS_ETHEREUM: 'wtf-is-ethereum',
  WTF_ARE_DAOS: 'wtf-are-daos',
  WTF_IS_DEFI: 'wtf-is-defi',
  WTF_ARE_NFTS: 'wtf-are-nfts',
  WTF_ARE_DAPPS: 'wtf-are-dapps',
  BECOME_A_WEB3_DEVELOPER: 'become-a-web3-developer',
  WTF_IS_GAMEB: 'wtf-is-gameb',
  WTF_IS_METACRISIS: 'wtf-is-metacrisis',
  MEDITATIONS_ON_MOLOCH: 'meditations-on-moloch',
  'POLITICAL_METAMODERNISM-BRIDGING_DIVIDES': 'political-metamodernism',
  CHOOSE_GOOD_QUESTS: 'choose-good-quests',
  MEME_DRIVEN_ORGANIZATIONS: 'meme-driven-organizations',
  BECOME_THE_BEST_DAO_CONTRIBUTOR: 'become-the-best-dao-contributor',
  STARTING_DAOS_101: 'starting-daos-101',
  HOW_TO_BUILD_A_NETWORK_FOR_IMPACT: 'how-to-build-a-network-for-impact',
  USING_COORDINAPE_TO_REWARD_CONTRIBUTORS:
    'using-coordinape-to-reward-contributors',
  EFFECTIVE_MEETINGS_WITH_HOLACRACY: 'effective-meetings-with-holacracy',
  ENTERING_DAOS_AS_A_WRITER: 'entering-daos-as-a-writer',
  BUILDING_SUCCESSFUL_TEAMS: 'using-successful-teams',
  EMBRACE_THE_TICKING_CLOCK: 'embrace-the-ticking-clock',
  KNOW_YOUR_BIASES: 'know-your-biases',
  UNDERSTANDING_IMPOSTER_SYNDROME: 'understanding-imposter-syndrome',
  JOURNALING_LIKE_DICKIE_BUSH: 'journaling-like-dickie-bush',
  HOW_TO_PLAY_TWITTER: 'how-to-play-twitter',
  MASTER_YOUR_BROWSER_TABS: 'master-your-browser-tabs',
} as const;

// Playbook Difficulty
export const Difficulty = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
} as const;

// Playbook Time
export const Time = {
  SHORT: 'Short',
  MEDIUM: 'Medium',
  LONG: 'Long',
} as const;

export type QuestChainType =
  | Values<typeof QuestChainsPlaybooks>
  | Values<typeof QuestChainsCategories>;

export type QuestChainCategoryType = Values<typeof QuestChainsCategories>;

type QuestChainCategoryInfo = {
  name: string;
  title: string;
  description?: string;
  image?: string;
};

export const PathPlaybookTypes = {
  PLAYBOOK: 'playbook',
} as const;

export type PathPlaybookType = Values<typeof PathPlaybookTypes>;

type QuestChainInfo = {
  chainId: string;
  address: string;
  title: string;
  description: string;
  image: string;
  difficulty?: string;
  time?: string;
  category?: QuestChainCategoryType;
  seedsEarned?: number;
  type: PathPlaybookType;
};
type QuestChainListing = {
  [key: string]: QuestChainInfo;
};

export type QuestChainDetailsType = Values<typeof QuestChainsPlaybooks>;

export type QuestChainDetails = QuestChainInfo;

export const QuestChainPlaybooks = Object.keys(
  QuestChainsPlaybooks,
) as Array<QuestChainType>;
export const QuestChainCategories = Object.keys(
  QuestChainsCategories,
) as Array<QuestChainType>;

export const QuestChainsCategoriesDetails = {
  [QuestChainsCategories.FOR_METAGAME]: {
    name: QuestChainsCategories.FOR_METAGAME,
    title: 'For MetaGame',
    description:
      'Quests that are specific to MetaGame, its culture & its community.',
    image: '',
  },
  [QuestChainsCategories.META]: {
    name: QuestChainsCategories.META,
    title: 'Meta',
    description:
      'This section is about the bigger picture, state of the world & global philosophies.',
    image: '',
  },
  [QuestChainsCategories.WEB3_BASICS]: {
    name: QuestChainsCategories.WEB3_BASICS,
    title: 'Web3 in General',
    description:
      'Here you will learn the basics of Web3 as well as how to get involved in building it.',
    image: '',
  },
  [QuestChainsCategories.HOW_TO_DAO]: {
    name: QuestChainsCategories.HOW_TO_DAO,
    title: 'DAO Playbooks',
    description:
      'This section is all things regarding DAOs & coordination - from tooling to methods',
    image: '',
  },
  [QuestChainsCategories.SELF_ACTUALIZATION]: {
    name: QuestChainsCategories.SELF_ACTUALIZATION,
    title: 'Self-actualization & Wellbeing',
    description:
      'Another one we are weak in; open to anything regarding personal wellbeing & self-improvement.',
    image: '',
  },
  [QuestChainsCategories.RANDOM]: {
    name: QuestChainsCategories.RANDOM,
    title: 'Random Game META',
    description:
      'Most effective tactics available for using different platforms & games of life.',
    image: '',
  },
};

export const QuestChainPlaybooksDetails: QuestChainListing = {
  // https://app.questchains.xyz/optimism/rite-of-passage
  [QuestChainsPlaybooks.RITE_OF_PASSAGE]: {
    address: '0xc5893dcab9ad32fa47923febde89883c62bffbd6',
    chainId: '0xa',
    title: 'Rite of Passage',
    description: 'The entry point. Ready to join MetaGame?!',
    image: riteofpassage.src,
    category: QuestChainsCategories.FOR_METAGAME,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  // https://app.questchains.xyz/optimism/players-path
  [QuestChainsPlaybooks.PLAYERS_PATH]: {
    address: '0x11041f6bb7a987e3b363a712bebc2e9bd72dcb59',
    chainId: '0xa',
    title: "Player's Path",
    description:
      'Want to become a player? Players are active contributors to MetaGame.',
    image: player.src,
    category: QuestChainsCategories.FOR_METAGAME,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  // https://app.questchains.xyz/optimism/patrons-path
  [QuestChainsPlaybooks.PATRONS_PATH]: {
    address: '0xf005bb889af89e174cc155e1126ee5420812ae38',
    chainId: '0xa',
    title: "Patron's Path",
    description:
      'This is a path of becoming a patron of MetaGame - a passive contributor.',
    image: patron.src,
    category: QuestChainsCategories.FOR_METAGAME,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  // https://app.questchains.xyz/optimism/guilders-path
  [QuestChainsPlaybooks.GUILDERS_PATH]: {
    address: '0xd03a9f1e2b172b94622e49a3d51d79c46147299d',
    chainId: '0xa',
    title: "Guilder's Path",
    description:
      'This is a path for those who want to join guilds through MetaGame.',
    image: guilder.src,
    category: QuestChainsCategories.FOR_METAGAME,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  // https://app.questchains.xyz/optimism/builders-path
  [QuestChainsPlaybooks.BUILDERS_PATH]: {
    address: '0x00c489697f5cd76109768e7d16c2e8b625c26db0',
    chainId: '0xa',
    title: "Builder's Path",
    description:
      'This is a path for those who wish to join MetaGame as developers - the most highly needed & incentivized role.',
    image: builder.src,
    category: QuestChainsCategories.FOR_METAGAME,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  // https://app.questchains.xyz/optimism/bridgebuilders-path
  [QuestChainsPlaybooks.BRIDGEBUILDERS_PATH]: {
    address: '0x4c4f6d4975fc6e021cdede5b9df3e0bbaa30a9ef',
    chainId: '0xa',
    title: "Bridgebuilder's Path",
    description:
      'Oath of the Bridgebuilder is a path of network weavers & business developers, with the goal of building a more interconnected ecosystem.',
    image: bridgebuilder.src,
    category: QuestChainsCategories.FOR_METAGAME,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //  https://app.questchains.xyz/optimism/designers-path
  [QuestChainsPlaybooks.DESIGNERS_PATH]: {
    address: '0x91d7e81859e2ac05f9491199c7accedb3a203fcd',
    chainId: '0xa',
    title: "Designer's Path",
    description:
      'Designer in this case is referring mainly to those designing UX/UI.',
    image: designer.src,
    category: QuestChainsCategories.FOR_METAGAME,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  // https://app.questchains.xyz/optimism/wtf-is-ethereum
  [QuestChainsPlaybooks.WTF_IS_ETHEREUM]: {
    address: '0x5aad789c5181fa3068518d59e60817ca3c3e7754',
    chainId: '0xa',
    title: 'WTF is Ethereum?',
    description: 'A high level overview of the importance of this technology.',
    image: ethereum.src,
    category: QuestChainsCategories.WEB3_BASICS,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //  https://app.questchains.xyz/optimism/wtf-are-daos
  [QuestChainsPlaybooks.WTF_ARE_DAOS]: {
    address: '0xb3e25ceabd9df7c3745f1b1f086cf0d4ff084eae',
    chainId: '0xa',
    title: 'WTF are DAOs?',
    description:
      'Short for “Decentralized Autonomous Organizations” - DAOs are a new type of organization, enabled by the blockchain technology.',
    image: daos.src,
    category: QuestChainsCategories.WEB3_BASICS,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //  https://app.questchains.xyz/optimism/wtf-is-defi
  [QuestChainsPlaybooks.WTF_IS_DEFI]: {
    address: '0xd09b96bd31c1d98b752d09f425ed14507c8498c7',
    chainId: '0xa',
    title: 'WTF is DeFi?',
    description:
      'Decentralized Finance is the creation of a whole new financial system, now built on smart contracts & blockchains.',
    image: defi.src,
    category: QuestChainsCategories.WEB3_BASICS,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //  https://app.questchains.xyz/optimism/wtf-are-nfts
  [QuestChainsPlaybooks.WTF_ARE_NFTS]: {
    address: '0x74c866082a74c029938da9031dd55c3786ae1caa',
    chainId: '0xa',
    title: 'WTF are NFTs?',
    description: 'NFT stands for Non-Fungible Token.',
    image: nfts.src,
    category: QuestChainsCategories.WEB3_BASICS,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //  https://app.questchains.xyz/optimism/wtf-are-dapps
  [QuestChainsPlaybooks.WTF_ARE_DAPPS]: {
    address: '0xb98742ca54f919e244255dfccec5ef753b3db560',
    chainId: '0xa',
    title: 'WTF are DApps?',
    description:
      'Decentralized apps are censorship resistant, have no single point of failure and are generally publicly owned & open source.',
    image: dapps.src,
    category: QuestChainsCategories.WEB3_BASICS,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //  https://app.questchains.xyz/optimism/become-a-web3-developer
  [QuestChainsPlaybooks.BECOME_A_WEB3_DEVELOPER]: {
    address: '0xba78a1e0fbdb23e6af3f1191066e1a14a717cafd',
    chainId: '0xa',
    title: 'Become a Web3 Developer',
    description:
      'This playbook should turn you from a Web2 developer into a Web3 developer in no time.',
    image: web3builder.src,
    category: QuestChainsCategories.WEB3_BASICS,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //  https://app.questchains.xyz/optimism/wtf-is-game-b
  [QuestChainsPlaybooks.WTF_IS_GAMEB]: {
    address: '0x848b32e47185ea6fa2296c257fc58b9afd879eeb',
    chainId: '0xa',
    title: 'WTF is Game B?',
    description: ' - to establish an omni-win society.',
    image: gameb.src,
    category: QuestChainsCategories.META,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  // https://app.questchains.xyz/optimism/wtf-is-metacrisis
  [QuestChainsPlaybooks.WTF_IS_METACRISIS]: {
    address: '0x4799184e21e179a245196ee8d59fda63757364d9',
    chainId: '0xa',
    title: 'WTF is Metacrisis?',
    description: 'Metacrisis is the ultimate crisis - a crisis of crises.',
    image: metacrisis.src,
    category: QuestChainsCategories.META,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //     https://app.questchains.xyz/optimism/meditations-on-moloch
  [QuestChainsPlaybooks.MEDITATIONS_ON_MOLOCH]: {
    address: '0x729c7f915b016e48aef4495b230f275b9cb95677',
    chainId: '0xa',
    title: 'Meditations on Moloch',
    description:
      'Moloch is a metaphorical embodiment of the forces driving humanity towards self-destruction.',
    image: moloch.src,
    category: QuestChainsCategories.META,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //     https://app.questchains.xyz/optimism/political-metamodernism
  [QuestChainsPlaybooks['POLITICAL_METAMODERNISM-BRIDGING_DIVIDES']]: {
    address: '0x828d70b4f4991b8a219ba959be0e04d090e5be71',
    chainId: '0xa',
    title: 'Political Metamodernism: Bridging Divides',
    description:
      'In short, political metamodernism should help us transcend the left/right political divide to pragmatically build societies that work, rather than societies based on wishful ideologies of the 19th century.',
    image: metamodernist.src,
    category: QuestChainsCategories.META,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //  https://app.questchains.xyz/optimism/choose-good-quests
  [QuestChainsPlaybooks.CHOOSE_GOOD_QUESTS]: {
    address: '0xa392184dd8079e19e02b020cf08850096ade7436',
    chainId: '0xa',
    title: 'Choose Good Quests',
    description:
      'In the most simple terms possible: a good quest makes the future better than our world today.',
    image: goodquests.src,
    category: QuestChainsCategories.META,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //  https://app.questchains.xyz/optimism/meme-driven-organizations
  [QuestChainsPlaybooks.MEME_DRIVEN_ORGANIZATIONS]: {
    address: '0xc02573e396d4a203f7bb713ec7f2f33ec38489ed',
    chainId: '0xa',
    title: 'Meme Driven Organizations',
    description:
      'Another way to describe meme driven organizations that you might have heard of - is purpose driven organizations.',
    image: memedriven.src,
    category: QuestChainsCategories.META,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //  https://app.questchains.xyz/optimism/become-the-best-contributor-in-any-dao
  [QuestChainsPlaybooks.BECOME_THE_BEST_DAO_CONTRIBUTOR]: {
    address: '0xfe50114d4bb41faa1639f8020c2d9fa8dd9455bb',
    chainId: '0xa',
    title: 'Become The Best Contributor In Any DAO',
    description:
      'Teaching DAO beginners how to become the best DAO contributor in any DAO they join.',
    image: bestdaocontributor.src,
    category: QuestChainsCategories.HOW_TO_DAO,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //  https://app.questchains.xyz/optimism/starting-daos-101
  [QuestChainsPlaybooks.STARTING_DAOS_101]: {
    address: '0xdeac1ddb999a509b214c4181e160eb8afb915081',
    chainId: '0xa',
    title: 'Starting DAOs 101',
    description:
      'Mostly focused on building a project in Web3 through the eyes of peth.',
    image: daosummoner.src,
    category: QuestChainsCategories.HOW_TO_DAO,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //   https://app.questchains.xyz/optimism/how-to-build-a-network-for-impact
  [QuestChainsPlaybooks.HOW_TO_BUILD_A_NETWORK_FOR_IMPACT]: {
    address: '0x506baa6e4eecdc9372f4ac4fb05f687a99c17398',
    chainId: '0xa',
    title: ' ',
    description:
      'A playbook for anyone who wants to build an impactful network.',
    image: impactnetworks.src,
    category: QuestChainsCategories.HOW_TO_DAO,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  // https://app.questchains.xyz/optimism/using-coordinape-to-reward-contributors
  [QuestChainsPlaybooks.USING_COORDINAPE_TO_REWARD_CONTRIBUTORS]: {
    address: '0x771584d816543feb8aafd6b1654d0c854c1317fc',
    chainId: '0xa',
    title: 'Using Coordinape To Reward Contributors',
    description:
      'Coordinape is a platform for DAOs to easily and fairly distribute resources to contributors.',
    image: coordinape.src,
    category: QuestChainsCategories.HOW_TO_DAO,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //   https://app.questchains.xyz/optimism/effective-meetings-with-holacracy
  [QuestChainsPlaybooks.EFFECTIVE_MEETINGS_WITH_HOLACRACY]: {
    address: '0xaaa8f39bce8abe1c2993b4e9f0f9a376583ef48f',
    chainId: '0xa',
    title: 'Effective Meetings With Holacracy',
    description:
      'Holacracy is one of the most well known frameworks for running organizations in a decentralized way by combining two systems of authority that organizations usually choose between: autocracy & consensus-building.',
    image: effectivemeetingrunner.src,
    category: QuestChainsCategories.HOW_TO_DAO,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //     https://app.questchains.xyz/optimism/entering-daos-as-a-writer
  [QuestChainsPlaybooks.ENTERING_DAOS_AS_A_WRITER]: {
    address: '0xeacd78de315757ba9fc7ddcc1d016f67249ad86b',
    chainId: '0xa',
    title: 'Entering DAOs as a Writer',
    description: 'A roadmap to finding your way into a DAO as a writer.',
    image: daowriter.src,
    category: QuestChainsCategories.HOW_TO_DAO,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //   https://app.questchains.xyz/optimism/building-successful-teams
  [QuestChainsPlaybooks.BUILDING_SUCCESSFUL_TEAMS]: {
    address: '0xe186c31013f0c1d09734fc5c084305e4913c6fae',
    chainId: '0xa',
    title: 'Building Successful Teams',
    description: 'Learn the recipe for building great teams.',
    image: team.src,
    category: QuestChainsCategories.HOW_TO_DAO,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //  https://app.questchains.xyz/optimism/embrace-the-ticking-clock
  [QuestChainsPlaybooks.EMBRACE_THE_TICKING_CLOCK]: {
    address: '0xce7020ea7b3cf61ab1c1a3e9fd804fa5487ba87c',
    chainId: '0xa',
    title: 'Embrace The Ticking Clock',
    description:
      'Recognize the value of the time we have left and seize every opportunity to learn, grow, and keep our minds active.',
    image: time.src,
    category: QuestChainsCategories.SELF_ACTUALIZATION,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //   : 'know-your-biases',     https://app.questchains.xyz/optimism/know-your-biases
  [QuestChainsPlaybooks.KNOW_YOUR_BIASES]: {
    address: '0x40996f71f0250e9a59e404a35d2800318f96bcc9',
    chainId: '0xa',
    title: 'Know Your Biases',
    description:
      'Some of the most well known cognitive biases, straight from the menu.',
    image: biases.src,
    category: QuestChainsCategories.SELF_ACTUALIZATION,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //   https://app.questchains.xyz/optimism/understanding-imposter-syndrome
  [QuestChainsPlaybooks.UNDERSTANDING_IMPOSTER_SYNDROME]: {
    address: '0xe769e5a126715780e90aba9ea8df89eb1a828d18',
    chainId: '0xa',
    title: 'Understanding Imposter Syndrome',
    description: 'Are you an impostor? Find out here.',
    image: imposter.src,
    category: QuestChainsCategories.SELF_ACTUALIZATION,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //   https://app.questchains.xyz/optimism/journal-like-dickie-bush
  [QuestChainsPlaybooks.JOURNALING_LIKE_DICKIE_BUSH]: {
    address: '0xe1f5c080e9060faec0476bfa910160ff1c532ac0',
    chainId: '0xa',
    title: 'Journaling Like Dickie Bush',
    description:
      'Journaling is the single most powerful habit for personal growth.',
    image: journaling.src,
    category: QuestChainsCategories.SELF_ACTUALIZATION,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //   https://app.questchains.xyz/optimism/how-to-play-twitter
  [QuestChainsPlaybooks.HOW_TO_PLAY_TWITTER]: {
    address: '0xb324e5a5b72c3cd25c2515e44d3e6e06e1b3ed32',
    chainId: '0xa',
    title: 'How to Play Twitter',
    description: 'Playbook about playing Twitter as an MMO-RPG.',
    image: playtwitter.src,
    category: QuestChainsCategories.RANDOM,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //  https://app.questchains.xyz/optimism/master-your-browser-tabs
  [QuestChainsPlaybooks.MASTER_YOUR_BROWSER_TABS]: {
    address: '0x6725a0d903d74589f66c97b2836744bdab25c06a',
    chainId: '0xa',
    title: 'Master Your Browser Tabs',
    description: 'Dear modern human, struggling to keep up with your tabs.',
    image: mastertabs.src,
    category: QuestChainsCategories.RANDOM,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
  //  https://app.questchains.xyz/optimism/submit-a-playbook
  [QuestChainsPlaybooks.SUBMIT_A_PLAYBOOK]: {
    chainId: '0xa',
    address: '0x90e19287d453a7a7125f399e23dadf95b21f1efa',
    title: 'Submit a Playbook',
    description:
      'Playbook for those who want to help fill up The Academy with more useful playbooks',
    image: playbookwriter.src,
    difficulty: Difficulty.EASY,
    time: Time.SHORT,
    category: QuestChainsCategories.ALL,
    seedsEarned: 42069,
    type: PathPlaybookTypes.PLAYBOOK,
  },
} as const;

export const QuestChainPathsAndPlaybooksDetails = {
  ...QuestChainPlaybooksDetails,
};

export const QuestChains = {
  ...QuestChainsPlaybooks,
};

export const metadataUploader = new metadata.MetadataUploader();

export type Metadata = metadata.Metadata;
