
import React, { useState } from 'react';

interface GoalInputFormProps {
  onGenerate: (goal: string) => void;
  isLoading: boolean;
}

const GoalInputForm: React.FC<GoalInputFormProps> = ({ onGenerate, isLoading }) => {
  const [goal, setGoal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(goal);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="goal-input" className="block text-lg font-medium text-slate-300">
        What is your goal?
      </label>
      <textarea
        id="goal-input"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="e.g., Launch a new SaaS product in 3 months"
        className="w-full h-32 p-4 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors placeholder-slate-500"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !goal.trim()}
        className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Plan...
          </>
        ) : (
          'Generate Plan'
        )}
      </button>
    </form>
  );
};

export default GoalInputForm;
