const MetaCalendarImageUrl = '/assets/drawer/calendar.png';
const MetaDiscordImageUrl = '/assets/drawer/discord.png';
const MetaGithubImageUrl = '/assets/drawer/github.png';
const MetaGuildsImageUrl = '/assets/emojis/crossed-swords.png';
const MetaSeedPoolImageUrl = '/assets/drawer/seed_pool.png';
const MetaLeaderboardImageUrl = '/assets/drawer/leaderboard.png';
const MetaLibraryImageUrl = '/assets/drawer/library.png';
const MetaViewImageUrl = '/assets/drawer/metaview.png';
const MetaNewsletterImageUrl = '/assets/drawer/newsletter.png';
const MetaSeedmarketImageUrl = '/assets/drawer/seedmarket.png';
const MetaTwitterImageUrl = '/assets/drawer/twitter.png';

const MetaQuestsImageUrl = '/assets/drawer/quests.png';
const MetaRaidsImageUrl = '/assets/drawer/raids.png';
const MetaPlayersImageUrl = '/assets/drawer/players.png';
const MetaForumImageUrl = '/assets/drawer/forum.png';

export interface DrawerItemType {
  href: string;
  isExternal?: boolean;
  src: string;
  alt: string;
  text?: string;
}

export const DrawerItemsLeft: DrawerItemType[] = [
  {
    href: '/',
    isExternal: false,
    src: MetaPlayersImageUrl,
    alt: 'MetaPlayers',
    text: 'Players',
  },
  {
    href: '/guilds',
    isExternal: false,
    src: MetaGuildsImageUrl,
    alt: 'MetaGuilds',
    text: 'Guilds',
  },
];

export const DrawerItemsRight: DrawerItemType[] = [
  {
    href: 'https://forum.metagame.wtf/',
    isExternal: true,
    src: MetaForumImageUrl,
    alt: 'MetaForm',
    text: 'Forum',
  },
  {
    href:
      'https://miro.com/app/live-embed/o9J_knhEt7w=/?moveToViewport=-8516,-5516,21788,13742',
    isExternal: true,
    src: MetaRaidsImageUrl,
    alt: 'MetaRaids',
    text: 'Raids',
  },
];

export const DrawerSubItems: DrawerItemType[] = [
  {
    href: 'https://discord.gg/WYUkVpe',
    isExternal: true,
    src: MetaQuestsImageUrl,
    alt: 'MetaQuests',
    text: 'Quests',
  },
  {
    href: 'https://metagame.substack.com/',
    isExternal: true,
    src: MetaNewsletterImageUrl,
    alt: 'MetaNewsletter',
    text: 'Newsletter',
  },
  {
    href: 'https://anchor.fm/MetaGame/',
    isExternal: true,
    src: MetaViewImageUrl,
    alt: 'MetaView',
    text: 'MetaView',
  },
  {
    href: 'https://wiki.metagame.wtf/docs/home',
    isExternal: true,
    src: MetaLibraryImageUrl,
    alt: 'MetaLibrary',
    text: 'Library',
  },
  {
    href: 'https://twitter.com/Metafam',
    isExternal: true,
    src: MetaTwitterImageUrl,
    alt: 'MetaTwitter',
    text: 'Twitter',
  },
  {
    href: 'https://discord.gg/XazuypRcv6',
    isExternal: true,
    src: MetaDiscordImageUrl,
    alt: 'MetaDiscord',
    text: 'Discord',
  },
  {
    href: 'https://github.com/MetaFam/TheGame',
    isExternal: true,
    src: MetaGithubImageUrl,
    alt: 'MetaGithub',
    text: 'Github',
  },
  {
    href:
      'https://calendar.google.com/calendar/u/1?cid=bmloNTlrdGdhZm1tNjRlZDRxazZ1ZTh2djRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
    isExternal: true,
    src: MetaCalendarImageUrl,
    alt: 'MetaCalendar',
    text: 'Calendar',
  },
  {
    href:
      'https://balancer.exchange/#/swap/ether/0x30cf203b48edaa42c3b4918e955fed26cd012a3f',
    isExternal: true,
    src: MetaSeedmarketImageUrl,
    alt: 'MetaSeedmarket',
    text: 'Seed Market',
  },
  {
    href:
      'https://pools.balancer.exchange/#/pool/0xea05a15dbce2eb543ffda16950e95b2bd2e40d0e/',
    isExternal: true,
    src: MetaSeedPoolImageUrl,
    alt: 'MetaSeedPool',
    text: 'Seed Pool',
  },
  {
    href: 'https://wiki.metagame.wtf/docs/enter-metagame/leaderboard',
    isExternal: true,
    src: MetaLeaderboardImageUrl,
    alt: 'MetaLeaderboard',
    text: 'Leaderboard',
  },
];
