import { SlashCommandBuilder } from '@discordjs/builders';
import fetch from 'node-fetch';
import { EmbedBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
    .setName('neko')
    .setDescription('I give you a neko!');
async function execute(interaction) {
    const res = await fetch(`https://nekos.best/api/v2/neko`);
    const resJson = await res.json();
    const embed = new EmbedBuilder()
        .setTitle('I give you a neko!')
        .setImage(resJson.results[0].url)
        .setColor('#f1c1a1');

    await interaction.reply({ embeds: [embed] });
}
export { data, execute }