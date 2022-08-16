const roleList = require('../data/roleList.json')
const findRole = require('../functions/roleFind')


async function botGoodbye(guild) {
    for (var roleName of roleList) {
        console.log(`Deleting role ${roleName}`)
        let role = await findRole(guild, roleName)
        
        try {
            if (role) {await guild.roles.delete(role)}
        } catch (e) {
            console.log(e)
        }
        console.log("Done")
    }
    await guild.leave();
    console.log(`Left ${guild.name}`)
}

module.exports = botGoodbye