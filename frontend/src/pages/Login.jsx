import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/auth/login", { email, password });

      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);

      alert("Login Successful ✅");
      navigate("/");
    } catch (err) {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">

      {/* BACKGROUND BLOBS */}
      <div className="absolute w-72 h-72 bg-pink-400 opacity-30 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-indigo-400 opacity-30 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

      {/* GLASS CARD */}
      <div className="backdrop-blur-lg bg-white/20 p-8 rounded-2xl w-[340px] shadow-2xl border border-white/30">

        <h2 className="text-2xl font-semibold mb-6 text-center text-white">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* EMAIL */}
          <div className="flex items-center border border-white/30 rounded-lg px-3 py-2 bg-white/30 focus-within:ring-2 focus-within:ring-pink-300 transition">
            <Mail size={18} className="text-white mr-2" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none bg-transparent text-white placeholder-gray-200"
            />
          </div>

          {/* PASSWORD */}
          <div className="flex items-center border border-white/30 rounded-lg px-3 py-2 bg-white/30 focus-within:ring-2 focus-within:ring-pink-300 transition">
            <Lock size={18} className="text-white mr-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none bg-transparent text-white placeholder-gray-200"
            />
          </div>

          {/* BUTTON */}
          <button className="mt-3 py-2 rounded-full font-medium text-white bg-gradient-to-r from-orange-400 to-pink-500 hover:scale-105 hover:shadow-lg transition-all duration-300">
            Login
          </button>
        </form>

        {/* REGISTER LINK */}
        <p className="mt-5 text-center text-sm text-gray-200">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-yellow-300 cursor-pointer font-medium hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;