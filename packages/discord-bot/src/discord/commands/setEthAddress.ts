import { Command, CommandMessage } from '@typeit/discord';
import { sourcecred as sc } from 'sourcecred';

import { loadSourceCredLedger, manager } from '../../sourcecred';

const addressUtils = sc.plugins.ethereum.utils.address;

export abstract class SetEthAddress {
  @Command('!setAddress :ethAddress')
  async setAddress(message: CommandMessage) {
    const res = await loadSourceCredLedger();

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

    let ethAddress: string;
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

    const account = manager.ledger.account(baseIdentityId);

    const existing = account.identity.aliases.find((alias) => {
      const parts = sc.core.graph.NodeAddress.toParts(alias.address);
      return parts.indexOf('ethereum') > 0;
    });

    if (existing) {
      await message.reply(
        `You already have linked the following ETH Address: \`${existing.description}\`.`,
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
}
