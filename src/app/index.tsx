import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect, Stack } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const index = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size='large' color={Colors.light.tint} />
      </View>
    );
  }

  if (!session) {
    return <Redirect href='/sign-in' />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* 🧑‍🍳 Header */}
      <View style={styles.header}>
        <MaterialCommunityIcons
          // name='silverware-fork-knife'
          name='food-turkey'
          size={42}
          // color={Colors.light.tint}
          color='chocolate'
        />
        <Text style={styles.title}>FoodieHub</Text>
        <Text style={styles.subtitle}>Pick your role & start ordering</Text>
      </View>

      {/* 🚀 Action Panel */}
      <View style={styles.card}>
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
    backgroundColor: Colors.light.background,
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
});

export default index;
