import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

const supabaseUrl = 'https://ftshbergelkxcqcgoqjp.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0c2hiZXJnZWxreGNxY2dvcWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5Mjk2NDcsImV4cCI6MjA2MTUwNTY0N30.RsV-z0jGyx3V6DzPLZ_zD0xnAnMvPy9Hb1C3i6ZUoss';

const PaymentComponent = () => {
  const handlePayment = async () => {
    const amount = 5000; // Amount in cents (e.g., $50.00)
    const currency = 'usd'; // Currency code
    const paymentMethodId = 'pm_card_visa'; // Replace with the actual payment method ID

    try {
      const paymentIntent = await processPayment(
        amount,
        currency,
        paymentMethodId
      );
      console.log('Payment processed successfully:', paymentIntent);
      // You can add additional logic here, like showing a success message to the user
    } catch (error) {
      console.error('Payment failed:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePayment}>
        <Text>Pay now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentComponent;

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
          Authorization: `Bearer ${supabaseAnonKey}`, // Include the authorization header if needed
        },
        body: JSON.stringify({ amount, currency, paymentMethodId }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    console.log('Payment Intent:', data);
    return data; // Return the payment intent data
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error; // Handle the error as needed
  }
};
