import React, { useState, useEffect, useCallback } from 'react';
import { PARAGRAPHS } from '../utils/paragraphs';

export enum State {
  Waiting,
  Running,
  Finished,
}

const useTypingGame = (testDuration: number) => {
  const [state, setState] = useState<State>(State.Waiting);
  const [paragraph, setParagraph] = useState('');
  const [typed, setTyped] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(testDuration);
  const [stats, setStats] = useState({ wpm: 0, cpm: 0, accuracy: 100 });
  const [totalCharsTyped, setTotalCharsTyped] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);

  const generateParagraph = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * PARAGRAPHS.length);
    setParagraph(PARAGRAPHS[randomIndex]);
  }, []);

  useEffect(() => {
    generateParagraph();
  }, [generateParagraph]);

  useEffect(() => {
    let timer: number;
    if (state === State.Running && timeRemaining > 0) {
      timer = window.setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setState(State.Finished);
    }
    return () => window.clearInterval(timer);
  }, [state, timeRemaining]);

  useEffect(() => {
    if (state === State.Running) {
      const elapsedTimeInMinutes = (testDuration - timeRemaining) / 60;
      
      if (elapsedTimeInMinutes > 0) {
        const wpm = Math.round((correctChars / 5) / elapsedTimeInMinutes);
        const cpm = Math.round(correctChars / elapsedTimeInMinutes);
        const accuracy = totalCharsTyped > 0 ? Math.round((correctChars / totalCharsTyped) * 100) : 100;

        setStats({ wpm, cpm, accuracy });
      }
    }
  }, [state, timeRemaining, correctChars, totalCharsTyped, testDuration]);

  const startGame = useCallback(() => {
    if (state === State.Waiting) {
      setState(State.Running);
    }
  }, [state]);

  const resetGame = useCallback(() => {
    setState(State.Waiting);
    setTimeRemaining(testDuration);
    setTyped('');
    setTotalCharsTyped(0);
    setCorrectChars(0);
    setStats({ wpm: 0, cpm: 0, accuracy: 100 });
    generateParagraph();
  }, [testDuration, generateParagraph]);

  // FIX: Added React import to resolve 'Cannot find namespace 'React'' for React.KeyboardEvent type.
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (state !== State.Running || e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta') {
      if(state === State.Waiting && e.key.length === 1){
        startGame();
      }
      return;
    }

    e.preventDefault();

    if (e.key === 'Backspace') {
      setTyped(prev => prev.slice(0, -1));
    } else if (e.key.length === 1) { // Check for printable characters
      if (typed.length < paragraph.length) {
        setTyped(prev => prev + e.key);
        setTotalCharsTyped(prev => prev + 1);
        if(e.key === paragraph[typed.length]){
          setCorrectChars(prev => prev + 1);
        }
      }
    }
  }, [state, typed, paragraph, startGame]);

  return { state, paragraph, typed, timeRemaining, stats, handleKeyDown, startGame, resetGame };
};

export default useTypingGame;