import { getToken } from "./authService";
import { request } from "./httpClient";

export const createBooking = async ({ flightId, seats }) => {
  return request({
    path: "/api/bookings",
    method: "POST",
    token: getToken(),
    body: { flightId, seats },
  });
};

export const getMyBookings = async () => {
  return request({
    path: "/api/bookings/my",
    method: "GET",
    token: getToken(),
  });
};
