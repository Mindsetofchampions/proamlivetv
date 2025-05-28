import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const CREATOR_RATE = parseFloat(process.env.CREATOR_RATE_PER_IMPRESSION || '0.001');

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const videoId = params.id;

    // Atomically increment impressions and create earning record
    const [video, earning] = await prisma.$transaction([
      prisma.video.update({
        where: { id: videoId },
        data: { impressions: { increment: 1 } },
        include: { creator: true }
      }),
      prisma.earning.create({
        data: {
          videoId,
          creatorId: video.creatorId,
          amount: CREATOR_RATE,
          type: 'VIDEO_IMPRESSION'
        }
      })
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error recording impression:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}