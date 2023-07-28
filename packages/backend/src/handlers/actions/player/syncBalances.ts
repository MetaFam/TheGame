import { Request, Response } from 'express';

import { queueRecache } from '../../../lib/cacheHelper.js';
import { client } from '../../../lib/hasuraClient.js';

const INVALIDATE_AFTER_DAYS = 4; // number of days after which to recache

// @todo return balance of token of player in guild
const getBalance = ({
  playerId,
  guildId,
}: {
  playerId: string;
  guildId: string;
}) => {};

// @todo only query guilds that have a token ID
export default async (req: Request, res: Response): Promise<void> => {
  const { limiter } = req.app.locals;
  const expiration = new Date();
  const invalidateAfterDays =
    req.query.invalidate_after_days != null
      ? parseInt(req.query.invalidate_after_days as string, 10)
      : INVALIDATE_AFTER_DAYS;
  expiration.setDate(expiration.getDate() - invalidateAfterDays);
  const { guild: guilds } = await client.GetGuilds();

  const members = await Promise.all(
    guilds.map(async (guild) => {
      const { guild: players } = await client.GetGuildMembers({ id: guild.id });
      return {
        players,
        guildId: guild.id,
      };
    }),
  );

  // Iterates through list of members in a guild
  await Promise.all(
    members
      .map(async ({ players, guildId }) =>
        players.map(async (player) => {
          await getBalance({ playerId: player.id, guildId });
        }),
      )
      .flat(),
  );

  /*  const ids = (
    await Promise.all(
      players.map(async ({ playerId }) => {
        const queued = await queueRecache({ playerId, limiter });
        return queued ? playerId : null;
      }),
    )
  ).filter((id) => !!id);

  res.json({ ids }); */
};
