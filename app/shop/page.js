'use client';

import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { Search, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('সকল পণ্য');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const dynamicCategories = useMemo(() => {
    const cats = ['সকল পণ্য', ...new Set(products.map((p) => p.category))];
    return cats;
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'সকল পণ্য' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="bg-[#faf9f6] min-h-screen pb-16">
      {/* Header & Search Section (Compact & Rounded) */}
      <div className="bg-white border-b border-gray-100">
        <div className="container py-10 md:py-14">
          <div className="flex flex-col items-center max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-black text-[#1f2937] mb-2 italic uppercase tracking-tighter">
              আমাদের <span className="text-[#2f5d50]">পণ্যসমূহ</span>
            </h1>
            <p className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-wide mb-8">
              সুন্নাহ ভিত্তিক বিশুদ্ধ খাদ্যের সমাহার
            </p>

            <div className="w-full max-w-2xl space-y-6">
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#2f5d50]">
                  <Search className="w-5 h-5 stroke-[3px]" />
                </div>
                <input
                  type="text"
                  aria-label="পণ্য খোঁজার ইনপুট"
                  placeholder="আপনার পছন্দের পণ্যটি খুঁজুন..."
                  className="w-full pl-14 pr-8 py-4 bg-[#fcfbf9] border-2 border-gray-100 rounded-full focus:border-[#2f5d50] focus:bg-white transition-all outline-none text-lg font-bold shadow-sm text-gray-500"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              {/* Categories Navigation (Pill shape) */}
              <div className="flex flex-wrap justify-center gap-2">
                {dynamicCategories.map((cat) => (
                  <button
                    key={cat}
                    aria-label={`${cat} ক্যাটাগরি ফিল্টার করুন`}
                    onClick={() => {
                      setActiveCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`px-6 py-2 text-[11px] md:text-xs font-black uppercase tracking-wide transition-all border-2 rounded-full ${
                      activeCategory === cat
                        ? 'bg-[#2f5d50] text-white border-[#2f5d50] shadow-md'
                        : 'bg-white text-gray-500 border-gray-100 hover:border-[#2f5d50] hover:text-[#2f5d50]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mt-12 px-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-[#2f5d50] w-10 h-10 stroke-[3px]" />
          </div>
        ) : currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <p className="text-xl font-black text-gray-500 uppercase italic">পণ্য পাওয়া যায়নি</p>
          </div>
        )}

        {/* Pagination (Rounded Buttons) */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-3">
            <button
              aria-label="আগের পেজ"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="p-4 rounded-full border-2 border-gray-100 bg-white text-[#2f5d50] hover:bg-[#2f5d50] hover:text-white disabled:opacity-20 transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 stroke-[3px]" />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  aria-label={`পেজ নম্বর ${i + 1}`}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 rounded-full font-black text-sm border-2 transition-all ${
                    currentPage === i + 1
                      ? 'bg-[#2f5d50] text-white border-[#2f5d50] shadow-md scale-110'
                      : 'bg-white border-gray-100 text-gray-500 hover:border-[#2f5d50] hover:text-[#2f5d50]'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              aria-label="পরের পেজ"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="p-4 rounded-full border-2 border-gray-100 bg-white text-[#2f5d50] hover:bg-[#2f5d50] hover:text-white disabled:opacity-20 transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5 stroke-[3px]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
