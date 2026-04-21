import React from 'react';
import { HiUser } from 'react-icons/hi';

interface MobileHeaderProps {
  currentStep: number;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ currentStep }) => {
  return (
    <div className="lg:hidden sticky top-0 bg-white border-b border-gray-100 z-40 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-gradient-to-r from-primary to-primary-light flex items-center justify-center text-white">
            <HiUser size={18} />
          </div>
          <h2 className="font-bold text-gray-900 font-playfair">Profile Setup</h2>
        </div>
        <span className="text-xs font-bold text-primary">{currentStep * 10}%</span>
      </div>
      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary-light duration-500 ease-out"
          style={{ width: `${currentStep * 10}%` }}
        />
      </div>
    </div>
  );
};

export default MobileHeader;
