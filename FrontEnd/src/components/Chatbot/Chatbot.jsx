import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import axios from "../../axios/axiosConfig";
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en'); // Default to English
  const messagesEndRef = useRef(null);
  const chatbotRef = useRef(null);
  const inputRef = useRef(null);

  const languages = {
    en: { name: 'English', flag: '🇺🇸' },
    it: { name: 'Italiano', flag: '🇮🇹' }
  };

  const welcomeMessages = {
    en: {
      title: 'EURODIESEL PARMA S.p.A. Assistant',
      welcome: '👋 Hello! I\'m here to help you with your automotive service needs.',
      howHelp: 'How can I assist you today?',
      placeholder: 'Type your message here...'
    },
    it: {
      title: 'Assistente EURODIESEL PARMA S.p.A.',
      welcome: '👋 Ciao! Sono qui per aiutarti con le tue esigenze di servizio automobilistico.',
      howHelp: 'Come posso aiutarti oggi?',
      placeholder: 'Scrivi il tuo messaggio qui...'
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-focus input when chatbot opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay to ensure the chatbot is fully rendered
      const timer = setTimeout(() => {
        inputRef.current.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle click outside to close chatbot
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      
      // ... inside sendMessage:
      const response = await axios.post("/chatbot/message", {
        message: inputMessage,
        userId: "anonymous",
        language: language,
      });
      const data = response.data;

      if (data.success) {
        const botMessage = {
          id: Date.now() + 1,
          text: data.response,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(data.message || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: language === 'it' ? 'Mi dispiace, ho riscontrato un errore. Riprova più tardi.' :
              'Sorry, I encountered an error. Please try again later.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Re-focus input after sending message
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  };

  const handleKeyDown = (e) => {
    // Only handle Enter key, allow all other keys (including space) to work normally
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    // Clear messages when language changes
    setMessages([]);
    // Re-focus input after language change
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="chatbot-container" ref={chatbotRef}>
      {/* Chatbot Toggle Button */}
      <button 
        className="chatbot-toggle"
        onClick={handleToggle}
        aria-label="Toggle chatbot"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>{welcomeMessages[language].title}</h3>
            <div className="header-controls">
              {/* Language Selector */}
              <div className="language-selector">
                {Object.entries(languages).map(([code, lang]) => (
                  <button
                    key={code}
                    className={`lang-btn ${language === code ? 'active' : ''}`}
                    onClick={() => handleLanguageChange(code)}
                    title={lang.name}
                  >
                    {lang.flag}
                  </button>
                ))}
              </div>
              <button 
                className="close-btn"
                onClick={handleClose}
                aria-label="Close chatbot"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.length === 0 && (
              <div className="welcome-message">
                <p>{welcomeMessages[language].welcome}</p>
                <p>{welcomeMessages[language].howHelp}</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-timestamp">
                  {message.timestamp}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="message bot-message">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={welcomeMessages[language].placeholder}
              disabled={isLoading}
              rows="1"
            />
            <button 
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="send-btn"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot; 