import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const toggleDropdown = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 100); // Sesuaikan dengan durasi transisi
    } else {
      setIsOpen(true);
    }
  };

  return (
    <nav className="w-full">
      <div className='w-[800px] mx-auto'>
        <div className="mx-auto px-4 py-2 flex justify-between items-center relative">

          <div className='flex-row flex items-center'>
            <div className='w-[78px] h-[39px]'>
              <img src={`${process.env.PUBLIC_URL}/assets/tuaide-icon.png`} alt="Icon" className="h-full w-full" />
            </div>
            <span className="ml-2 text-lg roboto-medium px-1 py-1 mt-2 border border-black rounded-lg shadow-[5px_5px_0px_black] transition-transform hover:translate-x-1 hover:translate-y-1 ">INVOICE</span>
          </div>
          
          <div className='flex flex-col relative ml-auto border p-1'> {/* Tambahkan ml-auto */}
            <div 
              className={`burger-icon ${isOpen ? 'open' : ''}`} 
              onClick={toggleDropdown}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ul className={`nav-dropdown ${isOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`}>
              <li>
                <Link to="/" className="text-blue-500 hover:underline">Home</Link>
              </li>
              <li>
                <Link to="/form" className="text-blue-500 hover:underline">Form</Link>
              </li>
              <li>
                <Link to="/invoice" className="text-blue-500 hover:underline">Invoice</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
