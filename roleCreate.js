const findRole = require("./roleFind");

async function createRole (guild, NameString) {
    if (await findRole(guild, NameString)) {
        console.log(`Role ${NameString} already exists, exiting role creation`)
        return;
    } else {
        console.log("Initializing role creation")
        await guild.roles.create({
            name: `${NameString}`,
            reason: "Automatically created by Genshin Buddy to ping for reminders"
        });
    }
    if (await findRole(guild, NameString)) {
        console.log(`Role ${NameString} successfully created`)
        return;
    } else {
        console.log(`Creating Role ${NameString} failed`)
    }
};

module.exports = createRole