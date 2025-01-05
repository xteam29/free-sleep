import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import config from '../config.js';
const defaultData = {
    timeZone: null,
    left: {
        awayMode: false,
    },
    right: {
        awayMode: false,
    },
    primePodDaily: {
        enabled: false,
        time: '14:00',
    }
};
const file = new JSONFile(`${config.dbFolder}settingsDB.json`);
const settingsDB = new Low(file, defaultData);
await settingsDB.read();
await settingsDB.write();
export default settingsDB;
