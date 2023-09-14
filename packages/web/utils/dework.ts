export interface DeworkReward {
  amount?: string;
  token: {
    address?: string;
    network?: {
      slug?: string;
    };
  };
}

export interface DeworkTag {
  label?: string;
}

export interface DeworkTask {
  tags?: DeworkTag[];
  rewards?: DeworkReward[];
  workspace?: {
    name?: string;
    organization?: {
      name?: string;
      permalink?: string;
    };
    permalink?: string;
  };
}

export interface DeworkData {
  address?: string;
  tasks?: DeworkTask[];
}

export interface Organisation {
  name: string;
  permalink: string;
}

// usdc on all chains, needed to calculate earnings
// ['ETH', 'POLYGON', 'OPTIMISM']
const usdcTokens6Decimals = [
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
];

// ['SUPERFLUID-USDCX-polygon', 'IbAlluoUSDC-polygon', 'DAI Polygon', 'DAI mainnet']
const usdTokens18Decimals = [
  '0xcaa7349cea390f89641fe306d93591f87595dc1f',
  '0xc2dbaaea2efa47ebda3e572aa0e55b742e408bf6',
  '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
  '0x6b175474e89094c44da98b954eedeac495271d0f',
];

// ['SEED on polygon', 'SEED on Mainnet']
const seedTokens = [
  '0xeaecc18198a475c921b24b8a6c1c1f0f5f3f7ea0',
  '0x30cf203b48edaa42c3b4918e955fed26cd012a3f',
];

export const processDeworkData = (data: DeworkData) => {
  const organisations: Organisation[] = [];
  const tags: string[] = [];
  // gotta do USDC to avoid having to use apis like coingecko n stuff
  let totalEarnedInUSDC = 0;
  let totalSEEDsEarned = 0;

  // get relevant data
  data?.tasks?.forEach((element: DeworkTask) => {
    element?.tags?.forEach((tag: DeworkTag) => {
      if (!tag.label) return;
      tags.push(tag.label);
    });
    // get orgs
    organisations.push({
      name: element?.workspace?.organization?.name ?? '',
      permalink: element?.workspace?.organization?.permalink ?? '',
    });
    // get usdc rewards
    element?.rewards?.forEach(({ token, amount }) => {
      if (!token.address) return;
      if (
        usdcTokens6Decimals.includes(token.address?.toLowerCase()) &&
        amount
      ) {
        totalEarnedInUSDC += Number(amount) / 10 ** 6;
      }
      if (
        usdTokens18Decimals.includes(token.address?.toLowerCase()) &&
        amount
      ) {
        totalEarnedInUSDC += Number(amount) / 10 ** 18;
      }
      if (seedTokens.includes(token?.address?.toLowerCase()) && amount) {
        totalSEEDsEarned += Number(amount) / 10 ** 18;
      }
    });
  });
  // extract
  const uniqueTags = [...new Set(tags)];

  // get tag grouping
  const tagGrouping = uniqueTags.map((tag) => ({
    name: tag,
    count: tags.filter((t) => t === tag).length,
  }));

  // extract unique organisations' links and names
  const uniqueOrganisations: Organisation[] = [];
  organisations.forEach((org: Organisation) => {
    if (
      !uniqueOrganisations.some(
        (y) => JSON.stringify(y) === JSON.stringify(org),
      )
    ) {
      uniqueOrganisations.push(org);
    }
  });

  return {
    uniqueTags,
    uniqueOrganisations,
    totalEarnedInUSDC,
    totalSEEDsEarned,
    tagGrouping,
  };
};

export const getDeworkData = (userAddress: string) => {
  const deworkData = fetch(
    `https://api.deworkxyz.com/v1/reputation/${userAddress}`,
  ).then((res) => res.json());

  return deworkData;
};
