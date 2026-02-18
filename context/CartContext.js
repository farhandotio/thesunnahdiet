'use client';
import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

// বাংলা সংখ্যাকে ইংরেজিতে রূপান্তর করার হেল্পার ফাংশন
const bnToEn = (str) => {
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
  return str.replace(/[০-৯]/g, (d) => banglaNums[d]);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  // সাবটোটাল ক্যালকুলেশন (NaN ফিক্সড)
  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      // প্রথমে বাংলা সংখ্যাকে ইংরেজিতে রূপান্তর করা হচ্ছে, তারপর নাম্বার এ কনভার্ট করা হচ্ছে
      const priceInEnglish = bnToEn(item.price.toString());
      const numericPrice = parseInt(priceInEnglish) || 0;
      return total + numericPrice * item.quantity;
    }, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
