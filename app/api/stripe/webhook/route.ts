import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === 'subscription') {
          // Handle subscription payment
          await supabase
            .from('subscriptions')
            .insert({
              user_id: session.metadata?.userId,
              stripe_id: session.subscription as string,
              status: 'active',
              tier: session.metadata?.tier || 'basic'
            });
        } else if (session.mode === 'payment') {
          // Handle one-time payment (PPV)
          await supabase
            .from('ppv_event_access')
            .insert({
              event_id: session.metadata?.eventId,
              user_id: session.metadata?.userId,
              stripe_id: session.payment_intent as string
            });
        }
        break;

      case 'customer.subscription.deleted':
        const subscription = event.data.object as Stripe.Subscription;
        
        // Update subscription status
        await supabase
          .from('subscriptions')
          .update({ status: 'cancelled' })
          .eq('stripe_id', subscription.id);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return new NextResponse('Webhook Error', { status: 400 });
  }
}

export const runtime = 'nodejs';