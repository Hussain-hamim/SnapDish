import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function MenuStack() {
  return (
    <Stack>
      {/* <StatusBar style='light' /> */}
      <Stack.Screen name='index' options={{ title: 'Orders' }} />
      <Stack.Screen name='[id]' options={{ headerShown: true }} />
    </Stack>
  );
}
