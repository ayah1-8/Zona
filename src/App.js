import React from 'react';
import { useState, useEffect } from 'react';
import { Products, Navbar, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    commerce.cart
      .add(productId, quantity)
      .then((response) => setCart(response));
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    //commerce.cart.update(productId, { quantity }).then(response => console.log(response));
    //setCart(commerce.cart.update(productId, { quantity }));

    commerce.cart
      .update(productId, { quantity })
      .then((response) => setCart(response));
  };

  const handleRemoveFromCart = async (productId) => {
    commerce.cart.remove(productId).then((response) => setCart(response));
  };

  const handleEmptyCart = async () => {
    commerce.cart.empty().then((response) => setCart(response));
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  //commerce.cart.retrieve().then((cart) => console.log(cart));
  return (
    <Router>
      <Navbar totalItems={cart.total_items} />
      <Routes>
        <Route
          path="/"
          element={
            <Products products={products} onAddToCart={handleAddToCart} />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          }
        />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}
