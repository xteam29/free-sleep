import { Box, Slider, TextField, Typography } from '@mui/material';
import { useAppStore } from '@state/appStore.tsx';
import { useScheduleStore } from './scheduleStore.tsx';


export default function StartTimeSection() {
  const { isUpdating } = useAppStore();
  const { selectedSchedule, updateSelectedSchedule } = useScheduleStore();

  const disabled = !selectedSchedule?.power.enabled || isUpdating;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 6, p: 0, width: '100%' }} id="start-time-section">
      {/* Start time */}
      <TextField
        label="Start Time"
        type="time"
        value={selectedSchedule?.power.on || '21:00'}
        disabled={disabled }
        onChange={(event) => {
          updateSelectedSchedule({
            power: {
              on: event.target.value,
            }
          });
        }}
        sx={{ width: '150px' }}
      />

      {/* Temperature slider */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, flex: 1, pr: 1 }}>
        {/* Temperature label */}
        <Typography sx={{ mb: -1, textAlign: 'center' }}>
          {`Start at ${selectedSchedule?.power?.onTemperature}°F`}
        </Typography>
        <Slider
          value={selectedSchedule?.power?.onTemperature || 82}

          onChange={(_, newValue) => {
            updateSelectedSchedule({
              power: {
                // @ts-ignore
                onTemperature: newValue
              }
            });
          }}
          min={55}
          max={110}
          step={1}
          marks={[
            { value: 55, label: '55°F' },
            { value: 110, label: '110°F' },
          ]}
          disabled={disabled}
          sx={{ width: '100%' }}
        />
      </Box>
    </Box>
  );
}
