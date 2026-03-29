import Register from "./pages/register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Orders from "./pages/Orders";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar user={user} setUser={setUser} />

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;