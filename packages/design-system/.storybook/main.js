const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: [
    'storybook-addon-performance/register',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    'storybook-addon-react-docgen',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true,
          },
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
          options: {
            // Provide the path to your tsconfig.json so that your stories can
            // display types from outside each individual story.
            tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
          },
        },
      ],
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': '@emotion/react',
          'emotion-theming': '@emotion/react',
        },
      },
    };
  },
};
