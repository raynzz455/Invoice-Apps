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
    <nav className="bg-white shadow-md w-full">
      <div className='bg-gray-300 w-[800px] mx-auto'>
        <div className="mx-auto px-4 py-2 flex justify-between items-center relative">

          <div className='flex-row flex items-center'>
            <div className='w-[78px] h-[39px]'>
              <img src={`${process.env.PUBLIC_URL}/assets/tuaide-icon.png`} alt="Icon" className="h-full w-full" />
            </div>
            <span className="text-lg roboto-medium p-2 mt-2 border border-vlack">INVOICE</span>
          </div>
          
          <div className='flex flex-col relative ml-auto'> {/* Tambahkan ml-auto */}
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
