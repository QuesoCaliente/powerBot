import { PrismaClient } from '@prisma/client'
import { setPrefix } from '../../../prisma/services.js'

const name = 'setprefix'

const aliases = ['sprefix']

const description = 'Descripcion SetPrefix'

const execute = async (client, message, args) => {

    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('No tienes permisos para ejecutar este comando')

    const prefix = args[0]
    if (!prefix) return message.channel.send('Debes ingresar un nuevo prefijo')

    await setPrefix(message.guild.id, prefix)
    return message.channel.send(`El prefijo se ha cambiado a ${prefix}`)
}

export {
    name,
    aliases,
    execute
}