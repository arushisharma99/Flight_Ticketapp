import { handleAIChat } from "../services/aiService.js";

export const aiChat = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        error: "message is required and must be a string",
      });
    }

    const safeHistory = Array.isArray(history) ? history : [];
    const result = await handleAIChat(message, safeHistory);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
