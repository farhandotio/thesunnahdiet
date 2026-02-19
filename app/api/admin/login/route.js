import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { key } = await request.json();
    const secret = process.env.ADMIN_SECRET_KEY;

    if (key === secret) {
      const response = NextResponse.json({ success: true });
      // সার্ভার সাইড থেকে কুকি সেট করা হচ্ছে
      response.cookies.set('admin_token', key, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // ৭ দিন
        httpOnly: false, // যাতে মিডলওয়্যার এবং ক্লায়েন্ট সহজে পায়
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      return response;
    }

    return NextResponse.json({ message: 'Invalid Key' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
