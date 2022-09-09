/* eslint-disable no-console, no-await-in-loop */
import { INITIATION_QUESTS_INFO } from '@metafam/utils/src/constants';
import { gql, request } from 'graphql-request';

const statusQuery = gql`
  query getGraphStatus($subgraph: String!) {
    status: indexingStatusForCurrentVersion(subgraphName: $subgraph) {
      chains {
        latestBlock {
          number
        }
      }
    }
  }
`;

export const getLatestBlock = async (subgraph: string): Promise<number> => {
  const data = await request(
    INITIATION_QUESTS_INFO.graphHealthEndpoint,
    statusQuery,
    {
      subgraph,
    },
  );
  return data.status.chains[0].latestBlock.number;
};

const UPDATE_INTERVAL = 10000;

class GraphHealthStore {
  graphHealth: Record<string, number> = {};

  constructor() {
    this.updateGraphHealth();
  }

  public async updateGraphHealth() {
    this.graphHealth[INITIATION_QUESTS_INFO.chainId] = await getLatestBlock(
      INITIATION_QUESTS_INFO.graphHealthEndpoint,
    );
    console.log('Updated Graph Health', this.graphHealth);
    setTimeout(() => this.updateGraphHealth(), UPDATE_INTERVAL);
  }

  status() {
    return this.graphHealth;
  }
}

// eslint-disable-next-line func-names
const HealthStoreSingleton = (function () {
  let instance: GraphHealthStore;

  function createInstance() {
    return new GraphHealthStore();
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

const getGraphStatus = () => HealthStoreSingleton.getInstance().status();

export const initGraphHealthStore = getGraphStatus;

export const getGraphLatestBlock = (chainId: string): number =>
  getGraphStatus()[chainId];
