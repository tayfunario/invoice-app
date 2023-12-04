import Image from "next/image";
import { useState } from "react";
import { useWindowSize } from "./useWindowSize";

function Header() {
  const { windowSize } = useWindowSize();
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return windowSize.width > 1280 ? (
    <header className="fixed h-screen flex flex-col justify-between w-[72px] bg-[#373B53] dark:bg-dark rounded-e-2xl">
      <div className="relative grid place-items-center w-[72px] h-[72px] bg-customPurple rounded-r-2xl overflow-hidden">
        <svg
          width="28"
          height="28"
          className="z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="13" cy="13" r="13" fill="white" />
          <polygon points="7,0 21,0 13,15" fill="#7C5DFA" />{" "}
        </svg>
        <div className="absolute bottom-0 right-0 w-full h-8 rounded-tl-full bg-customPurple2" />
      </div>
      <div className="flex flex-col justify-between h-[72px] mb-5 divide-x divide-[#494E6E]">
        <div className="grid place-items-center">
          {darkMode ? (
            <Image
              src="/icon-sun.svg"
              alt="moon svg"
              width="20"
              height="20"
              className="cursor-pointer"
              onClick={() => {
                document.documentElement.classList.toggle("dark");
                setDarkMode(!darkMode);
              }}
            />
          ) : (
            <Image
              src="/icon-moon.svg"
              alt="moon svg"
              width="20"
              height="20"
              className="cursor-pointer"
              onClick={() => {
                document.documentElement.classList.toggle("dark");
                setDarkMode(!darkMode);
              }}
            />
          )}
        </div>
        <div className="grid place-items-center border-t pt-2">
          <Image
            src="/image-avatar.jpg"
            className="w-8 h-8 rounded-full"
            alt="avatar"
            width={40}
            height={40}
          />
        </div>
      </div>
    </header>
  ) : (
    <header className="flex justify-between items-center bg-[#373B53] dark:bg-dark">
      <div className="relative grid place-items-center w-[72px] h-[72px] bg-customPurple rounded-r-2xl overflow-hidden">
        <svg
          width="28"
          height="28"
          className="z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="13" cy="13" r="13" fill="white" />
          <polygon points="7,0 21,0 13,15" fill="#7C5DFA" />{" "}
        </svg>
        <div className="absolute bottom-0 right-0 w-full h-8 rounded-tl-full bg-customPurple2" />
      </div>
      <div className="flex h-[72px] divide-x divide-[#494E6E]">
        <div className="grid place-items-center px-5">
          {darkMode ? (
            <Image
              src="/icon-sun.svg"
              alt="moon svg"
              width="20"
              height="20"
              className="cursor-pointer"
              onClick={() => {
                document.documentElement.classList.toggle("dark");
                setDarkMode(!darkMode);
              }}
            />
          ) : (
            <Image
              src="/icon-moon.svg"
              alt="moon svg"
              width="20"
              height="20"
              className="cursor-pointer"
              onClick={() => {
                document.documentElement.classList.toggle("dark");
                setDarkMode(!darkMode);
              }}
            />
          )}
        </div>
        <div className="grid place-items-center px-5">
          <Image
            src="/image-avatar.jpg"
            className="w-8 h-8 rounded-full"
            alt="avatar"
            width={40}
            height={40}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
