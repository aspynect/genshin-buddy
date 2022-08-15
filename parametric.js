const data = require('./data/parametricData.json')
const fs = require('fs/promises')
const messages = require('./timers/messages.json')
const getChannel = require('./channelGet')

async function parametricLog(guild, user, interaction) {
    console.log(`Logging Parametric Transformer for user ${user.user.username}`)
    data[user.id] = {
        timestamp: `${await Date.now()}`,
        homeGuild: guild.id,
    }
    await fs.writeFile('./data/parametricData.json', JSON.stringify(data))
    await interaction.reply({content: `Parametric Transformer Reset at ${await data[user.id].timestamp}`, ephemeral: true})
}

async function parametricCheck(client) {
    for (var user in data){
        if (data[user].timestamp != null && Date.now() - data[user].timestamp > 597600000) {
            let guild = await client.guilds.cache.get(data[user].homeGuild);
            let channel = await getChannel(guild);
            console.log(`Pinging ${user}`)
            await channel.send(`<@${user}> \n${messages.parametric[Math.floor(Math.random()*messages.abyss.length)]}`);
            data[user].timestamp = null
            await fs.writeFile('./data/parametricData.json', JSON.stringify(data));
            
        }
    }
    
}

module.exports = {
    parametricLog,
    parametricCheck,
}