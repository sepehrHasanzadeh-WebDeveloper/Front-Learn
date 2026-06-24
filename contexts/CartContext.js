"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (err) {
      console.error(err);
      localStorage.removeItem("cart");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (course) => {
    setCart((prev) => {
      const exists = prev.some((item) => item._id === course._id);
      if (exists) return prev;
      return [...prev, course];
    });
  };
  const removeFromCart = (courseId) => {
    setCart((prev) => prev.filter((item) => item._id !== courseId));
  };
  const clearCart = () => {
    setCart([]);
  };
  const isInCart = (courseId) => {
    return cart.some((item) => item._id === courseId);
  };

  const cartCount = cart.length;

  const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
