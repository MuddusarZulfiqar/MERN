import React from "react";
import { Link } from "react-router-dom";
import { addProductToCart, getCartFromLocalStorage } from "../../../features/cart/CartSlice";
import { useDispatch } from "react-redux";

function CategoryProduct({product}) {
  const dispatch = useDispatch()
    const formateNumber = (price)=>{
        return new Intl.NumberFormat('en-US',{style:'currency',currency:'usd'}).format(price)
    }
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
    <>
      <div className="product-thumb clearfix">
        <Link to={`/product/${product._id}`}>
          <img src="/images/shop/sh-4/2.jpg" alt="imageghg" />
        </Link>
      </div>
      <div className="product-info clearfix">
        <span className="product-title">
          {
            product.name
          }
        </span>
        <div className="price">
          <ins>
            <span className="amount">{formateNumber(product.price)}</span>
          </ins>
        </div>
      </div>
      <div className="add-to-cart text-center">
          {product.stock <= 0 ? (
            <a disabled={true}>Sold Out</a>
          ) : (
            <a href="#" onClick={(e)=>{e.preventDefault();addToCart()}}>Add To Cart</a>
          )}
      </div>
    </>
  );
}

export default CategoryProduct;
