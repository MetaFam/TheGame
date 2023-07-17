// get tags for type of tasks completed
// get USDC earnings from tasks
// get organisations worked for
// get number of tasks for each organisation you've worked for

interface Organisation {
  name: string;
  permalink: string;
}

// usdc on all chains, needed to calculate earnings
// ['ETH', 'POLYGON', 'OPTIMISM']
const usdcTokens = [
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  '0x7f5c764cbc14f9669b88837ca1490cca17c31607,',
];

export const processDeworkData = (data: any) => {
  const organisations: Organisation[] = [];
  const tags: string[] = [];
  // gotta do USDC to avoid having to use apis like coingecko n stuff
  let totalEarnedInUSDC = 0;
  // get relevant data
  data?.tasks?.forEach((element: any) => {
    element?.tags?.forEach((tag: { label: string }) => {
      tags.push(tag.label);
    });
    // get orgs
    organisations.push({
      name: element?.workspace?.organization?.name,
      permalink: element?.workspace?.organization?.permalink,
    });
    // get usdc rewards
    element.rewards.forEach(
      (reward: { amount: string; token: { address: string } }) => {
        if (usdcTokens.includes(reward.token.address)) return;
        totalEarnedInUSDC += +reward.amount;
      },
    );
  });
  // extract
  const uniqueTags = [...new Set(tags)];

  // get tag grouping and sort by count
  const tagGrouping = uniqueTags.map((tag) => ({
      name: tag,
      count: tags.filter((t) => t === tag).length,
    }));

  // extract unique organisations' links and names
  const uniqueOrganisations: Organisation[] = [];
  organisations.forEach((org: any) => {
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
    tagGrouping,
  };
};

export const getDeworkData = (userAddress: string) => {
  const deworkData = fetch(
    `https://api.deworkxyz.com/v1/reputation/${userAddress}`,
  ).then((res) => res.json());
  return deworkData;
};
