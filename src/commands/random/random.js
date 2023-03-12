import { SlashCommandBuilder } from '@discordjs/builders';
import { EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

const data = new SlashCommandBuilder().setName('waifu').setDescription('Sends a random anime image').addStringOption(option =>
    option.setName('type')
        .setDescription('type of image')
        .setRequired(true)
        .addChoices({ name: 'Sfw', value: 'sfw' }, { name: 'Nsfw', value: 'nsfw' })
)

async function execute(interaction) {
    const option = interaction.options.getString('type');
    const res = await fetch(`https://api.waifu.pics/${option}/waifu`);
    const resJson = await res.json();
    const embed = new EmbedBuilder()
        .setTitle('Random Anime Image')
        .setImage(resJson.url)
        .setColor('#f1c1a1');

    await interaction.reply({ embeds: [embed] });
}

export { data, execute }