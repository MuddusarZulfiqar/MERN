import React, { useEffect, useState } from "react";
import BasePageTitle from "../../components/base/BasePageTitle";
import MainSection from "../../components/views/product/MainSection";
import { useParams } from "react-router-dom";
import StarRating from "react-star-ratings";
import axios from "../../axiosConfig.js";
import { useSelector } from "react-redux";

import { toast } from 'react-toastify';
import { options } from '../../utils/tostOptions';
function ProductPage() {
  const user = useSelector(state => state.user);
  const [loading,setLoading] = useState(true)
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [productRating, setProductRating] = useState(0);
  const [error, setError] = useState(false);
  const [productReviews, setProductReviews] = useState({
    message: "",
    rating: productRating,
  });
  const getProductData = async ()=>{
    setLoading(true)
     await axios.get(`/product/${productId}`).then((res)=>{
      const {data} = res;
      setProduct(data.data.product);
    }).catch((err)=>{
      setError(true)
      toast.error(err.response.data.message,options);
      // console.log(err)
    }).finally(()=>{
      setLoading(false);
    })
  }
  useEffect(() => {
    getProductData();
    return () => {
      setProduct(null);
    }
  }, [productId]);
  const changeHandler = (e) => {
    setProductReviews({
      ...productReviews,
      [e.target.name]: e.target.value,
    });
  };
  const pageDetail = {
    background: "bg-parallax1.jpg",
    title: product && product.name,
    breadCrumb:'Product'
  };
  const submitComment = (e) => {
    e.preventDefault();
    if(!user.isLogin){
      toast.error('Please Login to Comment',options);
      setProductRating(0);
        setProductReviews({
          message: "",
          rating: 0,
        });
      return;
    }
    // axios post request to add comment to product
    axios
      .post(`/product/${productId}`, productReviews)
      .then(() => {
        toast.info("Review Add successfully",options);
        getProductData();
      })
      .catch((err) => {
        toast.error(err.response.data.message,options);
      })
      .finally(() => {
        setProductRating(0);
        setProductReviews({
          message: "",
          rating: 0,
        });
      });
  };
  return (
    <>
      {(!loading || product?.name) && !error  ? (
        <> 
          <BasePageTitle detail={pageDetail} />
          <MainSection product={product} />

          <section className="flat-row shop-detail-content">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="flat-tabs style-1 has-border">
                    <div className="inner">
                      <div className="inner max-width-83 padding-top-33">
                        {product.ratings?.length > 0 ? (
                          <>
                            <ol className="review-list">
                              {product.ratings.map((review) => (
                                <li className="review" key={review._id}>
                                  <div className="thumb">
                                    <img
                                      src={`https://ui-avatars.com/api/?name=${review.userId.name.replace(
                                        /\s/g,
                                        "+"
                                      )}`}
                                      alt="avatar dse"
                                    />
                                  </div>
                                  <div className="text-wrap">
                                    <div className="review-meta">
                                      <h5 className="name">
                                        {review.userId.name}
                                      </h5>
                                      <div className="flat-star style-1">
                                        {review.rating ? (
                                          <StarRating
                                            rating={review.rating}
                                            starRatedColor="#ffc107"
                                            numberOfStars={5}
                                            name="rating"
                                            starDimension="20px"
                                            starSpacing="1px"
                                          />
                                        ) : (
                                          <div></div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="review-text">
                                      <p>{review.message}</p>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ol>
                          </>
                        ) : (
                          <div className="text-center">No Reviews</div>
                        )}
                        <div
                          className="comment-respond review-respond"
                          id="respond"
                        >
                          <div className="comment-reply-title margin-bottom-14 mt-5">
                            <h5>Write a review</h5>
                          </div>
                          <form
                            className="comment-form review-form"
                            onSubmit={submitComment}
                          >
                            <div className="flat-star style-2">
                              <label className="mr-2">Rating*:</label>
                              <StarRating
                                rating={productRating}
                                starRatedColor="#ffc107"
                                numberOfStars={5}
                                name="rating"
                                starDimension="20px"
                                starSpacing="1px"
                                changeRating={(rating) => {
                                  setProductRating(rating);
                                  setProductReviews({
                                    ...productReviews,
                                    rating: rating,
                                  });
                                }}
                              />
                            </div>
                            <div className="comment-form-comment">
                              <label>Review*</label>
                              <textarea
                                className=""
                                required
                                name="message"
                                value={productReviews.message}
                                onChange={changeHandler}
                              ></textarea>
                            </div>
                            <div className="form-submit">
                              <button className="comment-submit" type="submit">
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div id="loading-overlay">
          <div className="loader"></div>
        </div>
      )
      }
    </>
  );
}

export default ProductPage;
