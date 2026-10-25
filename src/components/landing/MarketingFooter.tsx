import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../layout/BrandLogo';

export const MarketingFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E7E5DF] text-xs text-[#69717D] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E7E5DF]">
          <Link to="/">
            <BrandLogo size="md" showTagline={true} />
          </Link>

          <div className="flex flex-wrap items-center gap-6 font-medium text-[#48505E]">
            <Link to="/" className="hover:text-[#172C4D]">Home</Link>
            <Link to="/how-it-works" className="hover:text-[#172C4D]">How It Works</Link>
            <Link to="/features" className="hover:text-[#172C4D]">Features</Link>
            <Link to="/authenticity" className="hover:text-[#172C4D]">Authenticity</Link>
            <Link to="/businesses" className="hover:text-[#172C4D]">For Businesses</Link>
            <Link to="/login" className="hover:text-[#172C4D]">Sign In</Link>
            <Link to="/app" className="hover:text-[#172C4D] font-bold text-[#172C4D]">Launch App</Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px]">
          <p>
            &copy; {new Date().getFullYear()} Lexora. Legal Intelligence &amp; Forensics. Built for India's small businesses.
          </p>
          <p className="max-w-xl text-[10px] text-[#8F97A3] leading-relaxed">
            <strong>Legal Disclaimer:</strong> Lexora is decision support, not legal advice. Verify notices on official portals and consult a CA or advocate.
          </p>
        </div>
      </div>
    </footer>
  );
};
