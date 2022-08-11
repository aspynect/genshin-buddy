const { randomBytes } = require('crypto');
const fs = require('fs/promises')
const flags = require('./flags.json');
const messages = require('./messages.json')

async function weeklyTimer(client, roleName) {
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
                        await channel.send(`<@&${pinged_role.id}> \n${messages.weeklies[Math.floor(Math.random()*messages.weeklies.length)]} \n`);
                        if(flags.abyss) {await channel.send(`${messages.abyss[Math.floor(Math.random()*messages.abyss.length)]}`)}
                    }
                    break;
                }
            }
        }
    }
}

module.exports = weeklyTimer