import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ feature }) => {
  const { icon, title, description, bullets, linkTo, linkText } = feature;
  
  return (
    <div className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-green-600">
      <div className="flex items-start mb-6">
        <div className="bg-green-100 p-4 rounded-lg mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600">
            {description}
          </p>
        </div>
      </div>
      <ul className="space-y-3 mb-6 text-gray-600">
        {bullets.map((bullet, index) => (
          <li key={index} className="flex items-center">
            <span className="bg-green-100 p-1 rounded-full mr-2">
              <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
            {bullet}
          </li>
        ))}
      </ul>
      <Link to={linkTo} className="inline-block text-green-600 font-semibold hover:text-green-800 transition duration-300">
        {linkText} <span className="ml-1">→</span>
      </Link>
    </div>
  );
};

export default FeatureCard;
