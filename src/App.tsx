// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Invoice from './components/invoice/invoice';
import FormPage from './pages/formPage/FormPage';
import Home from './pages/home/home'
import Navbar from './components/navbar/navbar';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/form" element={<FormPage />} />
            <Route path="/invoice" element={<Invoice />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
