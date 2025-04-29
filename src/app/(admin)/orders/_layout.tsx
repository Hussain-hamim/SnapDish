import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function MenuStack() {
  return (
    <Stack>
      {/* <Stack.Screen name='index' options={{ title: 'Orders' }} /> */}
      <Stack.Screen name='list' options={{ headerShown: false }} />
    </Stack>
  );
}
