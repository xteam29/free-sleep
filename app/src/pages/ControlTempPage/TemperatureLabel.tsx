import Typography from '@mui/material/Typography';
import styles from './TemperatureLabel.module.scss';

type TemperatureLabelProps = {
  sliderTemp: number;
  sliderColor: string;
  currentTargetTemp: number;
  currentTemperatureF: number;
}
export default function TemperatureLabel({
                                           sliderTemp,
                                           sliderColor,
                                           currentTargetTemp,
                                           currentTemperatureF
                                         }: TemperatureLabelProps) {
  let topTitle: string;
  // Handle user actively changing temp
  if (sliderTemp !== currentTargetTemp) {
    if (sliderTemp < currentTemperatureF) {
      topTitle = 'Cool to';
    } else if (sliderTemp > currentTemperatureF) {
      topTitle = 'Warm to';
    } else {
      topTitle = '';
    }
  } else {
    if (currentTemperatureF < currentTargetTemp) {
      topTitle = 'Warming to';
    } else if (currentTemperatureF > currentTargetTemp) {
      topTitle = 'Cooling to';
    } else {
      topTitle = '';
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '35%', // Center vertically
        left: '50%', // Center horizontally
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        textAlign: 'center',
        height: '200px',
        width: '100%',
      }}
    >
      {/* Top Title */}
      <Typography
        style={{ top: '70%', }}
        className={styles.label}
      >
        {topTitle}
      </Typography>

      {/* Temperature */}
      <Typography
        style={{ top: '80%' }}
        variant="h3"
        color={sliderColor}
        className={styles.label}
      >
        {`${currentTargetTemp !== sliderTemp ? sliderTemp : currentTargetTemp}°F`}
      </Typography>

      {/* Currently at label */}
      <Typography
        style={{ top: '105%' }}
        className={styles.label}
      >
        {`Currently at ${currentTemperatureF}°F`}
      </Typography>
    </div>
  );
}
