import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-24 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl font-bold mb-6 leading-tight">Elevate Your Counseling Practice with AI</h1>
          <p className="text-xl mb-8">
            Transform client sessions into actionable insights. Get personalized AI guidance and automate your documentation workflow.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/advice" className="bg-white text-green-700 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-100 transition duration-300 text-center">
              Get AI Advice
            </Link>
            <Link to="/summarization" className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-green-700 transition duration-300 text-center">
              Summarize Sessions
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img 
            src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500" 
            alt="Counseling session" 
            className="rounded-lg shadow-2xl object-cover h-80 w-full sm:w-4/5"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
