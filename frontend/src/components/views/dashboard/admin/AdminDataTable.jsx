import axios from "../../../../axiosConfig";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import PrintLayout from '../../../../portals/PrintLayout';

import { toast } from 'react-toastify';
import { options } from '../../../../utils/tostOptions';
function BasicExample({ orders }) {
  const [printOrder,setPrintOrder] = useState(null);
  const [orderId,setOrderId] = useState(null);
  const [ordersData,setOrdersData] = useState(orders);
  const changeOrderStatus = async (id,orderStatus)=>{
      const confirm = window.confirm('Are you sure you want to change order status?');
      if(!confirm){
        return;
      }
      setTimeout(async()=>{
        await axios.put(`/order/${id}`,{orderStatus,reason:'As per customer'}).then((res)=>{
          toast.success('Order status is changed',options)
          setOrdersData(res.data.data)
        }).catch((err)=>{
          toast.error(err.response.data.message,options)
        })
      } ,1000)
  };

  useEffect(()=>{
    window.onafterprint = setPrintOrder(null);
  },[printOrder]);
  if (orders.length <= 0) return <h3>No Order Found ....</h3>;
  const currency = (price) => {
    const finalPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
    }).format(price);
    return finalPrice;
  };
  const capitalize = (str) => {
    return str
      .replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      })
      .split(" ")
      .join(" ");
  };
  
  const TriggerPrintCommand = (order) => {
    setPrintOrder(order);
  }

  const searchByOrderId = (id) => {
    if(id){
      // if user press backspace remove full text
      if(id.length === 0){
        setOrdersData(orders);
      }
      const filteredOrders = orders.filter((order)=>{
        return order._id.toString().includes(id)
      }).map((order)=>{
        return {
          ...order
        }
      }
      );
      setOrdersData(filteredOrders);
    }else{
      setOrdersData(orders);
    }
  }

  return (
    <>
      <h3 className="text-center mb-3">Orders Data</h3>
      {/*
          search by order id
      */}
      <input
            type="text"
            className="form-control mb-2"
            id="orderId"
            placeholder="Enter Order Id"
            value={orderId == null ? '' : orderId}
            onChange={(e) => {
              setOrderId(e.target.value);
              searchByOrderId(e.target.value);
            }}
          />

      {orders.length > 0 ? (
        <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Status</th>
              <th>Price</th>
              <th>Print</th>
              <th>Change Status</th>
              </tr>
          </thead>
          <tbody>
            {ordersData.map((order, index) => (
              <tr key={index}>
                <td>{(index += 1)}</td>
                <td>{order._id}</td>
                <td>{capitalize(order.orderStatus)}</td>
                <td>{currency(order.totalPrice)}</td>
                <td>
                  <button onClick={()=>TriggerPrintCommand([order])}>Print</button>
                </td>
                <td>
                    <section className="form-group">
                        <select className="form-control" id="exampleFormControlSelect1"
                        disabled={
                          order.orderStatus === 'canceled' || order.orderStatus === 'completed'
                        }
                        defaultValue={order.orderStatus}
                        onChange={async(e) => {
                            changeOrderStatus(order._id,e.target.value)
                        } }>
                            <option value="processing" >Processing</option>
                            <option value="completed" >Completed</option>
                            <option value="canceled" >Cancelled</option>
                        </select>
                    </section>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {
          ordersData.length > 0 && (
            <button onClick={()=>TriggerPrintCommand(orders)}>Print All</button>
          )
        }
        
        </>
      ) : (
        <h3>No Order Found ....</h3>
      )}
      {(printOrder && ordersData.length > 0) && <PrintLayout order={printOrder}  />}
    </>
  );
}

export default BasicExample;
