import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

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
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(to right, #667eea, #764ba2, #ff6a88)",
      }}
    >
      {/* CARD */}
      <div
        style={{
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          padding: "30px",
          borderRadius: "16px",
          width: "300px",
          border: "1px solid #fff",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "600",
            marginBottom: "20px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          Welcome Back 👋
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "6px",
              border: "none",
              background: "rgba(255,255,255,0.7)",
              color: "#000",
              outline: "none",
            }}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "6px",
              border: "none",
              background: "rgba(255,255,255,0.7)",
              color: "#000",
              outline: "none",
            }}
          />

          {/* BUTTON */}
          <button
            style={{
              marginTop: "10px",
              padding: "6px",
              borderRadius: "20px",
              border: "none",
              fontWeight: "500",
              cursor: "pointer",
              background:
                "linear-gradient(135deg, #ff7e5f, #feb47b)",
              color: "white",
              transition: "0.2s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Login
          </button>
        </form>

        {/* REGISTER LINK */}
        <p
          style={{
            marginTop: "15px",
            textAlign: "center",
            fontSize: "13px",
            color: "#eee",
          }}
        >
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{
              color: "#ffd700",
              cursor: "pointer",
            }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;