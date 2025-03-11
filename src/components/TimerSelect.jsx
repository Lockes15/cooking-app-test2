import { useState, useEffect } from 'react';
import '../styles/App.css';
import Timer from './Timers';
import presetTimersData from '../data/presetTimersData'; // Import presetTimersData

const TimerSelect = () => {
  // Use presetTimersData directly here and try to load a saved timer
  const [selectedTimer, setSelectedTimer] = useState(() => {
    const savedTimerId = localStorage.getItem('selectedTimerId');
    return savedTimerId ? presetTimersData.find(t => t.id === parseInt(savedTimerId)) : null;
  });

  useEffect(() => {
    if (!selectedTimer && Array.isArray(presetTimersData) && presetTimersData.length > 0) {
      setSelectedTimer(presetTimersData[0]); // Default to first timer if none selected
    }
  }, [selectedTimer]);

  useEffect(() => {
    console.log('Selected timer ID:', selectedTimer?.id);
  }, [selectedTimer]);

  return (
    <>
      {Array.isArray(presetTimersData) && presetTimersData.length > 0 ? (
        presetTimersData.map(timer => (
          <div key={timer.id} className="timerSelect">
            <h2 onClick={() => setSelectedTimer(prev => prev?.id === timer.id ? null : timer)}>
              {timer.name}
            </h2>
            <p>{timer.instructions}</p>
            {timer.tools && <p>Tools: {timer.tools.join(', ')}</p>}
            {selectedTimer?.id === timer.id && (
              <div>
                <Timer initialTime={timer.time} timerId={timer.id} />
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No timers available.</p>
      )}

      <style jsx>{`
        .timerSelect {
          background-color: #fff;
          margin: 10px 0;
          padding: 25px;
          border-radius: 5px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .timerSelect:hover {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          transform: translateY(-5px);
        }
      `}</style>
    </>
  );
};

export default TimerSelect;
