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
  }),
);
