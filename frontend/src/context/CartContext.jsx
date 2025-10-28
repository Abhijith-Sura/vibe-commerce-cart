import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/cart`);
      setCart(response.data.cart);
      setTotal(parseFloat(response.data.total));
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (product) => {
    try {
      await axios.post(`${API_URL}/api/cart`, {
        productId: product.id,
        quantity: 1
      });
      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`${API_URL}/api/cart/${itemId}`);
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(itemId);
      } else {
        await axios.put(`${API_URL}/api/cart/${itemId}`, { quantity });
        await fetchCart();
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = () => {
    setCart([]);
    setTotal(0);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
