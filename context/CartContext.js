'use client';
import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { notify } from '@/lib/notification';

const CartContext = createContext();

const parsePrice = (price) => {
  if (typeof price === 'number') return price;
  if (!price) return 0;
  const banglaNums = {
    '০': '0',
    '১': '1',
    '২': '2',
    '৩': '3',
    '৪': '4',
    '৫': '5',
    '৬': '6',
    '৭': '7',
    '৮': '8',
    '৯': '9',
  };
  const enPrice = price.toString().replace(/[০-৯]/g, (d) => banglaNums[d]);
  return parseInt(enPrice.replace(/[^0-9]/g, '')) || 0;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // ১. LocalStorage থেকে ডাটা লোড করা
  useEffect(() => {
    const savedCart = localStorage.getItem('sunnah_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Cart loading error:', error);
      }
    }
    setIsInitialized(true);
  }, []);

  // ২. LocalStorage-এ সেভ করা
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('sunnah_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  // কার্টে যোগ করা (সংশোধিত: আপডেট ফাংশনের বাইরে নোটিফিকেশন)
  const addToCart = (product, quantity = 1) => {
    const productId = product._id || product.id;

    setCartItems((prev) => {
      const isExist = prev.find((item) => (item._id || item.id) === productId);
      if (isExist) {
        return prev.map((item) =>
          (item._id || item.id) === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    // setTimeout ব্যবহার করে ডাবল নোটিফিকেশন এবং রেন্ডার এরর ফিক্স করা হয়েছে
    setTimeout(() => {
      notify.success(`${product.name} কার্টে যোগ করা হয়েছে`);
    }, 0);
  };

  // পরিমাণ পরিবর্তন করা
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => ((item._id || item.id) === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  // কার্ট থেকে সরানো (সংশোধিত)
  const removeFromCart = (id) => {
    const itemToRemove = cartItems.find((item) => (item._id || item.id) === id);

    setCartItems((prev) => prev.filter((item) => (item._id || item.id) !== id));

    if (itemToRemove) {
      setTimeout(() => {
        notify.error(`${itemToRemove.name} সরিয়ে ফেলা হয়েছে`);
      }, 0);
    }
  };

  // কার্ট ক্লিয়ার করা (সংশোধিত)
  const clearCart = () => {
    if (cartItems.length === 0) return;

    setCartItems([]);
    localStorage.removeItem('sunnah_cart');

    setTimeout(() => {
      notify.error('কার্ট খালি করা হয়েছে');
    }, 0);
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + parsePrice(item.price) * item.quantity;
    }, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
