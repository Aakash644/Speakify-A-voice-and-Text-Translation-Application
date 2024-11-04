import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-500 p-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-white no-underline text-xl font-bold hover:text-blue-300 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
          </svg>
          Speakify
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="text-white md:hidden focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        {/* Menu Links (Desktop) */}
        <div className="hidden md:flex space-x-4">

          <Link to="/Text_translate" className="text-white py-1.5  text-lg no-underline hover:text-yellow-300 transition duration-300 ">Translate</Link>
          <Link to="/Text_2_speech" className="text-white py-1.5  text-lg no-underline hover:text-blue-300 transition duration-300">Text_2_Speech</Link>
          <Link to="/Speech_2_text" className="text-white py-1.5   text-lg no-underline hover:text-blue-300 transition duration-300">Speech_2_Text</Link>
          <Link to="/join">
            <button className="bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300">
             Join
            </button>
          </Link>  
            </div>
      </div>

      {/* Mobile Menu (Toggle) */}
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col mt-4 space-y-2 text-center">
              <Link to="/Text_translate" onClick={toggleMenu} className="text-white  py-1.5   text-lg  no-underline hover:text-blue-300 transition duration-300">Translate</Link>
            <Link to="/Text_2_speech" onClick={toggleMenu} className="text-white  py-1.5   text-lg  no-underline  hover:text-blue-300 transition duration-300">Text_2_Speech</Link>
            <Link to="/Speech_2_text" onClick={toggleMenu} className="text-white  py-1.5   text-lg  no-underline hover:text-blue-300 transition duration-300">Speech_2_Text</Link>
            <Link to="/join">
            <button className="bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300">
             Join
            </button>
          </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
