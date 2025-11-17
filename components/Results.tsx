
import React from 'react';
import AdPlaceholder from './AdPlaceholder';
import { RefreshIcon } from './Icons';

interface ResultsProps {
  stats: {
    wpm: number;
    cpm: number;
    accuracy: number;
  };
  resetTest: () => void;
}

const Results: React.FC<ResultsProps> = ({ stats, resetTest }) => {
  const { wpm, cpm, accuracy } = stats;

  return (
    <div className="text-center bg-slate-100 dark:bg-slate-700/50 p-8 rounded-lg animate-fade-in">
      <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">Test Complete!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white/70 dark:bg-slate-800/70 rounded-lg shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">WPM</p>
          <p className="text-4xl font-bold text-sky-500">{wpm}</p>
        </div>
        <div className="p-4 bg-white/70 dark:bg-slate-800/70 rounded-lg shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">CPM</p>
          <p className="text-4xl font-bold text-sky-500">{cpm}</p>
        </div>
        <div className="p-4 bg-white/70 dark:bg-slate-800/70 rounded-lg shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">Accuracy</p>
          <p className="text-4xl font-bold text-sky-500">{accuracy}%</p>
        </div>
      </div>

      <div className="my-8">
        <AdPlaceholder width="w-full" height="h-48" text="In-Content Ad" />
      </div>

      <button
        onClick={resetTest}
        className="flex items-center justify-center gap-2 mx-auto px-6 py-3 font-semibold text-white bg-sky-500 rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-700 transition-all duration-300"
      >
        <RefreshIcon />
        Try Again
      </button>
    </div>
  );
};

export default Results;
