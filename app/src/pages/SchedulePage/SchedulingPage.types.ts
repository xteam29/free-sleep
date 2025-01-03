import { DayOfWeek } from '@api/schedulesSchema.ts';

export type DaysSelected = Record<
  DayOfWeek,
  boolean
>;

export const DEFAULT_DAYS_SELECTED: DaysSelected = {
  sunday: false,
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
};

export type AccordionExpanded = undefined | 'applyToDays' | 'temperatureAdjustments';

