'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-115 flex items-center overflow-hidden bg-[#f3f4f6]">
      <div className="absolute inset-0 z-0">
        <img
          src="https://image2url.com/r2/default/images/1771401083697-e83741c5-bef9-4f6a-a43a-52faa04ea685.blob"
          alt="Sunnah Foods Background"
          className="w-full h-full object-cover object-right md:object-center"
        />
        <div className="absolute inset-0 bg-white/30 md:bg-transparent"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-2xl">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-4xl md:text-7xl">🌙</span>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight text-[#374151]">
                রাসূল <span className="text-2xl md:text-4xl">ﷺ</span> এর সুন্নাহ
              </h2>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-[#374151] mb-2">
              অনুযায়ী ডায়েট ও স্বাস্থ্যচর্চা
            </h2>
          </div>

          <div className="flex items-center gap-3 my-4">
            <div className="h-px w-8 bg-primary"></div>
            <h3 className="text-2xl md:text-4xl font-serif italic text-primary font-bold">
              The SUNNAH DIET
            </h3>
          </div>

          <div className="flex items-center gap-2 text-sm md:text-base text-foreground/80 font-medium mb-8">
            <span>🍯</span>
            <p>সুস্থ দেহ 🧠 শান্ত মন — এটাই আমাদের লক্ষ্য</p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-foreground font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Shop Sunnah Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
