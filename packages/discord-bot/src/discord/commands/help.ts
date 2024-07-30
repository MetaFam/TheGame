import { ChatInputCommandInteraction } from "discord.js";

const content = `
Available MetaGameBot commands:

- /setAddress <ethAddress> → Links your Discord account with the provided Ethereum address.
- /help → This information.
`;

export const name = 'help'

export const execute = async (interaction: ChatInputCommandInteraction) => {
  await interaction.reply({ content });
}


export default { name, execute }
