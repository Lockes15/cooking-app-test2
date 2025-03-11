import React, { createContext, useState, useEffect } from 'react';
import presetTimersData from '../data/presetTimersData'; // Import your presetTimersData

const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  // Set initial timers state: first check localStorage, then fallback to presetTimersData
  const [timers, setTimers] = useState(() => {
    const savedTimers = localStorage.getItem('timers');
    try {
      // If there are saved timers, use them, otherwise fall back to presetTimersData
      return savedTimers ? JSON.parse(savedTimers) : presetTimersData;
    } catch (error) {
      console.error("Error parsing timers from localStorage:", error);
      return presetTimersData; // Fallback to preset data if there's an error
    }
  });

  useEffect(() => {
    // Save timers to localStorage whenever timers state changes
    localStorage.setItem('timers', JSON.stringify(timers));
  }, [timers]);

  const updateTimer = (timerId, newTime, isRunning) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === timerId ? { ...timer, time: newTime, isRunning } : timer
      )
    );
  };

  console.log("Timers in context:", timers); // For debugging

  return (
    <TimerContext.Provider value={{ timers, setTimers, updateTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export { TimerContext, TimerProvider };
