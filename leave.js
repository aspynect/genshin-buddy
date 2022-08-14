const roleList = require('./data/roleList.json')
const findRole = require('./roleFind')


async function botGoodbye(guild) {
    for (var roleName of roleList) {
        console.log(`Deleting role ${roleName}`)
        let role = await findRole(guild, roleName)
        if (role) {await guild.roles.delete(role)}
        console.log("Done")
    }
    await guild.leave();
    console.log(`Left ${guild.name}`)
}

module.exports = botGoodbye