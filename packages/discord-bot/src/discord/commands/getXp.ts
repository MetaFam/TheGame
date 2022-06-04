import { Constants, fetch } from '@metafam/utils';
import { MessageEmbed, Snowflake } from 'discord.js';
import {
  Discord,
  SimpleCommand,
  SimpleCommandMessage,
  SimpleCommandOption,
} from 'discordx';
import {
  SCAccount,
  SCAccountsData,
  SCAlias,
  sourcecred as sc,
} from 'sourcecred';

import { getDiscordId, replyWithUnexpectedError } from '../../utils';

@Discord()
export class GetXpCommand {
  @SimpleCommand('xp')
  async getXp(
    @SimpleCommandOption('discord_user', { type: 'STRING' })
    discordUserAlias: string,
    command: SimpleCommandMessage,
  ) {
    let targetUserDiscordId = '';
    const { message } = command;
    try {
      if (discordUserAlias) {
        targetUserDiscordId = getDiscordId(discordUserAlias);
      } else if (message.member?.id) {
        targetUserDiscordId = message.member.id;
      }
    } catch (e) {
      await message.reply(
        `Could not recognize user ${discordUserAlias}. Try \`!mg help\` if you need help.`,
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
            ? `Here is your XP progression in MetaGame`
            : `Here is the XP progression of ${discordUser} in MetaGame`;

        await message.reply({
          embeds: [
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
                  value: `${Math.round(userTotalCred)} XP`,
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
              .setFooter({
                text: 'Bot made by MetaFam',
                iconURL: 'https://wiki.metagame.wtf/img/mg-crystal.png',
              }),
          ],
        });
      } else {
        await message.reply(
          `I couldn't find ${discordUser} in the ledger! Have you registered yet?`,
        );
      }
    } catch (e) {
      console.error(e);
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
    return parts.includes('discord');
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
  const [, , , , discordId] = sc.core.graph.NodeAddress.toParts(
    discordAccount.address,
  );
  if (discordId === targetUserDiscordID) {
    return discordId;
  }
  return undefined;
};
