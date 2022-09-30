/* eslint-disable no-console, no-await-in-loop */
import { gql, request } from 'graphql-request';
import { QUESTS } from 'utils/questChains';

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
  const data = await request(QUESTS.ENGAGED.graphHealthEndpoint, statusQuery, {
    subgraph,
  });
  return data.status?.chains[0].latestBlock.number;
};

const UPDATE_INTERVAL = 10000;

class GraphHealthStore {
  graphHealth: Record<string, number> = {};

  constructor() {
    this.updateGraphHealth();
  }

  public async updateGraphHealth() {
    this.graphHealth[QUESTS.ENGAGED.chainId] = await getLatestBlock(
      QUESTS.ENGAGED.graphHealthEndpoint,
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
