import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Table from "react-bootstrap/Table";
function PrintLayout({order}) {
  useEffect(()=>{
    window.print();
  },[])
  const currency = (price) => {
    const finalPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
    }).format(price);
    return finalPrice;
  };
  return ReactDOM.createPortal(
    <>
      {
        order ? (
        <div className="">
        <div className="text-center mt-5">
          <h3 className="mb-3">Welcome To My Store</h3>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Order Id</th>
              <th className="text-center">User Name</th>
              <th>Order Status</th>
              <th className="text-center">Products (Quantity)</th>
              {/* <th></th> */}
              <th className="text-center">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {
              order.map((order, index) => (
                <tr key={index}>
              <td>{index}</td>
              <td style={{ width: "190px", wordBreak: " break-all" }}>
                {
                    order._id ? order._id : "-"
                }
              </td>
              
              <td>
                {
                  order.user ? order.user.name : "-"
                }
              </td>
              <td>
                {
                  order.orderStatus ? order.orderStatus : "-"
                }
              </td>
              <td width={300}>
                <ul>
                    {order.orderItems ? order.orderItems.map((product, index) => (
                        <li key={index}>
                            {product.product.name} ({product.quantity})
                        </li>
                    ) ) : "-"}
                </ul>
              </td>
              <td>{
                order.orderItems ? currency(
                    order.orderItems.reduce((a, b) => {
                        return a + b.product.price * b.quantity;
                    }, 0)
                ) : "-"
              }</td>
            </tr>
              ))
            }
          </tbody>
        </Table>
        <div className="text-right">
        <h4 className="mt-5">Total Tax: {
            order ? currency(
                order.reduce((a, b) => {
                    return a + b.texPrice ;
                }
                , 0)
            ) : "-"
          }</h4>
          <h4 >Total Shipping: {
            order ? currency(
                order.reduce((a, b) => {
                    return a + b.shippingPrice ;
                }
                , 0)
            ) : "-"
          }</h4>
          <h3 className="mt-5">Total Price: {
            order ? currency(
                order.reduce((a, b) => {
                    return a + b.totalPrice ;
                }
                , 0)
            ) : "-"
          }</h3>
        </div>
      </div>) : <>No Order Found</>}
    </>,
    document.getElementById("print-root")
  );
}

export default PrintLayout;
