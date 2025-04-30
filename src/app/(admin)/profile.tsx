import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link, router } from 'expo-router';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';

const profile = () => {
  return (
    <View style={styles.container}>
      <Button
        text='Go to Home'
        onPress={() => {
          //   supabase.auth.signOut();
          router.dismissAll();
        }}
        icon={<Ionicons name='log-out' size={22} color='white' />}
      />
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
