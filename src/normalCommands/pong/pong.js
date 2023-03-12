import { PrismaClient } from '@prisma/client'
import { createGuild } from '../../../prisma/services.js'

const name = 'pong'

const aliases = ['p']

const description = 'Descripcion PONG'

const execute = async (client, message, args) => {

    return message.channel.send(`!PONG `)
}

export {
    name,
    aliases,
    execute
}