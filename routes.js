const { REST, Routes } = require('discord.js');
const secrets = require('./secrets.json');

const commands = [
    {
        name: 'hello',
        description: 'h',
    },
];

const rest = new REST({ version: '10' }).setToken(secrets.token);

(async () => {
    try {
        console.log("Start");
        await rest.put(Routes.applicationGuildCommands('1006734097831432278', '1006734321383645246'), { body: commands });
        console.log("Done");
    } catch (error) {
        console.error(error);
    }
})();