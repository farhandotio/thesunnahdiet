import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

export default function Popular() {
  const products = [
    {
      id: 1,
      name: 'আজওয়া খেজুর (প্রিমিয়াম)',
      description:
        'মদিনার প্রিমিয়াম আজওয়া খেজুর। রাসূল ﷺ বলেছেন: "যে ব্যক্তি সকালে সাতটি আজওয়া খেজুর খাবে, সেই দিন কোনো বিষ বা জাদু তাকে ক্ষতি করতে পারবে না।"',
      price: '১২০০',
      image: 'https://sunnah-diet-dates.lovable.app/assets/product-ajwa-dates-jm4QXRWo.jpg',
    },
    {
      id: 2,
      name: 'মেডজুল খেজুর',
      description: 'বড়, নরম ও মিষ্টি মেডজুল খেজুর। ইফতার ও দৈনিক পুষ্টির জন্য উপযুক্ত।',
      price: '৯৫০',
      image: 'https://sunnah-diet-dates.lovable.app/assets/product-medjool-dates-B1mzepXz.jpg',
    },
    {
      id: 3,
      name: 'সাফাউয়ি খেজুর',
      description: 'মদিনার আধা-শুকনো খেজুর, গভীর স্বাদযুক্ত। চমৎকার শক্তির উৎস।',
      price: '৭৫০',
      image: 'https://sunnah-diet-dates.lovable.app/assets/product-safawi-dates-7H7oMYDW.jpg',
    },
    {
      id: 4,
      name: 'খাঁটি মধু',
      description:
        '১০০% খাঁটি, অপ্রক্রিয়াজাত কাঁচা মধু। কুরআনে মধুকে মানুষের জন্য শেফা হিসেবে উল্লেখ করা হয়েছে।',
      price: '৮৫০',
      image: 'https://sunnah-diet-dates.lovable.app/assets/product-honey-OY6GQs9-.jpg',
    },
  ];

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

        {/* Dynamic Product Grid */}
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
