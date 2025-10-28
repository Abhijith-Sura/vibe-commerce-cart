import React from 'react';
import { useNavigate } from 'react-router-dom';

const Receipt = ({ receipt, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate('/');
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="receipt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="success-icon">✅</div>
        <h2 className="receipt-title">Order Confirmed!</h2>
        
        <div className="receipt-details">
          <div className="receipt-row">
            <span>Order ID:</span>
            <strong>{receipt.orderId}</strong>
          </div>
          <div className="receipt-row">
            <span>Name:</span>
            <strong>{receipt.customerName}</strong>
          </div>
          <div className="receipt-row">
            <span>Email:</span>
            <strong>{receipt.customerEmail}</strong>
          </div>
          <div className="receipt-row">
            <span>Date:</span>
            <strong>{new Date(receipt.timestamp).toLocaleDateString()}</strong>
          </div>
          <div className="receipt-row">
            <span>Time:</span>
            <strong>{new Date(receipt.timestamp).toLocaleTimeString()}</strong>
          </div>
          
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #ddd' }}>
            <strong>Items:</strong>
            {receipt.items.map((item, index) => (
              <div key={index} className="receipt-row" style={{ marginTop: '0.5rem' }}>
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="receipt-total">
            <span>Total:</span>
            <span>${receipt.total}</span>
          </div>
        </div>
        
        <button className="close-modal-btn" onClick={handleClose}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Receipt;
