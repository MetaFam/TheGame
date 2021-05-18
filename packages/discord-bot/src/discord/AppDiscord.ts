import { Discord } from '@typeit/discord';
import * as Path from 'path';

// Within a docker container: We are using tsc, so we want to load the compiled files.
// For local dev, we are transpiling: Load the .ts files.
const glob =
  process.env.RUNTIME_ENV === 'docker'
    ? Path.join(__dirname, 'commands', '*.js')
    : Path.join(__dirname, 'commands', '!(*.d).ts');

@Discord('', {
  import: [glob],
})
export abstract class AppDiscord {
  // This is triggered when a particular command doesn't exist
  // @CommandNotFound()
  // notFound(command: CommandMessage) {
  //   command.reply("MetaGameBot doesn't recognize that command.");
  // }
}
