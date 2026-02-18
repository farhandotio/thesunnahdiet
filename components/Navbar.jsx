'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navLinks = [
    { name: 'হোম', href: '/' },
    { name: 'শপ', href: '/shop', active: true },
    { name: 'আমাদের সম্পর্কে', href: '/about' },
    { name: 'যোগাযোগ', href: '/contact' },
  ];

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-background border-b border-gray-100 z-50">
        <div className="container py-3 flex items-center justify-between">
          {/* Logo and Brand Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-secondary/20 shadow-sm transition-transform group-hover:scale-105">
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

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  link.active ? 'text-primary' : 'text-foreground' // Standard text color for inactive links
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              aria-label="Open Cart"
            >
              <ShoppingCart className="w-6 h-6 text-foreground" />
              <span className="absolute top-1 right-1 bg-secondary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                0
              </span>
            </button>

            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-background border-t border-gray-100 py-6 px-4 space-y-4 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block text-lg font-medium ${
                  link.active ? 'text-primary' : 'text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* --- CART SIDEBAR (Drawer) --- */}
      <div
        className={`fixed inset-0 bg-black/40 z-60 transition-opacity duration-300 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsCartOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-70 shadow-2xl transition-transform duration-300 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between bg-background">
            <h2 className="text-lg font-bold text-primary">আপনার শপিং ব্যাগ</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-foreground/60">আপনার কার্ট বর্তমানে খালি আছে।</p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              শপিং শুরু করুন
            </button>
          </div>

          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between mb-4">
              <span className="font-medium">মোট:</span>
              <span className="font-bold">৳ 0.00</span>
            </div>
            <button className="w-full py-3 bg-secondary text-white font-bold rounded-lg hover:brightness-110 transition-all">
              চেকআউট করুন
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
