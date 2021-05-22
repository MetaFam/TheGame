import { clientFactory } from '../../../../lib/daoHausClient';
import { Member, QueryResolvers } from '../../autogen/types';

const addChain = (memberAddress: string) => async (chain: string) => {
  const client = clientFactory(chain);
  const members = <Member[]>(
    (await client.GetDaoHausMemberships({ memberAddress })).members
  );

  return members.map((member: Member) => {
    const updatedMember: Member = { ...member };
    updatedMember.moloch.chain = chain;
    return updatedMember;
  });
};

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
