import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { auth } from '@clerk/nextjs';
import { createEventSchema } from '@/lib/validation/live-events';
import type { CreateEventInput } from '@/lib/validation/live-events';

export async function GET(request: Request) {
  try {
    // Get upcoming and live events
    const { data: events, error } = await supabase
      .from('streams')
      .select(`
        *,
        creator:creator_id (
          username,
          display_name,
          avatar_url
        )
      `)
      .or('status.eq.live,scheduled_at.gt.now')
      .order('scheduled_at', { ascending: true });

    if (error) throw error;
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const validatedData = createEventSchema.parse(body);

    // Get user record
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', userId)
      .single();

    if (userError || !userData) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Create event
    const { data: event, error } = await supabase
      .from('streams')
      .insert({
        creator_id: userData.id,
        title: validatedData.title,
        description: validatedData.description,
        scheduled_at: validatedData.scheduledAt,
        capacity: validatedData.capacity,
        status: 'scheduled'
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(event);
  } catch (error) {
    console.error('Error:', error);
    if (error.name === 'ZodError') {
      return new NextResponse(JSON.stringify({ errors: error.errors }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new NextResponse('Internal Error', { status: 500 });
  }
}