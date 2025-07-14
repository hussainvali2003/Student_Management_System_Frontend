import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9090/api", // Change if backend runs elsewhere
});

export default api;
