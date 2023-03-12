import { PrismaClient } from '@prisma/client'
import { PermissionFlagsBits } from 'discord.js'
import { setOpenAiKey } from '../../../prisma/services.js'

const name = 'setopenaikey'

const aliases = ['setoak']

const description = 'Descripcion SetOpenAiKey'

const execute = async (client, message, args) => {

    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.channel.send('No tienes permisos para ejecutar este comando')

    const apikey = args[0]
    if (!apikey) return message.channel.send('Debes ingresar una ApiKey')

    await setOpenAiKey(message.guild.id, apikey)
    return message.channel.send(`La ApiKey fue actualizada`)
}

export {
    name,
    aliases,
    execute
}