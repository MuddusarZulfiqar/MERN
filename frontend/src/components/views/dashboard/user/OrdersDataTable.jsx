import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import useCurrency from "../../../../hooks/useCurrency";
import PrintLayout from '../../../../portals/PrintLayout';
function BasicExample({ orders }) {
  const [printOrder, setPrintOrder] = useState(null);
  useEffect(() => {
    window.onafterprint = setPrintOrder(null);
  }, [printOrder]);
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
  };
  return (
    <>
      <h3 className="text-center mb-3">Orders Data</h3>
      {orders.data.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Id</th>
                <th>Status</th>
                <th>Price</th>
                <th>Print</th>
              </tr>
            </thead>
            <tbody>
              {orders.data.map((order, index) => (
                <tr key={index}>
                  <td>{(index += 1)}</td>
                  <td>{order._id}</td>
                  <td>{capitalize(order.orderStatus)}</td>
                  <td>{currency(order.totalPrice)}</td>
                  <td>
                    <button onClick={() => TriggerPrintCommand([order])}>
                      Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <button onClick={() => TriggerPrintCommand(orders.data)}>Print All</button>
        </>
      ) : (
        <h3>No Order Found ....</h3>
      )}
      {printOrder && <PrintLayout order={printOrder} />}
    </>
  );
}

export default BasicExample;
