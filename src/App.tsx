import React from 'react';
import './App.css';
import Invoice from "./components/invoice/invoice";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-center items-center">
        <img src={`${process.env.PUBLIC_URL}/assets/tuaide-icon.webp`} alt="Icon" className="h-10 w-10" />
        <span className="ml-4 text-lg roboto-semibold">INVOICE</span>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <Invoice />
    </div>
  );
};

export default App;
