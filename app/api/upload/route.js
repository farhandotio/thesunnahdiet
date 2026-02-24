import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: 'Token is missing' }, { status: 500 });
    }

    if (!filename) {
      return NextResponse.json({ error: 'Filename missing' }, { status: 400 });
    }

    const fileBuffer = await request.arrayBuffer();

    const blob = await put(filename, fileBuffer, {
      access: 'public',
      contentType: request.headers.get('content-type') || 'image/jpeg',
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Vercel Blob Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
