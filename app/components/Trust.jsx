import React from 'react';
import { ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Trust() {
  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
      title: '১০০% হালাল',
      description: 'আমাদের সকল পণ্য সম্পূর্ণ হালাল ও বিশুদ্ধ। কোনো ভেজাল নেই।',
    },
    {
      icon: <Heart className="w-10 h-10 text-primary" />,
      title: 'সুন্নাহ ভিত্তিক জীবনযাপন',
      description: 'রাসূল ﷺ এর সুন্নাহ অনুযায়ী স্বাস্থ্যকর খাদ্যাভ্যাস গড়ে তুলুন।',
    },
    {
      icon: <Award className="w-10 h-10 text-primary" />,
      title: 'বিশ্বস্ত মান',
      description: 'আমরা সর্বোচ্চ মানের পণ্য সরবরাহ করি। আপনার আস্থাই আমাদের শক্তি।',
    },
  ];

  return (
    <section className="bg-[#efedeb]">
      <div className="container py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1f2937] mb-12">
          কেন সুন্নাহ ডায়েট?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 border border-gray-100 flex flex-col items-center text-center shadow-sm"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white py-20 border-t border-gray-100">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1f2937] mb-4">
            আজই সুন্নাহ মেনে জীবন শুরু করুন
          </h2>
          <p className="text-foreground/60 mb-10 max-w-2xl mx-auto">
            সুন্নাহ ভিত্তিক খাদ্য ও জীবনযাপনের মাধ্যমে আপনার শরীর ও মনকে সুস্থ রাখুন।
          </p>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#2f5d50] hover:bg-[#254a40] text-white font-bold py-4 px-10 transition-all group"
          >
            <span>পণ্য দেখুন</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
