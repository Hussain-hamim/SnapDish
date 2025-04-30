import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import { useAuth } from '@/providers/AuthProvider';

function TabBarIcon({
  name,
  color,
  focused,
}: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  focused: boolean;
}) {
  return (
    <FontAwesome
      name={name}
      size={focused ? 26 : 22}
      color={color}
      style={{ marginBottom: -2 }}
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();

  if (!session) {
    return <Redirect href='/' />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          elevation: 10,
        },
      }}
    >
      <Tabs.Screen name='index' options={{ href: null }} />

      <Tabs.Screen
        name='menu'
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='cutlery' color={color} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name='orders'
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='list' color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='user' color={color} focused={focused} />
          ),
          headerShown: true,
        }}
      />
    </Tabs>
  );
}
