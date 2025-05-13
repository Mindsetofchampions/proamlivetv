import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { VideoStatus } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const userId = 'dummyUserId';
    
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

    return NextResponse.json(video);
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const userId = 'dummyUserId';
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    
    const user = { role: 'ADMIN' };

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