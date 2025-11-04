import { useRef, useState, useEffect } from "react";
import "./index.css";

function App() {
  const data = [
    {
      heading: "what is bookmark",
      content:
        "content in bookmark Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nihil molestias quibusdam iste eos iure distinctio, nostrum illum dolor consectetur. Veritatis quisquam distinctio natus inventore molestias non, explicabo dolores quide",
    },
    {
      heading: "what is watermark",
      content:
        "content in watermarkin watermarkinLorem ipsum dolor sit amet consectetur adipisicing elit. Rem nihil molestias quibusdam iste eos iure distinctio, nostrum illum dolor consectetur. Veritatis quisquam distinctio natus inventore molestias non, explicabo dolores quidem.",
    },
    {
      heading: "h3",
      content:
        "content in h3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nihil molestias quibusdam iste eos iure distinctio, nostrum illum dolor consectetur. Veritatis quisquam distinctio natus inventore molestias non, explicabo dolores quidem.",
    },
    {
      heading: "h4",
      content:
        "content in h4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nihil molestias quibusdam iste eos iure distinctio, nostrum illum dolor consectetur. Veritatis quisquam distinctio natus inventore molestias non, explicabo dolores quidem.",
    },
  ];

  return (
    <>
      <div className="rounded border border-amber-200 text-gray-100">
        {data.map((data, i) => (
          <Item {...data} key={i} />
        ))}
      </div>
      <div className="mx-auto mt-10 text-center">Click anywhere to close</div>
    </>
  );
}

function Item({ heading, content }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  function toggleOpen() {
    setOpen(!open);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      // console.log(ref.current, e.target);
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Detect clicks outside to close
  return (
    <div ref={ref} className="relative mx-auto w-1/2">
      <div
        className="m-2 flex cursor-pointer items-center justify-between border p-2 text-lg font-medium"
        onClick={toggleOpen}
      >
        <div className="text-2xl">{heading}</div>
        <svg
          className={`mr-1 h-5 w-5 transform text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/*  Content with transition and blur on close */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "blur-0 max-h-40 opacity-100" : "max-h-0 opacity-0 blur-sm"
        }`}
      >
        <div className="p-2">{content}</div>
      </div>
    </div>
  );
}

export default App;
