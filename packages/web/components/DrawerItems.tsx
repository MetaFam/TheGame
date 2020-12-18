import MetaCalendar from 'assets/drawer/calendar.png';
import MetaDiscord from 'assets/drawer/discord.png';
import MetaGithub from 'assets/drawer/github.png';
import MetaGuilds from 'assets/drawer/guilds.png';
import MetaLeaderboard from 'assets/drawer/leaderboard.png';
import MetaLibrary from 'assets/drawer/library.png';
import MetaView from 'assets/drawer/metaview.png';
import MetaNewsletter from 'assets/drawer/newsletter.png';
import MetaSeedmarket from 'assets/drawer/seedmarket.png';
import MetaTwitter from 'assets/drawer/twitter.png';

export interface DrawerItemType {
  href: string;
  isExternal?: boolean;
  src: string;
  alt: string;
}

export const DrawerItems = [
  {
    href: '/',
    isExternal: false,
    src: MetaNewsletter,
    alt: 'MetaNewsletter',
  },
  {
    href: '/',
    isExternal: false,
    src: MetaView,
    alt: 'MetaView',
  },
  {
    href: '/',
    isExternal: false,
    src: MetaLibrary,
    alt: 'MetaLibrary',
  },
  {
    href: '/',
    isExternal: false,
    src: MetaGuilds,
    alt: 'MetaGuilds',
  },
  {
    href: 'https://twitter.com/Metafam',
    isExternal: true,
    src: MetaTwitter,
    alt: 'MetaTwitter',
  },
  {
    href: 'https://discord.gg/XazuypRcv6',
    isExternal: true,
    src: MetaDiscord,
    alt: 'MetaDiscord',
  },
  {
    href: 'https://github.com/MetaFam/TheGame',
    isExternal: true,
    src: MetaGithub,
    alt: 'MetaGithub',
  },
  {
    href: '/',
    isExternal: false,
    src: MetaCalendar,
    alt: 'MetaCalendar',
  },
  {
    href: '/',
    isExternal: false,
    src: MetaLeaderboard,
    alt: 'MetaLeaderboard',
  },
  {
    href:
      'https://balancer.exchange/#/swap/ether/0x30cf203b48edaa42c3b4918e955fed26cd012a3f',
    isExternal: true,
    src: MetaSeedmarket,
    alt: 'MetaSeedmarket',
  },
];
