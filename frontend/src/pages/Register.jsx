import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/auth/register", { name, email, password });
      alert("Registered Successfully ✅");
      navigate("/login");
    } catch (err) {
      alert("Error ❌");
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">

      {/* BACKGROUND BLOBS */}
      <div className="absolute w-72 h-72 bg-pink-400 opacity-30 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-indigo-400 opacity-30 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 items-center justify-center text-white p-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold leading-tight">
            Join NexCart 🛍️
          </h1>
          <p className="text-lg text-gray-200">
            Discover amazing products, best deals & fast delivery.
          </p>

          {/* FEATURES */}
          <div className="mt-6 space-y-2 text-sm text-gray-200">
            <p>✔ Secure Payments</p>
            <p>✔ Fast Delivery</p>
            <p>✔ Best Prices</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-[#f5f7fb] to-[#e6ecff]">
        
        {/* GLASS CARD */}
        <div className="backdrop-blur-lg bg-white/60 p-8 rounded-2xl w-[340px] shadow-2xl border border-white/30">
          
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* NAME */}
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white/70 focus-within:ring-2 focus-within:ring-indigo-400 transition">
              <User size={18} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full outline-none bg-transparent"
              />
            </div>

            {/* EMAIL */}
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white/70 focus-within:ring-2 focus-within:ring-indigo-400 transition">
              <Mail size={18} className="text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none bg-transparent"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white/70 focus-within:ring-2 focus-within:ring-indigo-400 transition">
              <Lock size={18} className="text-gray-500 mr-2" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none bg-transparent"
              />
            </div>

            {/* BUTTON */}
            <button className="mt-3 py-2 rounded-full font-medium text-white bg-gradient-to-r from-orange-400 to-pink-500 hover:scale-105 hover:shadow-lg transition-all duration-300">
              Register
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="mt-5 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-orange-500 cursor-pointer font-medium hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;