import fetch from 'node-fetch';
import { EmbedBuilder } from 'discord.js';


const name = 'kiss'

const aliases = ['beso']

const description = 'Kisstime'

const execute = async (client, message, args) => {

    const user = message.mentions.users.first();

    const res = await fetch(`https://nekos.best/api/v2/kiss`);
    const resJson = await res.json();
    const embed = new EmbedBuilder()
        .setTitle('Kisstime')
        .setImage(resJson.results[0].url)
        .setDescription(`${message.author} beso a ${user}`)
        .setColor('#f1c1a1');


    await message.channel.send({ embeds: [embed] });
}

export {
    name,
    aliases,
    execute
}