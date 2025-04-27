/**
 * summarizationService.js
 * 
 * Service for handling API communication related to the summarization feature.
 * Provides functions for:
 * - Submitting text input for summarization
 * - Uploading and processing text files
 * - Uploading and processing audio files
 * - Downloading summary results as PDF
 */

// Helper function to process summarization response
const processSummarizationResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Failed to process request: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Return the API response directly, adding empty arrays for expected fields
  // to prevent "Cannot read properties of undefined (reading 'map')" errors
  return {
    id: data.id,
    transcript: data.transcript || null,
    summary: data.summary || '',
    notes: data.notes || '',
    keyPoints: [], // Empty array to prevent .map() errors
    themes: [],    // Empty array to prevent .map() errors
    recommendations: [] // Empty array to prevent .map() errors
  };
};

// Submit typed text for summarization
export const submitText = async (text) => {
  try {
    const response = await fetch('/api/summarization/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    return processSummarizationResponse(response);
  } catch (error) {
    console.error('Error summarizing text:', error);
    throw error;
  }
};

// Upload and process text file for summarization
export const submitFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/summarization/file', {
      method: 'POST',
      body: formData,
    });

    return processSummarizationResponse(response);
  } catch (error) {
    console.error('Error processing file:', error);
    throw error;
  }
};

// Upload and process audio file for summarization
export const submitAudio = async (audioFile) => {
  try {
    const formData = new FormData();
    formData.append('audio', audioFile);

    const response = await fetch('/api/summarization/audio', {
      method: 'POST',
      body: formData,
    });

    return processSummarizationResponse(response);
  } catch (error) {
    console.error('Error processing audio:', error);
    throw error;
  }
};

// Download summary results as PDF
export const downloadSummaryPdf = async (summaryId) => {
  try {
    const response = await fetch(`/api/summarization/download/${summaryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to download summary');
    }

    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error('Error downloading summary:', error);
    throw error;
  }
}; 