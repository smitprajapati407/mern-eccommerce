import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // ✅ BACKEND URL
});

export default API;