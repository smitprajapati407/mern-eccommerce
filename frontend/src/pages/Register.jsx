import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 items-center justify-center text-white p-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Join NexCart 🛍️
          </h1>
          <p className="text-lg text-gray-200">
            Create your account and explore amazing products.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#f5f7fb]">
        <div className="bg-white p-8 rounded-2xl w-[320px] shadow-lg">
          <h2 className="text-xl font-semibold mb-5 text-center text-black">
            Create Account
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            {/* NAME */}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-400"
            />

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-400"
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-400"
            />

            {/* BUTTON */}
            <button className="mt-2 py-2 rounded-full font-medium text-white bg-gradient-to-r from-orange-400 to-pink-400 hover:scale-105 transition">
              Register
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-orange-400 cursor-pointer font-medium"
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