'use client';

import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  // MongoDB _id অথবা স্ট্যাটিক id হ্যান্ডেল করা
  const productId = product._id || product.id;

  return (
    <div className="bg-white rounded border border-gray-100 flex flex-col group h-full transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 overflow-hidden relative">
      {/* প্রোডাক্ট ইমেজ সেকশন */}
      <Link
        aria-label={`${product.name} পণ্যের বিস্তারিত দেখুন`}
        href={`/shop/${productId}`}
        className="relative aspect-square w-full overflow-hidden bg-[#fdfcf9] block"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* হোভার করলে একটি হালকা ওভারলে এবং আইকন আসবে */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white/90 p-3 rounded-full shadow-xl transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
            <Eye className="w-5 h-5 text-[#2f5d50]" />
          </div>
        </div>
      </Link>

      {/* প্রোডাক্ট ইনফরমেশন */}
      <div className="p-5 flex flex-col flex-1">
        <Link aria-label={`${product.name} - বিস্তারিত`} href={`/shop/${productId}`}>
          <h3 className="text-xl font-black text-[#1f2937] mb-2 group-hover:text-[#2f5d50] transition-colors leading-tight uppercase italic tracking-tighter">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 font-bold leading-relaxed line-clamp-2 mb-6 flex-1 uppercase tracking-tight">
          {product.description}
        </p>

        {/* প্রাইজ এবং বাটন সেকশন */}
        <div className="flex items-center justify-between gap-2 pt-4 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
              মূল্য
            </span>
            <span className="text-2xl font-black text-[#2f5d50] italic tracking-tighter">
              ৳{product.price.toLocaleString('bn-BD')}
            </span>
          </div>

          <button
            aria-label={`${product.name} কার্টে যোগ করুন`}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="flex items-center gap-2 bg-[#2f5d50] hover:bg-[#1e3d34] text-white rounded font-black px-5 py-3 transition-all active:scale-90 shadow-lg shadow-[#2f5d50]/20 group/btn"
          >
            <ShoppingCart className="w-5 h-5 transition-transform group-hover/btn:-rotate-12" />
            <span className="text-sm uppercase tracking-widest">কার্ট</span>
          </button>
        </div>
      </div>
    </div>
  );
}
