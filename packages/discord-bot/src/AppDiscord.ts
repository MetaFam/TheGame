import { ArgsOf, Client, Discord, On } from '@typeit/discord';

@Discord()
export abstract class AppDiscord {
  @On('message')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onMessage([message]: ArgsOf<'message'>, _: Client) {
    console.log({ message });
  }
}
