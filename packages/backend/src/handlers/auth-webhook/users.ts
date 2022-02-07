import { client } from '../../lib/hasuraClient';

async function createPlayer(ethAddress: string) {
  const { insert_profile: insert } = await client.CreatePlayerFromETH({
    ethereumAddress: ethAddress,
  });
  if (insert?.affected_rows !== 2) {
    throw new Error(
      `Affected ${insert?.affected_rows} row${
        insert?.affected_rows !== 1 ? 's' : ''
      } inserting ${ethAddress}.`,
    );
  }
  return { id: insert?.returning[0].player.id };
}

const status: Record<string, string> = {};

/* When a profile page loads, this method can get called repeatedly
 * quickly enough that multiple processes enter createAccount, and
 * all but the fastest will fail the uniqueness check on ETH address.
 */
export async function getOrCreatePlayerId(ethereumAddress: string) {
  const ethAddress = ethereumAddress.toLowerCase();
  const {
    player: [existing],
  } = await client.GetPlayerFromETH({
    ethereumAddress: ethAddress,
  });
  let { id } = existing ?? {};

  if (!id) {
    if (status[ethAddress] != null) {
      let count = 0;
      while (!['created', 'failed'].includes(status[ethAddress])) {
        // eslint-disable-next-line no-await-in-loop, @typescript-eslint/no-loop-func
        await new Promise((resolve) => {
          const wait = Math.random() * 20 * ++count;
          console.info(`Waiting ${wait} on ${ethAddress} account creation.`);
          setTimeout(resolve, wait);
        });
      }
    } else {
      try {
        status[ethAddress] = 'creating';
        console.info(`Account Creation: ${ethAddress}`);
        ({ id } = await createPlayer(ethAddress));
        status[ethAddress] = 'created';
      } catch (err) {
        console.error(
          `Account Creation Failed: ${ethAddress} (${(err as Error).message})`,
        );
      }
    }

    if (!id) {
      const {
        player: [created],
      } = await client.GetPlayerFromETH({
        ethereumAddress: ethAddress,
      });
      ({ id } = created ?? {});
    }
  }

  return id;
}
