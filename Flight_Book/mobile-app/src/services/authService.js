import AsyncStorage from "@react-native-async-storage/async-storage";
import { request } from "./httpClient";

const TOKEN_KEY = "auth_token";
let currentToken = null;

export const loadToken = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  currentToken = token;
  return token;
};

export const getToken = () => currentToken;

export const saveToken = async (token) => {
  currentToken = token;
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = async () => {
  currentToken = null;
  await AsyncStorage.removeItem(TOKEN_KEY);
};

export const register = async ({ name, email, password }) => {
  const response = await request({
    path: "/api/auth/register",
    method: "POST",
    body: { name, email, password },
  });

  await saveToken(response.token);
  return response;
};

export const login = async ({ email, password }) => {
  const response = await request({
    path: "/api/auth/login",
    method: "POST",
    body: { email, password },
  });

  await saveToken(response.token);
  return response;
};
