
import React, { useState, useCallback } from 'react';
import { Task } from './types';
import { generatePlan } from './services/geminiService';
import GoalInputForm from './components/GoalInputForm';
import TaskList from './components/TaskList';
import LoadingSpinner from './components/LoadingSpinner';
import Header from './components/Header';
import Footer from './components/Footer';
import Welcome from './components/Welcome';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlan = useCallback(async (goal: string) => {
    if (!goal.trim()) {
      setError("Please enter a goal.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setTasks(null);

    try {
      const generatedTasks = await generatePlan(goal);
      setTasks(generatedTasks);
    } catch (err) {
      console.error(err);
      setError("Failed to generate a plan. The model may be unable to process this request. Please try a different goal.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <GoalInputForm onGenerate={handleGeneratePlan} isLoading={isLoading} />
          {isLoading && <LoadingSpinner />}
          {error && (
            <div className="mt-8 bg-red-900/50 border border-red-600 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
              <p className="font-bold">An Error Occurred</p>
              <p>{error}</p>
            </div>
          )}
          <div className="mt-10">
            {tasks ? (
              <TaskList tasks={tasks} />
            ) : (
              !isLoading && !error && <Welcome />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
