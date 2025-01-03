import React, { useEffect } from 'react';
import { create } from 'zustand';
import { useIsFetching } from '@tanstack/react-query';
import moment from 'moment-timezone';
import { useSettings } from '@api/settings.ts';

export type Side = 'left' | 'right';

type AppState = {
  isUpdating: boolean;
  setIsUpdating: (isUpdating: boolean) => void;
  side: Side;
  setSide: (side: Side) => void;
};

// Create Zustand store
export const useAppStore = create<AppState>((set) => ({
  isUpdating: false,
  setIsUpdating: (isUpdating: boolean) => set({ isUpdating }),
  side: 'left',
  setSide: (side: Side) => set({ side }),
}));

// AppStoreProvider to sync Zustand with react-query's isFetching
export function AppStoreProvider({ children }: React.PropsWithChildren) {
  const isFetching = useIsFetching() > 0;
  const { data: settings } = useSettings();
  useEffect(() => {
    if (!settings) return;
    // @ts-ignore
    moment.tz.setDefault(settings.timeZone);
  }, []);
  // Directly update the store's state
  useEffect(() => {
    useAppStore.setState({ isUpdating: isFetching });
  }, [isFetching]);

  return <>{children}</>;
}
