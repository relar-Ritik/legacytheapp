import React from 'react';

const BenefitCard = ({ benefit }) => {
  const { icon, title, description } = benefit;
  
  return (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300">
      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-center text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 text-center">
        {description}
      </p>
    </div>
  );
};

export default BenefitCard;
