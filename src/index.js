import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js'
import loadEvents from './handlers/events.js'
import loadCommands from './handlers/commands.js'
import loadNormalCommands from './handlers/normalCommands.js'
import { config } from 'dotenv'
config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.User
    ]
})

client.events = new Collection()
loadEvents(client)
client.commands = new Collection()
loadCommands(client)
client.normalCommands = new Collection()
loadNormalCommands(client)


client.login(process.env.TOKEN)



