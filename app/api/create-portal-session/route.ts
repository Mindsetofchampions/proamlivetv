import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

export async function POST(req: Request) {
  try {
    // Dummy user ID for development
    const userId = 'dummy-user-id';

    // In a real application, you would look up the Stripe customer ID
    // associated with the authenticated user in your database
    const customer = await stripe.customers.list({
      email: 'user@example.com',
      limit: 1
    });

    if (!customer.data[0]?.id) {
      return new NextResponse('No associated Stripe customer found', { status: 404 });
    }

    const returnUrl = encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/account`);

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.data[0].id,
      return_url: returnUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}