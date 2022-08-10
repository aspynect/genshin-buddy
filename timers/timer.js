const fs = require('fs/promises')
const flags = require('./flags.json');

async function timer(client, roleName) {
    console.log(flags)
    console.log(`Logged in as ${client.user.tag}!`);
    for (const guildId of client.guilds.cache.keys()) {
        var guild = client.guilds.cache.get(guildId);
        var pinged_role = null
        if (guild) {
            console.log("Guild Found")
            let roles = await guild.roles.fetch()
            for (const roleId of roles.keys()) {
                const r = roles.get(roleId)
                if (r.name == roleName) {
                    pinged_role = r
                    console.log("Role Found")
                    break;
                }
            }
            for (const channelId of guild.channels.cache.keys()) {
                var channel = guild.channels.cache.get(channelId);
                if (channel.name.toLowerCase().includes('bot')) {
                    console.log("Channel Found")
                    if (pinged_role) {
                        await channel.send(`<@&${pinged_role.id}> \n Comrades, they're back!\n Time to plunder weekly bosses!\n`);
                    }
                    break;
                }
            }
        }
    }
}

module.exports = timer