import PatronsImg from 'assets/patrons-sun_800x820.webp';
import PlayerImg from 'assets/players-sun_800x822.webp';
import BabyOctopus from 'assets/quests/baby_octo.webp';
import Octopus from 'assets/quests/octopus.webp';
import YoungPlant from 'assets/young-plant.webp';
export interface Perk {
  title: string;
  type: 'Player' | 'Guild' | 'Patron';
  visitor?: boolean;
  member?: boolean;
  free?: boolean;
  basic?: boolean;
  pro?: boolean;
  checked?: boolean;
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

export interface PerkList {
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

export const playerPerksList: Perk[] = [
  {
    title: 'Access to educational resources',
    type: 'Player',
    visitor: true,
    member: true,
  },
  {
    title: 'Access to community calls',
    type: 'Player',
    visitor: true,
    member: true,
  },
  {
    title: 'List of MetaAlliance guilds',
    type: 'Player',
    visitor: true,
    member: true,
  },
  { title: 'Free newsletter', type: 'Player', visitor: true, member: true },
  {
    title: 'Search & filter people',
    type: 'Player',
    visitor: false,
    member: true,
  },
  {
    title: 'Access to the community',
    type: 'Player',
    visitor: false,
    member: true,
  },
  {
    title: 'Ability to earn reputation',
    type: 'Player',
    visitor: false,
    member: true,
  },
  {
    title: 'Ability to earn Seed tokens',
    type: 'Player',
    visitor: false,
    member: true,
  },
  {
    title: 'Get ranked & unlock perks',
    type: 'Player',
    visitor: false,
    member: true,
  },
];
export const guildPerksList: Perk[] = [
  {
    title: 'Guild page in MG',
    type: 'Guild',
    free: true,
    basic: true,
    pro: true,
  },
  {
    title: 'Members directory',
    type: 'Guild',
    free: true,
    basic: true,
    pro: true,
  },
  {
    title: 'Your leaderboard',
    type: 'Guild',
    free: true,
    basic: true,
    pro: true,
  },
  {
    title: 'Onboarding paths',
    type: 'Guild',
    free: true,
    basic: true,
    pro: true,
  },
  {
    title: 'A guild2guild meetup',
    type: 'Guild',
    free: true,
    basic: true,
    pro: true,
  },
  {
    title: 'Your news inside MG',
    type: 'Guild',
    free: true,
    basic: true,
    pro: true,
  },
  {
    title: 'Post calls to action',
    type: 'Guild',
    free: false,
    basic: true,
    pro: true,
  },
  {
    title: 'Search & filter people',
    type: 'Guild',
    free: false,
    basic: true,
    pro: true,
  },
  {
    title: 'We shill your grant',
    type: 'Guild',
    free: false,
    basic: true,
    pro: true,
  },
  {
    title: 'X thread about you',
    type: 'Guild',
    free: false,
    basic: true,
    pro: true,
  },
  {
    title: 'In the follow list on X',
    type: 'Guild',
    free: false,
    basic: true,
    pro: true,
  },
  {
    title: 'Your news in the newsletter',
    type: 'Guild',
    free: false,
    basic: true,
    pro: true,
  },
  {
    title: 'A podcast interview',
    type: 'Guild',
    free: false,
    basic: true,
    pro: true,
  },
  {
    title: 'Part of MetaAlliance',
    type: 'Guild',
    free: false,
    basic: false,
    pro: true,
  },
  {
    title: 'A post about you',
    type: 'Guild',
    free: false,
    basic: false,
    pro: true,
  },
  {
    title: 'Branch in The Onboarding Game',
    type: 'Guild',
    free: false,
    basic: false,
    pro: true,
  },
];

export const patronFreeList: Perk[] = [
  { title: 'Access to educational resources', checked: true, type: 'Patron' },
  { title: 'Access to community calls', checked: true, type: 'Patron' },
  { title: 'List of MetaAlliance guilds', checked: true, type: 'Patron' },
  { title: 'Free newsletter', checked: true, type: 'Patron' },
  { title: 'Search & filter people', checked: false, type: 'Patron' },
  { title: 'Access to the community', checked: false, type: 'Patron' },
  { title: 'Ability to earn reputation', checked: false, type: 'Patron' },
  { title: 'Ability to earn Seed tokens', checked: false, type: 'Patron' },
  { title: 'Get ranked & unlock perks', checked: false, type: 'Patron' },
];

export const patronMemberList: Perk[] = [
  { title: 'Access to educational resources', checked: true, type: 'Patron' },
  { title: 'Access to community calls', checked: true, type: 'Patron' },
  { title: 'List of MetaAlliance guilds', checked: true, type: 'Patron' },
  { title: 'Free newsletter', checked: true, type: 'Patron' },
  { title: 'Search & filter people', checked: true, type: 'Patron' },
  { title: 'Access to the community', checked: true, type: 'Patron' },
  { title: 'Ability to earn reputation', checked: true, type: 'Patron' },
  { title: 'Ability to earn Seed tokens', checked: true, type: 'Patron' },
  { title: 'Get ranked & unlock perks', checked: true, type: 'Patron' },
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
    list: playerPerksList,
    background: '#FFFFFF0A',
  },
  {
    title: 'Member',
    type: 'Few contributions / month',
    list: playerPerksList,
    background: '#00000029',
  },
];

// export const guildPerks: PerkList[] = [
//   {
//     type: 'Free',
//     price: '$0',
//     description: 'FOR BROKE GUILDS',
//     list: guildFreeList,
//     background: '#FFFFFF0A',
//   },
//   {
//     type: 'Basic',
//     price: '$800 / year',
//     description: 'FOR ESTABLISHED GUILDS',
//     list: guildBasicList,
//     background: '#00000029',
//   },
//   {
//     type: 'Pro',
//     price: 'Inquire',
//     description: 'FOR WELL-OFF GUILDS',
//     list: guildProList,
//     background: '#FFFFFF0A',
//   },
// ];

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
