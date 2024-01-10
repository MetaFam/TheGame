import PatronsImg from 'assets/patrons-sun_800x820.webp';
import PlayerImg from 'assets/players-sun_800x822.webp';
import BabyOctopus from 'assets/quests/baby_octo.webp';
import Octopus from 'assets/quests/octopus.webp';
import YoungPlant from 'assets/young-plant.webp';

interface Perk {
  perk: string;
  checked: boolean;
}

export interface Role {
  tab: string;
  title: string;
  image: string;
  description: string;
  recommended?: boolean;
  action: string;
  info?: string;
  route?: string;
  link?: string;
  price?: string;
}

interface PerkList {
  list: Perk[];
  background: string;
  title?: string;
  type?: string;
  price?: string;
  description?: string;
}

export enum RoleTitle {
  Player = 'player',
  Guild = 'guild',
  Patron = 'patron',
}

export const playerVisitorList: Perk[] = [
  { perk: 'Access to educational resources', checked: true },
  { perk: 'Access to community calls', checked: true },
  { perk: 'List of MetaAlliance guilds', checked: true },
  { perk: 'Free newsletter', checked: true },
  { perk: 'Search & filter people', checked: false },
  { perk: 'Access to the community', checked: false },
  { perk: 'Ability to earn reputation', checked: false },
  { perk: 'Ability to earn Seed tokens', checked: false },
  { perk: 'Get ranked & unlock perks', checked: false },
];

export const playerMemberList: Perk[] = [
  { perk: 'Access to educational resources', checked: true },
  { perk: 'Access to community calls', checked: true },
  { perk: 'List of MetaAlliance guilds', checked: true },
  { perk: 'Free newsletter', checked: true },
  { perk: 'Search & filter people', checked: true },
  { perk: 'Access to the community', checked: true },
  { perk: 'Ability to earn reputation', checked: true },
  { perk: 'Ability to earn Seed tokens', checked: true },
  { perk: 'Get ranked & unlock perks', checked: true },
];

export const guildFreeList: Perk[] = [
  { perk: 'Guild page in MG', checked: true },
  { perk: 'Members directory', checked: true },
  { perk: 'Your leaderboard', checked: true },
  { perk: 'Onboarding paths', checked: true },
  { perk: 'A guild2guild meetup', checked: true },
  { perk: 'Your news inside MG', checked: true },
  { perk: 'Post calls to action', checked: false },
  { perk: 'Search & filter people', checked: false },
  { perk: 'We shill your grant', checked: false },
  { perk: 'X thread about you', checked: false },
  { perk: 'In the follow list on X', checked: false },
  { perk: 'Your news in the newsletter', checked: false },
  { perk: 'A podcast interview', checked: false },
  { perk: 'Part of MetaAlliance', checked: false },
  { perk: 'A post about you', checked: false },
  { perk: 'Branch in The Onboarding Game', checked: false },
];

export const guildBasicList: Perk[] = [
  { perk: 'Guild page in MG', checked: true },
  { perk: 'Members directory', checked: true },
  { perk: 'Your leaderboard', checked: true },
  { perk: 'Onboarding paths', checked: true },
  { perk: 'A guild2guild meetup', checked: true },
  { perk: 'Your news inside MG', checked: true },
  { perk: 'Post calls to action', checked: true },
  { perk: 'Search & filter people', checked: true },
  { perk: 'We shill your grant', checked: true },
  { perk: 'X thread about you', checked: true },
  { perk: 'In the follow list on X', checked: true },
  { perk: 'Your news in the newsletter', checked: true },
  { perk: 'A podcast interview', checked: true },
  { perk: 'Part of MetaAlliance', checked: false },
  { perk: 'A post about you', checked: false },
  { perk: 'Branch in The Onboarding Game', checked: false },
];

export const guildProList: Perk[] = [
  { perk: 'Guild page in MG', checked: true },
  { perk: 'Members directory', checked: true },
  { perk: 'Your leaderboard', checked: true },
  { perk: 'Onboarding paths', checked: true },
  { perk: 'A guild2guild meetup', checked: true },
  { perk: 'Your news inside MG', checked: true },
  { perk: 'Post calls to action', checked: true },
  { perk: 'Search & filter people', checked: true },
  { perk: 'We shill your grant', checked: true },
  { perk: 'X thread about you', checked: true },
  { perk: 'In the follow list on X', checked: true },
  { perk: 'Your news in the newsletter', checked: true },
  { perk: 'A podcast interview', checked: true },
  { perk: 'Part of MetaAlliance', checked: true },
  { perk: 'A post about you', checked: true },
  { perk: 'Branch in The Onboarding Game', checked: true },
];

