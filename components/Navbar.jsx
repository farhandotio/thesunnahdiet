'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext'; // Context ইম্পোর্ট করুন

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // কার্ট ডাটা এবং ফাংশনালিটি নিয়ে আসা
  const { cartItems, addToCart, removeFromCart, updateQuantity, cartTotal } = useCart();

  const navLinks = [
    { name: 'হোম', href: '/' },
    { name: 'শপ', href: '/shop' },
    { name: 'আমাদের সম্পর্কে', href: '/about' },
    { name: 'যোগাযোগ', href: '/contact' },
  ];

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-background border-b border-gray-100 z-50">
        <div className="container py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 overflow-hidden transition-transform group-hover:scale-105">
              <Image
                src="https://image2url.com/r2/default/images/1771398821942-fc97f9bf-c0b4-4978-a784-08287729e572.png"
                alt="The Sunnah Diet Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-primary font-bold text-xl leading-tight">The Sunnah Diet</h1>
              <p className="text-foreground/70 text-xs font-sans">দ্য সুন্নাহ ডায়েট</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-gray-100 transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6 text-foreground" />
              {cartItems.length > 0 && (
                <span className="absolute top-1 right-1 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </button>

            <button className="md:hidden p-2 hover:bg-gray-100" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-background border-t border-gray-100 py-6 px-4 space-y-4 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-lg font-medium text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* --- CART SIDEBAR (Drawer) --- */}
      <div
        className={`fixed inset-0 bg-black/50 z-60 transition-opacity duration-300 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsCartOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-70 shadow-2xl transition-transform duration-300 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary">আপনার কার্ট ({cartItems.length})</h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <ShoppingCart className="w-12 h-12 text-gray-200 mb-2" />
                <p className="text-foreground/50">কার্ট খালি আছে</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 relative bg-gray-50 shrink-0 border border-gray-100">
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        fill
                        className="object-cover"
                        unoptimized // এক্সটারনাল ইমেজের জন্য নিরাপদ
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-sm text-[#1f2937] leading-tight pr-2">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-600 transition-colors shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-secondary font-bold mt-1 text-sm">৳{item.price}</p>
                      </div>

                      {/* Quantity Toggler (Sharp Design) */}
                      <div className="flex items-center mt-2 border border-gray-200 w-fit bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-gray-50 border-r border-gray-200 transition-colors"
                        >
                          <Minus className="w-3 h-3 text-foreground/60" />
                        </button>
                        <span className="px-4 text-xs font-bold min-w-7.5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-gray-50 border-l border-gray-200 transition-colors"
                        >
                          <Plus className="w-3 h-3 text-foreground/60" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between mb-4">
                <span className="font-medium text-foreground/60">সাবটোটাল:</span>
                <span className="font-bold text-xl text-primary">৳ {cartTotal}</span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="block w-full py-4 bg-secondary text-white font-bold text-center hover:brightness-110 transition-all shadow-lg active:scale-[0.98]"
              >
                চেকআউট করুন
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
