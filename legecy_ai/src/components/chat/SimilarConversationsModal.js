/**
 * SimilarConversationsModal.js
 * 
 * Modal component for displaying similar conversation examples.
 * Features:
 * - Shows both high-quality and low-quality conversation examples
 * - Clear visual distinction between different example qualities
 * - Provides close functionality
 * - Displays loading state while fetching data
 */

import React from 'react';

const ConversationExample = ({ title, conversation, qualityClass }) => {
  // Add safety check for conversation data
  if (!conversation) {
    return (
      <div className={`p-4 rounded-lg mb-4 ${qualityClass}`}>
        <h3 className="font-bold mb-2">{title}</h3>
        <div className="p-4 bg-white border border-gray-200 rounded-lg text-gray-500">
          No conversation data available.
        </div>
      </div>
    );
  }

  // Handle raw transcript string
  if (typeof conversation === 'string') {
    return (
      <div className={`p-4 rounded-lg mb-4 ${qualityClass}`}>
        <h3 className="font-bold mb-2">{title}</h3>
        <div className="max-h-[300px] overflow-y-auto border border-gray-200 rounded-lg bg-white p-4">
          <pre className="whitespace-pre-wrap font-mono text-sm">{conversation}</pre>
        </div>
      </div>
    );
  }

  // Handle array of structured messages
  if (Array.isArray(conversation)) {
    return (
      <div className={`p-4 rounded-lg mb-4 ${qualityClass}`}>
        <h3 className="font-bold mb-2">{title}</h3>
        <div className="max-h-[300px] overflow-y-auto border border-gray-200 rounded-lg bg-white">
          {conversation.map((message, index) => (
            <div 
              key={index} 
              className={`p-3 border-b border-gray-200 ${
                message.sender === 'counselor' 
                  ? 'bg-white' 
                  : 'bg-gray-50'
              }`}
            >
              <div className="font-semibold text-sm">
                {message.sender === 'counselor' ? 'Counselor' : 'Client'}:
              </div>
              <div>{message.content}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Fallback for unknown data type
  return (
    <div className={`p-4 rounded-lg mb-4 ${qualityClass}`}>
      <h3 className="font-bold mb-2">{title}</h3>
      <div className="p-4 bg-white border border-gray-200 rounded-lg text-gray-500">
        Conversation data is in an unsupported format.
      </div>
    </div>
  );
};

const SimilarConversationsModal = ({ isOpen, onClose, isLoading, examples }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between">
          <h2 className="text-xl font-bold text-green-700">Similar Conversations</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : examples ? (
            <div>
              <p className="mb-4 text-gray-600">
                Below are examples of similar conversations from our dataset. 
                Study the differences between high-quality and low-quality responses 
                to improve your counseling approach.
              </p>
              
              <ConversationExample 
                title="High-Quality Example" 
                conversation={examples.highQuality} 
                qualityClass="bg-green-50 border border-green-200"
              />
              
              <ConversationExample 
                title="Low-Quality Example" 
                conversation={examples.lowQuality} 
                qualityClass="bg-red-50 border border-red-200"
              />
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No similar conversations found.
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimilarConversationsModal; 