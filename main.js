const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fs = require('fs/promises')
const secrets = require('./secrets.json');
const users = require('./data/users.json');
const roleList = require('./data/roleList.json')
const createRole = require('./roleCreate');
const botGoodbye = require('./leave');
const checkRegion = require('./regionCheck');
const assignRole = require('./roleAssign');
const getChannel = require('./channelGet');
const setChannel = require('./channelSet');
const {parametricLog} = require('./parametric');
const {parametricCheck} = require('./parametric');
const reinitializeRoles = require('./reinitializeRoles');
const uid = require('./uid');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildCreate', async guild => {
    var channel = await getChannel(guild);
    await channel.send('Howdy comrades!');
    
    for (var roleName of roleList) {
        await createRole(guild, roleName)
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply({content: `h`, ephemeral: true});
    }

    if (interaction.commandName === 'leave') {
        botGoodbye(interaction.guild);
    }

    if (interaction.commandName === 'reinit-roles') {
        reinitializeRoles(interaction)
    }

    if (interaction.commandName === 'roles') {
        assignRole(interaction.guild, interaction.member, interaction.options.getString('role'), interaction)
    }

    if (interaction.commandName === 'set-channel') {
        const channel = interaction.options.getChannel('channel')
        await setChannel(interaction.guild, channel, interaction)
    }

    if (interaction.commandName === 'parametric') {
        parametricLog(interaction.guild, interaction.member, interaction)
    }

    if (interaction.commandName === 'uid') {
        uid(interaction)
    }
});

client.login(secrets.token);
setInterval(() => {parametricCheck(client)}, 1000)
