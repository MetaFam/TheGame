// in utils

export interface MenuLink {
  label: string;
  icon?: any;
  href?: string;
  menuItems?: any;
}

export const MenuSectionLinks: MenuLink[] = [
  {
    label: 'community',
    menuItems: [
      {
        title: 'Players',
        explainerText:
          'Find players of MetaGame; their NFTs, their skills & whatever else they put on there',
        url: '/players',
      },
      {
        title: 'Patrons',
        explainerText:
          'Check the patrons of MetaGame; the ones supporting MetaGame by buying Seeds',
        url: '/patrons',
      },
      {
        title: 'Discord',
        explainerText: 'Engage in conversations with the MetaGame community ',
        url: 'https://discord.gg/VYZPBnx',
      },
      {
        title: 'Guilds',
        explainerText:
          'Discover the guilds of MetaGame; groups of players set around more specific goals',
        url: '/guilds',
      },
      {
        title: 'Alliances',
        explainerText:
          'Explore the alliances of MetaGame; groups of guilds spanning across the metaverse',
        url: 'https://wiki.metagame.wtf/docs/great-houses/house-of-daos',
      },
      {
        title: 'Forum',
        explainerText:
          'Take part in slower & more thoughtful conversations on the forum',
        url: 'https://forum.metagame.wtf/',
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
      },
      {
        title: 'Playbooks',
        explainerText:
          'Playbooks are short tutorials on achieving greatness, written by other players',
        url: 'https://wiki.metagame.wtf/docs/playbooks/browse',
      },
      {
        title: 'Skill Trees',
        explainerText:
          'Skill Trees are meant to help people discover paths of self-development',
        url: 'https://wiki.metagame.wtf/',
      },
      {
        title: 'Welcome to MetaGame',
        explainerText:
          'Just joined MetaGame? Check this for learning about how to get started',
        url: 'https://wiki.metagame.wtf/',
      },
      {
        title: 'The Great Houses',
        explainerText:
          'The Great Houses are here to give people a meta view of different areas of interest',
        url: 'https://wiki.metagame.wtf/docs/great-houses/house-of-daos',
      },
      {
        title: 'Asketh',
        explainerText:
          'Asketh is a place for players of MetaGame to ask whatever question they might have',
        url: 'https://wiki.metagame.wtf/',
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
          'https://wiki.metagame.wtf/docs/enter-metagame/roles-in-metagame#main-roles',
      },
      {
        title: 'Raids',
        explainerText:
          'See which raids are currently ongoing, learn more about them & get involved',
        url: 'https://wiki.metagame.wtf/docs/enter-metagame/navigation-board',
      },
      {
        title: 'Quests',
        explainerText:
          'Take a look at available quest and claim ones that suit you best',
        url: '/quests',
      },
    ],
  },
  {
    label: 'invest',
    menuItems: [
      {
        title: 'Seed',
        explainerText:
          'Find out all about the Seeds; why, where & how you should buy them',
        url: 'https://wiki.metagame.wtf/docs/how-does-it-work/xp',
      },
      {
        title: 'Grants',
        explainerText:
          'Find cool projects & people you could support financially',
        url: 'https://wiki.metagame.wtf/',
      },
      {
        title: 'Balancer Pool',
        explainerText: 'Plant your Seeds and watch them grow',
        url:
          'https://pools.balancer.exchange/#/pool/0xea05a15dbce2eb543ffda16950e95b2bd2e40d0e/',
      },
    ],
  },
];
