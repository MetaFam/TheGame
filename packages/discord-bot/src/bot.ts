import fs from 'node:fs';
import path from 'node:path';

import {
  ChatInputCommandInteraction,
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  Interaction,
} from 'discord.js';

import { CONFIG } from './config.js';

export type Command = {
  name: string
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>
}

export class CommandedClient extends Client {
  commands: Collection<string, Command> = new Collection();

  async executeCommand(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction
    const command = this.commands.get(commandName);
  
    if(!command) {
      console.error(`No command named “${commandName}” was found.`);
      return;
    }
  
    try {
      await command.execute(interaction);
    } catch(error) {
      console.error((error as Error).message)
      const content = `There was an error while executing the ${commandName} command!`
      const method = interaction.replied || interaction.deferred ? 'followUp' : 'reply';
      await interaction[method]({ content, ephemeral: true })
    }
  }
}

export async function createDiscordClient() {
  const client = new CommandedClient({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages, // required
      GatewayIntentBits.GuildMembers,
    ],
  })
  await client.login(CONFIG.botToken)
  return client
}

export async function initDiscordBot(): Promise<Client> {
  const client = await createDiscordClient();

  try {
    const commandsPath = (
      path.join(process.cwd(), CONFIG.inDocker ? 'dist' : 'src', 'commands')
    )
    const commands = fs.readdirSync(commandsPath)
    const ext = CONFIG.inDocker ? '.js' : '.ts';

    await Promise.all(commands.map(async (cmd) => {
      if(!cmd.endsWith(ext)) return;
      const cmdPath = path.join(commandsPath, cmd);
      const command = await import(cmdPath);
      const presents = await Promise.all(
        ['name', 'execute'].map((prop) => {
          const present = prop in command;
          if(!present) {
            console.warn(`The command at ${cmdPath} is missing a required property: “${prop}”.`);
          }
          return present;
        })
      )
      if(presents.every(Boolean)) {
        console.debug(`Loaded command: ${cmdPath}.`);
        client.commands.set(command.name, command);
      }
    }))

    client.once(Events.ClientReady, async () => {
      await client.guilds.fetch();
      const count = client.guilds.cache.size;
      console.debug(`Fetched ${count} guild${count === 1 ? '' : 's'}.`)
    })

    client.on(Events.InteractionCreate, async (interaction) => {
      client.executeCommand(interaction);
    })
  } catch(error) {
    console.error((error as Error).message)
  }
  return client
}
