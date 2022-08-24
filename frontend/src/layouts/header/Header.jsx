import React from "react";
import { Link, NavLink } from "react-router-dom";
// import LogoImage from "";
import { useSelector  } from 'react-redux'
function Header() {
  
  const {isLogin} = useSelector(state=>state.user);
  const {totalItems} = useSelector(state=>state.cart);
  return (
    <div id="site-header-wrap" >
      <header id="header" className="header header-container clearfix">
        <div className="container clearfix" id="site-header-inner">
          <div id="logo" className="logo float-left">
            <Link to="/" title="logo">
              <img
                src={require('../../assets/logo.png')}
                alt="Logo"
                width="107"
                height="24"
                data-retina="images/logo@2x.png"
                data-width="107"
                data-height="24"
              />
              
            </Link>
          </div>
          <div className="mobile-button">
            <span></span>
          </div>
          <ul className="menu-extra">
            <li className="box-search">
              <Link
                className="icon_search header-search-icon"
                to="/search"
              ></Link>
            </li>
            <li className="box-login">
              <Link className="icon_login" to={isLogin ? "/dashboard/profile":"/login"}></Link>
            </li>
            <li className="box-cart nav-top-cart-wrapper">
              <Link className="icon_cart nav-cart-trigger active" to="/cart">
              {totalItems >0 ? <span>{totalItems}</span> : null}
                
              </Link>
            </li>
          </ul>
          <div className="nav-wrap">
            <nav id="mainnav" className="mainnav">
              <ul className="menu">
                <li >
                  <NavLink to="/"  exact="true">
                    HOME
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products/all">Products</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">CONTACT</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
