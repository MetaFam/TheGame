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
    type: 'internal-link',
    url: '/community',
  },
  {
    label: 'paths & playbooks',
    type: 'internal-link',
    url: '/paths-and-playbooks',
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
