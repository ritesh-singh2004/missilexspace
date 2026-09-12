import { NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;

const ALLOWED_CONTENT_TYPES = [
  'application/pdf',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/zip',
  'application/x-zip-compressed',
  'image/png',
  'image/jpeg',
  'video/mp4'
];

// Issues a short-lived, restricted token so the browser can upload directly to
// Vercel Blob — bypassing the ~4.5MB request body limit on Serverless Functions,
// which a normal multipart POST to a route handler would hit for a 20MB file.
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ALLOWED_CONTENT_TYPES,
        maximumSizeInBytes: MAX_FILE_SIZE_BYTES,
        addRandomSuffix: true
      })
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('[Research Submission] Blob token generation failed:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Upload authorization failed.' }, { status: 400 });
  }
}
