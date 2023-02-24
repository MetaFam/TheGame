module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier',
  ],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 6,
  },
  ignorePatterns: ['packages/web/next.config.js', '**/jest.config.js'],
  plugins: ['simple-import-sort'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Doesn't work for FC: https://github.com/yannickcr/eslint-plugin-react/issues/2353
    'react/prop-types': 'off',

    // Prefer non-default exports
    'import/no-default-export': 'off',
    'import/prefer-default-export': 'off',

    // Auto-sort imports
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // unary operators are ok
    'no-plusplus': 'off',

    // Using a type system makes it safe enough to spread props
    'react/jsx-props-no-spreading': 'off',

    // we want to be able to use functions before definition
    '@typescript-eslint/no-use-before-define': 'off',

    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        minimumDescriptionLength: 5,
      },
    ],
    'no-bitwise': 'off',
  },
  overrides: [
    {
      // assuming Next.js application
      files: '**/pages/**/*.{ts,tsx}',
      rules: {
        'react/react-in-jsx-scope': 'off', // react is a global in this folder
        'import/no-default-export': 'off', // pages have to have a default export
        'import/prefer-default-export': 'off',
        '@typescript-eslint/explicit-module-boundary-types': [
          // So we can infer prop types
          'warn',
          { allowedNames: ['getStaticProps'] },
        ],
      },
    },
    {
      files: ['**/*.stories.*'],
      rules: {
        // Storybook requires default exports for stories
        'import/no-default-export': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
};
