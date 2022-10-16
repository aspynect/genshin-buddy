const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fs = require('fs/promises')
const secrets = require('./data/ignored/secrets.json');
const users = require('./data/ignored/users.json');
const roleList = require('./data/roleList.json')
const createRole = require('./functions/roleCreate');
const botGoodbye = require('./commands/leave');
const assignRole = require('./commands/roleAssign');
const getChannel = require('./functions/channelGet');
const setChannel = require('./commands/channelSet');
const reinitializeRoles = require('./commands/reinitializeRoles');
const uid = require('./commands/uid');
const timerCheck = require('./functions/checkTimers');
const { parametricLog, parametricCheck } = require('./commands/parametric');

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    setInterval(async () => {
        await parametricCheck(client);
        await timerCheck(client);
    }, 20000);
});

client.on('guildCreate', async guild => {
    var channel = await getChannel(guild, "Standard");
    try {await channel.send('Howdy comrades!');} catch(e) {console.log(e)}
    
    for (var roleName of roleList) {
        await createRole(guild, roleName);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) {return;}
    if (!interaction.inGuild()) {
        await interaction.reply("Commands in Direct Messages not supported")
        return;
    }

    if (interaction.commandName === 'ping') {
        await interaction.reply({content: `h`, ephemeral: true});
    }

    if (interaction.commandName === 'leave') {
        await botGoodbye(interaction);
    }

    if (interaction.commandName === 'reinit-roles') {
        await reinitializeRoles(interaction);
    }

    if (interaction.commandName === 'roles') {
        await assignRole(interaction.guild, interaction.member, interaction.options.getString('role'), interaction);
    }

    if (interaction.commandName === 'set-channel') {
        const channelType = interaction.options.getString('channel-type')
        const channel = interaction.options.getChannel('channel');
        await setChannel(interaction.guild, channelType, channel, interaction);
    }

    if (interaction.commandName === 'parametric') {
        await parametricLog(interaction.guild, interaction.member, interaction);
    }

    if (interaction.commandName === 'commands') {
        console.log(`${interaction.user.username} used /commands`)
        await interaction.reply({content:'Commands can be found [here](<https://github.com/PistachioPiper/genshin-buddy#commands>)', ephemeral: true})
    }

    if (interaction.commandName === 'uid') {
        await uid(interaction);
    }
});

client.login(secrets.token);

