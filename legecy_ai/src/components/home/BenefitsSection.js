import React from 'react';
import { FaClock, FaUserFriends, FaLock } from 'react-icons/fa';
import BenefitCard from './BenefitCard';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <FaClock className="text-3xl text-green-600" />,
      title: "Save Time",
      description: "Reduce documentation time by up to 60%, allowing you to focus more on client care and less on paperwork."
    },
    {
      icon: <FaUserFriends className="text-3xl text-green-600" />,
      title: "Enhance Client Outcomes",
      description: "Access expert advice and evidence-based interventions to improve the quality of your therapeutic approach."
    },
    {
      icon: <FaLock className="text-3xl text-green-600" />,
      title: "HIPAA Compliant",
      description: "Rest assured your client data is secure with our fully HIPAA-compliant platform and end-to-end encryption."
    }
  ];

  return (
    <section className="py-20 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Why Counselors Choose CounselAI</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
