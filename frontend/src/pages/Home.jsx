import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const setupCategories = async () => {
      try {
        const res = await API.get("/api/categories");

        if (res.data.length === 0) {
          await API.post("/categories", { name: "Electronics" });
          await API.post("/categories", { name: "Fashion" });
          await API.post("/categories", { name: "Shoes" });
          await API.post("/categories", { name: "Accessories" });

          const updated = await API.get("/categories");
          setCategories(updated.data);
        } else {
          setCategories(res.data);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    setupCategories();
  }, []);

  return (
    <div
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
        color: "#111",
      }}
    >
      {/* HERO */}
      <div className="relative bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white text-center py-24 overflow-hidden">

        {/* GLOW EFFECT */}
        <div className="absolute w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-30 top-[-50px] left-[-50px]"></div>
        <div className="absolute w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-30 bottom-[-50px] right-[-50px]"></div>

        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg animate-pulse">
          Welcome to NexCart 🛍️
        </h1>

        <p className="text-lg text-gray-200 mb-6">
          Discover amazing products at unbeatable prices
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/products")}
            className="bg-white text-black px-2 py-1 rounded-full text-sm font-medium w-fit hover:bg-yellow-300 hover:scale-105 transition shadow-md"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* CATEGORY GRID */}
      <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => navigate(`/category/${cat._id}`)}
            className="relative cursor-pointer rounded-xl overflow-hidden group shadow-lg hover:shadow-2xl transition"
            style={{
              background: "#fff",
            }}
          >
            {/* IMAGE */}
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500"
            />

            {/* OVERLAY */}
            <div
              className="absolute inset-0 transition"
              style={{
                background: "rgba(0,0,0,0.4)",
              }}
            ></div>

            {/* TEXT */}
            <h2 className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
              {cat.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;