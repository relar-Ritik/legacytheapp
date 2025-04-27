import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 px-8 bg-gradient-to-r from-green-600 to-green-800 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Practice?</h2>
        <p className="text-xl mb-10 max-w-3xl mx-auto">
          Join thousands of counselors who are enhancing their therapeutic approach and reclaiming their time with CounselAI.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link to="/advice" className="bg-white text-green-700 font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-green-100 transition duration-300">
            Get AI Advice
          </Link>
          <Link to="/summarization" className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-green-700 transition duration-300">
            Summarize Sessions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
