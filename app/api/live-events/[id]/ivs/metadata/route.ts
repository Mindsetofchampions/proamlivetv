import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { auth } from '@clerk/nextjs';
import { IvsClient, PutMetadataCommand } from '@aws-sdk/client-ivs';

const ivs = new IvsClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.IVS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.IVS_SECRET_ACCESS_KEY!
  }
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

    // Get event details
    const { data: event, error: eventError } = await supabase
      .from('streams')
      .select('ivs_channel_arn')
      .eq('id', params.id)
      .single();

    if (eventError || !event?.ivs_channel_arn) {
      return new NextResponse('Event not found', { status: 404 });
    }

    const { type, timeOffset, adManifestUrl } = await request.json();

    // Send metadata cue
    await ivs.send(new PutMetadataCommand({
      channelArn: event.ivs_channel_arn,
      metadata: JSON.stringify({
        type,
        timeOffset,
        adManifestUrl
      })
    }));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}