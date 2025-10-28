import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="product-card">
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price}</p>
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? '✓ Added!' : '+ Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
