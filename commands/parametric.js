const data = require('../data/ignored/parametricData.json')
const fs = require('fs/promises')
const messages = require('../data/messages.json')
const getChannel = require('../functions/channelGet')

async function parametricLog(guild, user, interaction) {
    console.log(`Logging Parametric Transformer for user ${user.user.username}`)
    data[user.id] = {
        timestamp: `${Date.now()}`,
        homeGuild: guild.id,
    }
    await fs.writeFile('./data/ignored/parametricData.json', JSON.stringify(data))
    let discordStamp = await data[user.id].timestamp
    discordStamp = Math.floor(discordStamp / 1000)
    resetStamp = discordStamp + 597600
    await interaction.reply({content: `Parametric Transformer Logged at <t:${discordStamp}:f> \nReset Date: <t:${resetStamp}:f> (<t:${resetStamp}:R>)`, ephemeral: true});
}

async function parametricCheck(client) {
    for (var user in data){
        try {
            if ((data[user].timestamp !== null) && (Date.now() - data[user].timestamp) > 597600000) {
                console.log(`Checking ${user} parametric`);
                
                let guild = await client.guilds.cache.get(data[user].homeGuild);
                let channel = await getChannel(guild, "Standard");
                console.log(`Pinging ${user}`)
                await channel.send(`<@${user}> \n${messages.parametric[Math.floor(Math.random()*messages.parametric.length)]}`);
                data[user].timestamp = null;
                await fs.writeFile('./data/ignored/parametricData.json', JSON.stringify(data));
            }
        } catch {
            console.log(`Guild of user ${user} not found. Aborting`)
        }
    }
    
}

module.exports = {
    parametricLog,
    parametricCheck,
}