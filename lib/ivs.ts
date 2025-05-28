import { IvsClient, CreateChannelCommand, CreateStreamKeyCommand, GetStreamKeyCommand } from '@aws-sdk/client-ivs';

if (!process.env.IVS_ACCESS_KEY_ID || !process.env.IVS_SECRET_ACCESS_KEY || !process.env.AWS_REGION) {
  throw new Error('Missing AWS IVS credentials');
}

const ivs = new IvsClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.IVS_ACCESS_KEY_ID,
    secretAccessKey: process.env.IVS_SECRET_ACCESS_KEY,
  }
});

export async function createStreamChannel(eventId: string) {
  try {
    // Create channel
    const createChannelResponse = await ivs.send(new CreateChannelCommand({
      name: `event-${eventId}`,
      latencyMode: 'LOW',
      type: 'STANDARD'
    }));

    const channelArn = createChannelResponse.channel?.arn;
    if (!channelArn) throw new Error('Failed to get channel ARN');

    // Create stream key
    const createKeyResponse = await ivs.send(new CreateStreamKeyCommand({
      channelArn
    }));

    return {
      channelArn,
      streamKeyValue: createKeyResponse.streamKey?.value,
      ingestEndpoint: createChannelResponse.channel?.ingestEndpoint,
      playbackUrl: createChannelResponse.channel?.playbackUrl
    };
  } catch (error) {
    console.error('Error creating IVS channel:', error);
    throw error;
  }
}

export async function getStreamKey(streamKeyArn: string) {
  try {
    const response = await ivs.send(new GetStreamKeyCommand({
      arn: streamKeyArn
    }));
    return response.streamKey?.value;
  } catch (error) {
    console.error('Error getting stream key:', error);
    throw error;
  }
}