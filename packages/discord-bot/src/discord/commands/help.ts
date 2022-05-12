import { Discord, SimpleCommand, SimpleCommandMessage } from 'discordx';

const helpContent = `
Available MetaGameBot commands:

- !mg setAddress <ethAddress> [force] → Links your Discord account with the provided Ethereum address. Appending _force_ to the end signifies that you'd like to overwrite an existing account. Note that MyMeta profiles are tied to a given ethereum address, so if you replace it you'll have to create a new MyMeta profile.

- !mg addAlias <platform> <username> → Links your Discord account with the given identifier on the given platform, so that activities by this user can earn you XP. Supported platforms: github, discourse.  Note that Discord will be linked to your username automatically.

- !mg xp [@discordUser#1223] → Displays XP stats for the given Discord user. If no user is provided, _your_ XP is displayed.

- !mg help → This command.
`;

@Discord()
export class HelpCommand {
  @SimpleCommand('help')
  async getXp(command: SimpleCommandMessage) {
    await command.message.reply(helpContent);
  }
}
