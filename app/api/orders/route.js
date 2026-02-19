import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

// ১. অর্ডার প্লেস করা (Customer Checkout)
export async function POST(request) {
  await connectDB();
  try {
    const body = await request.json();
    const { items, customerInfo } = body;

    let calculatedSubtotal = 0;
    const finalItems = [];

    for (const item of items) {
      const dbProduct = await Product.findById(item.id);
      if (!dbProduct) return NextResponse.json({ message: 'পণ্য পাওয়া যায়নি' }, { status: 404 });

      calculatedSubtotal += dbProduct.price * item.quantity;
      finalItems.push({
        productId: dbProduct._id,
        name: dbProduct.name,
        quantity: item.quantity,
        priceAtOrder: dbProduct.price,
      });
    }

    const deliveryCharge = customerInfo.district === 'ঢাকা' ? 60 : 120;
    const newOrder = await Order.create({
      name: customerInfo.name,
      phone: customerInfo.phone,
      address: customerInfo.address,
      district: customerInfo.district,
      items: finalItems,
      subtotal: calculatedSubtotal,
      deliveryCharge,
      totalAmount: calculatedSubtotal + deliveryCharge,
    });

    return NextResponse.json({ success: true, orderId: newOrder._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'সার্ভার এরর' }, { status: 500 });
  }
}

// ২. সব অর্ডার দেখা (Admin View)
export async function GET() {
  await connectDB();
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching orders' }, { status: 500 });
  }
}
