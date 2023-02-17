import React, { useEffect, useState } from "react";
import "./Cart.css";
import { IoTrashBin } from "react-icons/io5";

const Cart = ({ cart, products, handleClearCart }) => {
  const [offer,setOffer] = useState(false)
  const [freeProduct, setFreeProduct] = useState({})

  useEffect(()=>{
    if(cart.length > 0){
      setOffer(true)
    }
    else{
      setOffer(false)
      setFreeProduct({})
    }
  },[cart])
  

  const handleOffer = () =>{
    const randomNumber = Math.floor(Math.random() * products.length)
    const item = products[randomNumber]
    setFreeProduct(item)
    console.log(cart.length)
  } 
  return (
    <div className='cart'>
      <div className='cart-header'>
        <h1>Order Summery</h1>
        <button
          onClick={handleClearCart}
          className='remove-button'
          title='Clear Cart'
        >
          <IoTrashBin color='white' size={20} />
        </button>
      </div>
      {cart.map((product, index) => (
        <div key={index} className='cart-item'>
          <img src={product.pairImage} alt='' />
          <div>
            <p>
              {product.name} {product.color}
            </p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
          </div>
        </div>
      ))}
      <p>Buy on get one free.</p>
      <button className={offer ? 'offer-button' : 'offer-button-disabled'} onClick={handleOffer} disabled = {!offer}>
         Get one product
      </button>

      
      {/* ui dynamic rendering  means want to show or not*/}
      
      {Object.keys(freeProduct).length > 0 && (<div className='cart-item'>
          <img src={freeProduct.pairImage} alt='' />
          <div>
            <p>
              {freeProduct.name} {freeProduct.color}
            </p>
            <p>Price: ${freeProduct.price}</p>
            <p>Quantity: 1</p>
          </div>
        </div>)}
    </div>
  );
};

export default Cart;
