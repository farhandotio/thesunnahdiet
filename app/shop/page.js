'use client';

import React, { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('সকল পণ্য');
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8; 

  const categories = ['সকল পণ্য', 'খেজুর', 'মধু ও সুন্নাহ খাদ্য', 'স্বাস্থ্য পণ্য'];

  const allProducts = [
    {
      id: 1,
      name: 'আজওয়া খেজুর (প্রিমিয়াম)',
      price: '১২০০',
      description: 'মদিনার প্রিমিয়াম আজওয়া খেজুর। রাসূল ﷺ বলেছেন...',
      image:
        'https://image2url.com/r2/default/images/1771401625345-d86f78e1-6453-4315-99d8-9df83e573e3b.jpg',
    },
    {
      id: 2,
      name: 'মেডজুল খেজুর',
      price: '৯৫০',
      description: 'বড়, নরম ও মিষ্টি মেডজুল খেজুর। ইফতার ও দৈনিক পুষ্টির জন্য উপযুক্ত।',
      image:
        'https://image2url.com/r2/default/images/1771398821942-fc97f9bf-c0b4-4978-a784-08287729e572.png',
    },
    {
      id: 3,
      name: 'সাফাউয়ি খেজুর',
      price: '৭৫০',
      description: 'মদিনার আধা-শুকনো খেজুর, গভীর স্বাদযুক্ত। চমৎকার শক্তির উৎস।',
      image:
        'https://image2url.com/r2/default/images/1771401625348-f6e789c2-5432-4216-88d9-0ef94f684e4c.jpg',
    },
    {
      id: 4,
      name: 'খাঁটি মধু',
      price: '৮৫০',
      description:
        '১০০% খাঁটি, অপ্রক্রিয়াজাত কাঁচা মধু। কুরআনে মধুকে মানুষের জন্য শেফা হিসেবে উল্লেখ করা হয়েছে।',
      image:
        'https://image2url.com/r2/default/images/1771401625350-a9f890d3-4321-4127-99e0-1fg05g795f5d.jpg',
    },
    {
      id: 5,
      name: 'কালিজিরা তেল',
      price: '৪৫০',
      description: 'মৃত্যু ব্যতীত সকল রোগের মহৌষধ কালিজিরা থেকে প্রস্তুত।',
      image:
        'https://image2url.com/r2/default/images/1771401323386-8a623e1e-2070-4f51-8742-99752df8513b.png',
    },
    {
      id: 6,
      name: 'আজওয়া খেজুর (প্রিমিয়াম)',
      price: '১২০০',
      image:
        'https://image2url.com/r2/default/images/1771401625345-d86f78e1-6453-4315-99d8-9df83e573e3b.jpg',
    },
    {
      id: 7,
      name: 'মেডজুল খেজুর',
      price: '৯৫০',
      image:
        'https://image2url.com/r2/default/images/1771398821942-fc97f9bf-c0b4-4978-a784-08287729e572.png',
    },
    {
      id: 8,
      name: 'সাফাউয়ি খেজুর',
      price: '৭৫০',
      image:
        'https://image2url.com/r2/default/images/1771401625348-f6e789c2-5432-4216-88d9-0ef94f684e4c.jpg',
    },
    // Page 2 items
    {
      id: 9,
      name: 'সরিষার মধু',
      price: '৫৫০',
      description: 'মাঠের খাঁটি সরিষা ফুলের মধু।',
      image:
        'https://image2url.com/r2/default/images/1771401625350-a9f890d3-4321-4127-99e0-1fg05g795f5d.jpg',
    },
  ];

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  return (
    <div className="bg-[#faf9f6] min-h-screen pb-20">
      {/* Refined Top Design */}
      <div className="bg-white border-b border-gray-100 mb-10">
        <div className="container py-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-3">আমাদের পণ্যসমূহ</h1>
          <p className="text-foreground/60 text-base md:text-lg font-medium max-w-xl mx-auto">
            সুন্নাহ ভিত্তিক প্রিমিয়াম স্বাস্থ্যকর খাদ্য পণ্য
          </p>

          <div className="max-w-3xl mx-auto mt-10">
            {/* Search Bar - Modern & Minimal */}
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="আপনার পছন্দের পণ্যটি খুঁজুন..."
                className="w-full pl-14 pr-6 py-4 bg-[#f8f8f8] border-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-lg outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
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

      {/* Grid Section */}
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Dynamic Pagination */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="p-3 border border-gray-200 bg-white hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-current"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-12 h-12 flex items-center justify-center font-bold transition-all border ${
                  currentPage === index + 1
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white border-gray-200 text-foreground/60 hover:border-primary hover:text-primary'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="p-3 border border-gray-200 bg-white hover:bg-primary hover:text-white transition-all disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
