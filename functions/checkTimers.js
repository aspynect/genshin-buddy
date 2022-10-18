const fs = require('fs/promises')
let flags = require('../data/ignored/flags.json');
const { abyssTimer, monthlyTimer, weeklyTimer } = require('./timers');

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function checkClock(target) {
    
    //target variable is a string in the form:
    // "day letter/date number,hour,minute"
    
    let timeData =target.split(',');
    if(isNaN(timeData[0])) {
        let dayDict = {'sunday':0,'monday':1,'tuesday':2,'wednesday':3,'thursday':4,'friday':5,'saturday':6};
        let currentDate = new Date();
        if(dayDict[timeData[0]] == currentDate.getDay() && timeData[1] == currentDate.getHours() && currentDate.getMinutes() == timeData[2]){
            return 1;
        } else if (currentDate.getMinutes() == timeData[2] + 1) {
            return 2;
        } else {
            return 0;
        }
    } else {
        if(timeData[0] == currentDate.getDate() && timeData[1] == currentDate.getHours() && currentDate.getMinutes() == timeData[2]){
            return 1;
        } else if (currentDate.getMinutes() == timeData[2] + 1) {
            return 2;
        } else {
            return 0;
        }
    }
}
function checkClockSingular() {

}

//i pity whoever is reading this
async function timerCheck(client) {
    let date = new Date()
    const currentYear = date.getFullYear();
    const currentMonth = (parseInt(date.getMonth) + 1);
    const currentDate = (date.getDate());
    const currentDay = date.getDay();
    const currentHour = date.getHours();
    const currentMinute = date.getMinutes();

    let abyss = flags.abyss
    let weekly = flags.weekly
    let monthly = flags.monthly



    /*if (currentDate == getDaysInMonth(currentYear, (currentMonth))) {
        if (currentHour == 20 && currentMinute == 0 && abyss == true) {
            console.log("Pinging AS Abyss");
            await abyssTimer(client, "AS", "Waxing");
            abyss = false;
        } else if (currentHour == 23 && currentMinute == 0 && abyss) {
            console.log("Pinging EU Abyss");
            await abyssTimer(client, "EU", "Waxing");
            abyss = false;
        } else if (currentMinute == 1) {
            abyss = true
        }
    } else if (currentDate == 1) {
        if (currentHour == 9 && currentMinute == 0) {
            if (abyss) {
                console.log("Pinging NA Abyss");
                await abyssTimer(client, "NA", "Waxing");
                abyss = false;
            }
            if (monthly) {
                console.log("Pinging Monthly");
                await monthlyTimer(client);
                monthly = false;
            }
        } else if (currentMinute == 1) {
            abyss = true;
            monthly = true
        }
    } else if (currentDate == 15) {
        if (currentHour == 20 && currentMinute == 0 && abyss) {
            console.log("Pinging AS Abyss");
            await abyssTimer(client, "AS", "Waning");
            abyss = false;
        } else if (currentHour == 23 && currentMinute == 0 && abyss) {
            console.log("Pinging EU Abyss");
            await abyssTimer(client, "EU", "Waning");
            abyss = false;
        } else if (currentMinute == 1) {
            abyss = true
        }
    } else if (currentDate == 16) {
        if (currentHour == 9 && currentMinute == 0) {
            if (abyss) {
                console.log("Pinging NA Abyss", "Waning");
                await abyssTimer(client, "NA");
                abyss = false;
            }
        } else if (currentMinute == 1) {
            abyss = true;
        }
    }

    if (currentDay == 0) {
        if (currentHour == 20 && currentMinute == 0 && weekly) {
            console.log("Pinging AS Weeklies");
            await weeklyTimer(client, "AS");
            weekly = false;
        } else if (currentHour == 23 && currentMinute == 0 && weekly) {
            console.log("Pinging EU Weeklies");
            await weeklyTimer(client, "EU");
            weekly = false;
        } else if (currentMinute == 1) {
            weekly = true;
        }
    } else if (currentDay == 1) {
        if (currentHour == 9 && currentMinute == 0 && weekly) {
            console.log("Pinging NA Weeklies");
            await weeklyTimer(client, "NA");
            weekly = false;
        } else if (currentMinute == 1) {
            weekly = true;
        }
    }*/
    flags.abyss = abyss
    flags.weekly = weekly
    flags.monthly = monthly
    await fs.writeFile('./data/ignored/flags.json', JSON.stringify(flags));
}



module.exports = timerCheck