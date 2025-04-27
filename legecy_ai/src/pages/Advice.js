/**
 * Advice.js
 * 
 * Page component for the mental health counseling chat functionality.
 * Features:
 * - Page title and description introducing the chat purpose
 * - Centers and allows the chat interface to use full screen
 * - Imports and renders the ChatInterface component
 * - Serves as the main entry point for the counseling advice feature
 */

import React from 'react';
import ChatInterface from '../components/chat/ChatInterface';

export default function Advice() {
  return (
    <div className="p-4 w-full">
      <h1 className="text-4xl font-bold text-green-700 mb-4">Advice Chat</h1>
      <p className="text-lg text-gray-700 mb-6">
        Start a conversation with the AI to get counseling advice. Enter your client's question or concern below.
      </p>
      
      <ChatInterface />
    </div>
  );
}
