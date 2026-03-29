import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products") // ✅ correct port
      .then((res) => {
        console.log("ALL PRODUCTS:", res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // 🛒 Add to Cart (same logic as Category)
  const addToCart = (product) => {
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
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>All Products</h2>

      {products.length === 0 ? (
        <p style={{ textAlign: "center" }}>No products found</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                }}
              />

              <h3>{p.name}</h3>
              <p>₹{p.price}</p>
              <p style={{ color: "gray", fontSize: "14px" }}>
                {p.category?.name}
              </p>

              {/* 🛒 Add to Cart */}
              <button
                onClick={() => addToCart(p)}
                style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;