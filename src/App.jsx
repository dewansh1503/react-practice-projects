import React, { useEffect, useState, useRef } from 'react';
import './app.css';

function App() {
   const [clocks, setClocks] = useState([60]); // in seconds
   const inputRef = useRef(null);

   function addClock() {
      if (isNaN(inputRef.current.value) || inputRef.current.value === '') {
         alert('Enter a number');
         inputRef.current.select();
      } else {
         setClocks([...clocks, parseInt(inputRef.current.value)]);
      }
   }

   return (
      <div className="App">
         <div className="add">
            <input ref={inputRef} type="text" placeholder="Time (seconds)" />
            <button onClick={addClock}>Add</button>
         </div>
         <div className="clock-container">
            {clocks.map((time, i) => (
               <RadialTimer key={i} duration={time} />
            ))}
         </div>
      </div>
   );
}

const RadialTimer = ({ duration }) => {
   const [timeLeft, setTimeLeft] = useState(duration); // seconds
   const [isPaused, setIsPaused] = useState(true);

   const pauseTimeRef = useRef(null);
   const startTimeRef = useRef(null);
   const requestRef = useRef(null);

   const radius = 90;
   const circumference = 2 * Math.PI * radius;

   const formatTime = (seconds) => {
      const min = String(Math.floor(seconds / 60)).padStart(2, '0');
      const sec = String(Math.floor(seconds % 60)).padStart(2, '0');
      const ms = seconds.toFixed(2).split('.')[1];
      return `${min}:${sec}:${ms}`;
   };

   // Animate smoothly
   const animate = (timestamp) => {
      if (!startTimeRef.current) {
         startTimeRef.current = timestamp;
      }

      const elapsed = (timestamp - startTimeRef.current) / 1000;
      const timeRemaining = Math.max(duration - elapsed, 0);
      setTimeLeft(timeRemaining);

      if (timeRemaining > 0 && !isPaused)
         requestRef.current = requestAnimationFrame(animate);
      else {
         cancelAnimationFrame(requestRef.current);
      }
   };

   useEffect(() => {
      if (!isPaused) requestRef.current = requestAnimationFrame(animate);
      return () => {
         cancelAnimationFrame(requestRef.current);
      };
   }, [isPaused]);

   function handlePause() {
      if (isPaused) {
         // resume
         if (pauseTimeRef.current) {
            // shifting the start time forward by the pause duration
            const pauseDuration = performance.now() - pauseTimeRef.current;
            startTimeRef.current += pauseDuration;
         }
      } else {
         // pause
         pauseTimeRef.current = performance.now();
      }
      setIsPaused(!isPaused);
   }

   function handleReset() {
      cancelAnimationFrame(requestRef.current);
      setTimeLeft(duration);
      setIsPaused(true);
      pauseTimeRef.current = null;
      requestRef.current = null;
      startTimeRef.current = null;
   }

   const progress = (timeLeft / duration) * 100;

   return (
      <div className="timer-card">
         <div className="timer-container">
            <svg className="progress-ring">
               {/* Background circle */}
               <circle
                  className="progress-ring__circle__bg"
                  stroke="#2c3e50"
                  strokeWidth="10"
                  fill="transparent"
                  r={radius}
                  cx="100"
                  cy="100"
               />
               {/* Animated circle */}
               <circle
                  className="progress-ring__circle"
                  stroke="#3498db"
                  strokeWidth="10"
                  fill="transparent"
                  r={radius}
                  cx="100"
                  cy="100"
                  style={{
                     strokeDasharray: circumference,
                     strokeDashoffset: circumference * (1 - progress / 100),
                  }}
               />
            </svg>

            <div className="time-text">{formatTime(timeLeft)}</div>

            <div className="btn-container">
               <button onClick={handlePause}>
                  {isPaused ? 'Start' : 'Pause'}
               </button>
               {duration !== timeLeft && (
                  <button onClick={handleReset}> Reset </button>
               )}
            </div>
         </div>
      </div>
   );
};

export default App;
