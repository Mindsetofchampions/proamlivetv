import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { auth } from '@clerk/nextjs';
import { sendgrid } from '@/lib/sendgrid';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { status } = await request.json();

    // Update status
    const { data: lead, error } = await supabase
      .from('partner_leads')
      .update({ status })
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    // Send email notification
    try {
      await sendgrid.send({
        to: lead.email,
        from: process.env.SENDGRID_FROM_EMAIL!,
        subject: 'Your Partnership Application Status Update',
        text: `Your partnership application status has been updated to ${status}.`,
        html: `
          <h2>Partnership Application Update</h2>
          <p>Dear ${lead.contact_name},</p>
          <p>Your partnership application status has been updated to <strong>${status}</strong>.</p>
          <p>Our team will be in touch with next steps.</p>
        `
      });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(lead);
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}