'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { allProducts, categories } from '@/data/products'; // ডাটা ইম্পোর্ট

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('সকল পণ্য');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // ফিল্টারিং লজিক (Search + Category)
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'সকল পণ্য' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // পেজিনেশন লজিক
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="bg-[#faf9f6] min-h-screen pb-20">
      {/* Header & Search */}
      <div className="bg-white border-b border-gray-100 mb-10">
        <div className="container py-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-3">আমাদের পণ্যসমূহ</h1>
          <p className="text-foreground/60 text-base mb-10">
            সুন্নাহ ভিত্তিক প্রিমিয়াম স্বাস্থ্যকর খাদ্য পণ্য
          </p>

          <div className="max-w-3xl mx-auto">
            <div className="relative group mb-8">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="আপনার পছন্দের পণ্যটি খুঁজুন..."
                className="w-full pl-14 pr-6 py-4 bg-[#f8f8f8] border-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // সার্চ করলে ১ নম্বর পেজে নিয়ে যাবে
                }}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentPage(1); // ক্যাটাগরি চেঞ্জ করলে ১ নম্বর পেজে নিয়ে যাবে
                  }}
                  className={`px-6 py-2 text-sm font-bold transition-all border ${
                    activeCategory === cat
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                      : 'bg-white text-foreground/60 border-gray-200 hover:border-primary hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container">
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-foreground/50">কোনো পণ্য পাওয়া যায়নি।</div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="p-3 border border-gray-200 bg-white hover:bg-primary hover:text-white disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-12 h-12 font-bold border transition-all ${
                  currentPage === i + 1
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white border-gray-200 text-foreground/60'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="p-3 border border-gray-200 bg-white hover:bg-primary hover:text-white disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
