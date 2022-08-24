import axios from "../../../../axiosConfig";
import React, { useEffect } from "react";
import AdminDataTable from "../../../../components/views/dashboard/admin/AdminDataTable";
import Dashboard from "../Dashboard";
function AdminOrders() {
  const [orders, setOrders] = React.useState([]);
  
  const getOrders = async () => {
    await axios
      .get("/orders/all")
      .then((res) => {
        setOrders(()=>{
            // orders with status 'processing' status
            return res.data?.data.filter(order=>order.orderStatus==='processing');
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getOrders();
    return () => {
      setOrders([]);
    };
  }, []);
  
  return (
    <Dashboard>
      {orders.length > 0 ? (
        <AdminDataTable orders={orders} />
      ) : (
        'No Orders Found'
      )}
    </Dashboard>
  );
}

export default AdminOrders;
