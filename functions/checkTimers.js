const fs = require('fs/promises')

let flags = require('../data/ignored/flags.json');
const { abyssTimer, monthlyTimer, weeklyTimer, timerRun } = require('./timers');
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
    
    //target variable is a dictionary with the parameters:
    // day_spelling OR date_number, hour, minute, flag, message OR message_dict, role_name, server_id (optional)
    //date_number of 32 will use the last date of the month

    //TODO make this work off of the flag specifically
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

// "date_number,hour,minute,variable_name,message_contents"

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
        //'placeholderName':'targetString'

    let triggerCues = mergeDict(defaultEvents, customRecurringEvents);
    let singleTriggerCues = customSingleEvents

    for (const key in triggerCues) {
        let message = triggerCues[key]
        //TODO also this shit
        let flag = triggerCues[key]["flag"];
        switch(checkClock(flag)) {
            case goodTime:
                if (!flags[flag]) {
                    //TODO insert calling the timer functions, may need to rework these to work nicer
                    timerRun(client, message)
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
        let flag = singleTriggerCues[key]["flag"];
        let message = singleTriggerCues[key]
        //TODO fill this shit in ong
        switch(checkClockSingular(singleTriggerCues[`${key}`])) {
            case goodTime:
                if(!flags[flag]) {
                    timerRun(client, message);
                    flagUpdate(flags, flag, false);
                }
            break;
            case postTime:
                //TODO figure out what to do here
            break;
            case badTime:
            break;
        }
    }
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