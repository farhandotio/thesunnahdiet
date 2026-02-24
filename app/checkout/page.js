'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Truck, CreditCard, ShoppingBag, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notify } from '@/lib/notification';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', district: 'ঢাকা' });
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  // ডিস্ট্রিক্ট অনুযায়ী ডেলিভারি চার্জ
  const deliveryCharge = formData.district === 'ঢাকা' ? 60 : 120;
  const grandTotal = cartTotal + deliveryCharge;

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      district: formData.district,
      items: cartItems.map((item) => ({
        productId: item._id || item.id,
        name: `${item.name} (${item.selectedVariant?.weight || 'Default'})`,
        quantity: item.quantity,
        priceAtOrder: item.selectedVariant?.offerPrice || item.price,
      })),
      subtotal: cartTotal,
      deliveryCharge: deliveryCharge,
      totalAmount: grandTotal,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        notify.success('অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!');

        // WhatsApp মেসেজ ফরম্যাট (ভেরিয়েন্ট সহ)
        const itemDetails = cartItems
          .map((item) => `- ${item.name} (${item.selectedVariant?.weight}) x ${item.quantity}`)
          .join('%0A');

        const message = `*নতুন অর্ডার!*%0A%0A*নাম:* ${formData.name}%0A*ফোন:* ${formData.phone}%0A*ঠিকানা:* ${formData.address}%0A%0A*পণ্যসমূহ:*%0A${itemDetails}%0A%0A*মোট বিল:* ৳${grandTotal}`;

        setTimeout(() => {
          window.open(`https://wa.me/8801814029666?text=${message}`, '_blank');
        }, 1500);

        setIsOrderComplete(true);
        clearCart();
      } else {
        notify.error(result.message || 'অর্ডার করতে সমস্যা হয়েছে।');
      }
    } catch (error) {
      notify.error('সার্ভার কানেকশন এরর!');
    } finally {
      setLoading(false);
    }
  };

  if (isOrderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 font-sans">
        <div className="bg-white p-10 rounded-4xl border border-slate-100 shadow-xl shadow-slate-200/50 text-center max-w-md w-full animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-[#2f5d50]" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase italic tracking-tighter">
            অর্ডার সফল হয়েছে!
          </h2>
          <p className="text-slate-500 mb-8 font-medium text-sm leading-relaxed">
            ধন্যবাদ <span className="text-slate-800 font-bold">{formData.name}</span>, আপনার
            অর্ডারটি প্রসেসিং এ আছে। দ্রুত আপনার সাথে যোগাযোগ করা হবে।
          </p>
          <Link
            href="/shop"
            className="block w-full bg-[#2f5d50] text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-[#2f5d50]/20 hover:scale-105 transition-all"
          >
            আরও কেনাকাটা করুন
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-8 h-8 text-slate-300" />
        </div>
        <h2 className="text-xl font-black uppercase italic tracking-tighter text-slate-800 mb-6">
          আপনার কার্ট খালি
        </h2>
        <Link
          href="/shop"
          className="bg-[#2f5d50] text-white px-8 py-3.5 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-[#2f5d50]/20"
        >
          শপে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 font-sans">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-10 font-black">
          <Link href="/">HOME</Link>
          <ChevronRight size={12} />
          <Link href="/shop">SHOP</Link>
          <ChevronRight size={12} />
          <span className="text-[#2f5d50]">CHECKOUT</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Checkout Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm relative">
              <h2 className="text-2xl font-black mb-10 flex items-center gap-4 text-slate-800 uppercase italic tracking-tighter">
                <div className="p-3 bg-[#2f5d50] rounded-2xl text-white shadow-lg shadow-[#2f5d50]/20">
                  <Truck size={24} />
                </div>
                ডেলিভারি তথ্য দিন
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="আপনার নাম *"
                    name="name"
                    placeholder="যেমন: আব্দুল্লাহ"
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="মোবাইল নম্বর *"
                    name="phone"
                    placeholder="017XXXXXXXX"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      জেলা নির্বাচন করুন *
                    </label>
                    <div className="relative">
                      <select
                        name="district"
                        onChange={handleInputChange}
                        className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent outline-none focus:bg-white focus:border-[#2f5d50] text-sm font-bold shadow-sm appearance-none cursor-pointer transition-all uppercase"
                      >
                        <option value="ঢাকা">ঢাকা (Inside Dhaka)</option>
                        <option value="অন্যান্য">ঢাকার বাইরে (Outside)</option>
                      </select>
                      <ChevronRight
                        size={16}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      পুরো ঠিকানা *
                    </label>
                    <input
                      required
                      name="address"
                      onChange={handleInputChange}
                      placeholder="বাসা নম্বর, রোড, এলাকা..."
                      className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent outline-none focus:bg-white focus:border-[#2f5d50] text-sm font-bold shadow-sm transition-all"
                    />
                  </div>
                </div>

                {/* COD Badge */}
                <div className="bg-slate-50 p-6 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#2f5d50]">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <span className="block font-black text-sm text-slate-800 uppercase italic leading-none mb-1">
                        Cash on Delivery
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                        পণ্য হাতে পেয়ে পেমেন্ট করুন
                      </span>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-[#2f5d50] rounded-full border-4 border-white shadow-lg" />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2f5d50] text-white py-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-[#2f5d50]/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    `অর্ডার কনফার্ম করুন (৳${grandTotal.toLocaleString('bn-BD')})`
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm sticky top-24 overflow-hidden">
              <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-black text-xs text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <ShoppingBag size={16} className="text-[#2f5d50]" /> ORDER SUMMARY
                </h3>
                <span className="text-[10px] font-black bg-white px-3 py-1 rounded-full border border-slate-200 text-slate-500">
                  {cartItems.length} ITEMS
                </span>
              </div>

              <div className="p-6 space-y-6 max-h-100 overflow-y-auto scrollbar-hide">
                {cartItems.map((item) => (
                  <div key={item._id || item.id} className="flex gap-4 items-center group">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-black text-slate-800 uppercase italic leading-none mb-1 truncate">
                        {item.name}
                      </h4>
                      <p className="text-[10px] font-black text-[#2f5d50] uppercase tracking-widest">
                        SIZE: {item.selectedVariant?.weight || 'Default'}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                        ৳{item.selectedVariant?.offerPrice || item.price} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-sm text-slate-800 italic">
                        ৳
                        {(
                          (item.selectedVariant?.offerPrice || item.price) * item.quantity
                        ).toLocaleString('bn-BD')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-slate-50/30 border-t border-slate-100 space-y-4">
                <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-slate-800 font-bold">
                    ৳{cartTotal.toLocaleString('bn-BD')}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Delivery Charge ({formData.district})</span>
                  <span className="text-slate-800 font-bold">
                    ৳{deliveryCharge.toLocaleString('bn-BD')}
                  </span>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black text-[#2f5d50] uppercase tracking-[0.2em] leading-none mb-1">
                      Total Payable
                    </p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                      VAT Included
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-slate-900 italic tracking-tighter">
                      ৳{grandTotal.toLocaleString('bn-BD')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Input Component
function InputField({ label, name, placeholder, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label}
      </label>
      <input
        required
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent outline-none focus:bg-white focus:border-[#2f5d50] text-sm font-bold shadow-sm transition-all"
      />
    </div>
  );
}
