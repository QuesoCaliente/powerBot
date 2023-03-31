import fetch from 'node-fetch';
import { EmbedBuilder } from 'discord.js';


const name = 'cry'

const aliases = ['llorar']

const description = 'Crystime'

const execute = async (client, message, args) => {

    const user = message.mentions.users.first();

    const res = await fetch(`https://nekos.best/api/v2/cry`);
    const resJson = await res.json();
    const embed = new EmbedBuilder()
        .setTitle('CryTime')
        .setImage(resJson.results[0].url)
        .setDescription(`${message.author} lloro por ${user}`)
        .setColor('#f1c1a1');


    await message.channel.send({ embeds: [embed] });
}

export {
    name,
    aliases,
    execute
}