import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

export async function POST(req: Request) {
  try {
    // Dummy user ID for development
    const userId = 'dummy-user-id';
    const { priceId } = await req.json();

    const successUrl = encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/account?success=true`);
    const cancelUrl = encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/subscribe?canceled=true`);

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}