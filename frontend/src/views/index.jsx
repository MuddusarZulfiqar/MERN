import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BaseProductCard from "../components/base/BaseProductCard";
function HomePage() {
  const { status, response } = useSelector((state) => state.product);
  console.log(response);
  return (
    <>
      <div className="boxed">
        <div
          className="rev_slider_wrapper fullwidthbanner-container"
          style={{ marginBottom: "70px", height: "70vh" }}
        >
          <img
            src="images/site-images/banner.jpg"
            alt="banner"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <section className="flat-row main-shop no-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="product-content product-fourcolumn clearfix">
                  <h2 className="mb-5">Features Products</h2>
                  {status === "loading" ? (
                    <div>Loading</div>
                  ) : (
                    <ul className="product style4 isotope-product gutter-15 clearfix">
                      <li>
                        {response.data?.products.slice(0, 4).map((product) => (
                          <BaseProductCard
                            key={product._id}
                            product={product}
                          />
                        ))}
                      </li>
                    </ul>
                  )}
                </div>
                <div className="divider h1"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="flat-row row-icon-box style-3">
          <div className="container">
            <div className="row separator dark">
              <div className="col-md-4">
                <div className="flat-icon-box icon-left  style-2 clearfix">
                  <div
                    className="inner flat-content-box"
                    data-margin="0 0 0 66px"
                    data-mobilemargin="0 0 0 0"
                  >
                    <div className="icon-wrap">
                      <i className="fa fa-plane"></i>
                    </div>
                    <div className="text-wrap">
                      <h5 className="heading">
                        <Link to="#">Free Shipping</Link>
                      </h5>
                      <p className="desc">Free shipping on order over $300</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="flat-icon-box icon-left style-2 clearfix">
                  <div
                    className="inner flat-content-box"
                    data-margin="0 0 0 82px"
                    data-mobilemargin="0 0 0 0"
                  >
                    <div className="icon-wrap">
                      <i className="fa fa-usd"></i>
                    </div>
                    <div className="text-wrap">
                      <h5 className="heading">
                        <Link to="#">Cash On Delivery</Link>
                      </h5>
                      <p className="desc">The internet tend to repeat</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="flat-icon-box icon-left style-2 clearfix">
                  <div
                    className="inner flat-content-box"
                    data-margin="0 0 0 74px"
                    data-mobilemargin="0 0 0 0"
                  >
                    <div className="icon-wrap">
                      <i className="fa fa-refresh"></i>
                    </div>
                    <div className="text-wrap">
                      <h5 className="heading">
                        <Link to="#">Money Safe</Link>
                      </h5>
                      <p className="desc">30 day money guarantee</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
