const fs = require('fs/promises')
const flags = require('./flags.json');
const info = require('../data/info.json')
const messages = require('./messages.json');
const findRole = require('../roleFind');
const getChannel = require('../channelGet');

async function weeklyTimer(client, regionName) {
    console.log(flags.abyss)
    console.log(`Logged in as ${client.user.tag}!`);
    for (const guildId of client.guilds.cache.keys()) {
        var guild = client.guilds.cache.get(guildId);
        var weeklies_role = null
        var abyss_role = null
        if (guild) {
            console.log("Guild Found")
            weeklies_role = await findRole(guild, `Weekly Reminders ${regionName}`)
            abyss_role = await findRole(guild, `Abyss Reminders ${regionName}`)
            channel = await getChannel(guild);
            console.log(channel.name)
            if (weeklies_role) {
                await channel.send(`<@&${weeklies_role.id}> \n${messages.weeklies[Math.floor(Math.random()*messages.weeklies.length)]} \n`);
            }
            if(abyss_role && flags.abyss) {
                await channel.send(`<@&${abyss_role.id}> \n${messages.abyss[Math.floor(Math.random()*messages.abyss.length)]}`)
            }
        }
    }
}

async function monthlyTimer(client, month) {
    console.log(`Logged in as ${client.user.tag}!`);
    for (const guildId of client.guilds.cache.keys()) {
        var guild = client.guilds.cache.get(guildId);
        var monthlies_role = null
        var monthlies_type = null
        if (month % 2 == 0) {
            monthlies_type = "even"
        } else if (month % 2 == 1) {
            monthlies_type = "odd"
        }
        console.log(monthlies_type + "month")
        if (guild) {
            console.log("Guild Found")
            monthlies_role = await findRole(guild, "Monthly Reminders")
            channel = await getChannel(guild)
            await channel.send(`
                <@&${monthlies_role.id}> \n${messages.monthlies[Math.floor(Math.random()*messages.monthlies.length)]} 
                \nThe current shop 4 stars are: ${info[month.toString()]}
                \n The current shop weapons are: ${info[monthlies_type.toString() + "month"]} series
            `);
        }
    }
}

module.exports = {
    weeklyTimer,
    monthlyTimer,
}