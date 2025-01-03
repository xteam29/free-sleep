import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

import { Settings } from './settingsSchema.js';


const defaultData: Settings = {
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

const file = new JSONFile<Settings>('./lowdb/settingsDB.json');
const settingsDB = new Low<Settings>(file, defaultData);
await settingsDB.read();
await settingsDB.write();

export default settingsDB;
