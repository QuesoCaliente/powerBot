import { SlashCommandBuilder } from '@discordjs/builders';
import { Configuration, OpenAIApi } from "openai"
import { getServer } from '../../../prisma/services.js';

const data = new SlashCommandBuilder()
    .setName('question')
    .setDescription('Replies with Pong!').addStringOption(option =>
        option.setName('query')
            .setDescription('Escribe tu pregunta')
            .setRequired(true)
    )
async function execute(interaction) {
    const guild = await getServer(interaction.guild.id)
    if (!guild.openaiToken) return interaction.reply({ content: `Debes configurar una apikey para utilizar este comando, escribe ${guild.prefix}setopenaikey <ApiKey>`, ephemeral: true })
    await interaction.deferReply();
    const option = interaction.options.getString('query')
    const configuration = new Configuration({
        apiKey: guild.openaiToken,
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({

        model: "gpt-3.5-turbo",
        max_tokens: 2048,
        temperature: 0.6,
        messages: [
            {
                role: "system",
                content: "Tu nombre es PowerBot, y tu genero es femenino, y tu edad es 18, eres un bot de discord que responde preguntas"
            },
            {
                role: "user",
                content: option
            }
        ]
    })
    let salida = ''
    for (const word of completion.data.choices[0].message.content.split(' ')) {
        if ((salida + word + ' ').length > 1999) {
            await interaction.followUp(salida)
            salida = ''
        }
        salida = salida + word + ' '
    }
    salida !== '' && await interaction.followUp(salida)


}
export { data, execute }