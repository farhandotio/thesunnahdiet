import React from 'react';
import { ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Trust() {
  const features = [
    {
      icon: <ShieldCheck className="w-12 h-12" />,
      title: '১০০% হালাল ও বিশুদ্ধ',
      description:
        'আমাদের প্রতিটি পণ্য কড়া মাননিয়ন্ত্রণের মাধ্যমে বাছাইকৃত। কোনো প্রকার কেমিক্যাল বা ভেজালের স্থান নেই।',
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'সুন্নাহ ভিত্তিক খাদ্যাভ্যাস',
      description:
        'রাসূল ﷺ এর প্রিয় খাবার ও সুন্নাহ পদ্ধতি অনুসরণ করে আপনার দৈনন্দিন ডায়েট চার্ট সাজিয়ে নিন।',
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'সর্বোচ্চ মানের নিশ্চয়তা',
      description:
        'আপনার সন্তুষ্টিই আমাদের ব্যবসার মূল ভিত্তি। আমরা দিচ্ছি প্রিমিয়াম কোয়ালিটি সম্পন্ন সেরা পণ্য।',
    },
  ];

  return (
    <section className="bg-[#fcfbf9]">
      {/* ফিচার সেকশন */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#1f2937] mb-4 uppercase italic tracking-tighter">
            কেন সুন্নাহ ডায়েট?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-10 rounded border-b-4 border-transparent hover:border-[#2f5d50] transition-all duration-500 shadow-xl shadow-gray-200/50 flex flex-col items-center text-center"
            >
              <div className="mb-6 p-4 rounded-full bg-[#2f5d50]/5 text-[#2f5d50] group-hover:bg-[#2f5d50] group-hover:text-white transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black text-[#1f2937] mb-4 italic uppercase">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-base font-bold leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* কল টু অ্যাকশন (CTA) */}
      <div className="bg-[#2f5d50] py-24 relative overflow-hidden">
        {/* হালকা ডেকোরেশন প্যাটার্ন */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="grid grid-cols-6 h-full w-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-b border-white"></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 italic uppercase tracking-tighter">
            সুন্নাহ মেনে জীবন শুরু করুন
          </h2>
          <p className="text-white/80 mb-12 max-w-2xl mx-auto text-lg md:text-xl font-bold uppercase tracking-wide">
            সুস্থ শরীর ও প্রশান্ত মনের জন্য রাসূল ﷺ এর দেখানো পদ্ধতিই সর্বোত্তম।
          </p>

          <Link
            aria-label="সকল পণ্য দেখতে শপ পেজে যান"
            href="/shop"
            className="inline-flex items-center gap-4 bg-white text-[#2f5d50] rounded font-black py-5 px-12 text-xl uppercase tracking-wide hover:bg-[#efedeb] transition-all group shadow-2xl"
          >
            <span>পণ্য দেখুন</span>
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
