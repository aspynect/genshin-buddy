const fs = require('fs/promises')
const info = require('../data/info.json')
const messages = require('../data/messages.json');
const findRole = require('./roleFind');
const getChannel = require('./channelGet');

async function weeklyTimer(client, regionName) {
    console.log(`Logged in as ${client.user.tag}!`);
    for (const guildId of client.guilds.cache.keys()) {
        var guild = client.guilds.cache.get(guildId);
        var weeklies_role = null
        if (guild) {
            console.log("Guild Found")
            weeklies_role = await findRole(guild, `Weekly Reminders ${regionName}`)
            channel = await getChannel(guild, "Announcement");

            if (weeklies_role) {
                try {
                    await channel.send(`<@&${weeklies_role.id}> \n${messages.weeklies[Math.floor(Math.random()*messages.weeklies.length)]} \n`);
                } catch {
                    console.log(e)
                }
                    console.log(`Pinging Weeklies ${regionName}`)
            }
        }
    }
}

async function monthlyTimer(client) {
    console.log(`Logged in as ${client.user.tag}!`);
    month = new Date().getMonth()
    console.log(`Month: ${month}`)
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
            channel = await getChannel(guild, "Announcement")
            try {
                await channel.send(`
                <@&${monthlies_role.id}> \n${messages.monthlies[Math.floor(Math.random()*messages.monthlies.length)]} 
                \nThe current shop 4 stars are: ${info[month.toString()]}
                \n The current shop weapons are: ${info[monthlies_type.toString() + "month"]} series
                `);
            } catch {
                console.log(e)
            }
                
            console.log('Pinging Monthlies')
        }
    }
}

async function abyssTimer(client, regionName, phase) {
    for (const guildId of client.guilds.cache.keys()) {
        console.log("Start")
        var guild = await client.guilds.cache.get(guildId);
        var abyss_role = null
        if (guild) {
            console.log("Guild Found")
            abyss_role = await findRole(guild, `Abyss Reminders ${regionName}`)
            channel = await getChannel(guild, "Announcement");

            try {
                if(abyss_role) {
                await channel.send(`<@&${abyss_role.id}> \n${messages.abyss[Math.floor(Math.random()*messages.abyss.length)]}\n Abyssal Moon is ${phase}`)
                }
            } catch {
                console.log(e)
            }
            console.log(`Pinging Abyss ${regionName} ${phase}`)
        }
    }
}

module.exports = {
    weeklyTimer,
    monthlyTimer,
    abyssTimer,
}