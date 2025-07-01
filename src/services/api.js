// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:9090/api", // Change if backend runs elsewhere
// });

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: "https://student-management-system-backend-1.onrender.com/api",
});

export default api;
