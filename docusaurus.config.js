module.exports = {
  title: 'MetaGame Wiki',
  tagline: 'Build the future you want to live in.',
  url: 'https://wiki.metagame.wtf',
  baseUrl: '/',
  favicon: 'img/mg-icon.png',
  organizationName: 'MetaFam',
  projectName: 'metagame-wiki',
  customFields: {
    GA_TAG: process.env.GA_TAG,
  },
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
    },
    // headerLinks: [{ page: 'help', label: 'Help' }],
    navbar: {
      title: 'MetaGame Wiki',
      logo: {
        alt: 'MetaGame Logo',
        src: 'img/mg-crystal.png',
      },
    },
    // footer: {
    //   style: 'dark',
    //   links: [
    //     {
    //       title: 'The Game',
    //       items: [
    //         {
    //           label: '🌌 Interspace',
    //           href: 'https://interspace.metagame.wtf',
    //         },
    //         {
    //           label: '🧬 The Source',
    //           href: 'https://metafam.github.io/TheSource/timeline/@metagame/',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Community',
    //       items: [
    //         {
    //           label: '💬 Discord',
    //           href: 'https://discord.gg/VYZPBnx',
    //         },
    //         {
    //           label: '🧵 Forums',
    //           href: 'https://forum.metagame.wtf',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Social',
    //       items: [
    //         {
    //           label: '🐦 Twitter',
    //           href: 'https://twitter.com/MetaFam',
    //         },
    //         {
    //           label: '🗞 Newsletter',
    //           href: 'https://metagame.substack.com',
    //         },
    //       ],
    //     },
    //   ],
    // },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://wiki.metagame.wtf/admin/#/?',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      },
    ],
  ],
  plugins: [
    require.resolve('docusaurus-lunr-search'),
    require.resolve('docusaurus-plugin-sass'),
    'docusaurus2-dotenv',
  ],
};
