import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "./apiConfig";

const TOKEN_KEY = "auth_token";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    if (token) {
      config.headers = config.headers || {};
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.response?.data?.error) {
    return error.response.data.error;
  }

  if (error.message) {
    return error.message;
  }

  return "Something went wrong";
};

const handleRequest = async (requestFn) => {
  try {
    const response = await requestFn();
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const loginUser = async (data) => {
  return handleRequest(() => api.post("/auth/login", data));
};

export const registerUser = async (data) => {
  return handleRequest(() => api.post("/auth/register", data));
};

export const searchFlights = async (source, destination) => {
  return handleRequest(() =>
    api.get("/flights/search", {
      params: { source, destination },
    })
  );
};

export const createBooking = async (data) => {
  return handleRequest(() => api.post("/bookings", data));
};

export const chatWithAI = async (message) => {
  return handleRequest(() => api.post("/ai/chat", { message }));
};

export default api;
