async function uid(interaction) {
    const user = interaction.options.getUser('user');
    const uid = interaction.options.getString('uid')
    if (user && uid) {
        await interaction.reply({content: "Failure: Use only one parameter", ephemeral: true})
    }else if (user) {
        var region;
        let region = checkRegion(interaction.member);
        await interaction.reply({content: `<@${user.id}>'s UID is ${users[interaction.member.id]} in region ${region}`, ephemeral: true})
    } else if (uid) {
        if (uid.length > 15) {
            await interaction.reply({content: 'This is not a valid UID; your input is too long', ephemeral: true})
            return;
        }
        users[interaction.member.id] = uid
        await fs.writeFile('./data/users.json', JSON.stringify(users))
        await interaction.reply({content: `UID set to ${uid}`, ephemeral: true})
    } else {
        var region;
        let region = checkRegion(interaction.member);
        await interaction.reply({content: `Your UID is ${users[interaction.member.id]} in region ${region}`, ephemeral: true})
    }
}

module.exports = uid