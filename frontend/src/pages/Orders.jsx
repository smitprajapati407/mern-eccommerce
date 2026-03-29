import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:3000/api/orders/${user.user._id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "auto",
        color: "#111",
        background: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      {/* Heading */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "600",
          marginBottom: "25px",
        }}
      >
        Your Orders
        <div
          style={{
            width: "60px",
            height: "3px",
            background: "black",
            margin: "8px auto 0",
            borderRadius: "2px",
          }}
        ></div>
      </h1>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>
          No orders yet
        </p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #eee",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              background: "#fafafa",
              transition: "0.3s",
            }}
          >
            {/* Order Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "15px",
                fontSize: "14px",
                color: "gray",
              }}
            >
              <span>Order ID: {order._id}</span>
              <span>
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Items */}
            {order.items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                  background: "white",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />

                  <div>
                    <h4 style={{ margin: 0 }}>{item.name}</h4>
                    <p style={{ margin: 0, fontSize: "13px", color: "gray" }}>
                      Qty: {item.qty}
                    </p>
                  </div>
                </div>

                <span style={{ fontWeight: "500" }}>
                  ₹{item.price * item.qty}
                </span>
              </div>
            ))}

            {/* Footer */}
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "13px", color: "gray" }}>
                Payment ID: {order.paymentId}
              </span>

              <span
                style={{
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                Total: ₹{order.total}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;