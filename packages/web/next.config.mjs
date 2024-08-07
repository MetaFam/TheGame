import createBundleAnalyzerConfig from '@next/bundle-analyzer';
// import HoneybadgerSourceMapPlugin from '@honeybadger-io/webpack';

/**
 * TODO: needs to get revision from the build but is currently breaking the build.
 * I don't wanna delay the release of #1414 so perhaps an improvement idea?
 */
// const HONEYBADGER_REVISION = execSync('git rev-parse HEAD').toString().trim();

const withBundleAnalyzer = createBundleAnalyzerConfig({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  async redirects() {
    const redirs = [
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
        source: '/community/patrons',
        destination: '/patrons',
        permanent: false,
      },
      {
        source: '/community/guilds',
        destination: '/guilds',
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
      {
        source: '/play/paths/:path*',
        destination: '/academy/:path*',
        permanent: false,
      },
      {
        source: '/learn/playbooks/:path*',
        destination: '/academy/:path*',
        permanent: false,
      },
      {
        source: '/learn/great-houses/:path*',
        destination: '/academy/:path*',
        permanent: false,
      },
    ];
    if(process.env.NODE_ENV === 'production') {
      redirs.push({
        source: '/',
        destination: 'https://enter.metagame.wtf',
        permanent: false,
      })
    }
    return redirs;
  },
  async rewrites() {
    return [
      {
        source: '/metagame/feed',
        destination: 'https://metagame.substack.com/feed',
      },
    ];
  },
  productionBrowserSourceMaps: true,
  env: {
    HONEYBADGER_API_KEY: process.env.HONEYBADGER_API_KEY,
    OPENSEA_API_KEY: process.env.OPENSEA_API_KEY,
    WEB3_STORAGE_TOKEN: process.env.WEB3_STORAGE_TOKEN,
  },
  reactStrictMode: true,
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.plugins.push(
        // jsdom is required for draft-js SSR only
        new webpack.IgnorePlugin({ resourceRegExp: /jsdom$/ }),
      );

      config.module.rules = [
        ...config.module.rules,
        // { sideEffects: false }, // causes global CSS not to load
      ];
      // config.externals = {
      //   '@emotion/react': '"@emotion/react"',
      // }

      // config.resolve.fallback = {
      //   fs: false,
      //   net: false,
      //   http: require.resolve('stream-http'),
      //   os: require.resolve('os-browserify/browser'),
      //   https: require.resolve('https-browserify'),
      //   child_process: false,
      //   stream: require.resolve('stream-browserify'),
      //   'browserify-zlib': false,
      //   zlib: false,
      //   crypto: require.resolve('crypto-browserify'),
      //   path: false,
      //   tls: false,
      // };

      /**
       * For uploading sourcemaps for Honeybadger.
       */
      // if (HONEYBADGER_API_KEY && HONEYBADGER_ASSETS_URL) {
      //   config.devtool = 'hidden-source-map';

      //   config.plugins.push(
      //     new HoneybadgerSourceMapPlugin({
      //       apiKey: HONEYBADGER_API_KEY,
      //       assetsUrl: HONEYBADGER_ASSETS_URL,
      //       revision: HONEYBADGER_REVISION,
      //     }),
      //   );
      // }
    }

    // config.plugins.push(
    //   new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }),
    // );

    return config;
  },
});
