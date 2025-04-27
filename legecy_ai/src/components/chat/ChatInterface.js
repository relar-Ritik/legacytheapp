/**
 * ChatInterface.js
 * 
 * Main container component that assembles all chat-related components.
 * Features:
 * - Provides ChatProvider context to all child components
 * - Organizes layout of header, category, messages, and input components
 * - Contains descriptive text explaining the chat's purpose
 * - Uses viewport-based sizing for dynamic full-screen layout
 * - Offers access to similar conversation examples via modal
 */

import React, { useState } from 'react';
import { ChatProvider } from '../../context/ChatContext';
import { useChat } from '../../context/ChatContext';
import CategoryDisplay from './CategoryDisplay';
import ChatMessages from './ChatMessages';
import QuestionInput from './QuestionInput';
import SimilarConversationsModal from './SimilarConversationsModal';
import { getSimilarConversations } from '../../services/adviceService';

const ChatContent = () => {
  const { messages } = useChat();
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [examples, setExamples] = useState(null);

  const handleFetchSimilarConversations = async () => {
    setModalOpen(true);
    setIsLoading(true);
    setExamples(null); // Reset examples when fetching new ones
    
    try {
      const response = await getSimilarConversations(messages);
      console.log("Response from API:", response);
      
      // Directly use the response without validation
      setExamples({
        highQuality: response.highQuality,
        lowQuality: response.lowQuality
      });
    } catch (error) {
      console.error('Error fetching similar conversations:', error);
      setExamples({
        highQuality: "No high-quality example available.",
        lowQuality: "No low-quality example available."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-green-700">Mental Health Counseling Assistant</h2>
        <p className="text-gray-600">
          Enter your client's concern or question to get AI assistance.
        </p>
      </div>
      
      <CategoryDisplay />
      
      <div className="flex flex-col h-[calc(100vh-240px)]">
        <ChatMessages />
        <QuestionInput />
        
        {messages.length > 0 && (
          <button
            onClick={handleFetchSimilarConversations}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            View Similar Conversations
          </button>
        )}
      </div>
      
      <SimilarConversationsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        isLoading={isLoading}
        examples={examples}
      />
    </div>
  );
};

const ChatInterface = () => {
  return (
    <ChatProvider>
      <ChatContent />
    </ChatProvider>
  );
};

export default ChatInterface; 