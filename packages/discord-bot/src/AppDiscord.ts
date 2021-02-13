import { ArgsOf, Client, Discord, On } from '@typeit/discord';

@Discord()
export abstract class AppDiscord {
  @On('message')
  async onMessage([message]: ArgsOf<'message'>, _: Client) {
    console.log({ message });
  }
}
