import React from 'react';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-sm border border-gray-100 flex flex-col group h-full">
      {/* Product Image Wrapper */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#fdfcf9]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-primary mb-1">{product.name}</h3>

        <p className="text-xs text-foreground/70 leading-relaxed line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <span className="text-xl font-bold text-secondary">৳{product.price}</span>

          {/* Add to Cart Button */}
          <button className="flex items-center gap-2 bg-[#2f5d50] hover:bg-[#254a40] text-white px-3 py-2 transition-all active:scale-95 text-sm font-medium">
            <ShoppingCart className="w-4 h-4" />
            <span>কার্টে যোগ</span>
          </button>
        </div>
      </div>
    </div>
  );
}
