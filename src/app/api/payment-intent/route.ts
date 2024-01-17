import { Stripe } from 'stripe';

export const runtime = 'edge';

export async function GET() {
  const s = new Stripe(process.env.STRIPE_SECRET ?? '');

  const paymentIntent = await s.paymentIntents.create({
    amount: 300,
    currency: 'usd',
  });

  console.log('payment Intent : ', paymentIntent);

  return Response.json({ client_secret: paymentIntent.client_secret });
}
