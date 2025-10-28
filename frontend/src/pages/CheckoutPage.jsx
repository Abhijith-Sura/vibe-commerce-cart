import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import Receipt from '../components/Receipt';

const CheckoutPage = () => {
  const { cart, total, clearCart } = useCart();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [receipt, setReceipt] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${API_URL}/api/checkout`, {
        name: formData.name,
        email: formData.email,
        cartItems: cart
      });
      
      setReceipt(response.data);
      clearCart();
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  if (receipt) {
    return <Receipt receipt={receipt} onClose={() => setReceipt(null)} />;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>
        
        <div className="order-summary">
          <h3 className="order-summary-title">Order Summary</h3>
          {cart.map(item => (
            <div key={item.id} className="order-item">
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="order-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
