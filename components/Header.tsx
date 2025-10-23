
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12l2 2 4-4"/><path d="M5 12h14"/><path d="M5 12a7 7 0 1 0 0-11.314"/>
           </svg>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Smart Task Planner
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
