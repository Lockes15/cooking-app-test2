import React, { useState, useEffect, useContext } from 'react';
import { TimerContext } from '../context/TimerContext';
import Timer from '../components/Timers';

const CustomTimers = () => {
  const { timers, setTimers } = useContext(TimerContext);
  const [customName, setCustomName] = useState('');
  const [customTime, setCustomTime] = useState('');
  const [customInstructions, setCustomInstructions] = useState('');

  // Filter to show only user-created custom timers.
  const customTimers = timers.filter((timer) => timer.custom);

  // Persist custom timers to localStorage
  useEffect(() => {
    localStorage.setItem('customTimers', JSON.stringify(customTimers));
  }, [customTimers]);

  const handleAddTimer = (e) => {
    e.preventDefault();
    const newTimer = {
      name: customName,
      time: parseInt(customTime, 10) * 60, // Convert minutes to seconds
      instructions: customInstructions,
      custom: true,
    };
    const newId = Date.now(); // unique ID using timestamp
    const timerWithId = { ...newTimer, id: newId };
    setTimers((prevTimers) => [...prevTimers, timerWithId]);

    // Clear form inputs after adding
    setCustomName('');
    setCustomTime('');
    setCustomInstructions('');
  };

  const handleDeleteTimer = (id) => {
    const updatedTimers = timers.filter((timer) => timer.id !== id);
    setTimers(updatedTimers);
  };

  return (
    <div className="custom-timers-container">
      <h1>Custom Timers</h1>
      <form onSubmit={handleAddTimer} className="custom-timer-form">
        <input
          type="text"
          name="name"
          placeholder="Enter timer name"
          required
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
        />
        <input
          type="number"
          name="time"
          placeholder="Enter time in minutes"
          required
          value={customTime}
          onChange={(e) => setCustomTime(e.target.value)}
        />
        <input
          type="text"
          name="instructions"
          placeholder="Enter instructions"
          required
          value={customInstructions}
          onChange={(e) => setCustomInstructions(e.target.value)}
        />
        <button type="submit">Add Timer</button>
      </form>
      
      <div className="custom-timers-list">
        {customTimers.map((timer) => (
          <div key={timer.id} className="timer-card">
            <h2>{timer.name}</h2>
            <p>Time: {timer.time / 60} minutes</p>
            <p>Instructions: {timer.instructions}</p>
            {/* Render each timer's Timer component independently */}
            <Timer
              initialTime={timer.time}
              timerId={timer.id}
              onTimerStop={() => console.log(`Timer ${timer.id} stopped`)}
            />
            <button onClick={() => handleDeleteTimer(timer.id)}>Delete</button>
          </div>
        ))}
      </div>

      <style jsx>{`
        .custom-timers-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .custom-timer-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        .custom-timers-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .timer-card {
          background-color: #fff;
          padding: 25px;
          border-radius: 5px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .timer-card:hover {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          transform: translateY(-5px);
        }
        .timer-card h2 {
          margin: 0 0 10px;
        }
        .timer-card p {
          margin: 5px 0;
        }
        button {
          margin-top: 10px;
          padding: 12px 18px;
          border: none;
          border-radius: 3px;
          background-color: #0070f3;
          color: #fff;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default CustomTimers;
