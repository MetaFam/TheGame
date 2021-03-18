module.exports = {
  title: "MetaGame Wiki",
  tagline: "Build the future you want to live in.",
  url: "https://wiki.metagame.wtf/",
  baseUrl: "/",
  favicon: "img/mg-icon.png",
  organizationName: "MetaFam",
  projectName: "metagame-wiki",
  customFields: {
    GA_TAG: process.env.GA_TAG,
  },
  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
    },
    image: "img/wiki-cover.png",
    // headerLinks: [{ page: 'help', label: 'Help' }],
    navbar: {
      title: "MetaGame Wiki",
      logo: {
        alt: "MetaGame Logo",
        src: "img/mg-crystal.png",
      },
    },

    },
    scripts: [
        "./static/scripts/confetti.js"
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://wiki.metagame.wtf/admin/#/?",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
      },
    ],
  ],
  plugins: [
    require.resolve("docusaurus-lunr-search"),
    require.resolve("docusaurus-plugin-sass"),
    "docusaurus2-dotenv",
  ],
};
