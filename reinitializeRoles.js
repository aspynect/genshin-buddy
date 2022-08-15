const roleList = require('./data/roleList.json')
const findRole = require('./roleFind')

async function reinitializeRoles(interaction) {
    let guild = interaction.guild
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
    for (var roleName of roleList) {
        await createRole(guild, roleName)
    }
}

module.exports = reinitializeRoles