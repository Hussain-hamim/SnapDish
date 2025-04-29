import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Link, Stack } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps='handled'
      >
        <Stack.Screen options={{ title: 'Sign Up' }} />

        {/* 🍔 Header */}
        <View style={styles.header}>
          <Ionicons name='fast-food' size={48} color={Colors.light.tint} />
          <Text style={styles.title}>Join FoodieHub</Text>
          <Text style={styles.subtitle}>Order food faster than ever</Text>
        </View>

        {/* 📝 Sign Up Form Card */}
        <View style={styles.card}>
          <View style={styles.inputWrapper}>
            <MaterialIcons
              name='email'
              size={20}
              color='gray'
              style={styles.inputIcon}
            />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder='Email address'
              placeholderTextColor='#aaa'
              keyboardType='email-address'
              autoCapitalize='none'
              style={styles.input}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons
              name='lock-closed-outline'
              size={20}
              color='gray'
              style={styles.inputIcon}
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder='Password'
              placeholderTextColor='#aaa'
              secureTextEntry
              style={styles.input}
            />
          </View>

          <Button
            disabled={loading}
            onPress={handleSignUp}
            text={loading ? 'Creating account...' : 'Create Account'}
          />

          <Link href='/sign-in' style={styles.textButton}>
            Already have an account?{' '}
            <Text style={styles.linkText}>Sign in</Text>
          </Link>
        </View>

        {/* 🍰 Footer (Optional) */}
        {/* <Text style={styles.footer}>Your cravings, one tap away.</Text> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.tint,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 25,
    paddingTop: 40,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  textButton: {
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 14,
    color: 'gray',
  },
  linkText: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 30,
    color: '#aaa',
  },
});

export default SignUpScreen;
