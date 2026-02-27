'use client';

import React, { useState, useEffect } from 'react';
import {
  ShoppingCart,
  Plus,
  Minus,
  ArrowLeft,
  Truck,
  Zap,
  Loader2,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          // ডিফল্টভাবে প্রথম ভেরিয়েন্টটি সিলেক্ট থাকবে
          if (data.variants && data.variants.length > 0) {
            setSelectedVariant(data.variants[0]);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <Loader2 className="animate-spin text-[#2f5d50]" size={40} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc]">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-800 mb-4">
          পণ্যটি পাওয়া যায়নি
        </h2>
        <Link
          href="/shop"
          className="bg-[#2f5d50] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2"
        >
          <ArrowLeft size={16} /> শপে ফিরে যান
        </Link>
      </div>
    );
  }

  const handleBuyNow = () => {
    if (!selectedVariant) return;
    addToCart({ ...product, selectedVariant, price: selectedVariant.offerPrice }, quantity);
    router.push('/checkout');
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addToCart({ ...product, selectedVariant, price: selectedVariant.offerPrice }, quantity);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        {/* Breadcrumb */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#2f5d50] mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Sticky Image Section */}
          <div className="lg:col-span-6 sticky top-24">
            <div className="relative aspect-square bg-white rounded-4xl overflow-hidden border border-slate-200 shadow-sm group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-[#2f5d50] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {product.category}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold italic text-[#4d4e4e] leading-none mb-4 uppercase tracking-tighter">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                  <CheckCircle2 size={14} />
                  <span className="text-[10px] font-black uppercase tracking-wider">
                    In Stock & Ready to Ship
                  </span>
                </div>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-5xl font-black text-[#2f5d50] italic tracking-tighter">
                  ৳{selectedVariant?.offerPrice.toLocaleString('bn-BD')}
                </span>
                {selectedVariant?.originalPrice > selectedVariant?.offerPrice && (
                  <span className="text-xl font-bold text-slate-300 line-through">
                    ৳{selectedVariant?.originalPrice.toLocaleString('bn-BD')}
                  </span>
                )}
              </div>

              <p className="text-slate-500 leading-relaxed font-medium text-lg border-l-4 border-slate-200 pl-6 italic">
                {product.description}
              </p>
            </div>

            {/* Variant Selection */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">
                প্যাক সাইজ / ওজন সিলেক্ট করুন
              </label>
              <div className="flex flex-wrap gap-3">
                {product.variants?.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-6 py-4 rounded-2xl border-2 transition-all flex flex-col items-start min-w-30 ${
                      selectedVariant?.weight === variant.weight
                        ? 'border-[#2f5d50] bg-[#2f5d50]/5 shadow-md shadow-[#2f5d50]/10'
                        : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                    }`}
                  >
                    <span
                      className={`text-sm font-black uppercase ${selectedVariant?.weight === variant.weight ? 'text-[#2f5d50]' : 'text-slate-600'}`}
                    >
                      {variant.weight}
                    </span>
                    <span className="text-[10px] font-bold">৳{variant.offerPrice}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-white border-2 border-slate-100 rounded-2xl p-1 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-4 hover:bg-slate-50 rounded-xl transition-colors text-slate-400"
                  >
                    <Minus size={18} strokeWidth={3} />
                  </button>
                  <span className="w-12 text-center font-black text-xl text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-4 hover:bg-slate-50 rounded-xl transition-colors text-[#2f5d50]"
                  >
                    <Plus size={18} strokeWidth={3} />
                  </button>
                </div>
                <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  Total:{' '}
                  <span className="text-slate-800 text-sm italic">
                    ৳{(selectedVariant?.offerPrice * quantity).toLocaleString('bn-BD')}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-[1.5] bg-[#2f5d50] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl shadow-[#2f5d50]/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-white text-slate-800 border-2 border-slate-200 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-50 active:scale-95 transition-all"
                >
                  <Zap size={18} className="fill-slate-800" /> Order Now
                </button>
              </div>
            </div>

            {/* Delivery & Trust Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="p-3 bg-slate-50 rounded-xl text-[#2f5d50]">
                  <Truck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-800 leading-tight">
                    Fast Delivery
                  </p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">
                    24-72 Hours Nationwide
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="p-3 bg-slate-50 rounded-xl text-[#2f5d50]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-800 leading-tight">
                    100% Pure
                  </p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">
                    Guaranteed Quality
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
