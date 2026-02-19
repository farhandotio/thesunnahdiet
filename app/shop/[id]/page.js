'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, ArrowLeft, Truck, Zap, Loader2 } from 'lucide-react';
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

  // ডাটাবেস থেকে তথ্য আনা
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
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
      <div className="bg-[#faf9f6] min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#2f5d50]" size={40} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[#faf9f6] min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4 text-[#1f2937]">পণ্যটি পাওয়া যায়নি</h2>
        <Link
          href="/shop"
          aria-label="শপে ফিরে যান"
          className="text-[#2f5d50] font-bold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> শপে ফিরে যান
        </Link>
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  return (
    <div className="bg-[#faf9f6] min-h-screen pt-5 pb-10">
      <div className="container max-w-6xl">
        <Link
          href="/shop"
          aria-label="শপে ফিরে যান"
          className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-[#2f5d50] mb-5 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>শপে ফিরে যান</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-transparent">
          {/* Left: Product Image */}
          <div className="bg-white rounded overflow-hidden aspect-square">
            <img
              src={product.image}
              alt={`${product.name} এর ছবি`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Product Content */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1f2937] mb-1">{product.name}</h1>
            <p className="text-foreground/40 text-sm mb-4 font-medium uppercase tracking-wider">
              {product.category}
            </p>

            <div className="text-3xl font-bold text-secondary mb-6">৳{product.price}</div>

            <div
              className="inline-flex items-center gap-2 text-xs font-bold text-[#2f5d50] bg-[#2f5d50]/10 px-3 py-1.5 w-fit mb-8 border border-[#2f5d50]/20"
              aria-label="পণ্যটি স্টকে আছে"
            >
              <span
                className="w-1.5 h-1.5 bg-[#2f5d50] rounded-full animate-pulse"
                aria-hidden="true"
              />
              স্টকে আছে
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-bold text-foreground/60">পরিমাণ:</span>
              <div className="flex items-center border border-gray-200 bg-white overflow-hidden rounded">
                <button
                  aria-label="পরিমাণ কমান"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50 transition-colors border-r border-gray-200"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span
                  className="w-14 text-center font-bold text-lg"
                  aria-label={`বর্তমান পরিমাণ ${quantity}`}
                >
                  {quantity}
                </span>
                <button
                  aria-label="পরিমাণ বাড়ান"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-50 transition-colors border-l border-gray-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                aria-label="কার্টে পণ্য যোগ করুন"
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-[#2f5d50] rounded hover:bg-[#254a40] text-white py-4 font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] text-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>কার্টে যোগ করুন</span>
              </button>

              <button
                aria-label="সরাসরি কিনুন"
                onClick={handleBuyNow}
                className="flex-1 bg-secondary rounded hover:bg-secondary/90 text-white py-4 font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] text-lg"
              >
                <Zap className="w-5 h-5 fill-current" />
                <span>সরাসরি কিনুন</span>
              </button>
            </div>

            <p className="text-foreground/70 leading-relaxed mb-10 text-lg">
              {product.description}
            </p>

            <div
              className="bg-[#efedeb] p-6 border-l-4 border-[#2f5d50] shadow-sm"
              aria-label="ডেলিভারি তথ্য বক্স"
            >
              <div className="flex gap-4 items-start">
                <Truck className="w-6 h-6 text-[#2f5d50] shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h4 className="font-bold text-[#2f5d50] mb-1 font-bangla">ডেলিভারি তথ্য</h4>
                  <p className="text-sm text-foreground/70">
                    সারা বাংলাদেশে ক্যাশ অন ডেলিভারি। খুলনা ও ঢাকায় দ্রুত ডেলিভারি।
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
