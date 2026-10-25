import React from 'react';
import { Outlet } from 'react-router-dom';
import { MarketingNavbar } from './MarketingNavbar';
import { MarketingFooter } from './MarketingFooter';
import { ScrollToTop } from '../shared/ScrollToTop';

export const MarketingLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#171A1F] flex flex-col antialiased selection:bg-[#172C4D] selection:text-[#F7F6F2]">
      <ScrollToTop />
      <MarketingNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  );
};
