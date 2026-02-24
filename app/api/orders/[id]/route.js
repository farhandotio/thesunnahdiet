import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const { status } = await request.json();

    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    await Order.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Order Deleted Successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Delete failed' }, { status: 500 });
  }
}
