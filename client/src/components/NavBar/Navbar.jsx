import React, { useState } from "react";

const Navbar = () => {
  const [hidden, setHidden] = useState(true);
  const handleBurger = () => {
    setHidden(!hidden);
  };
  return (
    <nav className="flex justify-between text-slate-500 w-screen">
      <div className="px-5 xl:px-12 py-6 flex w-full items-center">
        <a
          className="text-medium font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-600 to-indigo-700"
          href="#"
        >
          LOST
          <span className="font-heading text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-700">
            FOUND
          </span>
        </a>
        <ul className="hidden sm:flex mx-auto space-x-12 text-xs uppercase">
          <li>
            <a className="hover:text-blue duration-300 transition-all" href="#">
              About
            </a>
          </li>
          <li>
            <a className="hover:text-blue duration-300 transition-all" href="#">
              Services
            </a>
          </li>
          <li>
            <a className="hover:text-blue duration-300 transition-all" href="#">
              Why Us
            </a>
          </li>
          <li>
            <a className="hover:text-blue duration-300 transition-all" href="#">
              Contact
            </a>
          </li>
        </ul>
        <div className="hidden sm:flex items-center space-x-5 ">
          <a className="flex items-center hover:text-blue duration-300 transition-all" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover duration-300 transition-all:text-blue"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </a>
        </div>
      </div>

      <div
        className="navbar-burger self-center mr-4 sm:hidden"
        onClick={handleBurger}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 hover duration-300 transition-all:text-blue"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
      <ul
        hidden={hidden}
        className="absolute bg-white z-10 w-full top-14 right-0 p-2 rounded shadow-xl"
      >
        <li>nav</li>
        <li>nav</li>
        <li>nav</li>
      </ul>
    </nav>
  );
};

export default Navbar;
