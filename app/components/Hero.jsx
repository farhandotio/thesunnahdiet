'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#faf9f6]">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://image2url.com/r2/default/images/1771401083697-e83741c5-bef9-4f6a-a43a-52faa04ea685.blob"
          alt="Sunnah Foods Background"
          className="w-full h-full object-cover object-center scale-105 animate-subtle-zoom"
        />
        {/* লিনিয়ার গ্রাডিয়েন্ট যাতে টেক্সট ভালো বুঝা যায় */}
        <div className="absolute inset-0 bg-linear-to-r from-white/90 via-white/60 to-transparent md:from-white/80 md:via-white/20"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-3xl">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className="text-5xl md:text-7xl drop-shadow-md">🌙</span>
              <h1 className="text-4xl md:text-7xl font-black leading-none text-[#1f2937] italic tracking-tighter uppercase">
                রাসূল <span className="text-2xl md:text-4xl not-italic opacity-80">ﷺ</span>
              </h1>
            </div>
            <h2 className="text-4xl md:text-7xl font-black leading-tight text-[#1f2937] italic tracking-tighter uppercase mb-2">
              এর সুন্নাহ ডায়েট
            </h2>
          </div>

          <div className="flex items-center gap-4 my-6">
            <div className="h-1.5 w-12 bg-[#2f5d50] rounded-full"></div>
            <h3 className="text-2xl md:text-5xl font-serif italic text-[#2f5d50] font-black tracking-tight">
              The SUNNAH DIET
            </h3>
          </div>

          <div className="flex items-center gap-3 text-lg md:text-2xl text-gray-600 font-bold mb-10">
            <p className="border-l-4 border-gray-200 pl-4 italic">
              সুস্থ দেহ, শান্ত মন — এটাই আমাদের লক্ষ্য
            </p>
          </div>

          {/* Call to Action Button */}
          <div className="flex flex-wrap gap-4">
            <Link
              aria-label="সকল পণ্য দেখতে শপে যান"
              href="/shop"
              className="inline-flex items-center gap-3 bg-[#2f5d50] hover:bg-[#1e3d34] text-white font-black py-5 px-10 rounded-sm transition-all shadow-2xl shadow-[#2f5d50]/30 group transform active:scale-95 text-lg uppercase tracking-widest"
            >
              Shop Now
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
            </Link>

            <Link
              aria-label="আমাদের সম্পর্কে জানুন"
              href="/about"
              className="inline-flex items-center gap-3 bg-white border-2 border-gray-200 text-[#1f2937] font-black py-5 px-10 rounded-sm transition-all hover:bg-gray-50 text-lg uppercase tracking-widest"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes subtle-zoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.05);
          }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 20s infinite alternate linear;
        }
      `}</style>
    </section>
  );
}
