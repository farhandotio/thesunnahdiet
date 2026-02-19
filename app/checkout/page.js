'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Truck, CreditCard, ShoppingBag, ChevronRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notify } from '@/lib/notification';

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
  const { cartItems, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', district: 'ঢাকা' });
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const deliveryCharge = formData.district === 'ঢাকা' ? 60 : 120;
  const grandTotal = cartTotal + deliveryCharge;

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      items: cartItems.map((item) => ({
        id: item._id || item.id,
        name: item.name,
        quantity: item.quantity,
      })),
      customerInfo: formData,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        notify.success('অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!');

        const message = `নতুন অর্ডার!%0Aঅর্ডার আইডি: ${result.orderId}%0Aনাম: ${formData.name}%0Aফোন: ${formData.phone}%0Aমোট বিল: ৳${result.total}`;

        setTimeout(() => {
          window.open(`https://wa.me/8801833956721?text=${message}`, '_blank');
        }, 1500);

        setIsOrderComplete(true);
        clearCart();
      } else {
        notify.error(result.message || 'অর্ডার করতে সমস্যা হয়েছে।');
      }
    } catch (error) {
      notify.error('সার্ভার কানেকশন এরর! আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  if (isOrderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f6] p-4">
        <div className="bg-white p-8 rounded border border-gray-100 shadow-sm text-center max-w-md w-full">
          <CheckCircle2 className="w-16 h-16 text-[#2f5d50] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#1f2937] mb-2">অর্ডারটি গ্রহণ করা হয়েছে!</h2>
          <p className="text-gray-500 mb-6 leading-relaxed text-sm">
            ধন্যবাদ **{formData.name}**, আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে। আমাদের প্রতিনিধি
            শীঘ্রই যোগাযোগ করবেন।
          </p>
          <Link
            aria-label="শপে ফিরে যান এবং আরও কেনাকাটা করুন"
            href="/shop"
            className="block w-full bg-[#2f5d50] text-white py-3 rounded font-bold hover:bg-[#254a40] transition-colors"
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
        <ShoppingBag className="w-12 h-12 text-gray-300 mb-3" />
        <h2 className="text-lg font-bold mb-4">আপনার কার্ট খালি</h2>
        <Link
          aria-label="শপে যান"
          href="/shop"
          className="bg-[#2f5d50] text-white px-6 py-2 rounded font-bold"
        >
          শপে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#faf9f6] min-h-screen py-8">
      <div className="container max-w-5xl px-4 mx-auto">
        <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-gray-400 mb-6 font-bold">
          <Link aria-label="হোম পেজে যান" href="/">
            হোম
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link aria-label="শপ পেজে যান" href="/shop">
            শপ
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#2f5d50]">চেকআউট</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-5 md:p-8 rounded border border-gray-100 shadow-sm relative overflow-hidden">
              {/* টপ ডেকোরেশন বার */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#2f5d50]/20"></div>

              <h2 className="text-xl font-black mb-8 flex items-center gap-3 text-[#1f2937] uppercase tracking-tight">
                <div className="p-2 bg-[#2f5d50] rounded text-white">
                  <Truck className="w-5 h-5" />
                </div>
                ডেলিভারি তথ্য
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* নাম এবং ফোন নম্বর */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group space-y-2">
                    <label className="text-[11px] font-black text-[#2f5d50] uppercase tracking-widest ml-1">
                      আপনার নাম *
                    </label>
                    <input
                      required
                      name="name"
                      aria-label="আপনার নাম লিখুন"
                      onChange={handleInputChange}
                      className="w-full p-4 rounded bg-[#fcfbf9] border-l-4 border-gray-100 outline-none focus:bg-white focus:border-[#2f5d50] text-base font-bold shadow-sm transition-all"
                      placeholder="যেমন: আব্দুল্লাহ"
                    />
                  </div>
                  <div className="group space-y-2">
                    <label className="text-[11px] font-black text-[#2f5d50] uppercase tracking-widest ml-1">
                      মোবাইল নম্বর *
                    </label>
                    <input
                      required
                      name="phone"
                      aria-label="আপনার মোবাইল নম্বর লিখুন"
                      onChange={handleInputChange}
                      className="w-full p-4 rounded bg-[#fcfbf9] border-l-4 border-gray-100 outline-none focus:bg-white focus:border-[#2f5d50] text-base font-bold shadow-sm transition-all"
                      placeholder="017XXXXXXXX"
                    />
                  </div>
                </div>

                {/* জেলা এবং ঠিকানা */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="space-y-2 md:w-1/3">
                    <label className="text-[11px] font-black text-[#2f5d50] uppercase tracking-widest ml-1">
                      জেলা *
                    </label>
                    <div className="relative">
                      <select
                        name="district"
                        aria-label="আপনার জেলা নির্বাচন করুন"
                        onChange={handleInputChange}
                        className="w-full p-4 rounded bg-[#fcfbf9] border-l-4 border-gray-100 outline-none focus:bg-white focus:border-[#2f5d50] text-base font-bold shadow-sm appearance-none cursor-pointer transition-all"
                      >
                        <option value="ঢাকা">ঢাকা (Inside Dhaka)</option>
                        <option value="অন্যান্য">ঢাকার বাইরে (Outside)</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                        <ChevronRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 flex-1">
                    <label className="text-[11px] font-black text-[#2f5d50] uppercase tracking-widest ml-1">
                      পুরো ঠিকানা *
                    </label>
                    <textarea
                      required
                      name="address"
                      aria-label="আপনার পুরো ঠিকানা লিখুন"
                      onChange={handleInputChange}
                      rows="1"
                      className="w-full p-4 rounded bg-[#fcfbf9] border-l-4 border-gray-100 outline-none focus:bg-white focus:border-[#2f5d50] text-base font-bold shadow-sm transition-all min-h-19.5 md:min-h-auto"
                      placeholder="বাসা নম্বর, রোড, এলাকা..."
                    ></textarea>
                  </div>
                </div>

                {/* পেমেন্ট মেথড হাইলাইট */}
                <div className="pt-4">
                  <div className="p-4 rounded border-2 border-[#2f5d50]/10 bg-[#2f5d50]/20 flex items-center justify-between group hover:bg-[#2f5d50]/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#2f5d50]">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block font-black text-sm text-[#2f5d50] uppercase">
                          ক্যাশ অন ডেলিভারি
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">
                          পণ্য হাতে পেয়ে টাকা পরিশোধ করুন
                        </span>
                      </div>
                    </div>
                    <div className="w-6 h-6 bg-[#2f5d50] rounded-full border-4 border-white shadow-md" />
                  </div>
                </div>

                {/* সাবমিট বাটন */}
                <button
                  aria-label="অর্ডার সম্পন্ন করার বাটন"
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2f5d50] hover:bg-[#1e3d34] text-white py-5 rounded font-black text-lg uppercase tracking-wide shadow-xl shadow-[#2f5d50]/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <span className="animate-pulse">প্রসেসিং...</span>
                  ) : (
                    <>
                      অর্ডার নিশ্চিত করুন
                      <span className="bg-white/20 px-3 py-1 rounded text-sm italic">
                        ৳{grandTotal.toLocaleString('bn-BD')}
                      </span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-xl shadow-gray-200/50 sticky top-24 overflow-hidden">
              {/* হেডার */}
              <div className="p-5 border-b border-gray-50 bg-[#2f5d50]/20 flex items-center justify-between">
                <h2 className="font-black text-sm text-[#1f2937] uppercase tracking-widest flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#2f5d50]" />
                  অর্ডার সামারি
                </h2>
                <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-1 rounded font-bold">
                  {cartItems.length} টি পণ্য
                </span>
              </div>

              {/* প্রোডাক্ট লিস্ট */}
              <div className="p-5 space-y-5 max-h-100 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
                {cartItems.map((item, index) => (
                  <div key={item._id || item.id} className="flex gap-4 items-center group">
                    <div className="relative w-16 h-16 rounded-lg border border-gray-100 shrink-0 overflow-hidden bg-gray-50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute -top-1 -right-1 bg-[#2f5d50] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black shadow-lg border-2 border-white">
                        {item.quantity}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-[14px] font-black text-slate-800 leading-tight mb-1 truncate uppercase italic">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-bold tracking-tighter uppercase">
                        ৳ {item.price} <span className="mx-1">×</span> {item.quantity}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-black text-sm text-slate-700 italic">
                        ৳ {(priceToNumber(item.price) * item.quantity).toLocaleString('bn-BD')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* বিলিং ক্যালকুলেশন */}
              <div className="p-6 bg-[#fcfbf9] border-t border-gray-100">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    <span>সাবটোটাল</span>
                    <span className="text-gray-700">৳ {cartTotal.toLocaleString('bn-BD')}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    <span>ডেলিভারি চার্জ</span>
                    <span className="text-gray-700">
                      ৳ {deliveryCharge.toLocaleString('bn-BD')}
                    </span>
                  </div>
                </div>

                {/* গ্র্যান্ড টোটাল কার্ড */}
                <div className="bg-[#2f5d50] p-4 rounded-lg shadow-lg shadow-[#2f5d50]/20 flex justify-between items-center transform transition-transform hover:scale-[1.02]">
                  <div className="text-white/80">
                    <p className="text-[10px] font-black uppercase tracking-wide leading-none mb-1">
                      সর্বমোট প্রদেয়
                    </p>
                    <p className="text-xs font-bold italic">Cash on Delivery</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-white italic tracking-tighter">
                      ৳ {grandTotal.toLocaleString('bn-BD')}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-[10px] text-center text-gray-400 font-bold uppercase tracking-tight">
                  * নিরাপদ ও দ্রুত ডেলিভারি নিশ্চিত করছি
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
