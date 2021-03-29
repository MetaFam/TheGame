// eslint-disable-next-line
const withImages = require('next-images');

module.exports = withImages({
  async redirects() {
    return [
      {
        source: '/',
        destination: '/players',
        permanent: false,
      },
    ]
  },
});
