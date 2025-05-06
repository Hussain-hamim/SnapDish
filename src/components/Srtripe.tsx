import React from 'react';
import { View } from 'react-native';
import Button from './Button'; // your custom button

const supabaseUrl = 'https://ftshbergelkxcqcgoqjp.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0c2hiZXJnZWxreGNxY2dvcWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5Mjk2NDcsImV4cCI6MjA2MTUwNTY0N30.RsV-z0jGyx3V6DzPLZ_zD0xnAnMvPy9Hb1C3i6ZUoss';

const PaymentComponent = () => {
  const handlePayment = async () => {
    const amount = 5000; // in cents, e.g. $50.00
    const currency = 'usd';
    const paymentMethodId = 'pm_card_visa'; // Replace this with dynamic ID from frontend Stripe SDK

    try {
      const paymentIntent = await processPayment(
        amount,
        currency,
        paymentMethodId
      );
      console.log('✅ Payment processed successfully:', paymentIntent);
      // show success UI
    } catch (error: any) {
      console.error('❌ Payment failed:', error?.message || error);
      // show error UI
    }
  };

  return (
    <View>
      <Button onPress={handlePayment} text='Pay Now' />
    </View>
  );
};

export default PaymentComponent;

// Function that calls your Supabase Edge Function
const processPayment = async (
  amount: number,
  currency: string,
  paymentMethodId: string
) => {
  try {
    const response = await fetch(
      `${supabaseUrl}/functions/v1/process-payments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({ amount, currency, paymentMethodId }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('🔴 Supabase Function Error:', data);
      throw new Error(data.error || 'Unknown error from server');
    }

    return data;
  } catch (error: any) {
    console.error('🔴 Network or parsing error:', error?.message || error);
    throw new Error(error?.message || 'Payment request failed');
  }
};
