const data = require('../data/ignored/parametricData.json')
const fs = require('fs/promises')
const messages = require('../data/messages.json')
const getChannel = require('../functions/channelGet')

async function parametricLog(guild, user, interaction) {
    console.log(`Logging Parametric Transformer for user ${user.user.username}`)
    data[user.id] = {
        timestamp: `${await Date.now()}`,
        homeGuild: guild.id,
    }
    await fs.writeFile('./data/parametricData.json', JSON.stringify(data))
    let discordStamp = await data[user.id].timestamp
    discordStamp = Math.floor(discordStamp / 1000)
    resetStamp = discordStamp + 86400
    await interaction.reply({content: `Parametric Transformer Logged at <t:${discordStamp}:f> \nReset Date: <t:${resetStamp}:f>`, ephemeral: true});
}

async function parametricCheck(client) {
    for (var user in data){
        if (data[user].timestamp != null && Date.now() - data[user].timestamp > 597600000) {
            try {
                let guild = await client.guilds.cache.get(data[user].homeGuild);
                console.log("Guild Found")
                let channel = await getChannel(guild);
                console.log(`Pinging ${user}`)
                await channel.send(`<@${user}> \n${messages.parametric[Math.floor(Math.random()*messages.abyss.length)]}`);
            } catch {
                console.log("Failed to find guild")
            }
            data[user].timestamp = null
            await fs.writeFile('./data/parametricData.json', JSON.stringify(data));
            
        }
    }
    
}

module.exports = {
    parametricLog,
    parametricCheck,
}