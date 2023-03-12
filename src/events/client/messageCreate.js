import { Events } from 'discord.js'
import { getServer } from '../../../prisma/services.js';

const name = Events.MessageCreate;
async function execute(message) {
    console.log(message.author)
    const guild = await getServer(message.guild.id)
    if (!message.content.startsWith(guild.prefix) | message.author.bot) return;

    let args = message.content.slice(guild.prefix.length).trim().split(/ +/g)
    let command = args.shift().toLowerCase();


    let cmd = message.client.normalCommands.get(command) ?? message.client.normalCommands.find(c => c.aliases.includes(command))
    if (cmd) {
        cmd.execute(message.client, message, args)
    }

}


export {
    name,
    execute,
}