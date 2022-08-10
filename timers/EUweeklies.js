const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs/promises')
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const secrets = require('../secrets.json');
const timer = require('./timer.js')
const flags = require('./flags.json');


client.on('ready', async () => {
    await timer(client, "Weekly Reminders EU")
    process.exit();
});

client.login(secrets.token);