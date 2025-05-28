import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { auth } from '@clerk/nextjs';

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

    const { title, description, scheduledAt, capacity } = await request.json();

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
        title,
        description,
        scheduled_at: scheduledAt,
        capacity,
        status: 'scheduled'
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(event);
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}