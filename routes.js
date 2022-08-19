const {REST, Routes, ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');
const secrets = require('./data/ignored/secrets.json');
const roleList = require('./data/roleList.json')

let roleListCringe = []
for (var roleName of roleList) {
    roleListCringe.push({
        name: roleName,
        value: roleName,
    })
}
console.log(roleListCringe)

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
        name: 'parametric',
        description: 'Log your parametric transformer to be reminded when it resets!',
    },
    {
        name: 'commands',
        description: 'See all commands and syntax',
    },
    {
        name: 'leave',
        description: 'Removes the bot from the server cleanly, bringing all roles created with it',
        default_member_permissions: 32,
    },
    {
        name: 'reinit-roles',
        description: 'Reinitializes roles if something breaks',
        default_member_permissions: 32,
    },
    {
        name: 'set-channel',
        description: 'Sets the bot channel to be used',
        default_member_permissions: 32,
        options: [
            {
                name: "channel-type",
                description: "Select the type of channel you would like to set", 
                choices: [
                    {name: "Announcement Channel", value: "AnnouncementChannel"},
                    {name: "Standard Output", value: "StandardOutput"}
                ],
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: "channel",
                description: "Tag the channel you would like the bot to use",
                type: ApplicationCommandOptionType.Channel,
                required: true,
            }
        ]
    },
    {
        name: 'roles',
        description: 'Assign or toggle your roles',
        options: [
            {
                name: "role",
                description: "Select which role you would like to assign", 
                choices: roleListCringe,
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    },
];

const rest = new REST({ version: '10' }).setToken(secrets.token);

(async () => {
    try {
        console.log("Started routing");
        //await rest.put(Routes.applicationGuildCommands('1006734097831432278', '1006734321383645246'), { body: commands });
        await rest.put(Routes.applicationCommands('1006734097831432278'), { body: commands });
        console.log("Routing complete");
    } catch (error) {
        console.error(error);
    }
})();