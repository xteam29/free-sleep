import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { DailySchedule, Schedules, SideSchedule } from './schedulesSchema.js';

const defaultDailySchedule: DailySchedule = {
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
}

const defaultSideSchedule: SideSchedule = {
  sunday: defaultDailySchedule,
  monday: defaultDailySchedule,
  tuesday: defaultDailySchedule,
  wednesday: defaultDailySchedule,
  thursday: defaultDailySchedule,
  friday: defaultDailySchedule,
  saturday: defaultDailySchedule,
}

const defaultData: Schedules = {
  left: defaultSideSchedule,
  right: defaultSideSchedule,
};

const file = new JSONFile<Schedules>('./lowdb/schedulesDB.json');
const schedulesDB = new Low<Schedules>(file, defaultData);
await schedulesDB.read();
await schedulesDB.write();

export default schedulesDB;
