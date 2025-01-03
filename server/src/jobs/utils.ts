import { DayOfWeek } from '../db/schedulesSchema.js';

export function getDayOfWeekIndex(day: DayOfWeek): number {
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return daysOfWeek.indexOf(day);
}