export const patronFreeList: Perk[] = [
  { perk: 'Access to educational resources', checked: true },
  { perk: 'Access to community calls', checked: true },
  { perk: 'List of MetaAlliance guilds', checked: true },
  { perk: 'Free newsletter', checked: true },
  { perk: 'Search & filter people', checked: false },
  { perk: 'Access to the community', checked: false },
  { perk: 'Ability to earn reputation', checked: false },
  { perk: 'Ability to earn Seed tokens', checked: false },
  { perk: 'Get ranked & unlock perks', checked: false },
];

export const patronMemberList: Perk[] = [
  { perk: 'Access to educational resources', checked: true },
  { perk: 'Access to community calls', checked: true },
  { perk: 'List of MetaAlliance guilds', checked: true },
  { perk: 'Free newsletter', checked: true },
  { perk: 'Search & filter people', checked: true },
  { perk: 'Access to the community', checked: true },
  { perk: 'Ability to earn reputation', checked: true },
  { perk: 'Ability to earn Seed tokens', checked: true },
  { perk: 'Get ranked & unlock perks', checked: true },
];

export const playerReasons: string[] = [
  'Learn about Web3, DAOs, ReFi & the Metacrisis',
  'Join the ecosystem & start making friends',
  'Start accruing reputation (XP) & tokens (Seeds)',
  'Gain experience & increase chances of landing gigs',
  'Get help for starting your own project',
];

export const guildReasons: string[] = [
  'Access a network of builders, early adopters & projects',
  'Get help or find things you need for your guild',
  'Profiles & leaderboards for your members',
  'Gain visibility for your tools or services',
  'Integrate your tools or services into MetaOS',
];

export const patronReasons: string[] = [
  'Because you love the idea of MetaGame',
  'You want to help fix the onboarding problem for the DAO space',
  'You want to see building DAOs become 10x easier & better',
  "Besides Web3 & DAOs, you're into ReFi, Game B & Network States",
  'Membership & platform utility will be paid in Seeds',
];

export const playerPerks: PerkList[] = [
  {
    title: 'Visitor',
    type: 'Free',
    list: playerVisitorList,
    background: '#FFFFFF0A',
  },
  {
    title: 'Member',
    type: 'Few contributions / month',
    list: playerMemberList,
    background: '#00000029',
  },
];

export const roles: Role[] = [
  {
    tab: RoleTitle.Player,
    title: 'Take the path',
    image: BabyOctopus.src,
    description:
      'The path will take you through everything a newcomer should do.',
    recommended: true,
    action: 'Sounds Good',
    route: '/onboarding',
  },
  {
    tab: RoleTitle.Player,
    title: 'Jump into action',
    image: Octopus.src,
    description:
      'Too busy? You can jump straight into action, just say so in the #🏟-metasquare',
    action: "Let's Go!",
    link: 'https://chat.metagame.wtf/',
  },
  {
    tab: RoleTitle.Guild,
    title: 'Player',
    image: PlayerImg.src,
    description: 'Join MetaGame as an active member.',
    action: "Let's Go!",
    route: '/start',
  },
  {
    tab: RoleTitle.Guild,
    title: 'Patron',
    image: PatronsImg.src,
    description: 'Join MetaGame as a passive player.',
    action: "Let's Go!",
    route: '/join/patron',
  },
  {
    tab: RoleTitle.Patron,
    title: 'Do it yourself',
    image: YoungPlant.src,
    description:
      'You’ll need some Ether & RAI ready on Polygon. Detailed instructions',
    action: 'Yes Pls!',
    route: '/join/patron',
  },
  {
    tab: RoleTitle.Patron,
    title: 'Buy it & forget it',
    image: PlayerImg.src,
    description: 'Too busy to do it manually? We got you!',
    info: 'For amounts over $1k only.',
    action: 'Perfect!',
    link: 'https://tally.so/r/w4Jb6r',
  },
];

export const guildPerks: PerkList[] = [
  {
    type: 'Free',
    price: '$0',
    description: 'FOR BROKE GUILDS',
    list: guildFreeList,
    background: '#FFFFFF0A',
  },
  {
    type: 'Basic',
    price: '$800 / year',
    description: 'FOR ESTABLISHED GUILDS',
    list: guildBasicList,
    background: '#00000029',
  },
  {
    type: 'Pro',
    price: 'Inquire',
    description: 'FOR WELL-OFF GUILDS',
    list: guildProList,
    background: '#FFFFFF0A',
  },
];
export const patronPerks: PerkList[] = [
  // {
  //   title: 'Visitor',
  //   type: 'Free',
  //   description: 'FOR BROKE GUILDS',
  //   list: patronFreeList,
  //   background: '#FFFFFF0A',
  // },
  {
    title: 'Member',
    type: 'Tiered Memberships',
    description: '',
    list: patronMemberList,
    background: '#00000029',
  },
];
