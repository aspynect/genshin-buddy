const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const secrets = require('../secrets.json');
const monthlyTimer = require('./timers.js')
const flags = require('./flags.json');

client.on('ready', async () => {
    month = new Date().getMonth()
    console.log(`Month: ${month}`)
    await monthlyTimer(client, month)
    process.exit();
});

client.login(secrets.token);