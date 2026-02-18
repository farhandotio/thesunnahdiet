import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">The Sunnah Diet</h2>
            <p className="text-sm leading-relaxed text-gray-200">
              দ্য সুন্নাহ ডায়েট — রাসুল ﷺ এর সুন্নাহ অনুসরণে স্বাস্থ্যকর জীবনযাপন।
            </p>
            <p className="text-sm italic text-gray-300 leading-relaxed border-l-2 border-secondary/50 pl-4">
              "তোমরা যদি আল্লাহর উপর যথাযথভাবে তাওয়াক্কুল করো, তবে তিনি তোমাদের রিযিক দিবেন যেমন
              পাখিদের দেন।"
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:pl-10">
            <h3 className="text-lg font-bold mb-5 border-b border-white/10 pb-2">দ্রুত লিংক</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-200 hover:text-secondary transition-colors text-sm"
                >
                  হোম
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-gray-200 hover:text-secondary transition-colors text-sm"
                >
                  শপ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-200 hover:text-secondary transition-colors text-sm"
                >
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-200 hover:text-secondary transition-colors text-sm"
                >
                  যোগাযোগ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-5 border-b border-white/10 pb-2">যোগাযোগ</h3>
            <div className="space-y-3 text-sm text-gray-200">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary" />
                <span>01833-956721</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary" />
                <span>+880 1814-029666</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary" />
                <a
                  href="mailto:thesunnahdiet2@gmail.com"
                  className="hover:text-secondary transition-colors"
                >
                  thesunnahdiet2@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>খুলনা ও ঢাকা, বাংলাদেশ</span>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Facebook className="w-4 h-4 text-secondary" />
                <a href="#" className="hover:text-secondary transition-colors">
                  Facebook Page
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-gray-400">
            © {currentYear} The Sunnah Diet – All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
