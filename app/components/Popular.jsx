import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { allProducts } from '@/data/products';

export default function Popular() {
  // slice(0, 4) ব্যবহার করে প্রথম ৪টি প্রোডাক্ট নেওয়া হয়েছে
  const products = allProducts.slice(0, 4);

  return (
    <section className="py-16 bg-[#faf9f6]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1f2937] mb-2">জনপ্রিয় পণ্যসমূহ</h2>
          <p className="text-gray-500 text-sm md:text-base font-medium">
            সুন্নাহ ভিত্তিক সেরা পণ্য
          </p>
        </div>

        {/* Dynamic Product Grid - Max 4 products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[#2f5d50] font-bold hover:gap-3 transition-all group"
          >
            <span>সকল পণ্য দেখুন</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
