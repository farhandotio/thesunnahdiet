import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

async function isAdmin() {
  const cookieStore = await cookies(); // await যোগ করা হয়েছে
  const token = cookieStore.get('admin_token')?.value;
  return token === process.env.ADMIN_SECRET_KEY;
}

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  try {
    let query = {};
    if (category && category !== 'All') query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const products = await Product.find(query).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(request) {
  const authorized = await isAdmin(); // await যোগ করা হয়েছে
  if (!authorized) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  await connectDB();
  try {
    const data = await request.json();
    const product = await Product.create(data);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating product' }, { status: 400 });
  }
}
