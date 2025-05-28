import { IvsClient, PutMetadataCommand } from '@aws-sdk/client-ivs';

if (!process.env.AWS_REGION) {
  throw new Error('Missing AWS region');
}

const ivs = new IvsClient({
  region: process.env.AWS_REGION
});

export const IVS_CONFIG = {
  channelArn: process.env.IVS_CHANNEL_ARN!,
  ingestEndpoint: process.env.IVS_INGEST_ENDPOINT!,
  playbackUrl: process.env.IVS_PLAYBACK_URL!
};

export async function putMetadata(metadata: any) {
  try {
    await ivs.send(new PutMetadataCommand({
      channelArn: IVS_CONFIG.channelArn,
      metadata: JSON.stringify(metadata)
    }));
  } catch (error) {
    console.error('Error putting metadata:', error);
    throw error;
  }
}