import React from 'react';
import { useState, useEffect } from 'react';
import { Products, Navbar, Cart } from './components';
import { commerce } from './lib/commerce';

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
    const item = await commerce.cart.add(productId, quantity);
    setCart(item);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  //console.log(cart);

  return (
    <>
      <Navbar totalItems={cart.total_items} />
      {/*<Products products={products} onAddToCart={handleAddToCart} />*/}
      <Cart cart={cart} />
    </>
  );
}
