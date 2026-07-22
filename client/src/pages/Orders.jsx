import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h3>Order ID</h3>

            <p>{order._id}</p>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <p>
              <strong>Total:</strong> ₹ {order.totalPrice}
            </p>

            <h4>Products</h4>

            {order.products.map((item) => (
              <div key={item._id} className="order-product">
                <p>
                  {item.product?.name || "Product"}
                </p>

                <p>Qty : {item.quantity}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;