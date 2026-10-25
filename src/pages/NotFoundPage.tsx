import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileQuestion, Home } from 'lucide-react';
import { BrandLogo } from '../components/layout/BrandLogo';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#E7E5DF] p-8 shadow-sm space-y-6">
        <div className="w-14 h-14 mx-auto rounded-xl bg-[#F7F6F2] border border-[#E7E5DF] flex items-center justify-center text-[#172C4D]">
          <FileQuestion className="w-7 h-7 text-[#B99A62]" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono font-bold text-[#B99A62] uppercase tracking-wider">
            Error 404 · Record Not Found
          </div>
          <h1 className="text-2xl font-bold text-[#171A1F]">
            Page Not On The Desk
          </h1>
          <p className="text-xs text-[#69717D] leading-relaxed">
            The requested destination does not exist or has been archived. You can return to the home page or open the application workspace.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs">
          <Link
            to="/"
            className="w-full sm:w-auto px-4 py-2.5 bg-[#F7F6F2] hover:bg-[#EBE8E0] border border-[#E7E5DF] text-[#171A1F] font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>

          <Link
            to="/app"
            className="w-full sm:w-auto px-4 py-2.5 bg-[#172C4D] hover:bg-[#112038] text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>Open Workspace</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B99A62]" />
          </Link>
        </div>
      </div>
    </div>
  );
};
