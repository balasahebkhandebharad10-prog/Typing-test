
import React, { useMemo } from 'react';
import useTypingGame, { State } from '../hooks/useTypingGame';
import Results from './Results';
import { RefreshIcon } from './Icons';

const TypingTest: React.FC = () => {
  const {
    state,
    paragraph,
    typed,
    timeRemaining,
    stats,
    handleKeyDown,
    startGame,
    resetGame,
  } = useTypingGame(60);

  const words = useMemo(() => paragraph.split(''), [paragraph]);

  return (
    <div className="relative p-6 sm:p-8 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl shadow-lg border border-slate-200 dark:border-slate-700/50">
      {state !== State.Finished && (
         <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-lg font-medium text-slate-600 dark:text-slate-300">
          <p>WPM: <span className="text-sky-500 font-semibold">{stats.wpm}</span></p>
          <p>CPM: <span className="text-sky-500 font-semibold">{stats.cpm}</span></p>
          <p>Accuracy: <span className="text-sky-500 font-semibold">{stats.accuracy}%</span></p>
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700/50 border-4 border-slate-200 dark:border-slate-600">
            <span className="text-3xl font-bold text-slate-800 dark:text-slate-100">{timeRemaining}</span>
          </div>
        </div>
      )}

      <div
        className="text-2xl md:text-3xl leading-relaxed tracking-wide font-mono text-slate-500 dark:text-slate-400 mb-8 select-none"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {words.map((char, index) => {
          const typedChar = typed[index];
          let charClass = '';
          if (typedChar === char) {
            charClass = 'text-green-600 dark:text-green-400';
          } else if (typedChar) {
            charClass = 'text-red-600 dark:text-red-400 bg-red-200/50 dark:bg-red-800/50 rounded-sm';
          }
          const isCursor = index === typed.length;
          return (
            <span key={index} className={`${charClass} relative`}>
              {isCursor && (
                 <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-sky-500 animate-pulse"></span>
              )}
              {char}
            </span>
          );
        })}
      </div>

      {state === State.Waiting && (
        <div className="text-center">
          <button
            onClick={startGame}
            className="px-8 py-4 text-xl font-bold text-white bg-sky-500 rounded-lg shadow-lg hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-700 transform hover:-translate-y-1 transition-all duration-300 animate-pulse hover:animate-none"
          >
            Start Test
          </button>
        </div>
      )}

      {state === State.Finished && (
        <Results stats={stats} resetTest={resetGame} />
      )}
      
      {(state === State.Running || state === State.Finished) && (
        <button
          onClick={resetGame}
          className="absolute top-4 right-4 p-2 text-slate-500 dark:text-slate-400 bg-slate-200/50 dark:bg-slate-700/50 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-300"
          aria-label="Restart test"
        >
          <RefreshIcon />
        </button>
      )}
    </div>
  );
};

export default TypingTest;
