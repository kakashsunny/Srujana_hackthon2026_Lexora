import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Menu, X, Sparkles } from 'lucide-react';
import { BrandLogo } from '../layout/BrandLogo';

export const MarketingNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/features', label: 'Features' },
    { 
      to: '/authenticity', 
      label: 'Authenticity Intelligence', 
      badge: 'Forensics' 
    },
    { to: '/businesses', label: 'For Businesses' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F7F6F2] border-b border-[#E7E5DF] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Brand Wordmark & Seal */}
        <Link 
          to="/" 
          className="flex items-center gap-3 shrink-0"
        >
          <BrandLogo size="md" showTagline={true} />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `
                relative py-1 transition-colors flex items-center gap-1.5
                ${isActive 
                  ? 'text-[#172C4D] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#B99A62] after:rounded-full' 
                  : 'text-[#48505E] hover:text-[#172C4D]'}
              `}
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-[9px] uppercase tracking-wider text-[#B99A62] bg-[#B99A62]/10 px-1.5 py-0.2 rounded-xs font-mono font-bold">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <Link
            to="/login"
            className="px-3.5 py-2 text-xs font-semibold text-[#172C4D] hover:text-[#112038] hover:bg-black/5 rounded-md transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/app"
            className="px-4 py-2 bg-[#172C4D] text-[#F7F6F2] hover:bg-[#112038] text-xs font-semibold rounded-md shadow-xs transition-all flex items-center gap-2 group"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B99A62] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/app"
            className="px-3 py-1.5 bg-[#172C4D] text-[#F7F6F2] text-xs font-semibold rounded-md"
          >
            Dashboard
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#172C4D] hover:bg-[#E7E5DF]/50 rounded-md"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E7E5DF] bg-[#F7F6F2] px-4 pt-2 pb-5 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `
                  block px-3 py-2 rounded-md text-xs font-semibold transition-colors
                  ${isActive ? 'bg-[#172C4D] text-[#F7F6F2]' : 'text-[#48505E] hover:bg-[#E7E5DF]'}
                `}
              >
                <div className="flex items-center justify-between">
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] uppercase font-mono text-[#B99A62]">
                      {link.badge}
                    </span>
                  )}
                </div>
              </NavLink>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E7E5DF] flex items-center gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 text-xs font-semibold text-[#172C4D] bg-white border border-[#E7E5DF] rounded-md"
            >
              Sign In
            </Link>
            <Link
              to="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 text-xs font-semibold text-white bg-[#172C4D] rounded-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
