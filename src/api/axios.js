import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

// 1. Send the token with every request (Your code)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 2. NEW: Handle 401 errors globally
api.interceptors.response.use(
  (response) => {
    // If the request succeeds, just return the response
    return response;
  },
  (error) => {
    // If the backend throws a 401 Unauthorized error
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized or token expired. Redirecting to login...");
      
      // Clear the invalid token
      localStorage.removeItem("token");
      
      // Force redirect to your admin login page
      // (Adjust this path if your login page is somewhere else)
      window.location.href = "/admin/login"; 
    }
    
    return Promise.reject(error);
  }
);

export default api;