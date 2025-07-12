import axios from "../axios/axiosConfig";

const API_BASE_URL = 'http://localhost:3000/api';

export const chatbotService = {
  // Send a message to the chatbot
  sendMessage: async (message, userId = "anonymous", language = "en") => {
    try {
      const response = await axios.post(`${API_BASE_URL}/chatbot/message`, {
        message,
        userId,
        language,
      });
      return response.data;
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
      throw error;
    }
  },
};

export default chatbotService;
