import axios from "axios";

/* -------- Create Admin API Client -------- */
export const adminClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

/* -------- Add Admin Token to Requests -------- */
adminClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* -------- Save Admin Token from Response -------- */
adminClient.interceptors.response.use((response) => {
  const token = response.data?.token;

  if (token) {
    localStorage.setItem("adminToken", token);
  }

  return response;
});
