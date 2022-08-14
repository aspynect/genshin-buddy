async function findRole(guild, NameString) {
    let roles = await guild.roles.fetch()
    for (const roleId of roles.keys()) {
        const r = roles.get(roleId)
        if (r.name == NameString) {
            console.log(`Successfully found role ${NameString}`)
            return r;
        }
    }
    console.log("Failed to find role")
    return undefined;
}

module.exports = findRole