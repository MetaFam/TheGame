const withImages = require('next-images');
const withTM = require('next-transpile-modules')(['react-timezone-select']);
const { withSentryConfig } = require('@sentry/nextjs');

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

const sentryExport = {
  // your existing module.exports

  // Optional build-time configuration options
  sentry: {
    // See the 'Configure Source Maps' and 'Configure Legacy Browser Support'
    // sections below for information on the following options:
    //   - disableServerWebpackPlugin
    //   - disableClientWebpackPlugin
    //   - autoInstrumentServerFunctions
    //   - hideSourceMaps
    //   - widenClientFileUpload
    //   - transpileClientSDK
  },
};

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
  // withSentryConfig(sentryExport, sentryWebpackPluginOptions)
);
