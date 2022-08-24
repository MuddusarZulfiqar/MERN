import React, { useState,useEffect } from "react";
import {useDispatch} from 'react-redux';
import {getCartFromLocalStorage,editProductQuantityInCart,removeProductFromCart} from '../../../features/cart/CartSlice.js'
function ProductCart({ product }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);

  useEffect(()=>{
    dispatch(editProductQuantityInCart({id:product.productId,quantity:quantity}))
    dispatch(getCartFromLocalStorage());
  },[dispatch,quantity])

  return (
    <div className="product">
      <div className="product-image">
        <img src="https://s.cdpn.io/3/dingo-dog-bones.jpg" />
      </div>
      <div className="product-details">
        <div className="product-title font-weight-bold">{product.name}</div>
        <p>{product.description}</p>
      </div>
      <div className="product-price">{new Intl.NumberFormat('en-US',{style:'currency',currency:'usd'}).format(product.price)}</div>
      <div className=" product-quantity product-detail">
        <div className="quantity">
          <input
            type="number"
            name="quantity-number"
            className="quantity-number"
            min="1"
            max={product.stock}
            value={quantity}
            readOnly
            onChange={(e) => {
              if (e.target.value > product.stock) {
                setQuantity(product.stock);
              } else {
                setQuantity(e.target.value);
              }
            }}
          />
          <span
            className="inc quantity-button"
            onClick={() => {
              if (quantity < product.stock) {
                setQuantity(()=>{
                  return quantity + 1
                });
              }
              
            }}
          >
            +
          </span>
          <span
            className="dec quantity-button"
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
                
              }
              
            }}
          >
            -
          </span>
        </div>
      </div>
      <div className="product-removal">
        <button className="btn-danger" onClick={()=>dispatch(removeProductFromCart(product.productId))}>Remove</button>
      </div>
      <div className="product-line-price">
        {new Intl.NumberFormat('en-US',{style:'currency',currency:'usd'}).format(product.price * product.quantity)}
      </div>
    </div>
  );
}

export default ProductCart;
