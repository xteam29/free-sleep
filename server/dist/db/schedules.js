import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
const defaultDailySchedule = {
    temperatures: {},
    power: {
        on: '21:00',
        off: '09:00',
        enabled: false,
        onTemperature: 82,
    },
    alarm: {
        time: "09:00",
        vibrationIntensityStart: 1,
        vibrationIntensityEnd: 1,
        duration: 1,
        enabled: false,
        alarmTemperature: 82,
    }
};
const defaultSideSchedule = {
    sunday: defaultDailySchedule,
    monday: defaultDailySchedule,
    tuesday: defaultDailySchedule,
    wednesday: defaultDailySchedule,
    thursday: defaultDailySchedule,
    friday: defaultDailySchedule,
    saturday: defaultDailySchedule,
};
const defaultData = {
    left: defaultSideSchedule,
    right: defaultSideSchedule,
};
const file = new JSONFile('./lowdb/schedulesDB.json');
const schedulesDB = new Low(file, defaultData);
await schedulesDB.read();
await schedulesDB.write();
export default schedulesDB;
