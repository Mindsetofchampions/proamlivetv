import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { auth } from '@clerk/nextjs';
import { updateEventSchema } from '@/lib/validation/live-events';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const validatedData = updateEventSchema.parse(body);

    // Get user record
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', userId)
      .single();

    if (userError || !userData) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Update event
    const { data: event, error } = await supabase
      .from('streams')
      .update({
        title: validatedData.title,
        description: validatedData.description,
        scheduled_at: validatedData.scheduledAt,
        capacity: validatedData.capacity
      })
      .eq('id', params.id)
      .eq('creator_id', userData.id)
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

export async function DELETE(
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

    // Delete event
    const { error } = await supabase
      .from('streams')
      .delete()
      .eq('id', params.id)
      .eq('creator_id', userData.id);

    if (error) throw error;
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}