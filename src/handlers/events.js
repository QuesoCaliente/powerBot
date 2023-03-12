import { readdirSync } from 'fs'
import { resolve } from 'path'
import ascii from 'ascii-table'
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const table = new ascii('Events').setHeading('Events', 'Status')

async function loadEvents(client) {
    const path = readdirSync(resolve(__dirname, '../events'))

    for (const dir of path) {
        const files = readdirSync(resolve(__dirname, `../events/${dir}`)).filter(file => file.endsWith('.js'))

        await client.events.clear();

        for (const file of files) {
            const event = await import(pathToFileURL(resolve(__dirname, `../events/${dir}/${file}`)))

            const execute = (...args) => event.execute(...args, client)
            client.events.set(event.name, execute)

            if (event.rest) {
                if (event.once) client.rest.once(event.name, execute)
                else client.rest.on(event.name, execute)
            } else {
                if (event.once) client.once(event.name, execute)
                else client.on(event.name, execute)
            }

            table.addRow(event.name, '✅')


        }
    }
    console.log(table.toString(), '\n Events Loaded')
}


export default loadEvents 