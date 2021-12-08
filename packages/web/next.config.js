/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')(['react-timezone-select']);
const withImages = require('next-images');

module.exports = withTM(
  withImages({
    async redirects() {
      return [
        {
          source: '/',
          destination: '/community/players',
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
