const fs = require('fs/promises')
const serverList = require('../data/ignored/servers.json')

async function setChannel(guild, channel, interaction) {
    if (channel){
        serverList[guild.id] = channel.id
        await fs.writeFile('./data/servers.json', JSON.stringify(serverList))
        if (interaction) {await interaction.reply({content: `Bot channel set to <#${channel.id}>`, ephemeral: true})}
    } else {
        if (interaction) {await interaction.reply({content: `Please input a channel to set as your Bot Channel`, ephemeral: true})}
    }
    
}

module.exports = setChannel