
import { getServer } from "../../../prisma/services.js";

const name = 'ready'
const once = true
async function execute(client) {
    const activities = [`/help`, 'created by quesocaliente']

    setInterval(() => {
        client.user.setPresence({
            activities: [{
                name: activities[Math.floor(Math.random() * activities.length)],
                type: 3
            }],
            status: 'online'

        })
    }, 10000)


    console.log(`Logged in as ${client.user.tag}`)
}

export {
    name,
    once,
    execute
}



