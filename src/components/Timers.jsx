import React, { useContext, useEffect } from "react";
import useTimer from "../hooks/useTimer";
import { SettingsContext } from "../context/SettingsContext";
import "../styles/App.css";

const Timer = ({ initialTime, timerId, onTimerStop }) => {
  const { selectedAlarmSound } = useContext(SettingsContext);
  const { time, isRunning, handleStart, handleStop, handleReset } = useTimer(
    initialTime,
    timerId,
    onTimerStop
  );

  // When time reaches zero, play the selected alarm sound
  useEffect(() => {
    if (time === 0) {
      const audio = new Audio(selectedAlarmSound);
      audio.play();
    }
  }, [time, selectedAlarmSound]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <div className="timer-page">
      <p className="timer-display">{formatTime(time)}</p>
      <div className="timer-buttons">
        <button onClick={handleStart} disabled={isRunning || time === 0}>
          {isRunning ? "Running" : "Start"}
        </button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
