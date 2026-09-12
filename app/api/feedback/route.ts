import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const gmailUser = process.env.ADMIN_GMAIL;
const gmailPass = process.env.ADMIN_GMAIL_PASSWORD;

export async function POST(request: Request) {
  if (!gmailUser || !gmailPass) {
    return NextResponse.json({ error: 'Email configuration missing.' }, { status: 500 });
  }

  const data = await request.json();
  const { name, email, type, message } = data;

  if (!name || !email || !type || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: gmailUser, pass: gmailPass }
  });

  await transporter.sendMail({
    from: gmailUser,
    to: gmailUser,
    subject: `MissileX Feedback — ${type} — ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nType: ${type}\nSubmitted: ${new Date().toISOString()}\n\nMessage:\n${message}`
  });

  return NextResponse.json({ status: 'success' });
}
