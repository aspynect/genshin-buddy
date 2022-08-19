const roleList = require('../data/roleList.json')
const findRole = require('../functions/roleFind')


async function botGoodbye(interaction) {
    let guild = interaction.guild
    await interaction.reply({content: `Leaving cleanly`, ephemeral: true})
    for (var roleName of roleList) {
        console.log(`Deleting role ${roleName}`)
        await interaction.editReply({content: `Deleting role ${roleName}`, ephemeral: true})
        let role = await findRole(guild, roleName)
        
        try {
            if (role) {await guild.roles.delete(role)}
        } catch (e) {
            console.log(e)
        }
        console.log("Done")
    }
    await interaction.editReply({content: `Leaving server. Goodbye!`, ephemeral: true})
    await guild.leave();
    console.log(`Left ${guild.name}`)
}

module.exports = botGoodbye