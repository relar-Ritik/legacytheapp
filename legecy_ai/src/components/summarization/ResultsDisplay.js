import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FaChevronDown, FaChevronRight, FaDownload, FaStar } from 'react-icons/fa';
import { useSummarization } from '../../context/SummarizationContext';
import DownloadButton from './DownloadButton';

const ResultsDisplay = () => {
  const { results } = useSummarization();
  const [expandedSections, setExpandedSections] = useState({
    summary: true,
    notes: false
  });

  if (!results) return null;

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderSection = (title, content, sectionKey, icon = null, isMarkdown = false) => {
    if (!content) return null;
    
    return (
      <div className="mb-4 border rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
        >
          <div className="flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          </div>
          {expandedSections[sectionKey] ? (
            <FaChevronDown className="text-gray-500" />
          ) : (
            <FaChevronRight className="text-gray-500" />
          )}
        </button>
        
        {expandedSections[sectionKey] && (
          <div className="p-4 bg-white">
            {typeof content === 'string' ? (
              isMarkdown ? (
                <div className="markdown-content prose max-w-none">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-gray-700 whitespace-pre-line">{content}</p>
              )
            ) : (
              <ul className="list-disc pl-5 space-y-2">
                {Array.isArray(content) && content.map((point, index) => (
                  <li key={index} className="text-gray-700">{point}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-700">Summary Results</h2>
        {results.id && <DownloadButton summaryId={results.id} />}
      </div>
      
      {renderSection('Session Summary', results.summary, 'summary')}
      
      {renderSection('Clinical Notes', results.notes, 'notes', null, true)}
    </div>
  );
};

export default ResultsDisplay; 