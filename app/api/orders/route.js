import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connectDB();
  try {
    const body = await request.json();
    const { items, customerInfo } = body;

    let calculatedSubtotal = 0;
    const finalItems = [];
    
    for (const item of items) {
      const dbProduct = await Product.findById(item.id);
      if (!dbProduct) {
        return NextResponse.json({ message: `${item.name} পণ্যটি পাওয়া যায়নি!` }, { status: 404 });
      }

      const itemPrice = dbProduct.price; 
      calculatedSubtotal += itemPrice * item.quantity;

      finalItems.push({
        productId: dbProduct._id,
        name: dbProduct.name,
        quantity: item.quantity,
        priceAtOrder: itemPrice,
      });
    }

    const deliveryCharge = customerInfo.district === 'ঢাকা' ? 60 : 120;
    const totalAmount = calculatedSubtotal + deliveryCharge;

    const newOrder = await Order.create({
      name: customerInfo.name,
      phone: customerInfo.phone,
      address: customerInfo.address,
      district: customerInfo.district,
      items: finalItems,
      subtotal: calculatedSubtotal,
      deliveryCharge,
      totalAmount,
    });

    return NextResponse.json(
      {
        success: true,
        orderId: newOrder._id,
        total: totalAmount,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ message: 'সার্ভারে সমস্যা হয়েছে' }, { status: 500 });
  }
}
