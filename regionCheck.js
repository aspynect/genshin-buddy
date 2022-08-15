const users = require('./data/users.json');

function checkRegion(user) {
    console.log(users[user.id]);
    if (users[user.id]) {
        switch (users[user.id][0]) {
            case '6': 
                region = "NA"
                break;
            case '7': 
                region = "EU"
                break;
            case '8': 
                region = "AS"
                break;
            case '9': 
                region = "HK/TW"
                break;
            default:
                region = "cringe doodoohead"
                break;
        }
        return region;
    } else {return undefined}
    
}

module.exports = checkRegion