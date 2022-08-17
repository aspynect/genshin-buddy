const guildList = require("../data/ignored/servers.json");

async function getChannel(guild, type) {
    let serverId = guildList[guild.id]

    if (serverId) {
        let announcementChannel = guildList[guild.id]["AnnouncementChannel"]
        let standardChannel = guildList[guild.id]["StandardOutput"]
        if (type == "Announcement" && announcementChannel) {
            let channel = await guild.channels.cache.get(announcementChannel);
            console.log("Manually entered Announcement channel found")
            return channel;
        } else if (type == "Standard" && standardChannel) {
            let channel = await guild.channels.cache.get(standardChannel);
            console.log("Manually entered Standard Output channel found")
            return channel;
        }
        
    }
    try {
        for (const channelId of guild.channels.cache.keys()) {
            let channel = await guild.channels.cache.get(channelId);
            if (channel.name.toLowerCase().includes('bot')) {
                console.log("Channel Found")
                return channel;
            }
        }
        for (const channelId of guild.channels.cache.keys()) {
            let channel = await guild.channels.cache.get(channelId);
            if (channel.name.toLowerCase().includes('spam')) {
                console.log("Channel Found")
                return channel;
            }
        }
    } catch {
        return guild.channels.cache.keys()[0];
    }
}



module.exports = getChannel