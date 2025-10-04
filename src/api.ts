// src/api.ts
import axios, { AxiosInstance } from "axios";

// ✅ Vite env variable with TypeScript
const API: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`, // use VITE_ prefix
  withCredentials: true, // cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
