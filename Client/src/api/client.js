import axios from "axios";

/* -------- Create Axios Client -------- */
export const client = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

/* -------- Request Interceptor -------- */
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* -------- Persist Token From Response -------- */
const persistTokenFromResponse = (response) => {
  const token = response.data?.token;

  if (token) {
    localStorage.setItem("token", token);
  }

  return response;
};

/* -------- Response Interceptor -------- */
client.interceptors.response.use(persistTokenFromResponse, (error) => {
  if (error.response?.status === 401 && localStorage.getItem("token")) {
    localStorage.removeItem("token");
    window.location.assign("/login");
  }

  return Promise.reject(error);
});
