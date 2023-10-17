// in utils
export interface MenuLinkItem {
  title: string;
  explainerText: string;
  url: string;
  icon: string;
}

export interface MenuLinkSet {
  label: string;
  url?: string;
  type: string;
  menuItems?: MenuLinkItem[];
}

export const descriptions = {
  events: "See when we're meeting; join discussions & workshops",
  forum: 'Take part in slower & more thoughtful conversations on the forum',
  greatHouses:
    'The Great Houses are here to give people a meta view of different areas of interest',
  playbooks:
    'Playbooks are short tutorials on achieving greatness, written by other players',
  metaradio:
    "MetaGame's podcasting network; plug knowledge straight into your ears",
  youtube:
    "MetaMedia is MetaGame's video hub, talks, workshops, memes & other shizzle",
  welcome: 'On your path to becoming a player? Go through here',
  thegreathouses:
    'The Great Houses are here to give people a meta view of different areas of interest',
  wiki: 'New to MetaGame? This is the first thing you should dive deep into',
  seeds: 'Find out about SEEDs — why, where & how you should buy them',
  grants: 'Find cool projects & people you could support financially',
};

export const MenuSectionLinks: MenuLinkSet[] = [
  {
    label: 'dashboard',
    type: 'internal-link',
    url: '/dashboard',
  },
  {
    label: 'community',
    type: 'menu',
    menuItems: [
      {
        title: 'Players',
        explainerText:
          'Find players of MetaGame; their NFTs, their skills & whatever else they put on there',
        url: '/players',
        icon: 'players',
      },
      {
        title: 'Patrons',
        explainerText:
          'Check the patrons of MetaGame; the ones supporting MetaGame by buying Seeds',
        url: '/patrons',
        icon: 'patrons',
      },
      {
        title: 'Guilds',
        explainerText:
          'Discover the guilds of MetaGame; groups of players set around more specific goals',
        url: '/guilds',
        icon: 'guilds',
      },
    ],
  },
  {
    label: 'learn',
    type: 'menu',
    menuItems: [
      {
        title: 'Roles',
        explainerText:
          'Find about all roles in MetaGame, see which ones are open & how to play them',
        // url: 'https://meta-game.notion.site/Internal-Roles-Guilds-bec3a0437f684322b650dbb7aca616e8',
        url: '/roles',
        icon: 'roles',
      },
      {
        title: 'Playbooks',
        explainerText: descriptions.playbooks,
        url: '/learn/playbooks',
        icon: 'playbooks',
      },
      {
        title: 'The Great Houses',
        explainerText: descriptions.thegreathouses,
        url: '/learn/thegreathouses',
        icon: 'thegreathouses',
      },
    ],
  },
  {
    label: 'quests',
    type: 'internal-link',
    url: '/quests',
  },
  {
    label: 'seeds',
    type: 'internal-link',
    url: '/seeds',
  },
  {
    label: 'discord',
    type: 'external-link',
    url: 'https://discord.gg/XGNFdUaxCH',
  },
];
