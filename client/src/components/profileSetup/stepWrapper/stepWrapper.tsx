import React from 'react';
import { clsx } from 'clsx';

interface StepWrapperProps {
  step: number;
  currentStep: number;
  children: React.ReactNode;
  isStep1?: boolean;
}

const StepWrapper: React.FC<StepWrapperProps> = ({ step, currentStep, children, isStep1 }) => {
  return (
    <div className={clsx(
      isStep1 ? 'bg-white rounded-3xl md:rounded-3xl shadow-logs p-6 md:p-16 duration-700 animate-in fade-in slide-in-from-bottom-8 w-full' :
      'bg-white rounded-2xl md:rounded-3xl shadow-logs p-5 sm:p-8 md:p-12 lg:p-16 duration-700 animate-in fade-in slide-in-from-bottom-8 w-full',
      currentStep === step ? 'block' : 'hidden'
    )}>
      {children}
    </div>
  );
};

export default StepWrapper;
