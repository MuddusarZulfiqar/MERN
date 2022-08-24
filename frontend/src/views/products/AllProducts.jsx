import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import BasePageTitle from "../../components/base/BasePageTitle";
import ReactSlider from "react-slider";
import "./sliderRange.css";
import ReactPaginate from "react-paginate";
import axios from "../../axiosConfig";
import CategoryProduct from "../../components/views/product/CategoryProduct";
function AllProductsView() {
  const { category } = useParams();
  const [product,setProduct] = useState([]);
  const [totalPage,setTotalPage] = useState(0);
  const [currentPage,setCurrentPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.search || "");
  const [error,setError] = useState(false);
  const [filterPrice, setFilterPrice] = useState({
    min: 0,
    max: 1000,
  });
  const [query, setQuery] = useState({
    category: category,
    keyword: searchParams.get("keyword") || "",
    page: searchParams.get("page") || 1,
  });

  const pageDetail = {
    background: "bg-parallax1.jpg",
    title: `Products - ${category.charAt(0).toUpperCase() + category.slice(1)}`,
    breadCrumb: "Products",
  };

  // Get all products
  const GetProducts = ()=>{
    const createQueryUrl = () => {
        let queryUrl = `?price[gt]=${filterPrice.min}&price[lt]=${filterPrice.max}&`;
        if (query.keyword) {
            if(query.keyword.length > 0){
                queryUrl += `keyword=${query.keyword}&`;
            }
        }
        if (query.category) {
            // if query category is all, then don't add category to query url
            if (query.category !== "all") {
                queryUrl += `category=${query.category}&`;
            }
        }
        if (query.page) {
            queryUrl += `page=${query.page}&`;
        }
        return queryUrl;
    }
    const queryUrl = createQueryUrl();
    
    axios.get(`/product${queryUrl}`).then(res=>{

        setProduct(res.data.data.products);
        setTotalPage(res.data.totalPages);
        setCurrentPage(res.data.page);
    }).catch(err=>{
        setError(true);
    }
    )
  }

  useEffect(() => {
    setSearchParams({
      category: query.category,
      page: query.page,
      keyword: query.keyword,
    });
    // api call
    GetProducts()
    
  }, [category, query,filterPrice]);

  // Pagination Handle Change
  const handlePageChange = (event) => {
    setQuery({
      ...query,
      page: event.selected + 1,
    });
  };
  return (
    <>
      {
        error ? <div id="loading-overlay">
          <div className="loader"></div>
        </div> : <>
        <BasePageTitle detail={pageDetail} />
      <section className="flat-row main-shop shop-slidebar">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="sidebar slidebar-shop">
                <div className="widget widget-search">
                  <form
                    className="search-form"
                    onSubmit={(e) => {
                            e.preventDefault();
                            setQuery({ ...query, keyword: search });
                        }
                    }
                  >
                    <label>
                      <input
                        type="search"
                        className="search-field"
                        placeholder="Search …"
                        value={search}
                        name="search"
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                      />
                    </label>
                    <input
                      type="submit"
                      className="search-submit"
                      value="Search"
                    style={{backgroundImage: "url(/images/blog/search_icon.png)"}} />
                    
                  </form>
                </div>

                <div className="widget widget-price">
                  <h5 className="widget-title">Filter by price</h5>
                  <div className="price-filter">
                    <div id="slide-range"></div>
                    <p className="amount">Price:</p>
                    <ReactSlider
                      className="horizontal-slider"
                      thumbClassName="example-thumb"
                      trackClassName="example-track"
                      defaultValue={[
                        0,
                        1000,
                      ]}
                      min={0}
                      max={1000}
                      step={10}
                      
                      ariaLabel={["Lower thumb", "Upper thumb"]}
                      ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                      renderThumb={(props, state) => (
                        <div {...props}>{state.valueNow}</div>
                      )}
                      pearling
                      onAfterChange={(value) => {
                          setFilterPrice({
                            min: value[0],
                            max: value[1],
                          });
                        }
                      }
                    />
                  </div>
                </div>
                <div className="widget widget_tag">
                 
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="filter-shop clearfix">
                <p className="showing-product float-right">
                  Showing {currentPage}–{totalPage} of {product.length} Products
                </p>
              </div>
              <div className="product-content product-threecolumn product-slidebar clearfix">
                <ul className="product style2 sd1">
                {
                    product.length > 0 ? product.map((item,index)=>(
                        <li className="product-item" key={index}>
                            <CategoryProduct product={item} />
                        </li>
                    )):<p>No Result Found</p>
                  }
                </ul>
              </div>
              <div className="product-pagination text-center clearfix">
                {
                    totalPage > 1 && (
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=" >"
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={5}
                    pageCount={totalPage - 1}
                    previousLabel="<"
                    containerClassName="flat-pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={query.page - 1 || 0}
                  /> )
                }
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
      }
    </>
  );
}

export default AllProductsView;
