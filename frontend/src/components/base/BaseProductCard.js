import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getCartFromLocalStorage,
  addProductToCart,
} from "../../features/cart/CartSlice";
import { useDispatch } from "react-redux";
function BaseProductCard({ product }) {
  const dispatch = useDispatch();
  const formateNumber = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
    }).format(price);
  };
  const addToCart = () => {
    const cartObject = {
      productId: product?._id,
      quantity: 1,
      ...product,
    };
    if (product.stock < cartObject.quantity) {
      alert.error("Not enough stock");
      return;
    }

    dispatch(addProductToCart(cartObject));
    dispatch(getCartFromLocalStorage())
  };
  return (
    <div className="product-item ecorative accessories">
      <div className="product-thumb clearfix">
        <Link to={`/product/${product._id}`}>
          <img src="images/shop/sh-4/25.jpg" alt="Logo" />
        </Link>
        <div className="add-to-cart text-center">
          {product.stock <= 0 ? (
            <button disabled={true}>Sold Out</button>
          ) : (
            <button onClick={addToCart}>Add To Cart</button>
          )}
        </div>
      </div>
      <div className="product-info clearfix">
        <span className="product-title">{product.name}</span>
        <div className="price">
          <ins>
            <span className="amount">{formateNumber(product.price)}</span>
          </ins>
        </div>
      </div>
      <Link to="#" className="like">
        <i className="fa fa-heart-o"></i>
      </Link>
    </div>
  );
}

export default BaseProductCard;
