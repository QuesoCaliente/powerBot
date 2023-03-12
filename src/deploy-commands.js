import { REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { config } from 'dotenv';
import pathim from 'path';
import { fileURLToPath } from 'url';
config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = pathim.dirname(__filename);

const commands = [];
// Obtener todos los comandos del directorio
const path = readdirSync('./src/commands')


// Obtener la salida del SlashCommandBuilder .json de los datos de cada comando para su implementación
for (const dir of path) {
    const files = readdirSync(resolve(__dirname, `./commands/${dir}`)).filter(file => file.endsWith('.js'))
    for (const file of files) {
        const command = await import(`./commands/${dir}/${file}`);
        commands.push(command.data.toJSON());
    }
}

// Crea una instancia del modulo REST
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// y implementa tus comandos
(async () => {
    try {
        console.log(`Iniciando Actualización ${commands.length} comandos (/)`);

        // El método put se usa para actualizar completamente todos los comandos en el servidor con el conjunto actual
        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log(`Se han cargado ${data.length} comandos (/)`);
    } catch (error) {
        // Capturando cualquier error que pueda ocurrir
        console.error(error);
    }
})();