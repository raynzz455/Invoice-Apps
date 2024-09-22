import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

interface InvoiceDetail {
  folder_name: string;
  invoice_date: string;
}

const Home: React.FC = () => {
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetail[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      const { data, error } = await supabase
        .from('invoice_details')
        .select('folder_name, invoice_date');

      if (error) {
        console.error('Error fetching invoice details:', error);
      } else {
        setInvoiceDetails(data);
      }
    };

    fetchInvoiceDetails();
  }, []);

  const handleInvoiceClick = (folderName: string) => {
    navigate('/invoice', { state: { folderName } }); 
  };

  return (
    <div className="home">
      <div className="bg-white w-full h-full">
        <div className="mx-auto mt-1 w-[800px] h-[100vh]">
          <div className="w-full h-[80px] flex items-center">
            <button
              onClick={() => navigate('/form')}
              className="roboto-bold text-sm p-2 ml-3 mt-3 rounded-lg text-black bg-white border border-black relative shadow-[5px_5px_0px_black] transition-transform hover:translate-x-1 hover:translate-y-1"
            >
              + New Invoice
            </button>
          </div>
          <div className="grid grid-cols-4 gap-5 py-5 p-3 border-4 border-black h-full rounded-xl mt-5">
            {invoiceDetails.map((invoice, index) => (
              <div
                key={index}
                className="w-[180px] h-[200px] p-5 rounded-lg bg-white border-4 border-black cursor-pointer relative shadow-[5px_5px_0px_black] transition-transform hover:translate-x-1 hover:translate-y-1"
                onClick={() => handleInvoiceClick(invoice.folder_name)} // Mengirimkan data saat diklik
              >
                <div className="border-b-2 pb-2 mb-2 border-black">
                  <p className="roboto-bold text-xl text-center text-black">
                    {invoice.folder_name}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="roboto-regular text-md text-black">Date:</p>
                  <p className="roboto-bold text-lg text-black">{invoice.invoice_date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
