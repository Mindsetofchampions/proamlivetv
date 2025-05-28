import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { auth } from '@clerk/nextjs';

const ppvEvents = {
  'championship-finals-2025': {
    price: 2999,
    name: 'Championship Finals 2025'
  },
  'dance-competition-2025': {
    price: 2499,
    name: 'National Dance Competition 2025'
  }
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { eventId } = await req.json();

    const event = ppvEvents[eventId as keyof typeof ppvEvents];
    if (!event) {
      return new NextResponse('Event not found', { status: 404 });
    }

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
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/ppv/${eventId}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/ppv/${eventId}?canceled=true`,
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