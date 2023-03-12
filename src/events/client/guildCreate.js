import { Events } from 'discord.js'
import { createGuild } from '../../../prisma/services.js'



const name = Events.GuildCreate;
async function execute(message) {
    return await createGuild(message.id)

}


export {
    name,
    execute,
}