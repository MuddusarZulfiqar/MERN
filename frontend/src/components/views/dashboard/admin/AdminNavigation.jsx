import React from "react";
import { NavLink } from "react-router-dom";
import "../css/userProfile.css";
import { useNavigate } from "react-router-dom";
import { Logout, getLoginUser } from "../../../../features/auth/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import { useLocation  } from 'react-router-dom'
function UserNavigation() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const LogoutUser = async () => {
    await dispatch(Logout());
    await dispatch(getLoginUser());
    if (user.isLogin) {
      return;
    } else {
      navigate("/");
    }
  };
  const location = useLocation();
  return (
    <nav className="userProfile-nav">
      <ul>
        <li>
          <NavLink to="/dashboard/profile">Profile</NavLink>
        </li>
        <li>
          <Accordion
            defaultActiveKey={
                location.pathname.includes("/dashboard/orders") ? "1" : '' && location.pathname.includes("/dashboard/products") ? "0" : '' && location.pathname.includes("/dashboard/users") ? "2" : ''
            }
          >
            <Accordion.Item eventKey="0" 
            
            >
              <Accordion.Header>Products</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>
                    <NavLink to="/dashboard/products/all">All Products</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/products/create">
                      Create Product
                    </NavLink>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Orders</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>
                    <NavLink to="/dashboard/orders/all">All Orders</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/orders/active">
                      Active Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/orders/canceled">
                      Canceled Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/orders/completed">
                      Completed Orders
                    </NavLink>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Users</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>
                    <NavLink to="/dashboard/users/all">Get All Users</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/users/admin">
                      Get Admin's
                    </NavLink>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </li>
        <li>
          <NavLink to="/dashboard/change-password">Change Password</NavLink>
        </li>
        <li>
          <button onClick={() => LogoutUser()}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default UserNavigation;
