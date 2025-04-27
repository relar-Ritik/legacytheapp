/**
 * SummarizationContext.js
 * 
 * Context provider for the summarization feature.
 * Manages state for:
 * - Input method selection (text, file, audio)
 * - Processing status
 * - Summary results
 * - Error handling
 */

import React, { createContext, useContext, useReducer } from 'react';

// Create context
const SummarizationContext = createContext();

// Define action types
const ACTION_TYPES = {
  SET_INPUT_METHOD: 'SET_INPUT_METHOD',
  SET_TEXT_INPUT: 'SET_TEXT_INPUT',
  SET_FILE: 'SET_FILE',
  SET_AUDIO: 'SET_AUDIO',
  SET_LOADING: 'SET_LOADING',
  SET_RESULTS: 'SET_RESULTS',
  SET_ERROR: 'SET_ERROR',
  RESET: 'RESET',
};

// Input method types
export const INPUT_METHODS = {
  TEXT: 'TEXT',
  FILE: 'FILE',
  AUDIO: 'AUDIO',
};

// Reducer function
const summarizationReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_INPUT_METHOD:
      return {
        ...state,
        inputMethod: action.payload,
        error: null,
      };
    case ACTION_TYPES.SET_TEXT_INPUT:
      return {
        ...state,
        textInput: action.payload,
        error: null,
      };
    case ACTION_TYPES.SET_FILE:
      return {
        ...state,
        file: action.payload,
        error: null,
      };
    case ACTION_TYPES.SET_AUDIO:
      return {
        ...state,
        audio: action.payload,
        error: null,
      };
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ACTION_TYPES.SET_RESULTS:
      return {
        ...state,
        results: action.payload,
        isLoading: false,
      };
    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
        inputMethod: state.inputMethod, // Keep the current input method
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  inputMethod: INPUT_METHODS.TEXT, // Default to text input
  textInput: '',
  file: null,
  audio: null,
  isLoading: false,
  results: null,
  error: null,
};

// Provider component
export const SummarizationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(summarizationReducer, initialState);

  // Action creators
  const setInputMethod = (method) => {
    dispatch({ type: ACTION_TYPES.SET_INPUT_METHOD, payload: method });
  };

  const setTextInput = (text) => {
    dispatch({ type: ACTION_TYPES.SET_TEXT_INPUT, payload: text });
  };

  const setFile = (file) => {
    dispatch({ type: ACTION_TYPES.SET_FILE, payload: file });
  };

  const setAudio = (audio) => {
    dispatch({ type: ACTION_TYPES.SET_AUDIO, payload: audio });
  };

  const setLoading = (isLoading) => {
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: isLoading });
  };

  const setResults = (results) => {
    dispatch({ type: ACTION_TYPES.SET_RESULTS, payload: results });
  };

  const setError = (error) => {
    dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error });
  };

  const reset = () => {
    dispatch({ type: ACTION_TYPES.RESET });
  };

  // Context value
  const value = {
    ...state,
    setInputMethod,
    setTextInput,
    setFile,
    setAudio,
    setLoading,
    setResults,
    setError,
    reset,
  };

  return (
    <SummarizationContext.Provider value={value}>
      {children}
    </SummarizationContext.Provider>
  );
};

// Custom hook for using this context
export const useSummarization = () => {
  const context = useContext(SummarizationContext);
  if (context === undefined) {
    throw new Error('useSummarization must be used within a SummarizationProvider');
  }
  return context;
}; 