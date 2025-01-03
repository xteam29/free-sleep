import Typography from '@mui/material/Typography';
import { DeepPartial } from 'ts-essentials';

import AwayModeSwitch from './AwayModeSwitch.tsx';
import PageContainer from '../PageContainer.tsx';
import TimeZoneSelector from './TimeZoneSelector.tsx';
import { Settings } from '@api/settingsSchema.ts';
import { postSettings, useSettings } from '@api/settings.ts';
import { useAppStore } from '@state/appStore.tsx';
import DailyPriming from './DailyPriming.tsx';
import LicenseModal from './LicenseModal.tsx';

export default function SettingsPage() {
  const { data: settings, refetch } = useSettings();
  const { setIsUpdating } = useAppStore();

  const updateSettings = (settings: DeepPartial<Settings>) => {
    setIsUpdating(true);

    postSettings(settings)
      .then(() => {
        // Wait 1 second before refreshing the device status
        return new Promise((resolve) => setTimeout(resolve, 1_000));
      })
      .then(() => refetch())
      .catch(error => {
        console.error(error);
      })
      .finally(() => setIsUpdating(false));
  };

  return (
    <PageContainer>
      <TimeZoneSelector settings={settings} updateSettings={updateSettings}/>
      <DailyPriming settings={settings} updateSettings={updateSettings}/>
      <Typography variant="h5">Left Side</Typography>
      <AwayModeSwitch side="left" settings={settings} updateSettings={updateSettings}/>

      <Typography variant="h5">Right Side</Typography>
      <AwayModeSwitch side="right" settings={settings} updateSettings={updateSettings}/>
      <LicenseModal />
    </PageContainer>
  );
}
