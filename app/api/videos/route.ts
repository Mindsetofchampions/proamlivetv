import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prisma from '@/lib/db';
import { VideoStatus } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const data = await req.json();
    const { title, description, url, thumbnailUrl, duration } = data;

    // Get the user from the database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Create video record with pending status
    const video = await prisma.video.create({
      data: {
        title,
        description,
        url,
        thumbnailUrl,
        duration,
        status: 'PENDING_REVIEW',
        visibility: 'PRIVATE',
        creatorId: user.id
      }
    });

    // In a real app, you would:
    // 1. Upload video to storage (e.g., S3)
    // 2. Start HLS transcoding job
    // 3. Send notification to admins for review
    // 4. Update video status when transcoding completes

    return NextResponse.json(video);
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user || user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const videos = await prisma.video.findMany({
      where: status ? { status: status as VideoStatus } : undefined,
      include: {
        creator: true,
        sponsorships: {
          include: {
            sponsor: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}