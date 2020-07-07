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
    navbar: {
      title: "MetaGame Wiki",
      logo: {
        alt: "MetaGame Logo",
        src: "img/mg-icon.png",
      },
      links: [
        {
          to: "docs/introduction",
          label: "🤨 WTF is MetaGame?",
          position: "left",
        },
        {
          to: "docs/handbook/how-metagame-works",
          label: "🧐 How does it work?",
          position: "left",
        },
        {
          to: "docs/roadmap/players-of-metagame",
          label: "😈 Players",
          position: "left",
        },
        {
          to: "docs/Guilding/guilds-of-metagame",
          label: "⚔️ Guilds",
          position: "left",
        },
        {
          to: "theroom",
          label: "🏠 The Room",
          position: "left",
        },
        {
          href: "https://metagame.wtf",
          label: "Home",
          position: "right",
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
          editUrl: "https://github.com/MetaFam/metagame-wiki/edit/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
