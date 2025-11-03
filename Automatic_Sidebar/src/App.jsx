import { useState } from "react";
import "./index.css";
import { useEffect } from "react";
import { useCallback } from "react";

function App() {
  // Sidebar automatically opens when width > 640 and closes when width < 640
  // we can toggle the auto close and open by clicking the icon
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
          className={`fixed w-0 space-y-2 overflow-hidden bg-amber-700 p-5 opacity-0 duration-200 ${open && "w-3xs opacity-100"}`}
        >
          <div className="rounded bg-blue-100 p-1">one</div>
          <div className="rounded bg-blue-200 p-1">two</div>
          <div className="rounded bg-blue-300 p-1">three</div>
          <div className="rounded bg-blue-500 p-1">four</div>
        </div>
        {/* <AnotherSidebar/> */}
        content on the main page
      </div>
    </>
  );
}

const AnotherSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex h-screen bg-gray-100 font-sans">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 rounded bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-700"
      >
        {isOpen ? "Close Menu" : "Open Menu"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 transform bg-gray-800 p-6 text-white transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} `}
      >
        <h2 className="mb-6 text-2xl font-bold">Sidebar Menu</h2>
        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-gray-300">🏠 Home</li>
          <li className="cursor-pointer hover:text-gray-300">📄 About</li>
          <li className="cursor-pointer hover:text-gray-300">📞 Contact</li>
        </ul>
      </div>

      {/* Main Content */}
      <main
        className={`flex-1 p-8 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-0"
        }`}
      >
        <h1 className="mb-4 text-3xl font-bold">Welcome!</h1>
        <p className="text-gray-700">
          This is your main page content. Click the button to toggle the
          sidebar.
        </p>
      </main>
    </div>
  );
};

export default App;
