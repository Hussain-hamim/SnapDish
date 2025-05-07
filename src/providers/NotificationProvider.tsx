import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { registerForPushNotificationsAsync } from '@/lib/notifications';
import { ExpoPushToken } from 'expo-notifications';
import * as Notifications from 'expo-notifications';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthProvider';

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<String | undefined>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`));
  }, []);

  return <>{children}</>;
};

export default NotificationProvider;
