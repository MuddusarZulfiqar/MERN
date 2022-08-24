import axios from "../../../../axiosConfig";
import React, { useEffect } from "react";
import DataTableComponent from "../../../../components/views/dashboard/user/OrdersDataTable";
import Dashboard from "../Dashboard";
import { toast } from 'react-toastify';
import { options } from '../../../../utils/tostOptions';
function UserOrders() {
  const [orders, setOrders] = React.useState(null);
  
  const getOrders = async () => {
    await axios
      .get("/orders/login")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong",options);
      });
  };
  useEffect(() => {
    // set User
    getOrders();
    return () => {
      setOrders([]);
    };
  }, []);
  return (
    <Dashboard>
      {orders ? (
        <DataTableComponent orders={orders} />
      ) : (
        <div id="loading-overlay">
          <div className="loader"></div>
        </div>
      )}
    </Dashboard>
  );
}

export default UserOrders;
