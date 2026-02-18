import React from 'react';
import { Heart, ShieldCheck, MapPin } from 'lucide-react';

export default function AboutPage() {
  const sections = [
    {
      icon: <Heart className="w-6 h-6 text-primary" />,
      title: 'আমাদের মিশন',
      description:
        'আমরা বিশ্বাস করি, রাসূল ﷺ এর সুন্নাহ অনুসরণই সর্বোত্তম জীবনযাপনের পথ। আমাদের লক্ষ্য হলো সুন্নাহ ভিত্তিক খাদ্য ও স্বাস্থ্য পণ্য সকলের কাছে পৌঁছে দেওয়া। খেজুর, মধু, কালিজিরা, জলপাই তেল — এসব সুন্নাহ খাদ্যের মাধ্যমে একটি স্বাস্থ্যকর ও বরকতময় জীবন গড়ে তোলা।',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: 'বিশ্বাস ও মান',
      description:
        'আমরা শুধুমাত্র ১০০% খাঁটি ও হালাল পণ্য সরবরাহ করি। প্রতিটি পণ্য যত্ন সহকারে নির্বাচিত এবং মান নিয়ন্ত্রণের মাধ্যমে নিশ্চিত করা হয়। আপনার আস্থা আমাদের কাছে সবচেয়ে মূল্যবান।',
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: 'সেবা এলাকা',
      description:
        'আমরা বর্তমানে খুলনা ও ঢাকা থেকে সেবা প্রদান করছি। সারা বাংলাদেশে ক্যাশ অন ডেলিভারিতে পণ্য পাঠানো হয়। ভবিষ্যতে আরো এলাকায় সম্প্রসারণের পরিকল্পনা রয়েছে।',
    },
  ];

  return (
    <div className="bg-[#faf9f6] min-h-screen py-16">
      <div className="container max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1f2937] mb-3">আমাদের সম্পর্কে</h1>
          <p className="text-primary text-lg font-medium">
            দ্য সুন্নাহ ডায়েট — বিশ্বাস, স্বাস্থ্য, সুন্নাহ
          </p>
        </div>

        {/* Content Cards */}
        <div className="space-y-6">
          {sections.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 items-start transition-all hover:shadow-md"
            >
              <div className="bg-[#f0f4f2] p-3 border border-primary/10">{item.icon}</div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#1f2937] mb-3">{item.title}</h2>
                <p className="text-foreground/70 leading-relaxed text-lg">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Quote or Slogan */}
        <div className="mt-20 text-center border-t border-gray-200 pt-10">
          <p className="italic text-foreground/50 text-sm max-w-lg mx-auto">
            "সুস্থ দেহ, শান্ত মন — রাসূল ﷺ এর দেখানো পথেই রয়েছে প্রকৃত কল্যাণ।"
          </p>
        </div>
      </div>
    </div>
  );
}
