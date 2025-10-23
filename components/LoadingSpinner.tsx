
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-300 text-lg">AI is generating your plan...</p>
        <p className="text-slate-400 text-sm">This may take a few moments.</p>
    </div>
  );
};

export default LoadingSpinner;
