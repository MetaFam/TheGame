import {
  Discord,
  SimpleCommand,
  SimpleCommandMessage,
  SimpleCommandOption,
} from 'discordx';
import { sourcecred as sc } from 'sourcecred';

import { loadSourceCredLedger } from '../../sourcecred';

const addressUtils = sc.plugins.ethereum.utils.address;

@Discord()
export abstract class SetEthAddress {
  @SimpleCommand('setAddress')
  async setAddress(
    @SimpleCommandOption('eth_address', { type: 'STRING' })
    ethAddressInput: string,
    @SimpleCommandOption('force', { type: 'STRING' })
    force: string | undefined,
    command: SimpleCommandMessage,
  ) {
    const res = await loadSourceCredLedger();
    const { result: reloadResult, manager } = res;
    const { message } = command;

    if (reloadResult.error) {
      await message.reply(`Error Loading Ledger: ${reloadResult.error}`);
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
      ethAddress = addressUtils.parseAddress(ethAddressInput);
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

    const shouldForceUpdate = force === 'force';

    if (latestEthAlias && !shouldForceUpdate) {
      await message.reply(
        `You already have linked the following ETH Address: \`${latestEthAlias.description}\`. Are you sure you want to update it? Warning: This cannot be undone and you will have to recreate your MyMeta profile!

To force update your address, type \`!mg setAddress ${ethAddress} force\`.
        `,
      );
      return;
    }

    try {
      manager.ledger.addAlias(baseIdentityId, ethAlias);
      // don't activate yet; only Players should be able to receive SEEDs
      // and they must be manually activated at mint-time
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
      console.error(e);
      await message.reply(`Unable to link address: ${(e as Error).message}`);
    }
  }
}
