import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const decreaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const btnStyle = {
    padding: "4px 8px",
    fontSize: "12px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    width: "auto",
    display: "inline-block",
    transition: "0.2s",
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
          letterSpacing: "1px",
          marginBottom: "20px",
        }}
      >
        Your Cart
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

      {cart.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "500" }}>
            🛒 Your Cart is Empty
          </h2>

          <p
            style={{
              color: "gray",
              marginTop: "8px",
            }}
          >
            Looks like you haven't added anything yet
          </p>

          <div
            style={{
              width: "50px",
              height: "3px",
              background: "black",
              margin: "10px auto",
              borderRadius: "2px",
            }}
          ></div>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                padding: "12px",
                marginBottom: "12px",
                borderRadius: "10px",
                gap: "15px",
                background: "#fff",
                transition: "0.3s",
              }}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              {/* Details */}
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0" }}>{item.name}</h3>
                <p style={{ margin: "5px 0" }}>₹{item.price}</p>

                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <button
                    onClick={() => decreaseQty(item._id)}
                    style={{
                      ...btnStyle,
                      background: "#ccc",
                      color: "#000",
                    }}
                  >
                    -
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() => increaseQty(item._id)}
                    style={{
                      ...btnStyle,
                      background: "#ccc",
                      color: "#000",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(item._id)}
                style={{
                  ...btnStyle,
                  background: "red",
                  color: "white",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total */}
          <div
            style={{
              borderTop: "2px solid #000",
              paddingTop: "15px",
              textAlign: "right",
            }}
          >
            <h2>Total: ₹{total}</h2>

            <button
              onClick={() => navigate("/checkout")}
              style={{
                padding: "5px 10px",
                fontSize: "13px",
                fontWeight: "500",
                background: "linear-gradient(135deg, #28a745, #218838)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "0.2s",
                width: "fit-content",
                display: "inline-block",
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;