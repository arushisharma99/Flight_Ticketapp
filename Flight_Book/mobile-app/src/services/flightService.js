import { request } from "./httpClient";

export const searchFlights = async ({ source, destination }) => {
  const params = new URLSearchParams();
  if (source?.trim()) params.set("source", source.trim());
  if (destination?.trim()) params.set("destination", destination.trim());

  const query = params.toString();
  const suffix = query ? `?${query}` : "";

  return request({
    path: `/api/flights/search${suffix}`,
    method: "GET",
  });
};
