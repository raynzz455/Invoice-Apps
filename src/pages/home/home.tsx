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

  const handleDeleteInvoice = async (folderName: string) => {
    const { error } = await supabase
      .from('invoice_details')
      .delete()
      .eq('folder_name', folderName);

    if (error) {
      console.error('Error deleting invoice:', error);
    } else {
      setInvoiceDetails(prevDetails => 
        prevDetails.filter(invoice => invoice.folder_name !== folderName)
      );
    }
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
                className="w-[180px] h-[210px] p-5 rounded-lg bg-white border-4 border-black cursor-pointer relative shadow-[5px_5px_0px_black] transition-transform hover:translate-x-1 hover:translate-y-1"
                onClick={() => handleInvoiceClick(invoice.folder_name)} 
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
                <div 
                  className="absolute bottom-1 right-1 hover:scale-125 transition-transform  ease-in-out"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleDeleteInvoice(invoice.folder_name);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
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
