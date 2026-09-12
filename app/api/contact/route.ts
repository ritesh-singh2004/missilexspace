import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Enter a valid name.').max(120),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s-]{10,15}$/, 'Enter a valid phone number.'),
  organization: z.string().trim().max(200).optional().or(z.literal('')),
  researchInterest: z.string().trim().min(10, 'Describe your research interest.').max(500),
  message: z.string().trim().min(20, 'Message must be at least 20 characters.').max(5000)
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
  try {
    // Fail fast with a specific, actionable error rather than letting the
    // Resend SDK throw an opaque error deeper in the request.
    if (!process.env.RESEND_API_KEY) {
      throw new Error('Missing RESEND_API_KEY');
    }
    if (!process.env.RESEND_FROM) {
      throw new Error('Missing RESEND_FROM');
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? 'Invalid submission.';
      return NextResponse.json({ success: false, message: firstError }, { status: 400 });
    }

    const data = parsed.data;
    const organization = data.organization && data.organization.length > 0 ? data.organization : 'N/A';

    // new Resend(apiKey) throws synchronously if the key is malformed, so this
    // is inside the same try/catch as everything else below.
    const resend = new Resend(process.env.RESEND_API_KEY);

    const textBody = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Organization: ${organization}`,
      `Research Interest: ${data.researchInterest}`,
      '',
      'Message:',
      data.message
    ].join('\n');

    const htmlBody = `
      <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;">
        <div style="background:#0A4D8C;padding:20px 24px;">
          <p style="margin:0;color:#F28C28;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">MissileX Rocket Space</p>
          <h1 style="margin:8px 0 0;color:#ffffff;font-size:20px;">New Contact Inquiry</h1>
        </div>
        <table style="width:100%;padding:24px;border:1px solid #E5E7EB;border-top:none;" cellpadding="0" cellspacing="0">
          <tr><td style="padding:0 0 12px;color:#222222;font-size:14px;"><strong>Name:</strong> ${escapeHtml(data.name)}</td></tr>
          <tr><td style="padding:0 0 12px;color:#222222;font-size:14px;"><strong>Email:</strong> ${escapeHtml(data.email)}</td></tr>
          <tr><td style="padding:0 0 12px;color:#222222;font-size:14px;"><strong>Phone:</strong> ${escapeHtml(data.phone)}</td></tr>
          <tr><td style="padding:0 0 12px;color:#222222;font-size:14px;"><strong>Organization:</strong> ${escapeHtml(organization)}</td></tr>
          <tr><td style="padding:0 0 12px;color:#222222;font-size:14px;"><strong>Research Interest:</strong> ${escapeHtml(data.researchInterest)}</td></tr>
          <tr><td style="padding:12px 0 0;color:#222222;font-size:14px;white-space:pre-wrap;line-height:1.6;">${escapeHtml(data.message)}</td></tr>
        </table>
      </div>
    `;

    const result = await resend.emails.send({
      from: `MissileX Rocket Space <${process.env.RESEND_FROM}>`,
      to: 'missilexrocketspace@gmail.com',
      replyTo: data.email,
      subject: `MissileX Contact Inquiry from ${data.name}`,
      text: textBody,
      html: htmlBody
    });

    if (result.error) {
      console.error('Contact API Error:', result.error);
      return NextResponse.json({ success: false, message: result.error.message || 'Failed to send message.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API Error:', error);
    const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
