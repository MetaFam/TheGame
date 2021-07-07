import { CacheProcessOutput } from '../../../../lib/autogen/hasura-sdk';
import { client } from '../../../../lib/hasuraClient';
import { updateCachedProfile } from '../cache3BoxProfile/updateCachedProfile';

export async function cache3BoxProfiles(): Promise<CacheProcessOutput> {
  const data = await client.GetPlayerIds();
  const ids = data.player.map(({ id }) => id);

  try {
    await Promise.all(ids.map((id) => updateCachedProfile(id)));
  } catch (err) {
    return { success: false, error: err.message };
  }

  return { success: true, error: null };
}
