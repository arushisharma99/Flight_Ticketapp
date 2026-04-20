import { request } from "./httpClient";

export const chatWithAI = async (message) => {
  return request({
    path: "/api/ai/chat",
    method: "POST",
    body: { message },
  });
};
