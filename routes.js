const {REST, Routes, ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');
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
    },
    {
        name: 'leave',
        description: 'Removes the bot from the server cleanly, bringing all roles created with it',
        default_member_permissions: 32,
    },
];

const rest = new REST({ version: '10' }).setToken(secrets.token);

(async () => {
    try {
        console.log("Started routing");
        await rest.put(Routes.applicationGuildCommands('1006734097831432278', '1006734321383645246'), { body: commands });
        console.log("Routing complete");
    } catch (error) {
        console.error(error);
    }
})();