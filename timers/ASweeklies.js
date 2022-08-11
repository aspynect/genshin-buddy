const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs/promises')
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const secrets = require('../secrets.json');
const weeklyTimer = require('./timers.js')
const flags = require('./flags.json');


client.on('ready', async () => {
    await weeklyTimer(client, "Weekly Reminders AS")
    process.exit();
});

client.login(secrets.token);