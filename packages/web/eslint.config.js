export default   {
  extends: ['plugin:@next/next/recommended'],
  rules: {
    'no-console': [
      'error',
      { allow: ['error', 'warn'] },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  overrides: [
    {
      files: ['./graphql/**/*.ts', './lib/hooks.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    }
  ]
}
