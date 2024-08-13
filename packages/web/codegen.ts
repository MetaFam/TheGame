import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../../schema.graphql',
  documents: ['graphql/**/*.ts', '!graphql/composeDB/**'],
  require: ['ts-node/register'],
  generates: {
    './graphql/autogen/hasura-sdk.ts': {
      // preset: 'client',
      plugins: [
        'typescript',
        'typescript-operations',
        // 'typescript-graphql-request',
        'typescript-urql',
      ],
      config: {
        withHooks: true,
        gqlImport: 'fake-tag',
        skipTypename: true,
        dedupeOperationSuffix: true,
        dedupeFragments: true,
        documentMode: 'documentNode',
        emitLegacyCommonJSImports: false,

      //   // This generates typenames more in line with the rest
      //   // of the codebase, but, unfortunately, player_role and
      //   // PlayerRole create the same output name
      //   // namingConvention:
      //   //   transformUnderscore: true
      },
    },
  },
};

export default config;
