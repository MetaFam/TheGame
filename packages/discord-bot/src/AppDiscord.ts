import { Command, CommandMessage, Discord } from '@typeit/discord';
import { sourcecred as sc } from 'sourcecred';

import { CONFIG } from './config';

export const storage = new sc.ledger.storage.GithubStorage(
  CONFIG.githubApiToken,
  'MetaFam/XP',
);

const manager = new sc.ledger.manager.LedgerManager({
  storage,
});

const ledgerLoadedPromise = manager.reloadLedger();

const addressUtils = sc.plugins.ethereum.utils.address;

@Discord('!')
export abstract class AppDiscord {
  @Command('setAddress :ethAddress')
  // @ts-expect-error should be allowed
  private async setAddress(message: CommandMessage) {
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
      await message.reply('Successfully linked ETH Address');
    } catch (e) {
      await message.reply(`Unable to link address: ${e.message}`);
    }
  }
}
