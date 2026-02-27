'use client';

import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const productId = product._id || product.id;

  const displayPrice =
    product.variants && product.variants.length > 0 ? product.variants[0].offerPrice : 0;

  const originalPrice =
    product.variants && product.variants.length > 0 ? product.variants[0].originalPrice : 0;

  return (
    <div className="bg-white rounded border border-gray-100 flex flex-col group h-full transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 overflow-hidden relative">
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
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white/90 p-3 rounded-full shadow-xl transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
            <Eye className="w-5 h-5 text-[#2f5d50]" />
          </div>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link aria-label={`${product.name} - বিস্তারিত`} href={`/shop/${productId}`}>
          <h3 className="text-base line-clamp-2 text-[#4d4e4e] mb-1 group-hover:text-[#2f5d50] transition-colors uppercase tracking-tighter">
            {product.name}
          </h3>
        </Link>

        <p className="text-[10px] font-black text-[#2f5d50] uppercase tracking-[0.2em] mb-3">
          {product.category} {product.variants?.[0]?.weight && `| ${product.variants[0].weight}`}
        </p>

        <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-2 mb-6 flex-1 tracking-tight">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-50">
          <div className="flex flex-col">
            {originalPrice > displayPrice && (
              <span className="text-[10px] font-bold text-gray-400 line-through leading-none">
                ৳{originalPrice.toLocaleString('bn-BD')}
              </span>
            )}
            <span className="text-2xl font-black text-[#2f5d50] italic tracking-tighter">
              ৳{displayPrice.toLocaleString('bn-BD')}
            </span>
          </div>

          <button
            aria-label={`${product.name} কার্টে যোগ করুন`}
            onClick={(e) => {
              e.preventDefault();
              addToCart({
                ...product,
                selectedVariant: product.variants?.[0] || null,
                price: displayPrice,
              });
            }}
            className="flex items-center gap-2 bg-[#2f5d50] hover:bg-[#1e3d34] text-white rounded font-black px-5 py-3 transition-all active:scale-90 shadow-lg shadow-[#2f5d50]/20 group/btn"
          >
            <ShoppingCart className="w-5 h-5 transition-transform group-hover/btn:-rotate-12" />
            <span className="text-sm uppercase tracking-wide">কার্ট</span>
          </button>
        </div>
      </div>
    </div>
  );
}
