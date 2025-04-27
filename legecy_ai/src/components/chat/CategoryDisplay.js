/**
 * CategoryDisplay.js
 * 
 * Component that shows the categorization of the client's concern.
 * Features:
 * - Only appears after initial categorization is complete
 * - Maps API category codes to human-readable labels
 * - Uses color-coding to visually differentiate concern types
 * - Handles unknown categories gracefully with defaults
 */

import React from 'react';
import { useChat } from '../../context/ChatContext';

const CategoryDisplay = () => {
  const { category, categoryReceived } = useChat();

  if (!categoryReceived) {
    return null;
  }

  // Map category to readable labels and colors
  const categoryInfo = {
    'anxiety': {
      label: 'Anxiety-Related Concern',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    },
    'depression': {
      label: 'Depression-Related Concern',
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    'relationship': {
      label: 'Relationship Issue',
      color: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    'trauma': {
      label: 'Trauma-Related Concern',
      color: 'bg-red-100 text-red-800 border-red-200'
    },
    'general': {
      label: 'General Wellness Concern',
      color: 'bg-green-100 text-green-800 border-green-200'
    }
  };

  // Default if category is not in our mapping
  const { label, color } = categoryInfo[category] || {
    label: 'Client Concern',
    color: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  return (
    <div className="mb-4">
      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${color} border`}>
        {label}
      </div>
    </div>
  );
};

export default CategoryDisplay; 