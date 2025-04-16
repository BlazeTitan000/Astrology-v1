import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-[rgba(28,28,58,0.9)] text-white py-4 px-6 fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold font-libre-bodoni">
            AstroGuide
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-purple-400 transition-colors font-playfair">
            Home
          </Link>
          <Link to="/example-report" className="hover:text-purple-400 transition-colors font-playfair">
            Example Report
          </Link>
          <Link to="/terms" className="hover:text-purple-400 transition-colors font-playfair">
            Terms & Conditions
          </Link>
        </nav>
      </div>
    </header>
  );
};
