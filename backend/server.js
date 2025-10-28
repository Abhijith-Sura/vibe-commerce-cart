const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data storage
let products = [
  { id: 1, name: 'Wireless Headphones', price: 59.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
  { id: 2, name: 'Smart Watch', price: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
  { id: 3, name: 'Laptop Stand', price: 39.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400' },
  { id: 4, name: 'Mechanical Keyboard', price: 89.99, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400' },
  { id: 5, name: 'Wireless Mouse', price: 29.99, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400' },
  { id: 6, name: 'USB-C Hub', price: 49.99, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400' },
  { id: 7, name: 'Phone Stand', price: 19.99, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400' },
  { id: 8, name: 'Bluetooth Speaker', price: 79.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400' }
];

let cart = [];

// Routes

// GET /api/products - Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// POST /api/cart - Add item to cart
app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body;
  
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: Date.now(),
      productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
  }

  res.status(201).json({ message: 'Item added to cart', cart });
});

// GET /api/cart - Get cart items
app.get('/api/cart', (req, res) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  res.json({ cart, total: total.toFixed(2) });
});

// DELETE /api/cart/:id - Remove item from cart
app.delete('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  cart = cart.filter(item => item.id !== parseInt(id));
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  res.json({ message: 'Item removed', cart, total: total.toFixed(2) });
});

// PUT /api/cart/:id - Update item quantity
app.put('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  
  const item = cart.find(item => item.id === parseInt(id));
  if (item) {
    item.quantity = quantity;
  }
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  res.json({ message: 'Cart updated', cart, total: total.toFixed(2) });
});

// POST /api/checkout - Process checkout
app.post('/api/checkout', (req, res) => {
  const { name, email, cartItems } = req.body;
  
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const receipt = {
    orderId: `ORD-${Date.now()}`,
    customerName: name,
    customerEmail: email,
    items: cartItems,
    total: total.toFixed(2),
    timestamp: new Date().toISOString(),
    status: 'confirmed'
  };

  // Clear cart after checkout
  cart = [];

  res.json(receipt);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
