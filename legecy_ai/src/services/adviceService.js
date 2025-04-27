/**
 * adviceService.js
 * 
 * Service for handling API communication related to the mental health counseling chat.
 * Provides functions for:
 * - Categorizing client questions to determine concern type
 * - Sending ongoing chat messages within the established context
 * - Fetching similar conversation examples for learning purposes
 * All API calls include error handling and proper response processing.
 */

// Service for handling advice chat API calls

// Categorizes the input question and returns initial response
export const categorizeQuestion = async (question) => {
  try {
    const response = await fetch('/api/categorize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error('Failed to categorize question');
    }

    return await response.json();
  } catch (error) {
    console.error('Error categorizing question:', error);
    throw error;
  }
};

// Sends a message in an existing chat conversation
export const sendChatMessage = async (message, category, history) => {
  try {
    console.log('Sending message:', message, 'with category:', category, 'history:', history);
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, category, history }),
    });

    if (!response.ok) {
      throw new Error('Failed to send chat message');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

// Fetches similar conversation examples from the dataset
export const getSimilarConversations = async (messageHistory) => {
  try {
    console.log('Fetching similar conversations with history:', messageHistory);
    
    // Ensure messageHistory is properly formatted
    const formattedHistory = Array.isArray(messageHistory) ? messageHistory : [];
    
    const response = await fetch('/api/examples', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ history: formattedHistory }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch similar conversations');
    }
    
    const data = await response.json();
    console.log('API response for similar conversations:', data);
    
    // Just pass through the raw conversation strings
    return {
      highQuality: data.highQuality && data.highQuality.length > 0 ? data.highQuality[0] : null,
      lowQuality: data.lowQuality && data.lowQuality.length > 0 ? data.lowQuality[0] : null
    };
  } catch (error) {
    console.error('Error fetching similar conversations:', error);
    throw error;
  }
}; 