'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart(); 

  return (
    <div className="bg-white shadow-sm border border-gray-100 flex flex-col group h-full">
      <Link href={`/shop/${product.id}`} className="flex flex-col flex-1">
        <div className="relative aspect-square w-full overflow-hidden bg-[#fdfcf9]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-[#1f2937] mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-foreground/70 leading-relaxed line-clamp-2 mb-4 flex-1">
            {product.description}
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4 flex items-center justify-between">
        <span className="text-xl font-bold text-secondary">৳{product.price}</span>

        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="flex items-center gap-2 bg-[#2f5d50] hover:bg-[#254a40] text-white px-4 py-2 transition-all active:scale-95 text-sm font-medium"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>কার্টে যোগ</span>
        </button>
      </div>
    </div>
  );
}
