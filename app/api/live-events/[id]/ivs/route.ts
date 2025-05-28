import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { auth } from '@clerk/nextjs';
import { createStreamChannel } from '@/lib/ivs';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Create IVS channel and stream key
    const { channelArn, streamKeyValue, ingestEndpoint, playbackUrl } = 
      await createStreamChannel(params.id);

    // Update event with IVS details
    const { data: event, error } = await supabase
      .from('streams')
      .update({
        ivs_channel_arn: channelArn,
        ivs_stream_key: streamKeyValue,
        ivs_playback_url: playbackUrl
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      ingestEndpoint,
      streamKey: streamKeyValue,
      playbackUrl
    });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}