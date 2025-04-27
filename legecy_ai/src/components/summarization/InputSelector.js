import React from 'react';
import { useSummarization, INPUT_METHODS } from '../../context/SummarizationContext';
import { FaKeyboard, FaFileAlt, FaMicrophone } from 'react-icons/fa';

const InputSelector = () => {
  const { inputMethod, setInputMethod } = useSummarization();

  return (
    <div className="mb-6">
      <div className="flex flex-wrap sm:flex-nowrap border-b border-gray-200">
        <button
          onClick={() => setInputMethod(INPUT_METHODS.TEXT)}
          className={`flex items-center px-4 py-3 text-sm font-medium w-full sm:w-auto ${
            inputMethod === INPUT_METHODS.TEXT
              ? 'border-b-2 border-green-600 text-green-600'
              : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <FaKeyboard className="mr-2" /> Type Text
        </button>
        
        <button
          onClick={() => setInputMethod(INPUT_METHODS.FILE)}
          className={`flex items-center px-4 py-3 text-sm font-medium w-full sm:w-auto ${
            inputMethod === INPUT_METHODS.FILE
              ? 'border-b-2 border-green-600 text-green-600'
              : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <FaFileAlt className="mr-2" /> Upload Text File
        </button>
        
        <button
          onClick={() => setInputMethod(INPUT_METHODS.AUDIO)}
          className={`flex items-center px-4 py-3 text-sm font-medium w-full sm:w-auto ${
            inputMethod === INPUT_METHODS.AUDIO
              ? 'border-b-2 border-green-600 text-green-600'
              : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <FaMicrophone className="mr-2" /> Upload Audio
        </button>
      </div>
    </div>
  );
};

export default InputSelector; 