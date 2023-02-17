import React, { useState, useEffect } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import { addToDb, deleteShoppingCart, getStoreCart } from "../utilites/fakeDb";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (product) => {
    let newProduct = []
    const result = cart.find(item => item.id === product.id)
    if(result){
      product.quantity += 1
      newProduct = [...cart] 
    }else{
      product.quantity = 1
      newProduct = [...cart, product]
    }
    
    setCart(newProduct)
    addToDb(product.id)
  };

  // any fetch item from api or db or localStorage
  useEffect(()=>{
    const storedCart = getStoreCart()
    const newSave = []
    for (const id in storedCart) {
      const addProducts = products.find(product=> product.id === id)
      if(addProducts){
        const quantity = storedCart[id]
        addProducts.quantity = quantity
        newSave.push(addProducts)
      } 
    }
    setCart(newSave)
    
  },[products])

  // remove item in all store cart
  const handleClearCart = () => {
    deleteShoppingCart()
    setCart([])
  };

  return (
    <>
      <div className='shop'>
        <div className='products-container'>
          {products.map((product, index) => {
            return (
              <Product
                key={index}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            );
          })}
        </div>
        <div className='cart-container'>
          <Cart
            cart={cart}
            products={products}
            handleClearCart={handleClearCart}
          />
        </div>
      </div>
    </>
  );
};

export default Shop;
