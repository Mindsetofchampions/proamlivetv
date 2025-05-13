import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

const CREATOR_RATE_PER_IMPRESSION = 0.001; // $0.001 per impression

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Dummy user ID for development
    const userId = 'dummy-user-id';
    const videoId = params.id;

    // Increment impression count
    const video = await prisma.video.update({
      where: { id: videoId },
      data: {
        impressions: { increment: 1 }
      },
      include: {
        creator: true
      }
    });

    // Create earning record
    await prisma.earning.create({
      data: {
        creatorId: video.creatorId,
        videoId: video.id,
        amount: CREATOR_RATE_PER_IMPRESSION,
        type: 'VIDEO_IMPRESSION'
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}