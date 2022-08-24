

export const columns = [
  {
    name: "OrderId",
    selector:(row)=>row.id,
    sortable: true
  },
  {
    name: "User Name",
    selector:(row)=>row.user.name,
    sortable: true
  },
  {
    name: "Order Status",
    selector:(row)=>row.status,
    sortable: true
  },
  {
    name: "Total Price",
    selector:(row)=>row.totalPrice,
    sortable: true
  },
  {
    name: "Actions",
    selector:(row)=>row.actions,
    sortable: true,

  }
];

export const data = [
  {
    id: 1,
    user: {
        name: "John Doe",
    },
    status: "Pending",
    price: "Rs. 1000",
    actions: <div className="btn-group">
        <button className="btn btn-primary">View</button>
        <button className="btn btn-primary">Edit</button>
        <button className="btn btn-primary">Delete</button>
    </div>
    
  }
];
