import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const submissionSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters.').max(120),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s-]{10,15}$/, 'Enter a valid phone number.'),
  projectTitle: z.string().trim().min(3, 'Project title is required.').max(200),
  description: z.string().trim().min(30, 'Description must be at least 30 characters.').max(10000),
  technology: z.string().trim().min(2, 'Technology stack is required.').max(300),
  githubUrl: z.string().trim().url('Enter a valid GitHub URL.').max(300).optional().or(z.literal('')),
  // The file, if any, is uploaded client-side directly to Vercel Blob (see
  // app/api/research/upload/route.ts) before this route is ever called — this
  // route only ever receives the resulting public URL, never file bytes.
  fileUrl: z.string().trim().url('Invalid file URL.').max(2048).optional().or(z.literal(''))
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
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM;
  if (!apiKey || !fromAddress) {
    console.error('[Research Submission] Missing RESEND_API_KEY or RESEND_FROM environment variable.');
    return NextResponse.json({ error: 'Email service is not configured on this deployment.' }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    console.error('[Research Submission] Failed to parse request body:', error);
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Invalid submission.';
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const data = parsed.data;
  const fileUrl = data.fileUrl && data.fileUrl.length > 0 ? data.fileUrl : '';

  // Defense in depth: only accept file URLs that actually point at our own Blob store,
  // even though the client only ever sends what /api/research/upload returned.
  if (fileUrl && !/^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//i.test(fileUrl)) {
    return NextResponse.json({ error: 'Invalid uploaded file reference.' }, { status: 400 });
  }

  const submittedAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  });

  const githubDisplay = data.githubUrl && data.githubUrl.length > 0 ? data.githubUrl : 'N/A';
  const fileDisplay = fileUrl || 'No file uploaded';

  const textBody = [
    '-----------------------------------------',
    '',
    'New Research Project Submitted',
    '',
    'Name:',
    data.name,
    '',
    'Email:',
    data.email,
    '',
    'Phone:',
    data.phone,
    '',
    'Project Title:',
    data.projectTitle,
    '',
    'Technology Stack:',
    data.technology,
    '',
    'GitHub:',
    githubDisplay,
    '',
    'Research Description:',
    '',
    data.description,
    '',
    'Uploaded File:',
    fileDisplay,
    '',
    'Submitted At:',
    submittedAt,
    '',
    '-----------------------------------------'
  ].join('\n');

  const htmlRow = (label: string, value: string) =>
    `<tr><td style="padding:6px 0;color:#5B6472;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">${escapeHtml(label)}</td></tr><tr><td style="padding:0 0 16px;color:#222222;font-size:14px;">${value}</td></tr>`;

  const htmlBody = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;">
      <div style="background:#0A4D8C;padding:20px 24px;">
        <p style="margin:0;color:#F28C28;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">MissileX Rocket Space</p>
        <h1 style="margin:8px 0 0;color:#ffffff;font-size:20px;">New Research Project Submitted</h1>
      </div>
      <table style="width:100%;padding:24px;border:1px solid #E5E7EB;border-top:none;" cellpadding="0" cellspacing="0">
        ${htmlRow('Name', escapeHtml(data.name))}
        ${htmlRow('Email', escapeHtml(data.email))}
        ${htmlRow('Phone', escapeHtml(data.phone))}
        ${htmlRow('Project Title', escapeHtml(data.projectTitle))}
        ${htmlRow('Technology Stack', escapeHtml(data.technology))}
        ${htmlRow('GitHub', githubDisplay === 'N/A' ? 'N/A' : `<a href="${escapeHtml(githubDisplay)}" style="color:#0A4D8C;">${escapeHtml(githubDisplay)}</a>`)}
        ${htmlRow('Research Description', `<div style="white-space:pre-wrap;line-height:1.6;">${escapeHtml(data.description)}</div>`)}
        ${htmlRow('Uploaded File', fileUrl ? `<a href="${escapeHtml(fileUrl)}" style="color:#0A4D8C;">${escapeHtml(fileUrl)}</a>` : 'No file uploaded')}
        ${htmlRow('Submitted At', escapeHtml(submittedAt))}
      </table>
    </div>
  `;

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: `MissileX Research Portal <${fromAddress}>`,
      to: 'missilexrocketspace@gmail.com',
      replyTo: data.email,
      subject: '🚀 New Research Project Submission',
      text: textBody,
      html: htmlBody
    });

    if (result.error) {
      console.error('[Research Submission] Resend API error:', result.error);
      return NextResponse.json({ error: 'Failed to send the submission email. Please try again later.' }, { status: 502 });
    }

    return NextResponse.json({ status: 'success', fileUrl: fileUrl || null });
  } catch (error) {
    console.error('[Research Submission] Unexpected error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
