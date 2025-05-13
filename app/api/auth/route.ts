import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const userId = 'dummyUserId';
    return NextResponse.json({ userId });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}