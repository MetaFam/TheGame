const withImages = require('next-images');
const withTM = require('next-transpile-modules')(['react-timezone-select']);

module.exports = withTM(
  withImages({
    async redirects() {
      return [
        {
          source: '/community/players',
          destination: '/players',
          permanent: false,
        },
        {
          source: '/patrons',
          destination: '/community/patrons',
          permanent: false,
        },
        {
          source: '/guilds',
          destination: '/community/guilds',
          permanent: false,
        },
        {
          source: '/profile/setup',
          destination: '/profile/setup/name',
          permanent: false,
        },
        {
          source: '/profile/setup/username',
          destination: '/profile/setup/name',
          permanent: false,
        },
        {
          source: '/join',
          destination: '/profile/setup',
          permanent: false,
        },
        {
          source: '/done',
          destination: '/profile/setup/complete',
          permanent: false,
        },
      ];
    },
    async rewrites() {
      return [
        {
          source: '/metagame/feed',
          destination: 'https://metagame.substack.com/feed',
        },
      ];
    },
    future: {
      webpack5: true,
    },
    webpack: (config, { isServer, webpack }) => {
      if (!isServer) {
        config.plugins.push(
          // jsdom is required for draft-js SSR only
          new webpack.IgnorePlugin(/jsdom$/),
        );

        config.resolve.fallback = {
          fs: false,
          net: false,
          http: require.resolve('stream-http'),
          os: require.resolve('os-browserify/browser'),
          https: require.resolve('https-browserify'),
          child_process: false,
          stream: require.resolve('stream-browserify'),
          'browserify-zlib': false,
          zlib: false,
          crypto: require.resolve('crypto-browserify'),
          path: false,
          tls: false,
        };
      }

      config.plugins.push(
        new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }),
      );

      return config;
    },
  }),
);
