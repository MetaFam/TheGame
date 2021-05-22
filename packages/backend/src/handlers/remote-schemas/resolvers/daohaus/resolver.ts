import * as daoHausClients from '../../../../lib/daoHausClient';
import { Member, QueryResolvers } from '../../autogen/types';

export const getDaoHausMemberships: QueryResolvers['getDaoHausMemberships'] = async (
  _,
  { memberAddress },
) => {
  if (!memberAddress) return [];

  const res = await Promise.all([
    daoHausClients.mainnet.GetDaoHausMemberships({ memberAddress }),
    daoHausClients.polygon.GetDaoHausMemberships({ memberAddress }),
    daoHausClients.xdai.GetDaoHausMemberships({ memberAddress }),
  ]);

  // TODO should map network name onto this somehow

  const members: Member[] = res.reduce(
    (allMembers, network) => [...allMembers, ...network.members],
    <Member[]>[],
  );

  return members;
};
