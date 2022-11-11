const fs = require('fs/promises')
let flags = require('../data/ignored/flags.json');
const { abyssTimer, monthlyTimer, weeklyTimer } = require('./timers');
const defaultEvents = require('../data/defaultEvents.json');
const customRecurringEvents = require('../data/ignored/customEventsRecurring.json');
const customSingleEvents = require('../data/ignored/customEventsSingle.json')

const goodTime = 1
const postTime = 2
const badTime = 0

function mergeDict(obj1, obj2){
    var output = {};
    for (var i in obj1) {
    output[i] = obj1[i];
    }
    for (var j in obj2) {
    output[j] = obj2[j];
    }
    return output;
};

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function checkClock(target) {
    
    //target variable is a string in the form:
    // "day_spelling/date_number,hour,minute,flag_name"
    //date_number of 32 will use the last date of the month
    
    let timeData =target.split(',');
    let currentDate = new Date();
    if(isNaN(parseInt(timeData[0]))) {
        let dayDict = {'sunday':0,'monday':1,'tuesday':2,'wednesday':3,'thursday':4,'friday':5,'saturday':6};
        if (dayDict[timeData[0]] == currentDate.getDay() && timeData[1] == currentDate.getHours()) {
            if (currentDate.getMinutes() == timeData[2]){
                return goodTime;
            } if (currentDate.getMinutes() == timeData[2] + 1) {
                return postTime;
            }
        } else {
            return badTime;
        }
    } else {
        if (timeData[0] == 32) {
            timeData[0] = getDaysInMonth((currentDate.getFullYear(), currentDate.getMonth();
        }
        if (timeData[0] == currentDate.getDate() && timeData[1] == currentDate.getHours()) {
            if(currentDate.getMinutes() == timeData[2]){
                return goodTime;
            } else if (currentDate.getMinutes() == timeData[2] + 1) {
                return postTime;
            }
        } else {
            return badTime;
        }
    }
}

// "date_number,hour,minute,variable_name"

function checkClockSingular() {
    if (timeData[0] == currentDate.getDate() && timeData[1] == currentDate.getHours()) {
        if(currentDate.getMinutes() == timeData[2]){
            return goodTime;
        } else if (currentDate.getMinutes() == timeData[2] + 1) {
            return postTime;
        }
    } else {
        return badTime;
    }
}

//funny to reference
function flagUpdate(obj, name, value) {
    obj[name] = value;
}


async function timerCheck(client) {
    
    //combine jsons into one dictionary ?
    let combinedCues = mergeDict(defaultEvents, customRecurringEvents);
    
    //'placeholderName':'targetString'

    let triggerCues = {combinedCues}
    let singleTriggerCues = customSingleEvents

    for (const key in triggerCues) {
        flag = triggerCues[key].split(',');
        switch(checkClock(triggerCues[key])) {
            case goodTime:
                if (!flags[flag]) {
                    //insert calling the timer functions, need to rework these to work nicer
                    flagUpdate(flags, flag, false)
                }
            break;
            case postTime:
                flagUpdate(flags, flag, true)
            break;
            case badTime:
            break;
        }
    }
    for (const key in singleTriggerCues) {
        checkClockSingular(singleTriggerCues[`${key}`])
    }





    /*const 
    let date = new Date()
    currentYear = date.getFullYear();
    const currentMonth = (parseInt(date.getMonth) + 1);
    const currentDate = (date.getDate());
    const currentDay = date.getDay();
    const currentHour = date.getHours();
    const currentMinute = date.getMinutes();

    let abyss = flags.abyss
    let weekly = flags.weekly
    let monthly = flags.monthly*/

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
    }
    flags.abyss = abyss
    flags.weekly = weekly
    flags.monthly = monthly
    await fs.writeFile('./data/ignored/flags.json', JSON.stringify(flags));*/
}



module.exports = timerCheck