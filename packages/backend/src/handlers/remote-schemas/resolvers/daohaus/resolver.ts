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

    if (!member.moloch.title)
      updatedMember.moloch.title = `Unknown ${chain} DAO`;

    return updatedMember;
  });
};

export const getDaoHausMemberships: QueryResolvers['getDaoHausMemberships'] = async (
  _,
  { memberAddress },
) => {
  if (!memberAddress) return [];

  const membershipsOn = addChain(memberAddress);

  const memberships = await Promise.all([
    membershipsOn('ethereum'),
    membershipsOn('polygon'),
    membershipsOn('xdai'),
  ]);

  const members: Member[] = memberships.reduce(
    (allMembers, chainMembers) => [...allMembers, ...chainMembers],
    <Member[]>[],
  );

  return members;
};
