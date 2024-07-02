import dotenv from 'dotenv';

dotenv.config();

const config = {
  overwrite: true,
  require: ['ts-node/register'],
  generates: {
    'src/handlers/remote-schemas/autogen/types.ts': {
      schema: 'src/handlers/remote-schemas/typeDefs.ts',
      plugins: [
        'typescript',
        'typescript-resolvers',
        { add: { content: '/* eslint-disable */' } },
      ],
      config: {
        noSchemaStitching: true,
        avoidOptionals: true,
        maybeValue:
          'T extends PromiseLike<infer U> ? Promise<U | null> : T | null | undefined',
      },
    },
    'src/lib/autogen/hasura-sdk.ts': {
      schema: '../../schema.graphql',
      documents: ['src/handlers/graphql/**/(!(*.d)).ts'],
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
        { add: { content: '/* eslint-disable */' } },
      ],
      config: {
        immutableTypes: true,
        scalars: {
          account_type:
            "'ETHEREUM' | 'DISCORD' | 'GITHUB' | 'TWITTER' | 'DISCOURSE | DEWORK'",
        },
        dedupeOperationSuffix: true,
      },
    },
    'src/lib/autogen/daohaus-sdk.ts': {
      // DAOHaus v3 API Endpoint
      // schema: `https://gateway.thegraph.com/api/${process.env.THE_GRAPH_API_TOKEN}/subgraphs/id/GfHFdFmiSwW1PKtnDhhcxhArwtTjVuMnXxQ5XcETF1bP`,
      schema: `https://gateway.thegraph.com/api/${process.env.THE_GRAPH_API_TOKEN}/subgraphs/id/9uvKq57ZiNCdT9uZ6xaFhp3yYczTM4Fgr7CJHM6tdX9H`,
      documents: [
        'src/handlers/remote-schemas/resolvers/daohaus/**/(!(*.d)).ts',
      ],
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
        'typescript-resolvers',
        { add: { content: '/* eslint-disable */' } },
      ],
      config: {
        avoidOptionals: true,
        dedupeOperationSuffix: true,
        typesPrefix: 'DaoHaus',
      },
    },
    'src/lib/autogen/seedgraph-sdk.ts': {
      // schema: `https://gateway-arbitrum.network.thegraph.com/api/${process.env.THE_GRAPH_API_TOKEN}/subgraphs/id/7LxrQZvdYe1NYKen6wuLtCaZqRTL9PhTQHRaHJPYDeCu`,
      schema:
        'https://api.studio.thegraph.com/query/42037/metagame-seed-pseed/version/latest',
      documents: [
        'src/handlers/remote-schemas/resolvers/seedGraph/**/(!(*.d)).ts',
      ],
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
        { add: { content: '/* eslint-disable */' } },
      ],
      config: {
        avoidOptionals: true,
        dedupeOperationSuffix: true,
      },
    },
    'src/lib/autogen/balancerpolygon-sdk.ts': {
      schema: `https://gateway-arbitrum.network.thegraph.com/api/${process.env.THE_GRAPH_API_TOKEN}/subgraphs/id/H9oPAbXnobBRq1cB3HDmbZ1E8MWQyJYQjT1QDJMrdbNp`,
      documents: [
        'src/handlers/remote-schemas/resolvers/balancerPolygon/**/(!(*.d)).ts',
      ],
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
        { add: { content: '/* eslint-disable */' } },
      ],
      config: {
        avoidOptionals: true,
        dedupeOperationSuffix: true,
      },
    },
  },
};

export default config;
