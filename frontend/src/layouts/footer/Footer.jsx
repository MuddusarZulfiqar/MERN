import React from 'react'
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div>
        <footer className="footer" style={{borderTop:'1px solid #ebe9e9',marginTop:'80px'}}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-3">
                        <div className="widget widget-link">
                            <ul>
                                <li><Link to="#">About Us</Link></li>
                                <li><Link to="#">Online Store</Link></li>
                                <li><Link to="#">Blog</Link></li>
                                <li><Link to="#">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <div className="widget widget-link link-login">
                            <ul>
                                <li><Link to="#">Login/ Register</Link></li>
                                <li><Link to="#">Your Cart</Link></li>
                                <li><Link to="#">Wishlist items</Link></li>
                                <li><Link to="#">Your checkout</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <div className="widget widget-link link-faq">
                            <ul>
                                <li><Link to="#">FAQs</Link></li>
                                <li><Link to="#">Term of service</Link></li>
                                <li><Link to="#">Privacy Policy</Link></li>
                                <li><Link to="#">Returns</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <div className="widget widget-brand">
							<div className="logo logo-footer">
								<Link to="/"><img src={require("../../assets/logo@2x.png")} alt="logo" width="107" height="24" /></Link>
							</div>
                            <ul className="flat-contact">
                                <li className="address">112 Kingdom, NA 12, New York</li>
                                <li className="phone">+12 345 678 910</li>
                                <li className="email">infor.deercreative@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <div className="footer-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <p className="copyright text-center">Copyright @2018 Link <Link to="/">Logo</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer