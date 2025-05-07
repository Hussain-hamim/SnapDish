import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  useColorScheme,
} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect, Stack } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
//https://expo.dev/artifacts/eas/cBwdy4NumNH9hpM6wzdigD.apk

const index = () => {
  const { session, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <LinearGradient colors={['#1f1c2c', '#928DAB']} style={styles.container2}>
        <Stack.Screen options={{ headerShown: false }} />
        <Image
          source={require('../../assets/images/snapdish.png')} // Replace with your logo
          style={styles.logo}
          resizeMode='contain'
        />
        <ActivityIndicator
          size='large'
          color='#fff'
          style={{ marginTop: 20 }}
        />
        <Text style={styles.text}>Connecting to network...</Text>
      </LinearGradient>
    );
  }

  if (!session) {
    return <Redirect href='/sign-in' />;
  }

  if (!isAdmin) {
    return <Redirect href='/(user)' />;
  }

  const colorScheme = useColorScheme();

  const statusbarColor = colorScheme === 'dark' ? 'light' : 'dark';

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style={statusbarColor} />

      {/* 🧑‍🍳 Header */}
      <View style={styles.header}>
        <MaterialCommunityIcons
          name='food-turkey'
          size={42}
          // color={Colors.light.tint}
          color='chocolate'
        />
        <Text style={styles.title}>SnapDish</Text>
        <Text style={styles.subtitle}>Pick your role & start ordering</Text>
      </View>

      {/* 🚀 Action Panel */}
      <View
        style={[
          styles.card,
          { backgroundColor: colorScheme === 'dark' ? '#1f1c2c' : '#fff' },
        ]}
      >
        <Link href='/(user)' asChild>
          <Button
            text='User Dashboard'
            icon={<Ionicons name='person' size={22} color='white' />}
          />
        </Link>

        <Link href='/(admin)' asChild>
          <Button
            text='Admin Dashboard'
            icon={<Ionicons name='settings' size={22} color='white' />}
          />
        </Link>

        <Link href='/sign-up' asChild>
          <Button
            text='Create New Account'
            icon={<Ionicons name='log-in' size={22} color='white' />}
          />
        </Link>

        <Link href='/sign-in' asChild>
          <Button
            text='Sign In'
            icon={<Ionicons name='log-in' size={22} color='white' />}
          />
        </Link>

        <Button
          text='Sign Out'
          onPress={() => supabase.auth.signOut()}
          icon={<Ionicons name='log-out' size={22} color='white' />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    // backgroundColor: Colors.light.background,
    padding: 20,
    paddingTop: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 10,
    // color: Colors.light.tint,
    color: 'chocolate',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
    gap: 15,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  text: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '300',
    letterSpacing: 0.5,
  },
});

export default index;
