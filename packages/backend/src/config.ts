interface IConfig {
  port: number,
  graphqlURL: string,
  adminKey: string,
  ipfsEndpoint: string,
}

function parseEnv<T>(v: any, type: string, defaultValue: T): T {
  if(!v) return defaultValue;

  if(type === 'number') {
    return (Number(v) as any) as T;
  }
  return v as T;
}

const config: IConfig = {
  port: parseEnv<number>(process.env.PORT, 'number', 4000),
  graphqlURL: parseEnv<string>(process.env.GRAPHQL_URL, 'string', 'http://localhost:8080/v1/graphql'),
  adminKey: parseEnv<string>(process.env.HASURA_GRAPHQL_ADMIN_SECRET, 'string', "metagame_secret"),
  ipfsEndpoint: parseEnv<string>(process.env.IPFS_ENDPOINT, 'string', 'https://ipfs.infura.io'),
};

export default config;
