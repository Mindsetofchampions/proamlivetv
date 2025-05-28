import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { auth } from '@clerk/nextjs';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Verify admin role
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', userId)
      .single();

    if (userError || !userData) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role:roles(name)')
      .eq('user_id', userData.id)
      .single();

    if (roleError || !roleData?.role?.name || roleData.role.name !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Update video status
    const { data: video, error } = await supabase
      .from('videos')
      .update({ 
        status: 'APPROVED',
        published_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Error approving video:', error);
      return new NextResponse('Failed to approve video', { status: 500 });
    }

    return NextResponse.json(video);
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}