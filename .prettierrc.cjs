module.exports = {
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  // semi: false,
  overrides: [
    {
      files: '*.yaml',
      options: {
        singleQuote: false,
      },
    },
  ],
};
