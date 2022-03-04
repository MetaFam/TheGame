import { fetch, imageLink } from '@metafam/utils';

import { CONFIG } from '../../../../config';
import { getClient } from '../../../../lib/daoHausClient';
import { DaoMetadata, Member, QueryResolvers } from '../../autogen/types';

const addChain = (memberAddress: string) => async (chain: string) => {
  const client = getClient(chain);
  const members = <Member[]>(
    (await client.GetDaoHausMemberships({ memberAddress })).members
  );

  const metadataForDaos = await Promise.all(
    members.map(async ({ moloch: { id } }) => {
      console.log(`Fetching DAO Metadata For: ${id}`);
      const response = await fetch(`${CONFIG.daoHausMetadataUrl}/${id}`);
      const metadataArr = response.ok
        ? ((await response.json()) as DaoMetadata[])
        : [];
      return metadataArr.length > 0 ? metadataArr[0] : null;
    }),
  );

  const metadataByContract = Object.fromEntries(
    metadataForDaos
      .filter((metadata) => metadata != null)
      .map((metadata) => [metadata?.contractAddress, metadata]),
  );

  return members.map((member: Member) => {
    const updatedMember: Member = { ...member };
    updatedMember.moloch.chain = chain;

    const metadata: DaoMetadata =
      metadataByContract[updatedMember.molochAddress];

    updatedMember.moloch.title = metadata?.name;

    let imgURL = metadata?.avatarImg;
    if (imgURL?.startsWith('Qm')) {
      imgURL = `ipfs://${imgURL}`;
    }
    updatedMember.moloch.avatarURL = imageLink(imgURL);

    return updatedMember;
  });
};

export const getDaoHausMemberships: QueryResolvers['getDaoHausMemberships'] =
  async (_, { memberAddress }) => {
    if (!memberAddress) return [];

    const membershipsOn = addChain(memberAddress);

    const memberships = await Promise.allSettled([
      membershipsOn('ethereum'),
      membershipsOn('polygon'),
      membershipsOn('xdai'),
    ]);

    const members: Member[] = memberships.reduce((allMembers, chainMembers) => {
      if (chainMembers.status === 'rejected') {
        console.warn('Pulling memberships failed:', chainMembers.reason);
        return allMembers;
      }

      return [...allMembers, ...chainMembers.value];
    }, <Member[]>[]);

    return members;
  };
