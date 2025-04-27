import React from 'react';
import { FaLightbulb, FaFileAlt } from 'react-icons/fa';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const adviceFeature = {
    icon: <FaLightbulb className="text-green-600 text-3xl" />,
    title: "AI-Powered Advice",
    description: "Access personalized guidance and therapeutic suggestions tailored to specific client situations.",
    bullets: [
      "Research-based therapeutic approaches",
      "Intervention suggestions",
      "Case conceptualization support"
    ],
    linkTo: "/advice",
    linkText: "Explore AI Advice"
  };

  const summaryFeature = {
    icon: <FaFileAlt className="text-green-600 text-3xl" />,
    title: "Session Summarization",
    description: "Automatically create concise, structured notes from your session transcripts and recordings.",
    bullets: [
      "Audio recording transcription",
      "Key theme extraction",
      "SOAP note formatting"
    ],
    linkTo: "/summarization",
    linkText: "Try Summarization"
  };

  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Powerful Tools for Counselors</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <FeatureCard feature={adviceFeature} />
          <FeatureCard feature={summaryFeature} />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
