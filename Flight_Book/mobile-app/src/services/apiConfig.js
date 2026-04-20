// You can override this in Expo with EXPO_PUBLIC_API_BASE_URL.
const envApiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();

// Default LAN API endpoint (same network as your mobile device).
export const API_BASE_URL = envApiBaseUrl || "http://192.168.137.1:5000/api";
