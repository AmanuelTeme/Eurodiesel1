const chatbotService = require("../services/chatbot.service");

const sendMessage = async (req, res) => {
  try {
    console.log("sendMessage controller called");
    const { message, userId, language = 'en' } = req.body;
    
    console.log("Request body:", { message, userId, language });
    
    if (!message) {
      console.log("No message provided");
      return res.status(400).json({ 
        success: false, 
        message: "Message is required" 
      });
    }

    console.log("Calling chatbot service...");
    const response = await chatbotService.processMessage(message, userId, language);
    console.log("Chatbot service response:", response);
    
    res.json({
      success: true,
      response: response
    });
  } catch (error) {
    console.error("Chatbot controller error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

module.exports = {
  sendMessage
}; 