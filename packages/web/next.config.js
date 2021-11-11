/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')(['react-timezone-select']);
const withImages = require('next-images');

module.exports = withTM(
  withImages({
    async redirects() {
      return [
        {
          source: '/',
          destination: '/players',
          permanent: false,
        },
      ];
    },
    webpack: (config, { isServer, webpack }) => {
      if (!isServer) {
        config.plugins.push(
          // jsdom is required for draft-js SSR only
          new webpack.IgnorePlugin(/jsdom$/),
        );
      }

      return config;
    },
  }),
);
