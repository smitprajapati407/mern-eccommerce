import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setUser(null);
    navigate("/login");
  };

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search/${search}`);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">

      {/* 🔥 LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold tracking-wide cursor-pointer hover:scale-105 transition flex items-center gap-2"
      >
        <span className="text-3xl">🛍️</span>
        <span className="bg-gradient-to-r from-purple-300 to-yellow-300 bg-clip-text text-transparent">
          NexCart
        </span>
      </h1>

      {/* 🔗 LINKS + SEARCH */}
      <div className="flex items-center space-x-5 text-sm md:text-base">

        <Link
  to="/"
  className="text-lg font-bold text-yellow-300 hover:scale-110 transition transform"
>
  Home
</Link>

        {/* 🔍 SIMPLE SEARCH BAR (no rounded) */}
        <div className="flex items-center border-b border-white px-1">
          <span className="text-gray-200 mr-2">🔍</span>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="bg-transparent outline-none text-sm text-white w-32 placeholder-gray-300"
          />
        </div>

        {user && (
          <Link to="/cart" className="hover:text-yellow-300 transition">
            Cart
          </Link>
        )}

        {user && (
          <Link to="/orders" className="hover:text-yellow-300 transition">
            Orders
          </Link>
        )}

        {!user ? (
          <>
            <Link to="/login" className="hover:text-yellow-300 transition">
              Login
            </Link>

            <Link
              to="/register"
              className="bg-white text-black px-4 py-1.5 rounded-full hover:bg-yellow-300 transition font-medium"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="font-medium">
              Hello, {user?.user?.name || "User"}
            </span>

            <button
              onClick={logout}
              className="px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-red-500 to-orange-500 hover:scale-105 transition shadow-md"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;