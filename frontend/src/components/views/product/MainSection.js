import React,{useState,useRef, useEffect} from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import Zoom from "react-medium-image-zoom";

import StarRating from "react-star-ratings";
import { Link } from "react-router-dom";
import { useAlert } from 'react-alert';
import useCurrency from '../../../hooks/useCurrency';
import {useDispatch,useSelector} from 'react-redux';
import {addProductToCart,getCartFromLocalStorage} from '../../../features/cart/CartSlice.js';
function MainSection({product}) {
    // get ref for input hidden
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    // 16% extra price
    const extraPrice = useCurrency(product?.price * 100 / 60);
    const realPrice = useCurrency(product?.price);
    const [quantity, setQuantity] = useState(1);
    
    const addToCart = () => {
      const cartObject = {
          productId: product?._id,
          quantity: quantity,
          ...product
      };
       const reserved = inputRef.current.value;
       if(product.stock < cartObject.quantity){
            alert.error('Not enough stock');
            return;
        }
       
       // dispatch add to cart action
        dispatch(addProductToCart(cartObject));
      // if(!cart.error || cart.success){
      //   alert.success('Product Is add to cart');
      // }
    }
    useEffect(()=>{
      dispatch(getCartFromLocalStorage());
    },[dispatch])
  return (
    <section className="flat-row main-shop shop-detail">
      <input type={'hidden'} value={product?.reserved} name={'productReserved'} ref={inputRef} />
        <div className="container">
          <div className="row">
            <div className="col-md-6 p-relative ">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                slidesPerView={1}
                autoplay={true}
                navigation
                pagination={{ clickable: "true" }}
              >
                <SwiperSlide>
                  <Zoom>
                    <img
                      src="/images/shop/sh-detail/detail-01.jpg"
                      alt="Image dsf"
                    />
                  </Zoom>
                  <div className="flat-icon style-1">
                    <span className="zoom-popup">
                      <span className="fa fa-search-plus"></span>
                    </span>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <Zoom>
                    <img
                      src="/images/shop/sh-detail/detail-01.jpg"
                      alt="Image dsf"
                    />
                  </Zoom>
                  <div className="flat-icon style-1">
                    <span className="zoom-popup">
                      <span className="fa fa-search-plus"></span>
                    </span>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <Zoom>
                    <img
                      src="/images/shop/sh-detail/detail-01.jpg"
                      alt="Image dsf"
                    />
                  </Zoom>
                  <div className="flat-icon style-1">
                    <span className="zoom-popup">
                      <span className="fa fa-search-plus"></span>
                    </span>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <Zoom>
                    <img
                      src="/images/shop/sh-detail/detail-01.jpg"
                      alt="Image dsf"
                    />
                  </Zoom>
                  <div className="flat-icon style-1">
                    <span className="zoom-popup">
                      <span className="fa fa-search-plus"></span>
                    </span>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <Zoom>
                    <img
                      src="/images/shop/sh-detail/detail-01.jpg"
                      alt="Image dsf"
                    />
                  </Zoom>
                  <div className="flat-icon style-1">
                    <span className="zoom-popup">
                      <span className="fa fa-search-plus"></span>
                    </span>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            <div className="col-md-6">
              <div className="product-detail">
                <div className="inner">
                  <div className="content-detail">
                    <h2 className="product-title">{product.name}</h2>
                    <div className="flat-star style-1">
                      <StarRating
                        starRatedColor="#ffc107"
                        starDimension="22px"
                        starSpacing="3px"
                        rating={product.averageRating}
                        numberOfStars={5}
                        name="rating"
                      />
                      <span>({product.ratings.length})</span>
                    </div>
                    <p>
                      {product.description.length > 100 ? product.description.substring(0, 100) + '...' : product.description}
                    </p>
                    <div className="price">
                      <del>
                        <span className="regular">{extraPrice}</span>
                      </del>
                      <ins>
                        <span className="amount">{realPrice}</span>
                      </ins>
                    </div>
                    <div className="product-quantity">
                      <div className="quantity">
                        <input
                          type="number"
                          value={product.stock <= 0 ? '0' : quantity}
                          name="quantity-number"
                          className="quantity-number"
                          readOnly={product.stock <= 0 ? true : false}
                          min={product.stock <= 0 ? '0' : quantity }
                          max={product.stock <= 0 ? '0' : product.stock}
                          onChange={(e) => {
                            if(e.target.value > product.stock) {
                              setQuantity(product.stock);
                            } else {
                              setQuantity(e.target.value);
                            }
                            
                          }}
                        />
                        <span className="inc quantity-button" onClick={
                          () => {
                            if(quantity < product.stock) {
                              setQuantity(quantity + 1);
                            }
                          }
                        }>+</span>
                        <span className="dec quantity-button" onClick={
                          () => {
                            if(quantity > 1) {
                              setQuantity(quantity - 1);
                            }
                          }
                        }>-</span>
                      </div>
                      {
                        product.stock <= 0 ? <button disabled={true}>Sold Out</button> : <button onClick={addToCart}>Add To Cart</button>
                      }
                    </div>
                    
                    <div className="product-categories">
                      <span>Categories: </span>
                      <Link to={`/products/${product.category}`}>{product.category}</Link>
                    </div>
                    <div className="product-tags">
                      <span>Status: </span>
                      <Link to="#">{product.stock <= 0 ? 'Sold Out' : 'Available'}</Link>
                    </div>
                    <div className="product-tags">
                      <span>Tags: </span>
                      {
                        product.tags.map((tag, index) => (
                            <Link to="#" key={index}> {tag} {index === product.tags.length-1 ? '' :','}</Link>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default MainSection