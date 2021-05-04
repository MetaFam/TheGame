import { CommandMessage, CommandNotFound, Discord } from '@typeit/discord';
import * as Path from 'path';

@Discord('!', {
  import: [
    // We are using tsc, so we want to load the compiled files
    Path.join(__dirname,  "commands", "*.js"),
  ],
})
export abstract class AppDiscord {
  // This is triggered when a particular command doesn't exist
  @CommandNotFound()
  notFound(command: CommandMessage) {
    command.reply("MetaGameBot doesn't recognize that command.");
  }
}
