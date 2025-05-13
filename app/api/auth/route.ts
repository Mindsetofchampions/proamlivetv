import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Return unauthorized by default since we removed auth
    return new NextResponse('Unauthorized', { status: 401 });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}