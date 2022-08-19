const roleList = require('../data/roleList.json')
const createRole = require('../functions/roleCreate')
const findRole = require('../functions/roleFind')

async function reinitializeRoles(interaction) {
    await interaction.reply({content: `Reinitializing roles...`, ephemeral: true})
    console.log(`Reinitializing roles in ${interaction.guild.name}`)
    let guild = interaction.guild

    for (var roleName of roleList) {
        if (!await findRole(guild, roleName)) {
            await createRole(guild, roleName)
        } else {
            console.log(`${roleName} already exists`)
        }
    }
    await interaction.editReply({content: `Reinitialized roles`, ephemeral: true})
}

module.exports = reinitializeRoles