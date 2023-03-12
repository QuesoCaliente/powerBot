
import { readdirSync } from 'fs';
import { resolve } from 'path';
import ascii from 'ascii-table'
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const table = new ascii('Commands').setHeading('Commands', 'Status')

async function loadCommands(client) {
    const path = readdirSync(resolve(__dirname, '../commands'))
    for (const dir of path) {
        const files = readdirSync(resolve(__dirname, `../commands/${dir}`)).filter(file => file.endsWith('.js'))
        for (const file of files) {
            const command = await import(pathToFileURL(resolve(__dirname, `../commands/${dir}/${file}`)))
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command)
                table.addRow(command.data.name, '✅')
            } else {
                table.addRow(command.name, '❌')
                console.log(`Command ${command.data.name} is missing the execute or data property`)
            }
        }
    }
    console.log(table.toString(), '\n Commands Loaded')

}

export default loadCommands 