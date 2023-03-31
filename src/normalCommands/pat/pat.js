import fetch from 'node-fetch';
import { EmbedBuilder } from 'discord.js';


const name = 'pat'

const aliases = ['palmadita']

const description = 'PatTime'

const execute = async (client, message, args) => {

    const user = message.mentions.users.first();

    const res = await fetch(`https://nekos.best/api/v2/pat`);
    const resJson = await res.json();
    const embed = new EmbedBuilder()
        .setTitle('PatTime')
        .setImage(resJson.results[0].url)
        .setDescription(`${message.author} le dio una palmadita a ${user}`)
        .setColor('#f1c1a1');


    await message.channel.send({ embeds: [embed] });
}

export {
    name,
    aliases,
    execute
}