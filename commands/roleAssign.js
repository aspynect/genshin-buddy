const findRole = require("../functions/roleFind");

async function assignRole(guild, targetUser, roleName, interaction) {
    console.log(roleName)
    if (!roleName && interaction) {await interaction.reply({content: `Please select a role to assign or remove`, ephemeral: true})}
    let role = await findRole(guild, roleName)
    targetRole = role.id
    let userRoles = targetUser._roles
    if (userRoles.includes(`${targetRole}`)) {
        await targetUser.roles.remove(role);
        await interaction.reply({content: `Successfully removed role ${role.name}`, ephemeral: true});
        console.log("Removed Role");
    } else {
        await targetUser.roles.add(role);
        await interaction.reply({content: `Successfully added role ${role.name}`, ephemeral: true});
        console.log("Added Role");
    }
}

module.exports = assignRole