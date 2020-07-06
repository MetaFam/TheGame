export default {
  graphqlURL: `${process.env.GRAPHQL_SERVER || 'http://localhost:8080'}/v1/graphql`,
  infuraId: process.env.INFURA_ID || '781d8466252d47508e177b8637b1c2fd',
};
