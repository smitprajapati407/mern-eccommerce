import { useEffect, useState } from "react";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = async () => {
    if (!name || !address) {
      alert("Please fill all details");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/payment/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: total }),
        }
      );

      const order = await response.json();

      const options = {
        key: "rzp_test_RzRyHj14kPmIAb",
        amount: order.amount,
        currency: "INR",
        name: "NexCart",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {
          const user = JSON.parse(localStorage.getItem("user"));

          const orderData = {
            userId: user.user._id,
            name,
            items: cart,
            total,
            address,
            paymentId: response.razorpay_payment_id,
          };

          await fetch("http://localhost:3000/api/orders/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          });

          localStorage.setItem("orderData", JSON.stringify(orderData));
          localStorage.removeItem("cart");

          window.location.href = "/success";
        },

        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log(error);
      alert("Payment failed");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
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
        Checkout
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

      <div style={{ display: "flex", gap: "30px" }}>
        
        {/* LEFT FORM */}
        <div
          style={{
            flex: 1,
            border: "1px solid #eee",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            background: "#fff",
          }}
        >
          <h2 style={{ marginBottom: "15px" }}>Shipping Details</h2>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              background: "#fff",
              color: "#000",
            }}
          />

          <textarea
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              height: "80px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              background: "#fff",
              color: "#000",
            }}
          />
        </div>

        {/* RIGHT SUMMARY */}
        <div
          style={{
            flex: 1,
            border: "1px solid #eee",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            background: "#fafafa",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: "600" }}>
            Order Summary
          </h2>

          <p
            style={{
              fontSize: "13px",
              color: "gray",
              marginBottom: "15px",
            }}
          >
            {cart.length} item(s)
          </p>

          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                fontSize: "14px",
              }}
            >
              <span>
                {item.name} × {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <hr style={{ margin: "15px 0" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "600",
              fontSize: "16px",
              marginBottom: "15px",
            }}
          >
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={placeOrder}
            style={{
              padding: "5px 10px",
              fontSize: "13px",
              fontWeight: "500",
              background: "linear-gradient(135deg, #007bff, #0056b3)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;