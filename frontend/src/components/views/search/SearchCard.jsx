import React from "react";
import { Link } from "react-router-dom";

function SearchCard({product}) {
  return (
    <Link to={`/product/${product._id}`}>
        <div className="search-result-item">
          <div className="search-result-item-left">
            <div className="search-result-item-image">
              <img src="images/shop/sh-4/25.jpg" alt="Product" />
            </div>
            <div className="search-result-item-body">
              <div className="search-result-item-title">{product.name}</div>
              <div className="search-result-item-info">
                <div className="search-result-item-price">
                    ${
                        product.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })
                    }
                </div>
              </div>
            </div>
          </div>
          <div className="search-result-item-right">
            <div className="search-result-item-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </div>
          </div>
        </div>
      </Link>
  );
}

export default SearchCard;
