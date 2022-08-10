const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const secrets = require('../secrets.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    for (const guildId of client.guilds.cache.keys()) {
        var guild = client.guilds.cache.get(guildId);
        var pinged_role = null
        if (guild) {
            console.log("Guild Found")
            guild.roles.fetch().then(roles => {
                for (const roleId of roles.keys()) {
                    const r = roles.get(roleId)
                    if (r.name == "Weekly Reminders NA") {
                        pinged_role = r
                        console.log("Role Found")
                        break;
                    }
                }
                for(const channelId of guild.channels.cache.keys()) {
                    var channel = guild.channels.cache.get(channelId);
                    if (channel.name.toLowerCase().includes('bot')) {
                        console.log("Channel Found")
                        if (pinged_role) {
                            channel.send(`<@&${pinged_role.id}> Weekly Bosses have Reset!`);
                        }
                        break;
                    }
                }
            });
        }
    }
    process.exit
});

client.login(secrets.token);