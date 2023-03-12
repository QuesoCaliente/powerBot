import { SlashCommandBuilder } from '@discordjs/builders';

const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');
async function execute(interaction) {
    await interaction.reply(`Pong! ${interaction.client.ws.ping}ms`);
}
export { data, execute }