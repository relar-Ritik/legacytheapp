import React from 'react';
import { useSummarization } from '../../context/SummarizationContext';
import { submitText } from '../../services/summarizationService';

const TextInput = () => {
  const { 
    textInput, 
    setTextInput, 
    setLoading, 
    setResults, 
    setError,
    isLoading
  } = useSummarization();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!textInput.trim() || isLoading) return;
    
    setLoading(true);
    
    try {
      const result = await submitText(textInput);
      setResults(result);
    } catch (error) {
      setError('Failed to process text. Please try again.');
      console.error('Error processing text:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label 
          htmlFor="textInput" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Enter your counseling session transcript
        </label>
        <textarea
          id="textInput"
          rows={10}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          disabled={isLoading}
          placeholder="Type or paste your counseling session transcript here..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="flex justify-end mt-2 text-sm text-gray-500">
          {textInput.length} characters
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isLoading || !textInput.trim()}
        className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Processing...
          </div>
        ) : (
          'Generate Summary'
        )}
      </button>
    </form>
  );
};

export default TextInput; 