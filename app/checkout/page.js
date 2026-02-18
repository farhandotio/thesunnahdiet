'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Truck, CreditCard, ShoppingBag, ChevronRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const bnToEn = (str) => {
  const banglaNums = {
    '০': '0',
    '১': '1',
    '২': '2',
    '৩': '3',
    '৪': '4',
    '৫': '5',
    '৬': '6',
    '৭': '7',
    '৮': '8',
    '৯': '9',
  };
  return str.toString().replace(/[০-৯]/g, (d) => banglaNums[d]);
};

const priceToNumber = (price) => parseInt(bnToEn(price)) || 0;

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart(); // clearCart ফাংশনটি Context থেকে নিয়ে নিন
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', district: 'ঢাকা' });
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const deliveryCharge = formData.district === 'ঢাকা' ? 60 : 120;
  const grandTotal = cartTotal + deliveryCharge;

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

const handleSubmit = (e) => {
  e.preventDefault();

  const productList = cartItems.map((item) => `- ${item.name} (${item.quantity}টি)`).join('%0A');
  const message = `নতুন অর্ডার!%0A%0Aনাম: ${formData.name}%0Aফোন: ${formData.phone}%0Aजिला: ${formData.district}%0Aঠিকানা: ${formData.address}%0A%0Aপণ্যসমূহ:%0A${productList}%0A%0Aমোট বিল: ৳${grandTotal}`;

  const whatsappNumber = '8801744336509'; // আপনার নম্বর
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

  setIsOrderComplete(true);

  clearCart();
};

  if (isOrderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f6] p-4">
        <div className="bg-white p-10 border border-gray-100 shadow-sm text-center max-w-lg w-full">
          <CheckCircle2 className="w-20 h-20 text-[#2f5d50] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-[#1f2937] mb-4">অর্ডারটি গ্রহণ করা হয়েছে!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            ধন্যবাদ **{formData.name}**, আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে। আমাদের প্রতিনিধি
            শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
          </p>
          <Link
            href="/shop"
            className="block w-full bg-[#2f5d50] text-white py-4 font-bold hover:bg-[#254a40] transition-colors"
          >
            আরও কেনাকাটা করুন
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf9f6]">
        <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
        <h2 className="text-xl font-bold mb-4">আপনার কার্ট খালি</h2>
        <Link href="/shop" className="bg-[#2f5d50] text-white px-8 py-3 font-bold">
          শপে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#faf9f6] min-h-screen py-16">
      <div className="container max-w-6xl px-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 mb-8 font-bold">
          <Link href="/shop">শপ</Link> <ChevronRight className="w-3 h-3" />{' '}
          <span className="text-[#2f5d50]">চেকআউট</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <div className="bg-white p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-[#1f2937]">
                <div className="w-8 h-8 bg-[#2f5d50]/10 flex items-center justify-center text-[#2f5d50]">
                  <Truck className="w-4 h-4" />
                </div>
                ডেলিভারি তথ্য
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">আপনার নাম *</label>
                    <input
                      required
                      name="name"
                      onChange={handleInputChange}
                      className="w-full p-4 bg-[#fcfbf9] border border-gray-100 outline-none focus:bg-white focus:border-[#2f5d50] transition-all"
                      placeholder="যেমন: আব্দুল্লাহ"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">
                      মোবাইল নম্বর *
                    </label>
                    <input
                      required
                      name="phone"
                      onChange={handleInputChange}
                      className="w-full p-4 bg-[#fcfbf9] border border-gray-100 outline-none focus:bg-white focus:border-[#2f5d50] transition-all"
                      placeholder="017XXXXXXXX"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    জেলা নির্বাচন করুন *
                  </label>
                  <select
                    name="district"
                    onChange={handleInputChange}
                    className="w-full p-4 bg-[#fcfbf9] border border-gray-100 outline-none focus:bg-white focus:border-[#2f5d50] appearance-none"
                  >
                    <option value="ঢাকা">ঢাকা (inside Dhaka)</option>
                    <option value="অন্যান্য">ঢাকার বাইরে (Outside Dhaka)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">পুরো ঠিকানা *</label>
                  <textarea
                    required
                    name="address"
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-4 bg-[#fcfbf9] border border-gray-100 outline-none focus:bg-white focus:border-[#2f5d50]"
                    placeholder="বাসা নম্বর, রোড, এলাকা..."
                  ></textarea>
                </div>

                <div className="pt-6">
                  <div className="p-5 border border-[#2f5d50]/20 bg-[#2f5d50]/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#2f5d50]" />
                      <span className="font-bold text-[#2f5d50]">ক্যাশ অন ডেলিভারি</span>
                    </div>
                    <div className="w-5 h-5 bg-[#2f5d50] rounded-full flex items-center justify-center border-4 border-white shadow-sm" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2f5d50] hover:bg-[#1e3d34] text-white py-5 font-bold text-lg shadow-xl transition-all active:scale-[0.98] mt-4"
                >
                  অর্ডার সম্পন্ন করুন — ৳ {grandTotal.toLocaleString('bn-BD')}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white border border-gray-100 sticky top-24">
              <div className="p-6 border-b border-gray-50">
                <h2 className="font-bold">অর্ডার সামারি</h2>
              </div>
              <div className="p-6 space-y-4 max-h-100 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 border border-gray-50 bg-[#f9f8f6] shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <span className="absolute -top-2 -right-2 bg-[#2f5d50] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-[#1f2937] leading-tight mb-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-400">
                        ৳ {item.price} x {item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-sm">
                      ৳ {(priceToNumber(item.price) * item.quantity).toLocaleString('bn-BD')}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-[#fcfbf9] border-t border-gray-50 space-y-3">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>সাবটোটাল</span>
                  <span>৳ {cartTotal.toLocaleString('bn-BD')}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>ডেলিভারি চার্জ</span>
                  <span>৳ {deliveryCharge.toLocaleString('bn-BD')}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-[#2f5d50] border-t border-gray-100 pt-3">
                  <span>মোট বিল</span>
                  <span>৳ {grandTotal.toLocaleString('bn-BD')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
