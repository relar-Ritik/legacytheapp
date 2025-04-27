/**
 * ChatContext.js
 * 
 * Context provider for chat functionality in the counseling advice system.
 * Manages global state for messages, categorization, and loading states.
 * Uses reducer pattern to handle state updates through defined actions.
 */

import React, { createContext, useContext, useState, useReducer } from 'react';

const ChatContext = createContext();

// Chat reducer to handle different actions
const chatReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_CATEGORY':
      return { ...state, category: action.payload, categoryReceived: true };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'RESET_CHAT':
      return { ...initialState };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  messages: [],
  category: null,
  categoryReceived: false,
  isLoading: false,
};

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Action creators
  const setLoading = (isLoading) => {
    dispatch({ type: 'SET_LOADING', payload: isLoading });
  };

  const setCategory = (category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  };

  const addMessage = (message) => {
    dispatch({ type: 'ADD_MESSAGE', payload: message });
  };

  const resetChat = () => {
    dispatch({ type: 'RESET_CHAT' });
  };

  return (
    <ChatContext.Provider
      value={{
        ...state,
        setLoading,
        setCategory,
        addMessage,
        resetChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext); 