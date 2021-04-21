import { Command, CommandMessage, Discord } from '@typeit/discord';
import { sourcecred as sc } from 'sourcecred';

import { CONFIG } from './config';
import { getDiscordId } from './utils';

export const storage = new sc.ledger.storage.GithubStorage({
  apiToken: CONFIG.githubApiToken,
  repo: 'MetaFam/XP',
  branch: 'master',
});

const manager = new sc.ledger.manager.LedgerManager({
  storage,
});

const ledgerLoadedPromise = manager.reloadLedger();

const addressUtils = sc.plugins.ethereum.utils.address;

@Discord('!')
export abstract class AppDiscord {
  // @Command('setAddress :ethAddress')
  async setAddress(message: CommandMessage) {
    const res = await ledgerLoadedPromise;

    if (res.error) {
      await message.reply(`Error Loading Ledger: ${res.error}`);
      return;
    }

    const baseIdentityProposal = sc.plugins.discord.utils.identity.createIdentity(
      message.member,
    );
    const baseIdentityId = sc.ledger.utils.ensureIdentityExists(
      manager.ledger,
      baseIdentityProposal,
    );

    let ethAddress;
    try {
      ethAddress = addressUtils.parseAddress(message.args.ethAddress);
    } catch (e) {
      await message.reply(`Invalid ETH Address.`);
      return;
    }

    const ethAlias = {
      address: addressUtils.nodeAddressForEthAddress(ethAddress),
      description: ethAddress,
    };

    const linkedAccount = manager.ledger.accountByAddress(ethAlias.address);

    if (linkedAccount) {
      await message.reply(
        `This ETH address is already linked to ${linkedAccount.identity.name}.`,
      );
      return;
    }

    try {
      manager.ledger.addAlias(baseIdentityId, ethAlias);
      manager.ledger.activate(baseIdentityId);
      const persistRes = await manager.persist();

      if (persistRes.error) {
        await message.reply(
          `Error Updating Ledger: ${
            persistRes.error
          }.\n\n ${persistRes.localChanges
            .map((c: any) => JSON.stringify(c.action))
            .join('\n')}`,
        );
        return;
      }

      await message.reply(
        'Successfully linked ETH Address and activated account',
      );
    } catch (e) {
      await message.reply(`Unable to link address: ${e.message}`);
    }
  }

  // todo rename to xp once previous bot is disabled
  @Command('getxp :discordUser')
  async getXp(message: CommandMessage) {
    try {
      // need to test, are args already whitespace-stripped?
      // no argument should be supported as well
      const targetUserDiscordId = getDiscordId(message.args.discordUser);
      // eslint-disable-next-line no-console
      console.log(targetUserDiscordId);
    } catch (e) {
      await message.reply(`Could not recognize user ${message.args.discordUser}. Try \`!ac help\` if you need help.`);
    }

  }
}
