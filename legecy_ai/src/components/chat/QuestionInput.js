/**
 * QuestionInput.js
 * 
 * Component for counselors to input client questions/concerns.
 * Handles:
 * - Initial question submission for categorization
 * - Subsequent messages in ongoing conversation
 * - Loading states during API communication
 * - Error handling with appropriate user feedback
 * - Context-aware placeholder text that changes based on conversation state
 * - Full-width responsive input field
 */

import React, { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import { categorizeQuestion, sendChatMessage } from '../../services/adviceService';

const QuestionInput = () => {
  const [input, setInput] = useState('');
  const { 
    addMessage, 
    setLoading, 
    setCategory, 
    isLoading, 
    categoryReceived,
    category,
    messages 
  } = useChat();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      content: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    addMessage(userMessage);
    setLoading(true);
    
    try {
      let response;
      
      // If category is not yet determined, categorize the question first
      if (!categoryReceived) {
        response = await categorizeQuestion(input);
        setCategory(response.category);
      } else {
        // Otherwise, just send the message in the existing conversation
        response = await sendChatMessage(input, category, messages);
      }
      
      // Add AI response to chat
      const aiMessage = {
        id: Date.now() + 1,
        content: response.response,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      
      addMessage(aiMessage);
    } catch (error) {
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        content: "Sorry, I encountered an error. Please try again.",
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      
      addMessage(errorMessage);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 w-full">
      <div className="flex w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder={
            categoryReceived
              ? "Continue the conversation..."
              : "Enter client's question or concern..."
          }
          className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </form>
  );
};

export default QuestionInput; 