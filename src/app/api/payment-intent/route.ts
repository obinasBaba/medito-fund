import { Stripe } from 'stripe';

export const runtime = 'edge';

export async function GET() {
  const s = new Stripe(
    'sk_test_51OZHVcIJ3gOeHcJFYDLVKx1W4LZ8d8YNoDQfV8l1TnImVRuh89RUprZwSF6TjQI4XoWTNR723v9iax3hkKfjaljU00GClxREZW'
  );

  const paymentIntent = await s.paymentIntents.create({
    amount: 300,
    currency: 'usd',
  });

  console.log('payment Intent : ', paymentIntent);

  return Response.json({ client_secret: paymentIntent.client_secret });
}
