const MetaCalendarImageUrl = '/assets/drawer/calendar.png';
const MetaDiscordImageUrl = '/assets/drawer/discord.png';
const MetaGithubImageUrl = '/assets/drawer/github.png';
const MetaGuildsImageUrl = '/assets/drawer/guilds.png';
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
    href: 'https://forum.metagame.wtf/c/quest/5/l/latest?board=default',
    isExternal: true,
    src: MetaQuestsImageUrl,
    alt: 'MetaQuests',
    text: 'Quests',
  },
  {
    href: 'https://forum.metagame.wtf/c/quest/5/l/latest?board=default',
    isExternal: true,
    src: MetaRaidsImageUrl,
    alt: 'MetaRaids',
    text: 'Raids',
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
    href: '/',
    isExternal: false,
    src: MetaPlayersImageUrl,
    alt: 'MetaPlayers',
    text: 'Players',
  },
];

export const DrawerSubItems: DrawerItemType[] = [
  {
    href: '/',
    isExternal: false,
    src: MetaNewsletterImageUrl,
    alt: 'MetaNewsletter',
  },
  {
    href: '/',
    isExternal: false,
    src: MetaViewImageUrl,
    alt: 'MetaView',
  },
  {
    href: '/',
    isExternal: false,
    src: MetaLibraryImageUrl,
    alt: 'MetaLibrary',
  },
  {
    href: '/',
    isExternal: false,
    src: MetaGuildsImageUrl,
    alt: 'MetaGuilds',
  },
  {
    href: 'https://twitter.com/Metafam',
    isExternal: true,
    src: MetaTwitterImageUrl,
    alt: 'MetaTwitter',
  },
  {
    href: 'https://discord.gg/XazuypRcv6',
    isExternal: true,
    src: MetaDiscordImageUrl,
    alt: 'MetaDiscord',
  },
  {
    href: 'https://github.com/MetaFam/TheGame',
    isExternal: true,
    src: MetaGithubImageUrl,
    alt: 'MetaGithub',
  },
  {
    href: '/',
    isExternal: false,
    src: MetaCalendarImageUrl,
    alt: 'MetaCalendar',
  },
  {
    href: '/',
    isExternal: false,
    src: MetaLeaderboardImageUrl,
    alt: 'MetaLeaderboard',
  },
  {
    href:
      'https://balancer.exchange/#/swap/ether/0x30cf203b48edaa42c3b4918e955fed26cd012a3f',
    isExternal: true,
    src: MetaSeedmarketImageUrl,
    alt: 'MetaSeedmarket',
  },
];
