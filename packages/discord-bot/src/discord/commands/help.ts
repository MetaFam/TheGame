import { Command, CommandMessage } from '@typeit/discord';

const helpContent = `
Available MetaGameBot commands:

- !mg setAddress [force] → Links your Discord account with the provided Ethereum address. Appending _force_ to the end signifies that you'd like to overwrite an existing account. Note that MyMeta (and 3box) profiles are tied to a given ethereum address, so if you replace it you'll have to create a new MyMeta (and 3box) profile.

- !mg addAlias <platform> <username> → Links your Discord account with the given identifier on the given platform, so that activities by this user can earn you XP. Supported platforms: github, discourse.  Note that Discord will be linked to your username automatically.

- !mg xp [@discordUser#1223] → Displays XP stats for the given Discord user. If no user is provided, _your_ xp is displayed.

- !mg help → This command.
`;

export class HelpCommand {
  @Command('!mg help')
  async getXp(message: CommandMessage) {
    await message.reply(helpContent);
  }
}
