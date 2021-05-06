import { Constants } from "@metafam/utils";
import { Command, CommandMessage } from "@typeit/discord";
import { MessageEmbed, Snowflake } from "discord.js";
import fetch from "node-fetch";
import { SCAccount, SCAccountsData, SCAlias, sourcecred as sc } from "sourcecred";

import { getDiscordId, replyWithUnexpectedError } from "../../utils";

export class GetXpCommand {
  // todo rename to xp once previous bot is disabled
  @Command('getxp :discordUser')
  async getXp(message: CommandMessage) {
    let targetUserDiscordId = '';
    try {
      if (message.args.discordUser) {
        targetUserDiscordId = getDiscordId(message.args.discordUser);
      } else if (message.member?.id ) {
        targetUserDiscordId = message.member.id;
      }
    } catch (e) {
      await message.reply(`Could not recognize user ${message.args.discordUser}. Try \`!ac help\` if you need help.`);
      return;
    }

    if (targetUserDiscordId.trim().length === 0) {
      await message.reply(`Could not recognize user. Try \`!ac help\` if you need help.`);
      return;
    }

    const discordUser = message.guild?.members.cache.get(targetUserDiscordId);

    try {
      const accountsData: SCAccountsData = await (
        await fetch(Constants.SC_ACCOUNTS_FILE)
      ).json();

      const scAccount = accountsData.accounts.find(account => filterAccount(account, targetUserDiscordId));
      if (scAccount != null) {
        const userTotalCred = scAccount.totalCred;
        const lengthArray = scAccount.cred.length;
        const userWeeklyCred = scAccount.cred;
        const variation =
          (100 * (userWeeklyCred[lengthArray - 1] - userWeeklyCred[lengthArray - 2])) /
          userWeeklyCred[lengthArray - 2];

        const description = message.member?.id === targetUserDiscordId ?
          `${discordUser}, here is your XP progression in MetaGame` :
          `Here is the XP progression of ${discordUser} in MetaGame`;

        await message.reply(new MessageEmbed()
          .setColor('#ff3864')
          .setDescription(description) 
          .setTitle(`MetaGame XP Ledger`)
          .setURL("https://xp.metagame.wtf/#/explorer") 
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
              value: `${userWeeklyCred[lengthArray - 1].toPrecision(3)} XP`,
              inline: true,
            },
            {
              name: 'Week before',
              value: `${userWeeklyCred[lengthArray - 2].toPrecision(4)} XP`,
              inline: true,
            },
            {
              name: 'Weekly Change',
              value: `${variation.toPrecision(2)}%`,
              inline: true,
            },
          )
          .setFooter(
            'Bot made by MetaFam',
            'https://wiki.metagame.wtf/img/mg-crystal.png',
          ),
        );
      } else {
        await message.reply(`I couldn't find ${discordUser} in the ledger! Have you registered yet?`)
      }
    }
    catch (e) {
      await replyWithUnexpectedError(message);
    }
  }
}

const filterAccount = (player: SCAccount, targetUserDiscordID: Snowflake) => {
  const { account: accountInfo } = player;
  // Ignore if the target isn't a USER
  if (accountInfo.identity.subtype !== 'USER') return false;

  const discordAlias = accountInfo.identity.aliases.filter(
    alias => {
      const parts = sc.core.graph.NodeAddress.toParts(alias.address);
      return parts.indexOf('discord') > 0
    });

  if (discordAlias.length >= 1) {
    // Retrieve the Discord ID
    const discordId = discordAlias.find(discordAccount => filterMultipleDiscordAccounts(discordAccount, targetUserDiscordID));
    if (discordId !== undefined){
      return accountInfo;
    }
  }
  return false;
}

const filterMultipleDiscordAccounts = (discordAccount: SCAlias, targetUserDiscordID: Snowflake) => {
  const discordId = sc.core.graph.NodeAddress.toParts(discordAccount.address)[4];
  if (discordId === targetUserDiscordID) {
    return discordId;
  }
  return undefined;
}
