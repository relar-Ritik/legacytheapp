import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaMicrophone, FaFileAudio, FaTrash } from 'react-icons/fa';
import { useSummarization } from '../../context/SummarizationContext';
import { submitAudio } from '../../services/summarizationService';

const AudioUpload = () => {
  const {
    audio,
    setAudio,
    setLoading,
    setResults,
    setError,
    isLoading
  } = useSummarization();

  const onDrop = useCallback((acceptedFiles) => {
    // Only accept the first file
    if (acceptedFiles && acceptedFiles.length > 0) {
      setAudio(acceptedFiles[0]);
    }
  }, [setAudio]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/mpeg': ['.mp3'],
      'audio/wav': ['.wav'],
      'audio/m4a': ['.m4a'],
      'audio/x-m4a': ['.m4a'],
      'audio/ogg': ['.ogg']
    },
    maxFiles: 1,
    disabled: isLoading
  });

  const removeAudio = () => {
    setAudio(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!audio || isLoading) return;
    
    setLoading(true);
    
    try {
      const result = await submitAudio(audio);
      setResults(result);
    } catch (error) {
      setError('Failed to process audio. Please try again.');
      console.error('Error processing audio:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload an audio recording
        </label>
        
        {!audio ? (
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
              isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-500'
            }`}
          >
            <input {...getInputProps()} />
            <FaMicrophone className="mx-auto text-3xl text-gray-400 mb-3" />
            {isDragActive ? (
              <p className="text-gray-600">Drop the audio file here...</p>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">Drag and drop an audio file here, or click to select</p>
                <p className="text-xs text-gray-500">Accepted formats: .mp3, .wav, .m4a, .ogg</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <FaFileAudio className="text-green-600 text-xl mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-800">{audio.name}</p>
                <p className="text-xs text-gray-500">{(audio.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button 
              type="button"
              onClick={removeAudio}
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
        disabled={isLoading || !audio}
        className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Processing... This may take longer for audio files
          </div>
        ) : (
          'Generate Summary'
        )}
      </button>
    </form>
  );
};

export default AudioUpload; 