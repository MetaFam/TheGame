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
          http: false,
          os: false,
          https: false,
          child_process: false,
          stream: false,
          'browserify-zlib': false,
          zlib: false,
          crypto: false,
          path: false,
          tls: false,
        };
      }

      return config;
    },
  }),
);
