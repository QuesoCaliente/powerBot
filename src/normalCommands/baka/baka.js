import fetch from 'node-fetch';
import { EmbedBuilder } from 'discord.js';


const name = 'baka'

const aliases = ['tonto']

const description = 'Bakatime'

const execute = async (client, message, args) => {

    const user = message.mentions.users.first();

    const res = await fetch(`https://nekos.best/api/v2/baka`);
    const resJson = await res.json();
    const embed = new EmbedBuilder()
        .setTitle('Bakatime')
        .setImage(resJson.results[0].url)
        .setDescription(`${message.author} le dijo tonto a ${user}`)
        .setColor('#f1c1a1');


    await message.channel.send({ embeds: [embed] });
}

export {
    name,
    aliases,
    execute
}