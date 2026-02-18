'use client';
import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

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
  return str.toString().replace(/[০-৯]/g, (d) => banglaNums[d]);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ১. কার্টে যোগ করা
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

  // ২. কার্ট থেকে মুছে ফেলা
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ৩. পরিমাণ আপডেট করা
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  // ৪. কার্ট সম্পূর্ণ খালি করা (অর্ডার শেষে ব্যবহার হবে)
  const clearCart = () => {
    setCartItems([]);
  };

  // ৫. মোট টাকার হিসাব
  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const numericPrice = parseInt(bnToEn(item.price)) || 0;
      return total + numericPrice * item.quantity;
    }, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart, // এখানে নতুন ফাংশনটি এক্সপোর্ট করা হলো
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
