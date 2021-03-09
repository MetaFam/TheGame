import { BigNumber } from 'ethers';
import gql from 'fake-tag';

import {
  GetPatronsQuery,
  GetPatronsQueryVariables,
  PlayerFragmentFragment,
} from './autogen/types';
import { client } from './client';
import { PlayerFragment } from './fragments';

const patronsQuery = gql`
  query GetPatrons($offset: Int) {
    player(
      where: { ethereum_address: { _neq: "" }, total_xp: { _gt: 0 } }
      limit: 50
      offset: $offset
    ) {
      ...PlayerFragment
    }
  }
  ${PlayerFragment}
`;

export const getPatronsWithOffset = async (
  offset = 0,
): Promise<Array<PlayerFragmentFragment>> => {
  const { data, error } = await client
    .query<GetPatronsQuery, GetPatronsQueryVariables>(patronsQuery, {
      offset,
    })
    .toPromise();

  if (!data) {
    if (error) {
      throw error;
    }

    return [];
  }

  return data.player;
};

const pSeedDescSort = (
  playerA: PlayerFragmentFragment,
  playerB: PlayerFragmentFragment,
) => {
  const balanceA = BigNumber.from(playerA.token_balance?.pSeedBalance || 0);
  const balanceB = BigNumber.from(playerB.token_balance?.pSeedBalance || 0);

  if (balanceA.lt(balanceB)) {
    return 1;
  } if (balanceA.gt(balanceB)) {
    return -1;
  } 
    return 0;
  
};

export const getPatrons = async () => {
  let patrons: Array<PlayerFragmentFragment> = [];
  let page = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
  // eslint-disable-next-line no-await-in-loop
    const offsettedPatrons = await getPatronsWithOffset(page * 50);
    patrons = offsettedPatrons.concat(patrons);
    if (offsettedPatrons.length < 50) break;
    page += 1;
  }

  return patrons
    .filter((p) => BigNumber.from(p.token_balance?.pSeedBalance || 0).gt(0))
    .sort(pSeedDescSort)
    .slice(0, 50);
};
