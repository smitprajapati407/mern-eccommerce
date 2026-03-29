import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Category() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/products?category=${id}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // 🛒 Add to Cart
  const addToCart = (product) => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      cart = cart.map((item) =>
        item._id === product._id
          ? { ...item, qty: (item.qty || 1) + 1 }
          : item
      );
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  return (
    <div style={{ padding: "20px", background: "#f5f7fb", minHeight: "100vh" }}>
      
      {/* 🔥 Heading */}
      <h2
        style={{
          textAlign: "center",
          fontSize: "26px",
          fontWeight: "600",
          marginBottom: "20px",
          color: "#111",
        }}
      >
        Category Products
        <div
          style={{
            width: "60px",
            height: "3px",
            background: "black",
            margin: "8px auto 0",
            borderRadius: "2px",
          }}
        ></div>
      </h2>

      {products.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>
          No products found
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((p) => (
            <div
              key={p._id}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "12px",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <h3 style={{ marginTop: "10px", fontSize: "16px" }}>
                {p.name}
              </h3>

              <p style={{ fontWeight: "600", margin: "5px 0" }}>
                ₹{p.price}
              </p>

              {/* 🛒 Button */}
              <button
                onClick={() => addToCart(p)}
                style={{
                  marginTop: "8px",
                  padding: "5px 10px",
                  fontSize: "12px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  background:
                    "linear-gradient(135deg, #ff7e5f, #feb47b)",
                  color: "white",
                  transition: "0.2s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.target.style.transform = "scale(1)")
                }
              >
                🛒 Add
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;