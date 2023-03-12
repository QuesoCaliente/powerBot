import { EmbedBuilder } from '@discordjs/builders'
import { createUserAndGuild } from '../../../prisma/services.js'

const name = 'serverinfo'

const aliases = ['si']

const description = 'Informacion del servidor'

const execute = async (client, message, args) => {
    const embed = new EmbedBuilder()
        .setTitle('Informacion del servidor')
        .setDescription(`Nombre del servidor: ${message.guild.name}
        ID del servidor: ${message.guild.id}
        Miembros del servidor: ${message.guild.memberCount}
        `)
        .setThumbnail(message.guild.iconURL())
        .setColor(0x00AE86)
        .setTimestamp()

    return await message.channel.send({ embeds: [embed] })

}

export {
    name,
    aliases,
    execute
}