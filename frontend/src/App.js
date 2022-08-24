import React,{useEffect,useState} from 'react';
import './assets/stylesheets/bootstrap.css';
import './assets/stylesheets/style.css'
import './assets/stylesheets/responsive.css'
import './assets/stylesheets/animate.css'

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Import Zoom
import "react-medium-image-zoom/dist/styles.css";

import {getAllProducts} from './features/products/AllProductSlice';
import {getLoginUser} from './features/auth/UserSlice';
import {getCartFromLocalStorage} from './features/cart/CartSlice';
import {useDispatch, useSelector} from 'react-redux';
import Router from './Router';
import Layout from './layouts/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from './axiosConfig';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';



function App() {
  const dispatch = useDispatch();
  const {status} = useSelector(state=>state.product);
  const [stripeApiKey,setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const {data} = await axios.get('/stripeapikey');
    console.log(data,'The Stripe Data')
    setStripeApiKey(data.stripeApiKey);
    // setStripeApiKey(data.stripeApiKey);
  }
  useEffect(()=>{
    dispatch(getAllProducts());
    dispatch(getLoginUser());
    dispatch(getCartFromLocalStorage());
    if(status === 'loading'){
      document.querySelector('#loading-overlay').classList.add('d-block')
    }
    else{
      document.querySelector('#loading-overlay').classList.remove('d-block')
      document.querySelector('#loading-overlay').classList.add('d-none')
    }
    
  } ,[dispatch]);
  useEffect(()=>{
    getStripeApiKey()
  },[])
  // console.log(stripeApiKey)
  const stripePromise = loadStripe(stripeApiKey);
  return (
    <div className="App">
    <Elements stripe={stripePromise}>
      <div id="loading-overlay">
          <div className="loader"></div>
      </div> 
      <Layout >
        <Router />
      </Layout>
      <ToastContainer />
      </Elements>
    </div>
  );
}

export default App;
