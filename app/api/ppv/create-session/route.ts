import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

const ppvEvents = {
  'championship-finals-2025': {
    price: 2999,
    name: 'Championship Finals 2025'
  },
  'dance-competition-2025': {
    price: 2499,
    name: 'National Dance Competition 2025'
  },
  'talent-showcase-2025': {
    price: 1999,
    name: 'Youth Talent Showcase 2025'
  }
};

export async function POST(req: Request) {
  try {
    // Dummy user ID for development
    const userId = 'dummy-user-id';
    const { eventId } = await req.json();

    const event = ppvEvents[eventId as keyof typeof ppvEvents];
    if (!event) {
      return new NextResponse('Event not found', { status: 404 });
    }

    const successUrl = encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/ppv/${eventId}?success=true`);
    const cancelUrl = encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/ppv?canceled=true`);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: event.name,
            },
            unit_amount: event.price,
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
        eventId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}