import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

// ৩. স্ট্যাটাস আপডেট (PATCH)
export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = await params; // Next.js 15 এ await প্রয়োজন
    const { status } = await request.json();

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ message: 'অর্ডার পাওয়া যায়নি' }, { status: 404 });
    }

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}

// ৪. অর্ডার ডিলিট (DELETE)
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    await Order.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Delete failed' }, { status: 500 });
  }
}
