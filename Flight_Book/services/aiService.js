import OpenAI from "openai";
const normalizeHistory = (history) =>
  history
    .filter(
      (item) =>
        item &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string" &&
        item.content.trim()
    )
    .slice(-12)
    .map((item) => ({
      role: item.role,
      content: item.content.trim(),
    }));

const getOpenAIResponse = async (message, history = []) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      intent: "general_chat",
      message: "AI is not configured yet.",
      response:
        "AI chat is currently unavailable because OPENAI_API_KEY is missing on the backend server.",
    };
  }

  const openai = new OpenAI({ apiKey });
  const chatHistory = normalizeHistory(history);

  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful AI travel assistant in a flight booking app. Answer naturally like ChatGPT. Be concise and friendly, and help with flights, routes, pricing tips, and booking guidance.",
      },
      ...chatHistory,
      { role: "user", content: message },
    ],
    temperature: 0.5,
  });

  return {
    intent: "general_chat",
    message: "AI response generated successfully.",
    response: completion.choices[0]?.message?.content || "",
  };
};

export const handleAIChat = async (message, history = []) => getOpenAIResponse(message, history);
