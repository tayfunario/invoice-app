function Header() {
  return (
    <header className="flex justify-between items-center bg-black2">
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
          <img src="icon-moon.svg" alt="moon svg" />
        </div>
        <div className="grid place-items-center px-5">
          <img
            src="image-avatar.jpg"
            className="w-10 h-10 rounded-full"
            alt="avatar"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
