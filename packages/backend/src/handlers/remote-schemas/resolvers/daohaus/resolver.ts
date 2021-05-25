import { clients } from '../../../../lib/daoHausClient';
import { Member, QueryResolvers } from '../../autogen/types';

const addChain = (memberAddress: string) => (chain: string) =>
  clients[chain]
    .GetDaoHausMemberships({ memberAddress })
    .then((members: Member[]) => {
      members.map((member: Member) => {
        const updatedMember: Member = { ...member };
        updatedMember.moloch.chain = chain;
        return updatedMember;
      });
    });

export const getDaoHausMemberships: QueryResolvers['getDaoHausMemberships'] = async (
  _,
  { memberAddress },
) => {
  if (!memberAddress) return [];

  const membershipsOn = addChain(memberAddress);

  const res = await Promise.all([
    membershipsOn('ethereum'),
    membershipsOn('polygon'),
    membershipsOn('xdai'),
  ]);

  const members: Member[] = res.reduce(
    (allMembers, networkMembers) => [...allMembers, ...networkMembers],
    <Member[]>[],
  );

  return members;
};
