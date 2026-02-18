import React from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-[#faf9f6] min-h-screen py-16">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1f2937] mb-3">যোগাযোগ করুন</h1>
          <p className="text-foreground/60 text-lg">আমাদের সাথে কথা বলুন</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: Contact Information */}
          <div className="space-y-6">
            <div className="bg-white p-6 border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="bg-[#f0f4f2] p-3 text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#1f2937]">ফোন</h3>
                <p className="text-foreground/70">01833-956721</p>
                <p className="text-foreground/70">+880 1814-029666</p>
              </div>
            </div>

            <div className="bg-white p-6 border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="bg-[#f0f4f2] p-3 text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#1f2937]">ইমেইল</h3>
                <p className="text-foreground/70">thesunnahdiet2@gmail.com</p>
              </div>
            </div>

            <div className="bg-white p-6 border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="bg-[#f0f4f2] p-3 text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#1f2937]">ঠিকানা</h3>
                <p className="text-foreground/70">খুলনা ও ঢাকা, বাংলাদেশ</p>
              </div>
            </div>

            {/* Direct WhatsApp Action */}
            <a
              href="https://wa.me/8801833956721"
              className="flex items-center justify-center gap-3 bg-[#2f5d50] hover:bg-[#254a40] text-white py-4 font-bold transition-all shadow-md group"
            >
              <MessageCircle className="w-6 h-6 transition-transform group-hover:scale-110" />
              <span>WhatsApp-এ মেসেজ করুন</span>
            </a>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white p-8 border border-gray-100 shadow-sm">
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#1f2937] mb-2">আপনার নাম</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-[#fcfcfc] border border-gray-200 focus:border-primary focus:outline-none transition-colors"
                  placeholder="এখানে লিখুন..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1f2937] mb-2">ইমেইল</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-[#fcfcfc] border border-gray-200 focus:border-primary focus:outline-none transition-colors"
                  placeholder="example@gmail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1f2937] mb-2">আপনার বার্তা</label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 bg-[#fcfcfc] border border-gray-200 focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="আপনার কথা এখানে বলুন..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2f5d50] hover:bg-[#254a40] text-white font-bold py-4 flex items-center justify-center gap-2 transition-all"
              >
                <span>বার্তা পাঠান</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
