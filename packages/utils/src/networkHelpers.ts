import { RequestInfo, RequestInit } from 'node-fetch';

// This is necessary to prevent transpilation to a require statement
// eslint-disable-next-line @typescript-eslint/no-implied-eval
const importDynamic = new Function('modulePath', 'return import(modulePath)');

export const fetch = async (
  url: RequestInfo,
  init?: RequestInit | undefined,
) => {
  const { default: nodeFetch } = await importDynamic('node-fetch');
  return nodeFetch(url, init);
};
