import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { auth } from '@clerk/nextjs';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get user record
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', userId)
      .single();

    if (userError || !userData) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Get event
    const { data: event, error: eventError } = await supabase
      .from('streams')
      .select('*')
      .eq('id', params.id)
      .single();

    if (eventError || !event) {
      return new NextResponse('Event not found', { status: 404 });
    }

    // Check capacity
    const { count: attendeeCount } = await supabase
      .from('stream_viewers')
      .select('*', { count: 'exact' })
      .eq('stream_id', params.id)
      .is('left_at', null);

    if (attendeeCount >= event.capacity) {
      return new NextResponse('Event is at capacity', { status: 400 });
    }

    // Add viewer
    const { data: viewer, error } = await supabase
      .from('stream_viewers')
      .insert({
        stream_id: params.id,
        user_id: userData.id
      })
      .select()
      .single();

    if (error) throw error;

    // Return join URL
    return NextResponse.json({
      joinUrl: `/live/${params.id}/stream`
    });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}