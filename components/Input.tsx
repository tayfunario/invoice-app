import { useState, useEffect } from "react";

function Input() {
  const [show, setShow] = useState<boolean>(false);
  const [chosen, setChosen] = useState<string>("Net 30 days");

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#input-wrapper")) {
        setShow(false);
      }
      if ((e.target as HTMLElement).id === "payment-terms-label") {
        setShow(true);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleChosen = (value: string) => {
    setChosen(value);
    setShow(false);
  };

  return (
    <div id="input-wrapper" className="relative">
      <button
        className="flex justify-between items-center w-full h-10 font-bold px-3 rounded-md border border-lightGray hover:border-customPurple"
        onClick={() => setShow(!show)}
      >
        <span>{chosen}</span>
        <img src="/icon-arrow-down.svg" />
      </button>

      {show && (
        <div className="absolute top-14 w-full divide-y-2 bg-white custom-shadow-2 rounded-md">
          <button
            className="block w-full pl-5 py-[10px] text-start font-bold hover:text-customPurple"
            onClick={() => handleChosen("Net 1 day")}
          >
            Net 1 day
          </button>
          <button
            className="block w-full pl-5 py-[10px] text-start font-bold hover:text-customPurple"
            onClick={() => handleChosen("Net 7 days")}
          >
            Net 7 days
          </button>
          <button
            className="block w-full pl-5 py-[10px] text-start font-bold hover:text-customPurple"
            onClick={() => handleChosen("Net 14 days")}
          >
            Net 14 days
          </button>
          <button
            className="block w-full pl-5 py-[10px] text-start font-bold hover:text-customPurple"
            onClick={() => handleChosen("Net 30 days")}
          >
            Net 30 days
          </button>
        </div>
      )}
    </div>
  );
}

export default Input;
