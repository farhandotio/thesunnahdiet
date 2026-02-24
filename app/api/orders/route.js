import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connectDB();
  try {
    const body = await request.json();

    const { items, name, phone, address, district } = body;

    let calculatedSubtotal = 0;
    const finalItems = [];

    for (const item of items) {
      const dbProduct = await Product.findById(item.productId);

      if (!dbProduct) {
        return NextResponse.json({ message: `পণ্য (${item.name}) পাওয়া যায়নি` }, { status: 404 });
      }

      const variantName = item.name.match(/\(([^)]+)\)/)?.[1];
      const selectedVariant = dbProduct.variants.find((v) => v.weight === variantName);

      const itemPrice = selectedVariant
        ? selectedVariant.offerPrice
        : dbProduct.variants[0].offerPrice;

      calculatedSubtotal += itemPrice * item.quantity;

      finalItems.push({
        productId: dbProduct._id,
        name: `${dbProduct.name} (${variantName || 'Default'})`,
        quantity: item.quantity,
        priceAtOrder: itemPrice,
      });
    }

    const deliveryCharge = district === 'ঢাকা' ? 60 : 120;
    const totalAmount = calculatedSubtotal + deliveryCharge;

    const newOrder = await Order.create({
      name,
      phone,
      address,
      district,
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
    console.error('Order API Error:', error);
    return NextResponse.json({ message: 'সার্ভার এরর, আবার চেষ্টা করুন' }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching orders' }, { status: 500 });
  }
}
