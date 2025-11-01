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
  return (
    <>
      <div>
        {input.map((input, i) => (
          <InputBox key={i} setInput={setInput} value={input} index={i} />
        ))}
      </div>
    </>
  );
}
export default App;
