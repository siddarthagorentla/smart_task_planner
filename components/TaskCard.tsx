
import React from 'react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  taskMap: Map<number, Task>;
}

const CalendarIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const DependencyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
);


const TaskCard: React.FC<TaskCardProps> = ({ task, taskMap }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg p-6 transition-all hover:border-cyan-500/50 hover:shadow-cyan-500/10">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 bg-slate-700 text-cyan-400 font-bold text-lg rounded-full h-10 w-10 flex items-center justify-center">
            {task.id}
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-white">{task.taskName}</h3>
          <p className="mt-2 text-slate-300">{task.description}</p>
          
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 text-sm">
            <div className="flex items-center text-slate-300">
                <CalendarIcon />
                <span className="font-medium">Timeline:</span>
                <span className="ml-2 bg-slate-700 px-2 py-1 rounded-md">{task.timeline}</span>
            </div>
          </div>
            {task.dependencies && task.dependencies.length > 0 && (
                 <div className="mt-4 pt-4 border-t border-slate-700">
                    <div className="flex items-start text-slate-300">
                        <DependencyIcon />
                        <div>
                            <span className="font-medium">Dependencies:</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                            {task.dependencies.map(depId => (
                                <div key={depId} className="bg-rose-900/50 text-rose-300 px-3 py-1 rounded-full text-xs font-mono" title={taskMap.get(depId)?.taskName || 'Unknown Task'}>
                                Task #{depId}
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
