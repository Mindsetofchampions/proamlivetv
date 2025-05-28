import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { auth } from '@clerk/nextjs';
import { stringify } from 'csv-stringify/sync';

export async function GET(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get all sponsor leads
    const { data: leads, error } = await supabase
      .from('sponsor_leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Convert to CSV
    const csv = stringify(leads, {
      header: true,
      columns: [
        'id',
        'company_name',
        'contact_name',
        'email',
        'phone',
        'budget',
        'message',
        'status',
        'created_at'
      ]
    });

    // Set headers for file download
    const headers = new Headers();
    headers.set('Content-Type', 'text/csv');
    headers.set(
      'Content-Disposition',
      `attachment; filename=sponsors-${new Date().toISOString().split('T')[0]}.csv`
    );

    return new NextResponse(csv, { headers });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}