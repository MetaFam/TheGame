const withImages = require('next-images');
const withTM = require('next-transpile-modules')(['react-timezone-select']);
const HoneybadgerSourceMapPlugin = require('@honeybadger-io/webpack');
const { execSync } = require('child_process');

const { HONEYBADGER_API_KEY, HONEYBADGER_ASSETS_URL } = process.env;

const HONEYBADGER_REVISION = execSync('git rev-parse HEAD').toString().trim();

module.exports = withTM(
  withImages({
    async redirects() {
      return [
        {
          source: '/community/join/patrons',
          destination: '/join/patron',
          permanent: false,
        },
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
    productionSourceMaps: true,
    env: {
      HONEYBADGER_API_KEY,
      HONEYBADGER_REVISION,
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

        if (HONEYBADGER_API_KEY && HONEYBADGER_ASSETS_URL) {
          config.devtool = 'hidden-source-map';

          config.plugins.push(
            new HoneybadgerSourceMapPlugin({
              apiKey: HONEYBADGER_API_KEY,
              assetsUrl: HONEYBADGER_ASSETS_URL,
              revision: HONEYBADGER_REVISION,
            }),
          );
        }
      }

      config.plugins.push(
        new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }),
      );

      return config;
    },
  }),
);
