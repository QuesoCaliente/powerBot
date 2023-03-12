
import { readdirSync } from 'fs';
import { resolve } from 'path';
import ascii from 'ascii-table'
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


async function loadNormalCommands(client) {
    const path = readdirSync(resolve(__dirname, '../normalCommands'))
    for (const dir of path) {
        const files = readdirSync(resolve(__dirname, `../normalCommands/${dir}`)).filter(file => file.endsWith('.js'))
        for (const file of files) {
            const command = await import(pathToFileURL(resolve(__dirname, `../normalCommands/${dir}/${file}`)))
            client.normalCommands.set(command.name, command)
            console.log(`Comando ${command.name} Cargado Exitosamente`)

        }
    }
}

export default loadNormalCommands