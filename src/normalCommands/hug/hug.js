import fetch from 'node-fetch';
import { EmbedBuilder } from 'discord.js';


const name = 'hug'

const aliases = ['abrazo']

const description = 'Hugtime'

const execute = async (client, message, args) => {

    const user = message.mentions.users.first();

    const res = await fetch(`https://nekos.best/api/v2/hug`);
    const resJson = await res.json();
    const embed = new EmbedBuilder()
        .setTitle('Hugtime')
        .setImage(resJson.results[0].url)
        .setDescription(`${message.author} abrazo a ${user}`)
        .setColor('#f1c1a1');


    await message.channel.send({ embeds: [embed] });
}

export {
    name,
    aliases,
    execute
}