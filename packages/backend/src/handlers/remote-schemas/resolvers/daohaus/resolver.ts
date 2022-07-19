import { fetch, imageLink } from '@metafam/utils';
import { client } from 'lib/hasuraClient';

import { CONFIG } from '../../../../config';
import { getClient } from '../../../../lib/daoHausClient';
import { DaoMetadata, Member, QueryResolvers } from '../../autogen/types';

const addChain = (memberAddress: string) => async (chain: string) => {
  const daohausClient = getClient(chain);
  const members = <Member[]>(
    (await daohausClient.GetDaoHausMemberships({ memberAddress })).members
  );

  const metadataForDaos = await Promise.all(
    members.map(async ({ moloch: { id } }) => {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const syncDaoMemberships = async (ethAddress: string, members: Member[]) => {
  // First, find all Members that don't have an associated Dao (by contract address) in our database.
  // Insert that dao metadata plus a dao_player record for the current player
  const { dao: existingDaos } = await client.GetDaosByAddress({
    contractAddress: members.map((m) => m.memberAddress),
  });
  const daosToAdd = members.filter(
    (m) =>
      !existingDaos.some(
        (dao) =>
          dao.contractAddress === m.memberAddress &&
          dao.network === m.moloch.chain,
      ),
  );
  console.log(daosToAdd);

  // Then, find all DAOs that the player with the given eth address belongs to.
  // Gather a list of dao addresses NOT in the members list. This means they're no longer a member and must be removed.
  const { dao_player: currentMemberDaos } = await client.GetPlayerDaos({
    ethereumAddress: ethAddress,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  console.log(currentMemberDaos);

  // Finally, insert dao_player records for the remaining DAOs that the given player does not already belong to
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

    // cache results in dao_player table
    syncDaoMemberships(memberAddress, members);

    return members;
  };
