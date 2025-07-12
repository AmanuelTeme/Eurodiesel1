const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbot.controller");

// Test route to verify chatbot routes are working
router.get("/test", (req, res) => {
  console.log("GET /chatbot/test called");
  res.json({ message: "Chatbot routes are working!" });
});

// Debug route to test if chatbot routes are working
router.get("/message", (req, res) => {
  console.log("GET /chatbot/message called");
  res.json({ message: "Chatbot GET route working" });
});

// Basic chatbot functionality
router.post("/message", (req, res) => {
  console.log("POST /chatbot/message called with body:", req.body);
  chatbotController.sendMessage(req, res);
});

module.exports = router; 