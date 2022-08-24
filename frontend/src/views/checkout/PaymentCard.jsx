import React, { useRef } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { toast } from 'react-toastify';
import { options } from '../../utils/tostOptions';
import { useSelector } from "react-redux";
export const PaymentCard = () => {
    const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  let tex = cart.totalPrice * 0.05;
  let shipping = cart.totalPrice * 0.1;
  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const shippingInfo = JSON.parse(sessionStorage.getItem("formData"));
  const paymentData = {
    amount: Math.round(cart.totalPrice + tex + shipping),
  }
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    payBtn.current.disabled = true;
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        console.log({
            ...paymentData,
            name: user.user.data.name,
                    email: user.user.data.email,
        })
        // create a payment token using the stripe api
        const { data } = await axios.post(
            "/payment/process",
            {
                cart: cart,
            },
            config
        );
        
    } catch (error) {
        payBtn.current.disabled = false;
        console.log(error);
        toast.error(error.response.data.message,options);
    }
  };
  return (
    <div>
      <h3>Card Info</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="card-element">Credit or debit card</label>
          <CardElement />
        </div>
        
        <button type="submit" className=" btn-block" ref={payBtn}>{`Pay - ${
          cart.totalPrice && cart.totalPrice + tex + shipping
        }.00$`}</button>
      </form>
    </div>
  );
};
