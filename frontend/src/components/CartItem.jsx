import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="cart-item">
      <img 
        src={item.image} 
        alt={item.name} 
        className="cart-item-image"
      />
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-price">${item.price}</p>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-control">
          <button className="quantity-btn" onClick={handleDecrement}>-</button>
          <span className="quantity-display">{item.quantity}</span>
          <button className="quantity-btn" onClick={handleIncrement}>+</button>
        </div>
        <button className="remove-btn" onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
