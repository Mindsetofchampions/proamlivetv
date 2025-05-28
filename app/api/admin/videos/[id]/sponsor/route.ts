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

    const { sponsorId, placement } = await request.json();

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

    // Create sponsorship record
    const { data: sponsorship, error } = await supabase
      .from('video_sponsors')
      .insert({
        video_id: params.id,
        sponsor_id: sponsorId,
        placement_type: placement,
        status: 'ACTIVE',
        start_date: new Date().toISOString()
      })
      .select(`
        *,
        sponsor:sponsors(*)
      `)
      .single();

    if (error) {
      console.error('Error assigning sponsor:', error);
      return new NextResponse('Failed to assign sponsor', { status: 500 });
    }

    return NextResponse.json(sponsorship);
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}