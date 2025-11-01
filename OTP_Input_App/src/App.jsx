import { useRef } from "react";
import { useState } from "react";

function App() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-3">
        <h1 className="text-2xl font-semibold">Otp box</h1>
        <OtpInput />
      </div>
    </>
  );
}

function OtpInput() {
  const [input, setInput] = useState(Array(6).fill(""));
  const inputRef = useRef([]);

  function checkBeforeInput(e) {
    // if input is not a digit dont let the user input
    if (/\D/.test(e.data)) e.preventDefault();
  }

  function handleChange(e, index) {
    const newValue = e.target.value;
    setInput((prev) =>
      prev.map((value, i) => (i === index ? newValue : value)),
    );
  }

  function handleKeyDown(e, i) {
    console.log(e);
  }
  return (
    <>
      <div>
        {input.map((value, i) => (
          <input
            type="text"
            key={i}
            inputMode="numeric"
            maxLength={1}
            value={value}
            ref={(el) => (inputRef.current[i] = el)}
            onBeforeInput={checkBeforeInput}
            onChange={(e) => {
              handleChange(e, i);
            }}
            onKeyDown={(e) => {
              handleKeyDown(e, i);
            }}
            className="mx-0.5 w-7 rounded border p-2 focus:outline-none"
          />
        ))}
      </div>
    </>
  );
}

export default App;
