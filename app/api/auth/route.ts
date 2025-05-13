import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Dummy user ID for development
    const userId = 'dummy-user-id';
    return NextResponse.json({ userId });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}