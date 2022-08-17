const roleList = require('../data/roleList.json')
const createRole = require('../functions/roleCreate')
const findRole = require('../functions/roleFind')

async function reinitializeRoles(interaction) {
    await interaction.reply({content: `Reinitializing roles...`, ephemeral: true})
    console.log(`Reinitializing roles in ${interaction.guild.name}`)
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
    await interaction.editReply({content: `Reinitialized roles`, ephemeral: true})
}

module.exports = reinitializeRoles