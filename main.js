const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fs = require('fs/promises')
const secrets = require('./secrets.json');
const users = require('./data/users.json')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('h');
    }

    if (interaction.commandName === 'uid') {
        const user = interaction.options.getUser('user');
        const uid = interaction.options.getString('uid')
        if (user && uid) {
            await interaction.reply({content: "Failure: Use only one parameter", ephemeral: true})
        }else if (user) {
            var region;
            switch (users[user.id][0]) {
                case '6': 
                    region = "NA"
                    break;
                case '7': 
                    region = "EU"
                    break;
                case '8': 
                    region = "AS"
                    break;
                default:
                    region = "cringe doodoohead"
                    break;
            }
            await interaction.reply({content: `<@${user.id}>'s UID is ${users[user.id]} in region ${region}`, ephemeral: true})
        } else if (uid) {
            users[interaction.member.id] = uid
            await fs.writeFile('./data/users.json', JSON.stringify(users))
            await interaction.reply({content: `UID set to ${uid}`, ephemeral: true})
        } else {
            await interaction.reply({content: "Failure: Parameter required", ephemeral: true})
        }
    }
});

client.login(secrets.token);
