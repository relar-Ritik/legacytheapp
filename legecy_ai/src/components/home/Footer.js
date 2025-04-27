import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 px-8">
      <div className="max-w-7xl mx-auto text-center">
        <p>© {new Date().getFullYear()} CounselAI. All rights reserved.</p>
        <p className="mt-2 text-gray-400 text-sm">
          Helping counselors provide better care through AI-powered insights.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
