const { GoogleGenerativeAI } = require("@google/generative-ai");

const processMessage = async (message, userId, language = 'en') => {
  try {
    console.log("processMessage service called");
    console.log("GEMINI_API_KEY exists:", !!process.env.GEMINI_API_KEY);
    console.log("Language:", language);
    
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY environment variable is not set");
      return getFallbackMessage(language, "config");
    }

    // Initialize Google Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log("Gemini AI initialized");
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log("Model loaded");
    
    const prompt = getLanguageSpecificPrompt(message, language);

    console.log("Sending request to Gemini AI...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("Gemini AI response received");
    return text;
  } catch (error) {
    console.error("Gemini AI error details:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    
    // Fallback response
    return getFallbackMessage(language, "error");
  }
};

const getLanguageSpecificPrompt = (message, language) => {
  const basePrompts = {
    en: `You are a helpful customer service assistant for EURODIESEL PARMA S.p.A., an automotive service center. 
    You help customers with:
    - Service inquiries
    - Appointment scheduling
    - General automotive questions
    - Company information
    
    Be friendly, professional, and helpful. If you don't know something specific about EURODIESEL PARMA S.p.A., 
    suggest they contact the company directly.
    
    Always respond in English.
    
    Customer message: ${message}`,
    
    it: `Sei un assistente di servizio clienti utile per EURODIESEL PARMA S.p.A., un centro di servizi automobilistici. 
    Aiuti i clienti con:
    - Richieste di servizio
    - Programmazione di appuntamenti
    - Domande generali sui veicoli
    - Informazioni aziendali
    
    Sii amichevole, professionale e utile. Se non sai qualcosa di specifico su EURODIESEL PARMA S.p.A., 
    suggerisci loro di contattare direttamente l'azienda.
    
    Rispondi sempre in italiano.
    
    Messaggio del cliente: ${message}`
  };

  return basePrompts[language] || basePrompts.en;
};

const getFallbackMessage = (language, type) => {
  const messages = {
    en: {
      config: "I apologize, but the AI service is not properly configured. Please contact EURODIESEL PARMA S.p.A. directly for assistance.",
      error: "I apologize, but I'm having trouble processing your request right now. Please try again later or contact EURODIESEL PARMA S.p.A. directly for assistance."
    },
    it: {
      config: "Mi dispiace, ma il servizio AI non è configurato correttamente. Contatta direttamente EURODIESEL PARMA S.p.A. per assistenza.",
      error: "Mi dispiace, ma sto avendo problemi a elaborare la tua richiesta in questo momento. Riprova più tardi o contatta direttamente EURODIESEL PARMA S.p.A. per assistenza."
    }
  };

  return messages[language]?.[type] || messages.en[type];
};

module.exports = {
  processMessage
}; 