import React, { useState } from "react";
import BasePageTitle from "../../components/base/BasePageTitle";
import axios from "../../axiosConfig";
import "./search.css";
import SearchCard from "../../components/views/search/SearchCard";

import { toast } from "react-toastify";
import { options } from "../../utils/tostOptions";
function SearchPage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchResult = async (e) => {
    e.preventDefault();
    if (search.length < 3) {
      toast.error("Search term must be at least 3 characters long", options);
      return;
    }
    // remove all spaces from search term
    // const searchTerm = search.replace(/\s/g, "");
    setLoading(true);
    await axios
      .get(`/product?keyword=${search}`)
      .then((res) => {
        setSearchResults(res.data.data.products);
      })
      .catch((err) => {
        alert.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <BasePageTitle
        detail={{
          background: "bg-parallax1.jpg",
          title: "Search",
          breadCrumb: "search",
        }}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="search-container mt-5">
              <div className="search-box">
                <form onSubmit={searchResult}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      required
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <span className="input-group-btn">
                      <button className="btn btn-default" type="submit">
                        <i className="fa fa-search"></i>
                      </button>
                    </span>
                    </div>
                </form>
              </div>
              <div className="search-result">
                <div className="row">
                  {loading ? (
                    <div className="text-center">
                      <img
                        src="/images/Loading_icon.gif"
                        className="img-fluid"
                      />
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <div className="col-md-6" key={product._id}>
                        <SearchCard product={product} />
                      </div>
                    ))
                  ) : (
                    <div className="col-12">
                      <div className="text-center mt-5">
                        <h3>No results found</h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
