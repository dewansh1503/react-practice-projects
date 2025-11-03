import { useState } from "react";
import "./index.css";
import { useEffect } from "react";
import { useCallback } from "react";

function App() {
  // side bar app with manula and automatic closing and opening
  const [open, setOpen] = useState(window.innerWidth >= 640);
  const [manual, setManual] = useState(false);

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    if (!manual)
      if (width >= 640) {
        setOpen(true);
      } else {
        setOpen(false);
      }
  }, [manual]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <>
      <div className="relative mt-20 w-fit">
        <div
          className="ml-2 flex w-fit items-center justify-center rounded bg-amber-50"
          onClick={() => {
            setManual((prev) => !prev);
            setOpen((prev) => !prev);
          }}
        >
          {open ? (
            <img
              src="https://files.svgcdn.io/zondicons/close.svg"
              alt="close"
              width={40}
            />
          ) : (
            <img
              src="https://files.svgcdn.io/formkit/open.svg"
              alt="open"
              width={35}
            />
          )}
        </div>

        <div
          className={`w-0 space-y-2 bg-amber-700 p-5 opacity-0 duration-200 ${open && "w-3xs opacity-100"}`}
        >
          <div className="rounded bg-blue-100 p-1">one</div>
          <div className="rounded bg-blue-200 p-1">two</div>
          <div className="rounded bg-blue-300 p-1">three</div>
          <div className="rounded bg-blue-500 p-1">four</div>
        </div>
      </div>
    </>
  );
}

export default App;
