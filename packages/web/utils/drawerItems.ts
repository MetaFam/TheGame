const emojiUrl = (fileName: string): string => {
  return `/assets/emojis/${fileName}`;
};

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
    src: emojiUrl('alien.png'),
    alt: 'MetaPlayers',
    text: 'Players',
  },
  {
    href: '/guilds',
    isExternal: false,
    src: emojiUrl('crossed-swords.png'),
    alt: 'MetaGuilds',
    text: 'Guilds',
  },
];

export const DrawerItemsRight: DrawerItemType[] = [
  {
    href: '/quests',
    isExternal: false,
    src: emojiUrl('question-mark.png'),
    alt: 'MetaQuests',
    text: 'Quests',
  },
  {
    href:
      'https://miro.com/app/live-embed/o9J_knhEt7w=/?moveToViewport=-8516,-5516,21788,13742',
    isExternal: true,
    src: emojiUrl('world-map.png'),
    alt: 'MetaRaids',
    text: 'Raids',
  },
];

export const DrawerSubItems: DrawerItemType[] = [
  {
    href: 'https://forum.metagame.wtf/',
    isExternal: true,
    src: emojiUrl('classical-building.png'),
    alt: 'MetaForm',
    text: 'Forum',
  },
  {
    href: 'https://metagame.substack.com/',
    isExternal: true,
    src: emojiUrl('rolled-up-newspaper.png'),
    alt: 'MetaNewsletter',
    text: 'Newsletter',
  },
  {
    href: 'https://anchor.fm/MetaGame/',
    isExternal: true,
    src: emojiUrl('studio-microphone.png'),
    alt: 'MetaView',
    text: 'MetaView',
  },
  {
    href: 'https://wiki.metagame.wtf/docs/home',
    isExternal: true,
    src: emojiUrl('books.png'),
    alt: 'MetaLibrary',
    text: 'Library',
  },
  {
    href: 'https://twitter.com/Metafam',
    isExternal: true,
    src: emojiUrl('baby-chick.png'),
    alt: 'MetaTwitter',
    text: 'Twitter',
  },
  {
    href: 'https://discord.gg/XazuypRcv6',
    isExternal: true,
    src: emojiUrl('speech-balloon.png'),
    alt: 'MetaDiscord',
    text: 'Discord',
  },
  {
    href: 'https://github.com/MetaFam/TheGame',
    isExternal: true,
    src: emojiUrl('hammer-and-wrench.png'),
    alt: 'MetaGithub',
    text: 'Github',
  },
  {
    href:
      'https://calendar.google.com/calendar/u/1?cid=bmloNTlrdGdhZm1tNjRlZDRxazZ1ZTh2djRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
    isExternal: true,
    src: emojiUrl('calendar.png'),
    alt: 'MetaCalendar',
    text: 'Calendar',
  },
  {
    href:
      'https://balancer.exchange/#/swap/ether/0x30cf203b48edaa42c3b4918e955fed26cd012a3f',
    isExternal: true,
    src: emojiUrl('seedling.png'),
    alt: 'MetaSeedmarket',
    text: 'Seed Market',
  },
  {
    href:
      'https://pools.balancer.exchange/#/pool/0xea05a15dbce2eb543ffda16950e95b2bd2e40d0e/',
    isExternal: true,
    src: emojiUrl('four-leaf-clover.png'),
    alt: 'MetaSeedPool',
    text: 'Seed Pool',
  },
  {
    href: 'https://wiki.metagame.wtf/docs/enter-metagame/leaderboard',
    isExternal: true,
    src: emojiUrl('chart-increasing.png'),
    alt: 'MetaLeaderboard',
    text: 'Leaderboard',
  },
];
