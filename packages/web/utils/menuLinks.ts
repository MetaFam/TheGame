// in utils
export interface MenuLinkItem {
  title: string;
  explainerText: string;
  url: string;
  icon: string;
}

export interface MenuLinkSet {
  label: string;
  menuItems: MenuLinkItem[];
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
  welcome: 'New to MetaGame? This is the first thing you should dive deep into',
  thegreathouses:
    'The Great Houses are here to give people a meta view of different areas of interest',
  wiki: 'New to MetaGame? This is the first thing you should dive deep into',
  becomeapatron: "Don't have time to play? Support MetaGame by buying Seeds",
  buyseeds:
    'Find out all about the SEEDs; why, where & how you should buy them',
  plantseeds: 'Plant your SEEDs and watch them grow',
  grants: 'Find cool projects & people you could support financially',
};

export const MenuSectionLinks: MenuLinkSet[] = [
  {
    label: 'community',
    menuItems: [
      {
        title: 'Players',
        explainerText:
          'Find players of MetaGame; their NFTs, their skills & whatever else they put on there',
        url: '/community/players',
        icon: 'players',
      },
      {
        title: 'Patrons',
        explainerText:
          'Check the patrons of MetaGame; the ones supporting MetaGame by buying Seeds',
        url: '/community/patrons',
        icon: 'patrons',
      },
      {
        title: 'Discord',
        explainerText: 'Engage in conversations with the MetaGame community ',
        url: 'https://discord.gg/metagame',
        icon: 'discord',
      },
      {
        title: 'Guilds',
        explainerText:
          'Discover the guilds of MetaGame; groups of players set around more specific goals',
        url: '/community/guilds',
        icon: 'guilds',
      },
      {
        title: 'Events',
        explainerText: descriptions.events,
        url: '/community/events',
        icon: 'events',
      },
      {
        title: 'Forum',
        explainerText: descriptions.forum,
        url: 'https://forum.metagame.wtf/',
        icon: 'forum',
      },
    ],
  },
  {
    label: 'learn',
    menuItems: [
      {
        title: 'MetaGame Wiki',
        explainerText: descriptions.wiki,
        url: '/learn/wiki',
        icon: 'metagamewiki',
      },
      {
        title: 'The Great Houses',
        explainerText: descriptions.thegreathouses,
        url: '/learn/thegreathouses',
        icon: 'thegreathouses',
      },
      // {
      //   title: 'Skill Trees',
      //   explainerText:
      //     'Skill Trees are meant to help people discover paths of self-development',
      //   url: 'https://wiki.metagame.wtf/',
      //   icon: 'learn',
      // },
      {
        title: 'Welcome to MetaGame',
        explainerText: descriptions.welcome,
        url:
          'https://meta-game.notion.site/meta-game/Welcome-to-MetaGame-7e28e75f3c264c7b939eaaa2239b9c28',
        icon: 'welcometometagame',
      },
      {
        title: 'Playbooks',
        explainerText: descriptions.playbooks,
        url: '/learn/playbooks',
        icon: 'playbooks',
      },
      // {
      //   title: 'Asketh',
      //   explainerText:
      //     'Asketh is a place for players of MetaGame to ask whatever question they might have',
      //   url: 'https://wiki.metagame.wtf/',
      //   icon: 'asketh',
      // },
      {
        title: 'Meta Radio',
        explainerText: descriptions.metaradio,
        url: '/learn/metaradio',
        icon: 'metaradio',
      },
      {
        title: 'Meta Media YouTube',
        explainerText: descriptions.youtube,
        url: 'https://www.youtube.com/metamedia',
        icon: 'youtube',
      },
    ],
  },
  {
    label: 'contribute',
    menuItems: [
      {
        title: 'Roles',
        explainerText:
          'Find about all roles in MetaGame, see which ones are open & how to play them',
        url:
          'https://meta-game.notion.site/Internal-Roles-Guilds-bec3a0437f684322b650dbb7aca616e8',
        icon: 'roles',
      },
      {
        title: 'Raids',
        explainerText:
          'See which raids are currently ongoing, learn more about them & get involved',
        url: 'https://wiki.metagame.wtf/docs/enter-metagame/navigation-board',
        icon: 'raids',
      },
      {
        title: 'Quests',
        explainerText:
          'Take a look at available quest and claim ones that suit you best',
        url: '/quests',
        icon: 'quests',
      },
      {
        title: 'Seeds',
        explainerText: descriptions.buyseeds,
        url: '/seeds',
        icon: 'seeds',
      },
    ],
  },
];
