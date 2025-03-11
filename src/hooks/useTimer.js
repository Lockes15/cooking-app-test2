import { useState, useEffect, useRef } from "react";

const useTimer = (initialTime, timerId, onTimerStop, keyPrefix = "timer") => {
  // Read saved values from localStorage (or fallback to defaults)
  const [time, setTime] = useState(() => {
    const saved = localStorage.getItem(`${keyPrefix}-${timerId}-time`);
    return saved !== null ? parseInt(saved, 10) : initialTime;
  });
  const [isRunning, setIsRunning] = useState(() => {
    const saved = localStorage.getItem(`${keyPrefix}-${timerId}-isRunning`);
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [startTime, setStartTime] = useState(() => {
    const saved = localStorage.getItem(`${keyPrefix}-${timerId}-startTime`);
    return saved !== null ? parseInt(saved, 10) : null;
  });

  const intervalRef = useRef(null);

  // Persist changes to localStorage
  useEffect(() => {
    localStorage.setItem(`${keyPrefix}-${timerId}-time`, time);
    localStorage.setItem(`${keyPrefix}-${timerId}-isRunning`, isRunning);
    localStorage.setItem(`${keyPrefix}-${timerId}-startTime`, startTime);
  }, [time, isRunning, startTime, timerId, keyPrefix]);

  // When the timer is running, calculate elapsed time and update accordingly
  useEffect(() => {
    if (isRunning) {
      // Ensure startTime is set (if not, initialize it)
      if (!startTime) {
        setStartTime(Date.now() - ((initialTime - time) * 1000));
        return;
      }

      // Recalculate time based on elapsed time
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      const updatedTime = Math.max(initialTime - elapsed, 0);
      setTime(updatedTime);

      // If time has run out, stop timer and fire callback if provided
      if (updatedTime <= 0) {
        setIsRunning(false);
        clearInterval(intervalRef.current);
        if (onTimerStop) onTimerStop(timerId);
        return;
      }

      // Set up an interval to count down every second
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newTime = Math.max(prevTime - 1, 0);
          if (newTime <= 0) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            if (onTimerStop) onTimerStop(timerId);
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, startTime, initialTime, onTimerStop, timerId]);

  // Handlers to start, stop, and reset the timer
  const handleStart = () => {
    if (!isRunning && time > 0) {
      setIsRunning(true);
      setStartTime(Date.now() - ((initialTime - time) * 1000));
    }
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTime(initialTime);
    setIsRunning(false);
    setStartTime(null);
  };

  return { time, isRunning, handleStart, handleStop, handleReset };
};

export default useTimer;
