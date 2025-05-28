import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { auth } from '@clerk/nextjs';
import { z } from 'zod';

const sponsorSchema = z.object({
  sponsorId: z.string().uuid(),
  placementType: z.enum(['pre-roll', 'mid-roll', 'overlay']),
  timeOffset: z.number().int().min(0).optional(),
  adManifestUrl: z.string().url()
});

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const validatedData = sponsorSchema.parse(body);

    const { data: sponsor, error } = await supabase
      .from('live_event_sponsors')
      .insert({
        live_event_id: params.id,
        sponsor_id: validatedData.sponsorId,
        placement_type: validatedData.placementType,
        time_offset: validatedData.timeOffset,
        ad_manifest_url: validatedData.adManifestUrl
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(sponsor);
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({ errors: error.errors }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data: sponsors, error } = await supabase
      .from('live_event_sponsors')
      .select(`
        *,
        sponsor:sponsors (
          name,
          logo_url
        )
      `)
      .eq('live_event_id', params.id)
      .order('time_offset', { ascending: true });

    if (error) throw error;

    return NextResponse.json(sponsors);
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}