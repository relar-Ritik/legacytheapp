import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFileUpload, FaFile, FaTrash } from 'react-icons/fa';
import { useSummarization } from '../../context/SummarizationContext';
import { submitFile } from '../../services/summarizationService';

const FileUpload = () => {
  const { 
    file, 
    setFile, 
    setLoading, 
    setResults, 
    setError,
    isLoading 
  } = useSummarization();

  const onDrop = useCallback((acceptedFiles) => {
    // Only accept the first file
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, [setFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/rtf': ['.rtf'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    disabled: isLoading
  });

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file || isLoading) return;
    
    setLoading(true);
    
    try {
      const result = await submitFile(file);
      setResults(result);
    } catch (error) {
      setError('Failed to process file. Please try again.');
      console.error('Error processing file:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload a text document
        </label>
        
        {!file ? (
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
              isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-500'
            }`}
          >
            <input {...getInputProps()} />
            <FaFileUpload className="mx-auto text-3xl text-gray-400 mb-3" />
            {isDragActive ? (
              <p className="text-gray-600">Drop the file here...</p>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">Drag and drop a file here, or click to select</p>
                <p className="text-xs text-gray-500">Accepted formats: .txt, .rtf, .pdf, .doc, .docx</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <FaFile className="text-green-600 text-xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-800">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <button 
              type="button"
              onClick={removeFile}
              disabled={isLoading}
              className="p-1.5 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"
            >
              <FaTrash className="text-sm" />
            </button>
          </div>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isLoading || !file}
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

export default FileUpload; 