const { Channel } = require('diagnostics_channel');
const fs = require('fs/promises')
const serverList = require('../data/ignored/servers.json')

async function setChannel(guild, channelType, channel, interaction) {
    if (channel && channelType){
        if (!serverList[guild.id]) {
            serverList[guild.id] = {AnnouncementChannel: null, StandardOutput: null}
        }
        serverList[guild.id][channelType] = channel.id;

        await fs.writeFile('./data/ignored/servers.json', JSON.stringify(serverList))
        await interaction.reply({content: `Bot channel set to <#${channel.id}>`, ephemeral: true})
    }
}

module.exports = setChannel