const guildList = require("./data/servers.json");

async function getChannel(guild) {
    serverId = guildList[guild.id]
    if (serverId) {
        let channel = await guild.channels.cache.get(serverId);
        console.log("Manually entered channel found")
        return channel;
    } else {
        for (const channelId of guild.channels.cache.keys()) {
            let channel = await guild.channels.cache.get(channelId);
            if (channel.name.toLowerCase().includes('bot')) {
                console.log("Channel Found")
                return channel;
            }
        }
    }
}



module.exports = getChannel