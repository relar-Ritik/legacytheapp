/**
 * ChatMessages.js
 * 
 * Component that displays the conversation history between counselor and AI.
 * Features:
 * - Auto-scrolls to the latest message when new messages are added
 * - Renders placeholders when no messages exist
 * - Uses MessageItem components to render each message consistently
 * - Shows a typing indicator when waiting for response
 * - Fills available vertical space with proper overflow handling
 */

import React, { useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import MessageItem from './MessageItem';

const ChatMessages = () => {
  const { messages, isLoading } = useChat();
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500 text-center">
          Enter a client question to begin the conversation.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-200 w-full">
      {messages.map((message, index) => (
        <MessageItem
          key={index}
          message={message}
          isAi={message.sender === 'ai'}
        />
      ))}
      
      {isLoading && (
        <div className="mb-4 ml-0 mr-auto max-w-[80%]">
          <div className="p-4 rounded-lg shadow bg-green-100 text-green-800">
            <div className="font-semibold mb-1">AI Assistant</div>
            <div className="flex items-center">
              <span className="mr-1">Typing</span>
              <span className="typing-dot">.</span>
              <span className="typing-dot">.</span>
              <span className="typing-dot">.</span>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages; 