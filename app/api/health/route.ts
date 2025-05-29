import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import { s3Client } from '@/lib/s3';
import { ListBucketsCommand } from '@aws-sdk/client-s3';

export async function GET() {
  try {
    const services = {
      database: false,
      storage: false,
      stripe: false
    };

    // Check Supabase connection
    const { data: dbCheck, error: dbError } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    services.database = !dbError;

    // Check S3 connection
    try {
      await s3Client.send(new ListBucketsCommand({}));
      services.storage = true;
    } catch (error) {
      console.error('S3 health check failed:', error);
    }

    // Check Stripe connection
    try {
      await stripe.balance.retrieve();
      services.stripe = true;
    } catch (error) {
      console.error('Stripe health check failed:', error);
    }

    return NextResponse.json({
      status: 'healthy',
      version: '1.0.0',
      services
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}