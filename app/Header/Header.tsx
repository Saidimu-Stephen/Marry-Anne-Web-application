/** @format */
"use client"; // Indicates that this file will be run on the client-side

import React, { useEffect } from "react";
import { useState } from "react";
import UserProfile from "@/app/Components/userProfile";
import { useRouter } from "next/router"; // Importing the useRouter hook from Next.js

function Header() {
  const [isOpen, setIsOpen] = useState(false); // State variable to manage the open/close state of the mobile menu

   

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Function to toggle the menu state
  };
  const handleMouseEnter = () => {
    setIsOpen(true); // Function to handle mouse enter event on mobile menu
  };
  const handleMouseLeave = () => {
    setIsOpen(false); // Function to handle mouse leave event on mobile menu
  };
  const handleTouchStart = () => {
    console.log("Touch started");
    setIsOpen(true); // Function to handle touch start event on mobile menu
  };

  const handleTouchEnd = () => {
    console.log("Touch ended");
    setIsOpen(false); // Function to handle touch end event on mobile menu
  };

  const handleScroll = () => {
    setIsOpen(false); // Function to handle scrolling event and close the menu
  };

  // This effect runs whenever userData changes

  useEffect(() => {
    // Effect hook to add event listener for scrolling and remove it on component unmount
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className='bg-blue-300 p-4 text-white'>
      {/* ... */}

      <div className='container mx-auto'>
        <nav className='flex justify-between items-center'>
          <div>
            <a href='/'>
              <h1
                className='text-4xl md:text-3xl sm:text-2xl 
                font-bold text-transparent bg-gradient-to-r
                from-red-500 via-yellow-500
                to-blue-500 bg-clip-text animate-glitter cursor-pointer'>
                SherryHomes
              </h1>
            </a>
          </div>

          {/* Hamburger icon */}
          <div className='block lg:hidden'>
            <button
              onClick={toggleMenu}
              className='flex items-center px-3 py-2 border rounded text-white border-white focus:outline-none'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M2 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM3 9a1 1 0 100 2h14a1 1 0 100-2H3zM4 13a1 1 0 011-1h11a1 1 0 110 2H5a1 1 0 01-1-1z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>

          {/* Desktop navigation */}
          <ul className='hidden lg:flex space-x-4'>
            <li>
              <a href='/' className='hover:underline'>
                Home
              </a>
            </li>
            <li>
              <a href='/about' className='hover:underline'>
                About
              </a>
            </li>
            <li>
              <a href='/services' className='hover:underline'>
                Services
              </a>
            </li>
            <li>
              <a href='/contact' className='hover:underline'>
                Contact
              </a>
            </li>

            <li>
              <UserProfile />
            </li>
          </ul>
        </nav>

        {/* Mobile dropdown menu */}
        {isOpen && (
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className='lg:hidden absolute top-4 right-4 bg-slate-400 w-20 p-2'>
            <div className='text-right'>
              <ul className='block border-t border-white pt-4'>
                <li>
                  <a href='/' className='block py-2 hover:bg-gray-200'>
                    Home
                  </a>
                </li>
                <li>
                  <a href='/about' className='block py-2 hover:bg-gray-200'>
                    About
                  </a>
                </li>
                <li>
                  <a href='/services' className='block py-2 hover:bg-gray-200'>
                    Services
                  </a>
                </li>
                <li>
                  <a href='/contact' className='block py-2 hover:bg-gray-200'>
                    Contact
                  </a>
                </li>

                <li>
                  <h1>Stephen saidimu</h1>
                </li>
              </ul>
            </div>
          </div>
        )}

        <div></div>
      </div>

      {/* ... */}
    </header>
  );
}

export default Header;