import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  showText = true
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const sealIcon = (
    <div className={`relative shrink-0 ${iconSizes[size]} rounded-lg bg-[#172C4D] flex items-center justify-center shadow-xs border border-[#B99A62]/30`}>
      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5/6 h-5/6"
      >
        {/* Outer heraldic shield outline */}
        <path
          d="M18 4L28 8.5V18.5C28 24.5 18 29.5 18 29.5C18 29.5 8 24.5 8 18.5V8.5L18 4Z"
          stroke="#B99A62"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Scales of Justice Beam & Stand */}
        <path
          d="M18 10V22M13 13.5H23"
          stroke="#F7F6F2"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Left Pan */}
        <path
          d="M11 15L13 13.5L15 15"
          stroke="#B99A62"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M10.5 17C10.5 18.5 15.5 18.5 15.5 17H10.5Z"
          fill="#B99A62"
          fillOpacity="0.8"
        />
        {/* Right Pan */}
        <path
          d="M21 15L23 13.5L25 15"
          stroke="#B99A62"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M20.5 17C20.5 18.5 25.5 18.5 25.5 17H20.5Z"
          fill="#B99A62"
          fillOpacity="0.8"
        />
        {/* Base Desk Quill */}
        <path
          d="M16 22H20"
          stroke="#F7F6F2"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );

  if (!showText) {
    return sealIcon;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {sealIcon}
      <div className="flex flex-col">
        <span className="font-bold text-base tracking-tight text-[#171A1F] leading-tight">
          Lexora
        </span>
        {showTagline && (
          <span className="text-[10px] font-medium text-[#69717D] tracking-wider uppercase mt-0.5">
            Legal Intelligence &amp; Forensics
          </span>
        )}
      </div>
    </div>
  );
};
