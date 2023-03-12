import { Events } from 'discord.js'


const name = Events.InteractionCreate;
async function execute(interaction) {
    if (!interaction.isChatInputCommand() | interaction.user.bot) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No se encontrarons comandos que coincidan con ${interaction.commandName}`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error ejecutando ${interaction.commandName}`);
        console.error(error);
    }
}


export {
    name,
    execute,
}