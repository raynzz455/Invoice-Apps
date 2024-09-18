import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();
  
    const handleButtonClick = () => {
      navigate('/form');
    };
  
    return (
      <div className="home">
        <div className="bg-white w-full h-full">
          <div className="mx-auto mt-1 bg-gray-500 w-[800px] h-[100vh]">
            <div className="w-full h-[80px]">
              <button
                onClick={handleButtonClick}
                className="roboto-bold text-sm p-2 ml-3 mt-3 rounded-2xl text-white bg-[#f28928]"
              >
                + New Invoice
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="w-[250px] bg-orange-300 h-[180px]">
                <p className="roboto-reguler text-xl text-center my-20">Invoice Pt Techparck</p>
              </div>
              <div className="w-[250px] bg-orange-300 h-[180px]">
                <p className="roboto-reguler text-xl text-center my-20">Invoice Pt Techparck</p>
              </div>
              <div className="w-[250px] bg-orange-300 h-[180px]">
                <p className="roboto-reguler text-xl text-center my-20">Invoice Pt Techparck</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;
  