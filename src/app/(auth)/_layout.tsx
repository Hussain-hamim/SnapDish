import { useAuth } from '@/providers/AuthProvider';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
  const { session } = useAuth();

  if (session) {
    <Redirect href={'/'} />;
  }

  return <Stack />;
}
