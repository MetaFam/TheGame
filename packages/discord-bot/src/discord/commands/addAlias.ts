import {
  Discord,
  SimpleCommand,
  SimpleCommandMessage,
  SimpleCommandOption,
} from 'discordx';
import { Alias, sourcecred as sc } from 'sourcecred';

import { CONFIG } from '../../config';
import { loadSourceCredLedger, resetLedger } from '../../sourcecred';
import { replyWithUnexpectedError } from '../../utils';

const supportedPlatforms = ['github', 'discourse'];
const errorSupportedPlatforms = `Supported platforms: ${supportedPlatforms.join(
  ', ',
)}.`;

@Discord()
export class AddAlias {
  @SimpleCommand('addAlias')
  async addAlias(
    @SimpleCommandOption('platform', { type: 'STRING' }) platform: string,
    @SimpleCommandOption('id', { type: 'STRING' }) platformId: string,
    command: SimpleCommandMessage,
  ) {
    const res = await loadSourceCredLedger();
    const { result: reloadResult, manager } = res;
    const { message } = command;

    if (reloadResult.error) {
      await message.reply(`Error Loading Ledger: ${reloadResult.error}`);
      return;
    }

    if (!platformId || !platform) {
      await message.reply(
        `Usage: addAlias <platform> <id>.\n\n${errorSupportedPlatforms}`,
      );
      return;
    }

    let alias: Alias;
    let sanitizedId: string;

    // parse and validate platform arg
    const trimmedPlatform = platform.trim().toLowerCase();

    if (trimmedPlatform === 'github') {
      // standardize and sanitize input
      sanitizedId = platformId
        .trim()
        .toLowerCase()
        // Sanitize: Github allows alphanumeric characters plus -
        .replace(/[^0-9a-z-]/, '');
      const rawAddress = sc.plugins.github.nodes.loginAddress(sanitizedId);

      alias = {
        // Ideally, we can use the SourceCred API to generate this description, but it's
        // not currently exposed in a useful way for this use case
        description: `github/[@${sanitizedId}](https://github.com/${sanitizedId})`,
        address: rawAddress,
      };
    } else if (trimmedPlatform === 'discourse') {
      sanitizedId = platformId
        .trim()
        // Sanitize: Discourse allows alphanumeric characters plus -_.
        .replace(/[^0-9a-zA-Z-_.]/, '');
      const rawAddress = sc.plugins.discourse.address.userAddress(
        CONFIG.discourseInstanceUrl,
        sanitizedId,
      );
      alias = {
        // Ideally, we can use the SourceCred API to generate this description, but it's
        // not currently exposed in a useful way for this use case
        description: `discourse/[@${sanitizedId}](${CONFIG.discourseInstanceUrl}/u/${sanitizedId}/)`,
        address: rawAddress,
      };
    } else {
      await message.reply(`Invalid platform.\n\n${errorSupportedPlatforms}`);
      return;
    }

    try {
      // we need to make sure this discord user already exists in the ledger.
      const baseIdentityProposal = sc.plugins.discord.utils.identity.createIdentity(
        message.member,
      );
      const existingIdentity = manager.ledger.accountByAddress(
        baseIdentityProposal.alias.address,
      );
      // Fail if no account exists yet for this discord user
      if (!existingIdentity) {
        await message.reply(
          'Could not find an identity linked to your user. Please use the !mg setAddress command first.',
        );
        return;
      }

      // ensure that this user has not already added an alias for this platform
      const addressModule = sc.core.address.makeAddressModule({
        name: 'NodeAddress',
        nonce: 'N',
      });
      const platformAlias = existingIdentity.identity.aliases.find(
        (existingAlias) => {
          const parts = addressModule.toParts(existingAlias.address);
          console.log(parts);
          return parts[1] === trimmedPlatform;
        },
      );
      console.log(platformAlias);
      if (platformAlias != null) {
        const parts = addressModule.toParts(platformAlias.address);
        const existingPlatformIdentifier = parts[parts.length - 1];
        if (sanitizedId === existingPlatformIdentifier) {
          await message.reply('You have already linked this account!');
        } else {
          await message.reply(
            `You have already linked a ${trimmedPlatform} account: ${existingPlatformIdentifier}.`,
          );
        }
        return;
      }

      // ensure nobody else is already using this alias
      const linkedAccount = manager.ledger.accountByAddress(alias.address);

      if (linkedAccount) {
        await message.reply(
          `This account is already linked to ${linkedAccount.identity.name}.`,
        );
        return;
      }

      manager.ledger.addAlias(existingIdentity.identity.id, alias);
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        persistRes.localChanges.forEach((change: any) => {
          console.error(change.action);
        });

        // ledger may be in a bad state, throw away these local changes
        resetLedger();
        return;
      }

      await message.reply(
        `Successfully added ${trimmedPlatform} alias: ${sanitizedId}.`,
      );
    } catch (e) {
      console.error(e);
      await replyWithUnexpectedError(message);
    }
  }
}
