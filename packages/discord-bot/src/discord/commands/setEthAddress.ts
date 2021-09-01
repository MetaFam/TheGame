import { Command, CommandMessage } from '@typeit/discord';
import { sourcecred as sc } from 'sourcecred';

import { loadSourceCredLedger, manager } from '../../sourcecred';

const addressUtils = sc.plugins.ethereum.utils.address;

type SetEthAddressArgs = {
  ethAddress: string;
  force: string;
};

export abstract class SetEthAddress {
  @Command('!setAddress :ethAddress :force')
  async setAddress(message: CommandMessage<SetEthAddressArgs>) {
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

    const existingEthAliases = account.identity.aliases.filter((alias) => {
      const parts = sc.core.graph.NodeAddress.toParts(alias.address);
      return parts.indexOf('ethereum') > 0;
    });

    const latestEthAlias = existingEthAliases[existingEthAliases.length - 1];

    const shouldForceUpdate = message.args.force === 'force';

    if (latestEthAlias && !shouldForceUpdate) {
      await message.reply(
        `You already have linked the following ETH Address: \`${latestEthAlias.description}\`. Are you sure you want to update it? Warning: This cannot be undone and you will have to recreate your MyMeta profile!

To force update your address, type \`!setAddress ${ethAddress} force\`.
        `,
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((c: any) => JSON.stringify(c.action))
            .join('\n')}`,
        );
        return;
      }

      await message.reply(
        'Successfully linked ETH Address and activated account',
      );
    } catch (e) {
      await message.reply(`Unable to link address: ${(e as Error).message}`);
    }
  }
}
