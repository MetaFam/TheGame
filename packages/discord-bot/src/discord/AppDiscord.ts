import { CommandMessage, CommandNotFound, Discord } from '@typeit/discord';
import * as Path from 'path';

@Discord('!', {
  import: [
    Path.join(__dirname,  "commands", "*.ts"),
  ],
})
export abstract class AppDiscord {
  // This is triggered when a particular command doesn't exist
  @CommandNotFound()
  notFound(command: CommandMessage) {
    command.reply("MetaGameBot doesn't recognize that command.");
  }
}
