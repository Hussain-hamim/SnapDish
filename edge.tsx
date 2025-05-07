// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import Stripe from 'https://esm.sh/stripe@13.10.0?target=deno&deno-std=0.132.0&no-check';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// esm.sh is used to compile stripe-node to be compatible with ES modules.
//💳 3. Stripe SDK Initialization
export const stripe = Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  httpClient: Stripe.createFetchHttpClient(),
});
console.log('Hello from Functions!');

export const createOrRetrieveProfile = async (req: Request) => {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! },
      },
    }
  );
  // Now we can get the session or user object
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) throw new Error('No user found');

  const { data: profile, error } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  if (error || !profile) {
    throw new Error('Profile not found');
  }

  console.log(profile);

  if (profile.stripe_customer_id) {
    return profile.stripe_customer_id;
  }

  // Create a Stripe customer
  const customer = await stripe.customers.create({
    email: user.email,
    metadata: { uid: user.id },
  });

  await supabaseClient
    .from('profiles')
    .update({ stripe_customer_id: customer.id })
    .eq('id', profile.id);

  return customer.id;
};

// Deno serve() listens for incoming HTTP requests.
serve(async (req: Request) => {
  try {
    const { amount } = await req.json();
    const customer = await createOrRetrieveProfile(req);

    // Create an ephemeral Key so that the Stripe SDK can fetch the customer's stored payment methods.
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer },
      { apiVersion: '2020-08-27' }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      customer: customer,
    });

    const res = {
      paymentIntent: paymentIntent.client_secret,
      publishableKey: Deno.env.get('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
      customer: customer,
      ephemeralKey: ephemeralKey.secret,
    };

    return new Response(JSON.stringify(res), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});

// To invoke:
// curl -i --request POST 'http://localhost:54321/functions/v1/payment-sheet' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"amount":1150}'
