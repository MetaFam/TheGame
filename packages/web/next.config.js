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
    async rewrites() {
      return [
        {
          source: '/metagame/calendar',
          destination:
            'https://calendar.google.com/calendar/ical/nih59ktgafmm64ed4qk6ue8vv4%40group.calendar.google.com/public/basic.ics',
        },
      ];
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
