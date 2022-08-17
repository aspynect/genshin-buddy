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
const { parametricLog } = require('./commands/parametric');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildCreate', async guild => {
    var channel = await getChannel(guild);
    await channel.send('Howdy comrades!');
    
    for (var roleName of roleList) {
        await createRole(guild, roleName);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply({content: `h`, ephemeral: true});
    }

    if (interaction.commandName === 'leave') {
        botGoodbye(interaction);
    }

    if (interaction.commandName === 'reinit-roles') {
        reinitializeRoles(interaction);
    }

    if (interaction.commandName === 'roles') {
        assignRole(interaction.guild, interaction.member, interaction.options.getString('role'), interaction);
    }

    if (interaction.commandName === 'set-channel') {
        const channel = interaction.options.getChannel('channel');
        await setChannel(interaction.guild, channel, interaction);
    }

    if (interaction.commandName === 'parametric') {
        parametricLog(interaction.guild, interaction.member, interaction);
    }

    if (interaction.commandName === 'uid') {
        uid(interaction);
    }
});

client.login(secrets.token);
setInterval(() => {
    //parametricCheck(client);
    timerCheck();
}, 10000)
