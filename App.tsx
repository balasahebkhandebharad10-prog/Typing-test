
import React, { useState, useEffect, useCallback } from 'react';
import TypingTest from './components/TypingTest';
import AdPlaceholder from './components/AdPlaceholder';
import { SunIcon, MoonIcon, GithubIcon } from './components/Icons';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 p-4 sm:p-6 md:p-8 flex flex-col">
      <header className="w-full max-w-7xl mx-auto mb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">SpeedTyper</h1>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
              <GithubIcon />
            </a>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-slate-300/70 dark:hover:bg-slate-700/70 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
        <AdPlaceholder width="w-full" height="h-[100px] md:h-[90px]" text="Header Ad (728x90 / 320x100)" />
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-3/4 flex-grow">
          <TypingTest />
        </div>
        <aside className="w-full md:w-1/4">
          <AdPlaceholder width="w-full" height="h-full min-h-[250px] md:min-h-[600px]" text="Sidebar Ad" />
        </aside>
      </main>

      <footer className="w-full max-w-7xl mx-auto mt-8 pt-4 border-t border-slate-200 dark:border-slate-700 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>&copy; {new Date().getFullYear()} SpeedTyper. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-sky-500 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-sky-500 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-sky-500 transition-colors">Disclaimer</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
