import React from "react";
import { useSelector } from "react-redux";
import './cardAdmin.css'
import Dashboard from "../Dashboard";
import { Link } from "react-router-dom";
import AdminOrdersChart from '../../../../components/views/dashboard/admin/AdminOrdersChart'
function UserProfile() {
  const { user } = useSelector((state) => state.user);
  const {data} = user;
  return (
    <>
      {
        data?.name ? <>
        <Dashboard>
          <div className="row">
            <div className="col-md-3">
              <Link to="/dashboard/users">
                <div className="card-admin">
                  <h3>Users</h3>
                  <p>
                   3
                  </p>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
            <Link to="/dashboard/products">
            <div className="card-admin">
                <h3>Products</h3>
                <p>
                  48
                </p>
              </div>
              </Link>
            </div>
            <div className="col-md-3">
            <Link to='/dashboard/orders'> 
            <div className="card-admin">
                <h3>Active Orders</h3>
                <p>
                  0
                </p>
              </div>
              </Link>
            </div>
            <div className="col-md-3">
            <div className="card-admin">
                <h3>Profit</h3>
                <p>
                  48.00$
                </p>
              </div>
            </div>
          </div>
          <div className="OrdersChart mt-5">
            <h3>Orders Chart</h3>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-3">
                <AdminOrdersChart />
              </div>
              <div className="col-md-4"></div> 
            </div>
          </div>
        </Dashboard>
        </> : <div id="loading-overlay">
          <div className="loader"></div>
        </div>
      }
    </>
  );
}

export default UserProfile;
