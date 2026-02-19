'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

export default function Popular() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-20 bg-[#faf9f6]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#1f2937] mb-3 uppercase tracking-tighter italic">
            জনপ্রিয় পণ্যসমূহ
          </h2>

          <p className="text-gray-500 text-sm md:text-base uppercase tracking-wide">
            সুন্নাহ ভিত্তিক সেরা ও বিশুদ্ধ পণ্য
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-[#2f5d50] animate-spin" />
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((item) => (
              <ProductCard key={item._id || item.id} product={item} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link
            aria-label="go to shop"
            href="/shop"
            className="inline-flex items-center gap-3 uppercase tracking-wide group"
          >
            <span>সকল পণ্য দেখুন</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
