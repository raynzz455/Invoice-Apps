// Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <img src={`${process.env.PUBLIC_URL}/assets/tuaide-icon.webp`} alt="Icon" className="h-10 w-10" />
        <span className="ml-4 text-lg roboto-semibold">INVOICE</span>
        <div className="space-x-4">
          <Link to="/" className="text-blue-500 hover:underline">/</Link>
          <Link to="/form" className="text-blue-500 hover:underline">Form</Link>
          <Link to="/invoice" className="text-blue-500 hover:underline">Invoice</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
