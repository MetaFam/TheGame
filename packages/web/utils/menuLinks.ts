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

export const eventsDescription =
  "See when we're meeting; join discussions & workshops";

export const MenuSectionLinks: MenuLinkSet[] = [
  {
    label: 'community',
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
        title: 'Discord',
        explainerText: 'Engage in conversations with the MetaGame community ',
        url: 'https://discord.gg/metagame',
        icon: 'discord',
      },
      {
        title: 'Guilds',
        explainerText:
          'Discover the guilds of MetaGame; groups of players set around more specific goals',
        url: '/guilds',
        icon: 'guilds',
      },
      {
        title: 'Events',
        explainerText: eventsDescription,
        url: '/events',
        icon: 'events',
      },
      {
        title: 'Forum',
        explainerText:
          'Take part in slower & more thoughtful conversations on the forum',
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
        explainerText:
          'New to MetaGame? This is the first thing you should dive deep into',
        url: 'https://wiki.metagame.wtf/docs/wtf-is-metagame/wtf-is-metagame',
        icon: 'metagamewiki',
      },
      {
        title: 'The Great Houses',
        explainerText:
          'The Great Houses are here to give people a meta view of different areas of interest',
        url: 'https://wiki.metagame.wtf/docs/great-houses/house-of-daos',
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
        explainerText: 'On your path to becoming a player? Go through here',
        url:
          'https://meta-game.notion.site/meta-game/Welcome-to-MetaGame-7e28e75f3c264c7b939eaaa2239b9c28',
        icon: 'welcometometagame',
      },
      {
        title: 'Playbooks',
        explainerText:
          'Playbooks are short tutorials on achieving greatness, written by other players',
        url: 'https://wiki.metagame.wtf/docs/playbooks/browse',
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
        explainerText:
          "MetaGame's podcasting network; plug knowledge straight into your ears",
        url: 'https://anchor.fm/MetaGame/',
        icon: 'metaradio',
      },
      {
        title: 'Meta Media YouTube',
        explainerText:
          "MetaMedia is MetaGame's video hub, talks, workshops, memes & other shizzle",
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
        url:
          'https://meta-game.notion.site/e0e83b7ea2a54d6294c5e167ba7b306a?v=81e5d4755ab44c3a93df3eaaee6fd369',
        icon: 'quests',
      },
    ],
  },
  {
    label: 'invest',
    menuItems: [
      {
        title: 'Become a Patron',
        explainerText:
          "Don't have time to play? Support MetaGame by buying Seeds",
        url: 'https://wiki.metagame.wtf/docs/enter-metagame/why-patron',
        icon: 'becomeapatron',
      },
      {
        title: 'Buy Seeds',
        explainerText:
          'Find out all about the SEEDs; why, where & how you should buy them',
        url:
          'https://app.balancer.fi/#/swap/ether/0x30cf203b48edaa42c3b4918e955fed26cd012a3f',
        icon: 'seeds',
      },
      {
        title: 'Plant Seeds',
        explainerText: 'Plant your SEEDs and watch them grow',
        url:
          'https://pools.balancer.exchange/#/pool/0xea05a15dbce2eb543ffda16950e95b2bd2e40d0e/',
        icon: 'invest',
      },
      {
        title: 'Support Grants',
        explainerText:
          'Find cool projects & people you could support financially',
        url: 'https://giveth.io/',
        icon: 'grants',
      },
    ],
  },
];
