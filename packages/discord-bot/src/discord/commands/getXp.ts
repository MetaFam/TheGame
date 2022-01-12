import { Constants } from '@metafam/utils';
import { Command, CommandMessage } from '@typeit/discord';
import { MessageEmbed, Snowflake } from 'discord.js';
import fetch from 'node-fetch';
import {
  SCAccount,
  SCAccountsData,
  SCAlias,
  sourcecred as sc,
} from 'sourcecred';

import { getDiscordId, replyWithUnexpectedError } from '../../utils';

export class GetXpCommand {
  @Command('!mg xp :discordUser')
  async getXp(message: CommandMessage) {
    let targetUserDiscordId = '';
    try {
      if (message.args.discordUser) {
        targetUserDiscordId = getDiscordId(message.args.discordUser);
      } else if (message.member?.id) {
        targetUserDiscordId = message.member.id;
      }
    } catch (e) {
      await message.reply(
        `Could not recognize user ${message.args.discordUser}. Try \`!mg help\` if you need help.`,
      );
      return;
    }

    if (targetUserDiscordId.trim().length === 0) {
      await message.reply(
        `Could not recognize user. Try \`!mg help\` if you need help.`,
      );
      return;
    }

    const discordUser = message.guild?.members.cache.get(targetUserDiscordId);

    try {
      const accountsResult = await fetch(Constants.SC_ACCOUNTS_FILE);
      const accountsData = (await accountsResult.json()) as SCAccountsData;

      const scAccount = accountsData.accounts.find((account) =>
        filterAccount(account, targetUserDiscordId),
      );
      if (scAccount != null) {
        const userTotalCred = scAccount.totalCred;
        const numWeeks = scAccount.cred.length;
        const userWeeklyCred = scAccount.cred;

        const variation =
          (100 *
            (userWeeklyCred[numWeeks - 1] - userWeeklyCred[numWeeks - 2])) /
          userWeeklyCred[numWeeks - 2];

        const description =
          message.member?.id === targetUserDiscordId
            ? `${discordUser}, here is your XP progression in MetaGame`
            : `Here is the XP progression of ${discordUser} in MetaGame`;

        await message.reply(
          new MessageEmbed()
            .setColor('#ff3864')
            .setDescription(description)
            .setTitle(`MetaGame XP`)
            .setURL('https://xp.metagame.wtf/#/explorer')
            .setTimestamp()
            .setThumbnail(
              'https://raw.githubusercontent.com/sourcecred/sourcecred/master/src/assets/logo/rasterized/logo_64.png',
            )
            .addFields(
              {
                name: 'Total',
                value: `${Math.round(userTotalCred).toLocaleString()} XP`,
                inline: true,
              },
              {
                name: 'Last week ',
                value: `${userWeeklyCred[numWeeks - 1].toPrecision(3)} XP`,
                inline: true,
              },
              {
                name: 'Week before',
                value: `${userWeeklyCred[numWeeks - 2].toPrecision(4)} XP`,
                inline: true,
              },
              {
                name: 'Weekly Change',
                value: `${Math.round(variation)}%`,
                inline: true,
              },
            )
            .setFooter(
              'Bot made by MetaFam',
              'https://wiki.metagame.wtf/img/mg-crystal.png',
            ),
        );
      } else {
        await message.reply(
          `I couldn't find ${discordUser} in the ledger! Have you registered yet?`,
        );
      }
    } catch (e) {
      await replyWithUnexpectedError(message);
    }
  }
}

const filterAccount = (player: SCAccount, targetUserDiscordID: Snowflake) => {
  const { account: accountInfo } = player;
  // Ignore if the target isn't a USER
  if (accountInfo.identity.subtype !== 'USER') return false;

  const discordAliases = accountInfo.identity.aliases.filter((alias) => {
    const parts = sc.core.graph.NodeAddress.toParts(alias.address);
    return parts.indexOf('discord') > 0;
  });

  if (discordAliases.length >= 1) {
    // Retrieve the Discord ID
    const discordId = discordAliases.find((discordAccount) =>
      scAliasMatchesDiscordId(discordAccount, targetUserDiscordID),
    );
    if (discordId !== undefined) {
      return accountInfo;
    }
  }
  return false;
};

const scAliasMatchesDiscordId = (
  discordAccount: SCAlias,
  targetUserDiscordID: Snowflake,
) => {
  const discordId = sc.core.graph.NodeAddress.toParts(
    discordAccount.address,
  )[4];
  if (discordId === targetUserDiscordID) {
    return discordId;
  }
  return undefined;
};
