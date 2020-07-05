export default {
  port: process.env.PORT || 4000,
  graphqlURL: process.env.GRAPHQL_URL || 'http://localhost:8080/v1/graphql',
  adminKey: process.env.HASURA_GRAPHQL_ADMIN_SECRET || 'metagame_secret',
};
