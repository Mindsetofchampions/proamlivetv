import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '@/lib/s3';
import { prisma } from '@/lib/db';
import formidable from 'formidable';
import { createReadStream } from 'fs';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const form = formidable();
    const [fields, files] = await form.parse(req);
    const file = files.file?.[0];

    if (!file) {
      return new NextResponse('No file uploaded', { status: 400 });
    }

    // Upload to S3
    const key = `videos/${userId}/${Date.now()}-${file.originalFilename}`;
    await s3Client.send(new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: createReadStream(file.filepath),
      ContentType: file.mimetype || 'video/mp4'
    }));

    // Create video record
    const video = await prisma.video.create({
      data: {
        title: fields.title?.[0] || 'Untitled',
        description: fields.description?.[0],
        url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
        creatorId: userId,
        status: 'PENDING_REVIEW'
      }
    });

    return NextResponse.json(video);
  } catch (error) {
    console.error('Error uploading video:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}