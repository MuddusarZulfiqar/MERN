import React, { useEffect, useState,useRef } from "react";
import "./cartStyle.css";
import BasePageTitle from "../../components/base/BasePageTitle";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCart from "../../components/views/cart/ProductCart";
import { useDispatch } from "react-redux";
import { clearCart } from "../../features/cart/CartSlice";
import { useNavigate } from 'react-router-dom';
import axios from "../../axiosConfig";
import { toast } from 'react-toastify';
import { options } from '../../utils/tostOptions';
function CartView() {
  // let navigate = useNavigate();
  const dispatch = useDispatch();
  const [tex, setTex] = useState(0);
  const [shipping, setShipping] = useState(0);
  const buttonRef = useRef(null)
  const { cart, totalItems, totalPrice } = useSelector((state) => state.cart);
  useEffect(() => {
    setTex(totalPrice * 0.05);
    setShipping(totalPrice * 0.1);
  }, [totalPrice]);
  const formateNumber = (num) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
    }).format(num);

    const checkout =async ()=>{
      buttonRef.current.disabled = true;
      try {
          const config = {
              headers: {
                  "Content-Type": "application/json",
              },
          };
          // create a payment token using the stripe api
          const response = await axios.post(
              "/payment/process",
              {
                  cart: cart,
                  totalPrice:totalPrice
              },
              config
          );
          console.log(response)
          
      } catch (error) {
        buttonRef.current.disabled = false;
          console.log(error);
          toast.error(error.response.data.message,options);
      }
    }
  return (
    <>
      <BasePageTitle
        detail={{
          background: "bg-parallax1.jpg",
          title: "Cart",
          breadCrumb: "cart",
        }}
      />

      <div className="container cart-View-container ">
        <input type="hidden" name="tex" value={tex} />
        <input type="hidden" name="shipping" value={shipping} />
        {totalItems > 0 ? (
          <>
            <div className="title-section margin-bottom-55 mt-5">
              <h2 className="title">Cart Detail</h2>
            </div>
            <div className="shopping-cart">
              <div className="column-labels">
                <label className="product-image">Image</label>
                <label className="product-details">Product</label>
                <label className="product-price">Price</label>
                <label className="product-quantity">Quantity</label>
                <label className="product-removal">Remove</label>
                <label className="product-line-price">Total</label>
              </div>

              {cart.map((cart) => (
                <ProductCart product={cart} key={cart.productId} />
              ))}

              <div className="totals">
                <div className="totals-item">
                  <label>Subtotal</label>
                  <div className="totals-value" id="cart-subtotal">
                    {formateNumber(totalPrice)}
                  </div>
                </div>
                <div className="totals-item">
                  <label>Tax (5%)</label>
                  <div className="totals-value" id="cart-tax">
                    {formateNumber(tex)}
                  </div>
                </div>
                <div className="totals-item">
                  <label>Shipping</label>
                  <div className="totals-value" id="cart-shipping">
                    {formateNumber(shipping)}
                  </div>
                </div>
                <div className="totals-item totals-item-total">
                  <label>Grand Total</label>
                  <div className="totals-value" id="cart-total">
                    {formateNumber(totalPrice + tex + shipping)}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <button
                  className="mr-2 btn-danger"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </button>
                <button className="btn-success" ref={buttonRef} onClick={()=>checkout()}>Checkout</button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center mt-5">
            <h3>
              No Product Found{" "}
              <Link to={"/"} style={{ textDecoration: "underline" }}>
                Continue shopping
              </Link>
            </h3>
          </div>
        )}
      </div>
    </>
  );
}

export default CartView;
