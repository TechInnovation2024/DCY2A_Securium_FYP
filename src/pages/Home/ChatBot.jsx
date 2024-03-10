import React, { useState } from 'react';
import axios from 'axios';
import './ChatBot.css';

const ChatBot = () => {
  const [chatHistory, setChatHistory] = useState([{ type: 'response', text: 'How can I assist you today?' }]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchResponse = async (query) => {
    setIsLoading(true);
    const apiKey = 'AIzaSyChfIs_7IodYzSQ7ZZRkQIzAe_0f86rfLM'; // Replace with your API key
    const url = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`;
    const limitedQuery = 'Message should be in a proper format do not use ** just use space or next paragraph. Limit content only to cybersecurity defensive and preventive measures. ' + query; // Prepend the text

    try {
      const response = await axios.post(url, { prompt: { text: limitedQuery } });
      const generatedResponse = response.data.candidates[0].output;
      updateChatHistory(query, generatedResponse);
    } catch (error) {
      console.error('API Error:', error);
      updateChatHistory(query, "Something went wrong! Please try again later.");
    }
    setIsLoading(false);
  };

  const updateChatHistory = (query, response) => {
    setChatHistory(prev => [...prev, { type: 'query', text: query }, { type: 'response', text: response }]);
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      fetchResponse(inputText);
      setInputText('');
    }
  };

  const quickChatOptions = [
    'How to keep my password secure from Hackers?',
    'Can you help me with something?',
    'How to keep my password secure from Hackers?',
    'Can you help me with something?',
    'How to keep my password secure from Hackers?',
    'Can you help me with something?',
    'How to keep my password secure from Hackers?',
    'Can you help me with something?',
    // Add more quick chat options here
  ];

  const handleQuickChat = (message) => {
    setInputText(message);
    handleSendMessage();
  };

  return (
    <div>
    <div className="main-top">
    <h1>AI Assistant</h1>
  </div>
    <div className="chatbot-container">
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="quick-chat-container">
        <div className="quick-chat">
          {quickChatOptions.map((option, index) => (
            <button key={index} onClick={() => handleQuickChat(option)}>{option}</button>
          ))}
        </div>
      </div>
      <div className="message-input">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          aria-label="Type your message"
        />
        <button onClick={handleSendMessage} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
    </div>
  );
};

export default ChatBot;
