import React from 'react';
import { useState, useEffect } from 'react';
import { Products, Navbar, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    await setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    await commerce.cart
      .add(productId, quantity)
      .then((response) => setCart(response));
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    //commerce.cart.update(productId, { quantity }).then(response => console.log(response));
    //setCart(commerce.cart.update(productId, { quantity }));

    await commerce.cart
      .update(productId, { quantity })
      .then((response) => setCart(response));
  };

  const handleRemoveFromCart = async (productId) => {
    await commerce.cart.remove(productId).then((response) => setCart(response));
  };

  const handleEmptyCart = async () => {
    await commerce.cart.empty().then((response) => setCart(response));
  };
  const refreshCart = async () => {
    await commerce.cart.refresh().then((response) => setCart(response));
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      //const incomingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder);
      //setOrder(incomingOrder);
      await commerce.checkout
        .capture(checkoutTokenId, newOrder)
        .then((response) => setOrder(response));
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
      console.log('errroorrrr in handle checkout');
      console.log(error.data.error.message);
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);
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
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              refreshCart={refreshCart}
              error={errorMessage}
            />
          }
        />
      </Routes>
    </Router>
  );
}
