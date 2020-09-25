module.exports = {
  title: "MetaGame Wiki",
  tagline:
    "Build the future you want to live in.",
  url: "https://wiki.metagame.wtf",
  baseUrl: "/",
  favicon: "img/mg-icon.png",
  organizationName: "MetaFam",
  projectName: "metagame-wiki",
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
    },
    navbar: {
      title: "MetaGame Wiki",
      logo: {
        alt: "MetaGame Logo",
        src: "img/mg-icon.png",
      },
      items: [
        {
          to: "docs/introduction",
          label: "🐣 Start Here",
          position: "left",
        },
        {
          to: "docs/enter-metagame/signpost",
          label: "🗺 Enter MetaGame",
          position: "left",
        },
         {
           to: "docs/enter-metagame/navigation-board",
           label: "👣 Join a Raid",
           position: "left",
         },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "The Game",
          items: [
            {
              label: "🌌 Interspace",
              href: "https://interspace.metagame.wtf",
            },
            {
              label: "🧬 The Source",
              href: "https://metafam.github.io/TheSource/timeline/@metagame/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "💬 Discord",
              href: "https://discord.gg/VYZPBnx",
            },
            {
              label: "🧵 Forums",
              href: "https://forum.metagame.wtf",
            },
          ],
        },
        {
          title: "Social",
          items: [
            {
              label: "🐦 Twitter",
              href: "https://twitter.com/MetaFam",
            },
            {
              label: "🗞 Newsletter",
              href: "https://metagame.substack.com",
            },
          ],
        },
      ],
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            'https://wiki.metagame.wtf/admin/#/?',
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  plugins: [require.resolve('docusaurus-lunr-search')],
};
