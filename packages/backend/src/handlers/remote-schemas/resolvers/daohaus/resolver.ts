import { imageLink } from '@metafam/utils';

import { CONFIG } from '#config';
import { getClient } from '#lib/daoHausClient';
import { client } from '#lib/hasuraClient';

type DAOMetadata = {
  contractAddress: string
  network: string
  name: string
  description: string
  avatarImg?: string
}

type Moloch = {
  id: string
  summoner: string
  totalShares: string
  totalLoot: string
  chain: string
  title: string
  version: string
  avatarURL?: string
}

type Member = {
  id: string
  createdAt: string
  moloch: Moloch
  molochAddress: string
  memberAddress: string
  delegateKey: string
  shares: string
  loot: string
  exists: boolean
  kicked: boolean
}

const addChain = (memberAddress: string) => async (chain: string) => {
  const daohausClient = getClient(chain);
  const members = <Array<Member>>(
    (await daohausClient.GetDaoHausMemberships({ memberAddress })).members
  );

  const metadataForDaos = await Promise.all(
    members.map(async ({ moloch: { id } }) => {
      const response = await fetch(`${CONFIG.daoHausMetadataURL}/${id}`);
      const metadataArr = response.ok
        ? ((await response.json()) as Array<DAOMetadata>)
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

    const metadata: DAOMetadata =
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

export const syncDaoMemberships = async (
  ethAddress: string,
  members: Array<Member>,
) => {
  try {
    // First, find all Members that don't have an associated Dao (by contract address) in our database.
    // Insert that dao metadata
    let { dao: existingDaos } = await client.GetDaosByAddress({
      contractAddress: members.map((m) => m.molochAddress),
    });
    // also, ensure the network matches.  Ideally we would do this in the graphQL queries but i'm not sure
    // how to do multiple _in clauses or if that is even possible
    existingDaos = existingDaos.filter((dao) =>
      members.some(
        (m) =>
          m.molochAddress === dao.contractAddress &&
          m.moloch.chain === dao.network,
      ),
    );

    const daosToAdd = members
      .filter(
        (m) =>
          !existingDaos.some(
            (dao) =>
              dao.contractAddress === m.molochAddress &&
              dao.network === m.moloch.chain,
          ),
      )
      .map((member) => ({
        contractAddress: member.molochAddress,
        network: member.moloch.chain,
        label: member.moloch.title,
      }));

    const daoInsertResponse = await client.InsertDaos({
      objects: daosToAdd,
    });

    // Then, find all DAOs that the player with the given eth address belongs to.
    // Gather a list of dao addresses NOT in the members list. This means they're no longer a member and must be removed.
    const { dao_player: currentMemberDaos } = await client.GetPlayerDaos({
      ethereumAddress: ethAddress,
    });
    const orphanedDaoIds = currentMemberDaos
      .filter(
        (dao) =>
          !members.some(
            (m) =>
              dao.Dao.contractAddress === m.molochAddress &&
              dao.Dao.network === m.moloch.chain,
          ),
      )
      .map((d) => d.daoId);

    if (orphanedDaoIds.length > 0) {
      await client.RemovePlayerFromDaos({
        playerEthAdress: ethAddress,
        daoIds: orphanedDaoIds,
      });
    }

    // Finally, insert dao_player records for the remaining DAOs that the given player does not already belong to.
    // This could include just-inserted-daos as well as existing ones
    const getPlayerResponse = await client.GetPlayerFromETH({
      ethereumAddress: ethAddress,
    });

    const newDaoMembershipIds = existingDaos.map((dao) => dao.id);
    if (daoInsertResponse.insert_dao != null) {
      newDaoMembershipIds.push(
        ...daoInsertResponse.insert_dao.returning.map((dao) => dao.id),
      );
    }
    if (
      getPlayerResponse.player.length === 1 &&
      newDaoMembershipIds.length > 0
    ) {
      const playerId = getPlayerResponse.player[0].id;
      const daoMembersToInsert = newDaoMembershipIds.map((daoId) => ({
        daoId,
        playerId,
      }));
      await client.UpsertDaoMembers({ objects: daoMembersToInsert });
    }
  } catch (e) {
    console.error('An error occurred in syncDaoMemberships:');
    console.error(e);
  }
};

export const getDaoHausMemberships =
  async (_: unknown, { memberAddress }: { memberAddress: string }) => {
    if (!memberAddress) return [];

    const membershipsOn = addChain(memberAddress);

    const memberships = await Promise.allSettled([
      membershipsOn('ethereum'),
      // Graphs for these chains are not currently defined
      // membershipsOn('polygon'),
      // membershipsOn('xdai'),
    ]);

    const members: Array<Member> = memberships.reduce((allMembers, chainMembers) => {
      if (chainMembers.status === 'rejected') {
        console.warn('Pulling memberships failed:', chainMembers.reason);
        return allMembers;
      }

      return [...allMembers, ...chainMembers.value];
    }, <Array<Member>>[]);

    // cache results in dao_player table. Don't block
    if (process.env.NODE_ENV !== 'test') {
      syncDaoMemberships(memberAddress, members);
    }

    return members;
  };
