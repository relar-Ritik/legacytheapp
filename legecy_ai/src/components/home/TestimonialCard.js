import React from 'react';

const TestimonialCard = ({ testimonial }) => {
  const { initials, name, role, quote } = testimonial;
  
  return (
    <div className="bg-gray-50 p-8 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
          <span className="text-green-700 font-bold">{initials}</span>
        </div>
        <div>
          <h4 className="font-bold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
      <p className="text-gray-600 italic">
        "{quote}"
      </p>
    </div>
  );
};

export default TestimonialCard;
