import { useEffect, useState, useRef } from 'react';
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

   function removeTimer(index) {
      setClocks((prev) => prev.filter((_, i) => i !== index));
   }

   return (
      <div className="App">
         <div className="add">
            <input ref={inputRef} type="text" placeholder="Time (seconds)" />
            <button onClick={addClock}>Add</button>
         </div>
         <div className="clock-container">
            {clocks.map((time, i) => (
               <div key={i} className="timer-card">
                  <RadialTimer duration={time} />
                  <svg
                     onClick={() => {
                        removeTimer(i);
                     }}
                     className="cross"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 640 640"
                  >
                     <path
                        fill="#ffffff"
                        d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"
                     />
                  </svg>
               </div>
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
         handleReset();
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
   );
};

export default App;
