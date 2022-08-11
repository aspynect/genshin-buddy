const { randomBytes } = require('crypto');
const fs = require('fs/promises')
const flags = require('./flags.json');
const messages = require('./messages.json')

async function weeklyTimer(client, regionName) {
    console.log(flags)
    console.log(`Logged in as ${client.user.tag}!`);
    for (const guildId of client.guilds.cache.keys()) {
        var guild = client.guilds.cache.get(guildId);
        var weeklies_role = null
        var abyss_role = null
        if (guild) {
            console.log("Guild Found")
            let roles = await guild.roles.fetch()
            for (const roleId of roles.keys()) {
                const r = roles.get(roleId)
                let weekliesRoleName = `Weekly Reminders ${regionName}`
                let abyssRoleName = `Abyss Reminders ${regionName}`
                if (r.name == weekliesRoleName) {
                    weeklies_role = r
                    console.log("Weeklies Role Found")
                } else if (r.name == abyssRoleName) {
                    abyss_role = r
                    console.log("Abyss Role Found")
                }
            }
            for (const channelId of guild.channels.cache.keys()) {
                var channel = guild.channels.cache.get(channelId);
                if (channel.name.toLowerCase().includes('bot')) {
                    console.log("Channel Found")
                    if (weeklies_role) {
                        await channel.send(`<@&${weeklies_role.id}> \n${messages.weeklies[Math.floor(Math.random()*messages.weeklies.length)]} \n`);
                    }
                    if(abyss_role && flags.abyss) {
                        await channel.send(`<@&${abyss_role.id}> \n${messages.abyss[Math.floor(Math.random()*messages.abyss.length)]}`)
                    }
                    break;
                }
            }
        }
    }
}

module.exports = weeklyTimer