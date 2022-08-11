const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');
const secrets = require('./secrets.json');

const commands = [
    {
        name: 'ping',
        description: 'h',
    },
    {
        name: 'uid',
        description: 'Add your UID to the database or mention a user to get their UID',
        options: [
            {
                name: "user",
                description: "Look up a user's UID",
                type: ApplicationCommandOptionType.User
            },
            {
                name: "uid",
                description: "Enter your UID into the database",
                type: ApplicationCommandOptionType.String
            }
        ]
    }
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