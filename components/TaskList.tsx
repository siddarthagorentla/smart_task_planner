
import React from 'react';
import { Task } from '../types';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const taskMap = new Map(tasks.map(task => [task.id, task]));

  return (
    <div className="space-y-6">
       <h2 className="text-3xl font-bold text-center text-white mb-6">Your Action Plan</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} taskMap={taskMap} />
      ))}
    </div>
  );
};

export default TaskList;
