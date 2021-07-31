import { getClient } from '../../../../lib/daoHausClient';
import { Member, QueryResolvers } from '../../autogen/types';

const addChain = (memberAddress: string) => async (chain: string) => {
  const client = getClient(chain);
  const members = <Member[]>(
    (await client.GetDaoHausMemberships({ memberAddress })).members
  );

  const ids = members.map(({ moloch: { id } }) => id);
  const { daoMetas } = await client.GetDaoHausTitles({ ids });

  const titles = Object.fromEntries(
    daoMetas.map(({ id, title }) => [id, title]),
  );

  return members.map((member: Member) => {
    const updatedMember: Member = { ...member };
    updatedMember.moloch.chain = chain;
    updatedMember.moloch.title = titles[member.moloch.id];

    return updatedMember;
  });
};

export const getDaoHausMemberships: QueryResolvers['getDaoHausMemberships'] = async (
  _,
  { memberAddress },
) => {
  if (!memberAddress) return [];

  const membershipsOn = addChain(memberAddress);

  const memberships = await Promise.allSettled([
    membershipsOn('ethereum'),
    membershipsOn('polygon'),
    membershipsOn('xdai'),
  ]);

  const members: Member[] = memberships.reduce((allMembers, chainMembers) => {
    if (chainMembers.status === 'rejected') {
      console.error('Pulling memberships failed:', chainMembers.reason);
      return allMembers;
    }

    return [...allMembers, ...chainMembers.value];
  }, <Member[]>[]);

  return members;
};
