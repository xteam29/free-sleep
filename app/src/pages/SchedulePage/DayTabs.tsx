import { Tab, Tabs } from '@mui/material';
import { useScheduleStore } from './scheduleStore.tsx';
import { useAppStore } from '@state/appStore.tsx';

export default function DayTabs() {
  const { selectDay, selectedDayIndex } = useScheduleStore();
  const { isUpdating } = useAppStore();

  return (
    <Tabs
      value={selectedDayIndex}
      onChange={(_, index) => selectDay(index)}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="Days of the week"
      sx={{
        width: '100%',
        maxWidth: '100%',
        overflowX: 'auto',
      }}
    >
      {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
        <Tab key={index} label={day} disabled={isUpdating}/>
      ))}
    </Tabs>
  );
}
