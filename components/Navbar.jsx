'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();

  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'হোম', href: '/' },
    { name: 'শপ', href: '/shop' },
    { name: 'আমাদের সম্পর্কে', href: '/about' },
    { name: 'যোগাযোগ', href: '/contact' },
  ];

  return (
    <>
      {/* স্পেসার - যাতে কন্টেন্ট নেভবারের নিচে না ঢাকা পড়ে */}
      <div className="h-24 w-full" />

      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-24 bg-white/95 backdrop-blur-md border-b-2 border-gray-50 z-50 flex items-center shadow-lg shadow-gray-100/50">
        <div className="container flex items-center justify-between px-4">
          {/* লোগো সেকশন */}
          <Link
            href="/"
            aria-label="দ্য সুন্নাহ ডায়েট হোমপেজ"
            className="flex items-center md:gap-2 group"
          >
            <div className="relative w-15 h-15 overflow-hidden transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <Image
                src="https://image2url.com/r2/default/images/1771398821942-fc97f9bf-c0b4-4978-a784-08287729e572.png"
                alt="The Sunnah Diet Logo"
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>
            <div className="">
              <h1 className="text-primary font-black text-xl md:text-3xl leading-none italic uppercase tracking-tighter">
                দ্য সুন্নাহ ডায়েট
              </h1>
              <p className="text-gray-500 text-[12px] font-black uppercase tracking-wide mt-1">
                বিশুদ্ধ ও সুন্নাহ সম্মত
              </p>
            </div>
          </Link>

          {/* ডেস্কটপ নেভিগেশন (বড় টেক্সট) */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={`${link.name} পেজে যান`}
                className={`text-base font-black uppercase tracking-wide transition-all hover:text-primary relative group ${
                  pathname === link.href ? 'text-primary' : 'text-slate-600'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-2 rounded-full left-0 h-1 bg-primary transition-all duration-300 ${
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* অ্যাকশন বাটনসমূহ */}
          <div className="flex items-center gap-4 md:gap-8">
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`আপনার শপিং কার্ট খুলুন - ${cartItems.length} টি পণ্য`}
              className="p-3 rounded-lg transition-all relative group"
            >
              <ShoppingBag className="w-7 h-7 text-slate-800 group-hover:text-primary transition-colors" />
              {cartItems.length > 0 && (
                <div className="absolute -top-1 -right-1 bg-primary text-white text-[12px] min-w-6 h-6 px-1.5 rounded-full flex items-center justify-center font-black shadow-xl border-2 border-white">
                  {cartItems.length}
                </div>
              )}
            </button>

            <button
              className="md:hidden p-3 bg-gray-100 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* মোবাইল ড্রপডাউন মেনু */}
        {isOpen && (
          <div className="absolute top-24 left-0 right-0 bg-white border-b-4 border-primary py-10 px-8 flex flex-col gap-6 shadow-2xl md:hidden animate-in slide-in-from-top duration-500">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={`${link.name} পেজে যান`}
                onClick={() => setIsOpen(false)}
                className="text-xl font-black uppercase tracking-wide text-slate-800 border-b border-gray-100 pb-2 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* CART SIDEBAR (Drawer) */}
      <div
        className={`fixed inset-0 bg-black/70 z-60 backdrop-blur-sm transition-opacity duration-100 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-70 shadow-2xl transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* কার্ট হেডার */}
          <div className="p-8 border-b-2 border-slate-50 flex items-center justify-between  bg-[#2f5d5015]">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-black uppercase tracking-wide text-primary">
                শপিং কার্ট <span className="text-slate-400">({cartItems.length})</span>
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="কার্ট বন্ধ করুন"
              className="p-3 cursor-pointer"
            >
              <X className="w-6 h-6 text-slate-500 hover:text-slate-800 transition-colors duration-150" />
            </button>
          </div>

          {/* কার্ট আইটেম লিস্ট */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30 italic">
                <ShoppingCart className="w-24 h-24 mb-6 stroke-[0.5px]" />
                <p className="text-lg font-black uppercase tracking-wide">
                  আপনার কার্টটি একদম খালি
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id || item.id}
                  className="flex gap-4 group relative animate-in fade-in slide-in-from-right duration-500 pb-4 border-b border-slate-50 last:border-0"
                >
                  {/* Product Image - Smaller Size */}
                  <div className="w-16 h-16 relative bg-[#fcfbf9] border border-slate-100 shrink-0 overflow-hidden rounded shadow-sm">
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-black text-[15px] text-slate-800 uppercase tracking-tighter line-clamp-1 leading-tight">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item._id || item.id)}
                        aria-label={`${item.name} কার্ট থেকে সরান`}
                        className="text-slate-300 hover:text-red-500 transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      {/* Price */}
                      <p className="text-primary font-black text-base italic tracking-tighter">
                        ৳{item.price}
                      </p>

                      {/* Quantity Controls - Compact Style */}
                      <div className="flex items-center bg-slate-50 border border-slate-200 rounded overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                          aria-label="পরিমাণ কমান"
                          className="p-1.5 hover:bg-white transition-colors text-slate-500 hover:text-primary"
                        >
                          <Minus className="w-3.5 h-3.5 stroke-[3px]" />
                        </button>
                        <span className="px-2 text-xs font-black min-w-[32px] text-center text-primary">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                          aria-label="পরিমাণ বাড়ান"
                          className="p-1.5 hover:bg-white transition-colors text-slate-500 hover:text-primary"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[3px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* কার্ট ফুটার */}
          {cartItems.length > 0 && (
            <div className="p-10 border-t-4 border-primary/10 bg-white">
              <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wide leading-none mb-1">
                    TOTAL PAYABLE
                  </span>
                  <span className="font-black text-sm text-slate-500 uppercase tracking-wide">
                    সর্বমোট প্রদেয়
                  </span>
                </div>
                <span className="font-black text-4xl text-primary italic tracking-tighter shadow-green-500/10">
                  ৳{cartTotal.toLocaleString('bn-BD')}
                </span>
              </div>

              <Link
                href="/checkout"
                aria-label="চেকআউট পেজে গিয়ে অর্ডার নিশ্চিত করুন"
                onClick={() => setIsCartOpen(false)}
                className="block w-full py-6 bg-primary text-white text-base font-black uppercase tracking-wide text-center hover:bg-slate-900 shadow-2xl shadow-primary/30 transition-all active:scale-[0.98] rounded-sm transform relative overflow-hidden group"
              >
                <span className="relative z-10">চেকআউট নিশ্চিত করুন</span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes bounce-short {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        .animate-bounce-short {
          animation: bounce-short 2s infinite;
        }
      `}</style>
    </>
  );
}
