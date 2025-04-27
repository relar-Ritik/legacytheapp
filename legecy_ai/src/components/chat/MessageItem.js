/**
 * MessageItem.js
 * 
 * Component for rendering individual chat messages.
 * Displays different styling based on sender (AI vs counselor).
 * Shows message content and timestamp with appropriate visual treatment.
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';

const MessageItem = ({ message, isAi }) => {
  return (
    <div 
      className={`mb-4 ${isAi ? 'ml-0 mr-auto' : 'ml-auto mr-0'} max-w-[80%]`}
    >
      <div 
        className={`p-4 rounded-lg shadow ${
          isAi 
            ? 'bg-green-100 text-green-800' 
            : 'bg-white text-gray-800 border border-green-200'
        }`}
      >
        <div className="font-semibold mb-1">
          {isAi ? 'AI Assistant' : 'Counselor'}
        </div>
        {isAi ? (
          <div className="markdown-content">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ) : (
          <div>{message.content}</div>
        )}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {new Date(message.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default MessageItem; 