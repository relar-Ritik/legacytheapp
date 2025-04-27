import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { SummarizationProvider, useSummarization, INPUT_METHODS } from '../context/SummarizationContext';
import InputSelector from '../components/summarization/InputSelector';
import TextInput from '../components/summarization/TextInput';
import FileUpload from '../components/summarization/FileUpload';
import AudioUpload from '../components/summarization/AudioUpload';
import ResultsDisplay from '../components/summarization/ResultsDisplay';

// Inner component that uses the context
const SummarizationContent = () => {
  const { inputMethod, results, error } = useSummarization();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          <FaFileAlt className="inline-block mr-3 mb-1" />
          Note Summarization
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          Upload your counseling session notes to get smart summaries.
        </p>
        <p className="text-gray-600">
          Choose how you want to input your session data below.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <InputSelector />
        
        {inputMethod === INPUT_METHODS.TEXT && <TextInput />}
        {inputMethod === INPUT_METHODS.FILE && <FileUpload />}
        {inputMethod === INPUT_METHODS.AUDIO && <AudioUpload />}
        
        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg mt-4">
            {error}
          </div>
        )}
      </div>
      
      {results && <ResultsDisplay />}
    </div>
  );
};

// Wrapper component that provides context
export default function Summarization() {
  return (
    <div className="p-8 bg-green-50 min-h-screen">
      <SummarizationProvider>
        <SummarizationContent />
      </SummarizationProvider>
    </div>
  );
}
  