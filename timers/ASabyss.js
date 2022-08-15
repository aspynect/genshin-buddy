const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs/promises')
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const secrets = require('../secrets.json');
const { abyssTimer } = require('./timers');

client.on('ready', async () => {
    await abyssTimer(client, "AS")
    process.exit();
});

client.login(secrets.token);