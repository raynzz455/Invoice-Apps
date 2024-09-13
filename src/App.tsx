import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Invoice from './components/invoice/invoice';
import FormPage from './pages/FormPage';
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
            <Route path="/" element={<div>Welcome</div>} />
            <Route path="/form" element={<FormPage />} /> {/* Updated to render FormPage */}
            <Route path="/invoice" element={<Invoice />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
