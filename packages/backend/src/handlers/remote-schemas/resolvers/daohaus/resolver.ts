import * as dhClients from '../../../../lib/daoHausClient';
import { Member, QueryResolvers } from '../../autogen/types';

const withChain = (chain: string, members: Member[]) =>
  members.map((member: Member) => {
    const updatedMember: Member = { ...member };
    updatedMember.moloch.chain = chain;
    return updatedMember;
  });

export const getDaoHausMemberships: QueryResolvers['getDaoHausMemberships'] = async (
  _,
  { memberAddress },
) => {
  if (!memberAddress) return [];

  const res = await Promise.all([
    withChain(
      'ethereum',
      <Member[]>(
        (await dhClients.mainnet.GetDaoHausMemberships({ memberAddress }))
          .members
      ),
    ),
    withChain(
      'polygon',
      <Member[]>(
        (await dhClients.polygon.GetDaoHausMemberships({ memberAddress }))
          .members
      ),
    ),
    withChain(
      'xdai',
      <Member[]>(
        (await dhClients.xdai.GetDaoHausMemberships({ memberAddress })).members
      ),
    ),
  ]);

  const members: Member[] = res.reduce(
    (allMembers, networkMembers) => [...allMembers, ...networkMembers],
    <Member[]>[],
  );

  return members;
};
