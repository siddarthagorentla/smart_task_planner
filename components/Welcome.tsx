
import React from 'react';

const CheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
)

const Welcome: React.FC = () => {
    return (
        <div className="text-center p-8 bg-slate-800/40 border border-slate-700 rounded-lg">
            <h2 className="text-3xl font-bold text-white mb-4">Welcome to the Smart Task Planner</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
                Turn your ambitious goals into manageable steps. Our AI will analyze your objective and create a detailed action plan, complete with tasks, timelines, and dependencies.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-left">
                <div className="bg-slate-700/50 p-4 rounded-lg flex items-start space-x-3">
                   <CheckIcon className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-semibold text-white">Enter Your Goal</h4>
                        <p className="text-slate-400 text-sm">Describe what you want to achieve.</p>
                    </div>
                </div>
                 <div className="bg-slate-700/50 p-4 rounded-lg flex items-start space-x-3">
                   <CheckIcon className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-semibold text-white">Generate Plan</h4>
                        <p className="text-slate-400 text-sm">Let AI create a step-by-step roadmap.</p>
                    </div>
                </div>
                 <div className="bg-slate-700/50 p-4 rounded-lg flex items-start space-x-3">
                   <CheckIcon className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-semibold text-white">Execute</h4>
                        <p className="text-slate-400 text-sm">Follow the plan and achieve success!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
