import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './invoice.css';

interface InvoiceDetails {
  bank_name: string;
  account_number: string;
  account_holder_name: string;
  recipient_name: string;
  address: string;
  job_description: string;
  invoice_number: string;
  invoice_date: string;
}

interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  price: number;
}

interface InvoiceTProps {
  folderName: string;
}

const Invoice: React.FC<InvoiceTProps> = ({ folderName }) => {
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails | null>(null);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [signature, setSignature] = useState<string | null>(null);
  
  const [nama, setNama] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoiceData = async () => {
      const { data: detailsData, error: detailsError } = await supabase
        .from('invoice_details')
        .select('*')
        .eq('folder_name', folderName)
        .single();

      if (detailsError) {
        console.error('Error fetching invoice details:', detailsError);
      } else {
        setInvoiceDetails(detailsData);
      }

      const { data: itemsData, error: itemsError } = await supabase
        .from('table_invoice')
        .select('*')
        .eq('folder_name', folderName);

      if (itemsError) {
        console.error('Error fetching invoice items:', itemsError);
      } else {
        setInvoiceItems(itemsData);
      }
    };

    fetchInvoiceData();
  }, [folderName]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignature(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateInputs = () => {
    if (!nama || !jabatan || !signature) {
      setError('Nama, Jabatan, dan Tanda Tangan harus diisi.');
      return false;
    }
    setError('');
    return true;
  }; 
  const exportToPDF = () => {
    if (!validateInputs()) return;
    const invoiceElement = document.getElementById('invoice');
    const contentLeftElement = document.querySelector('.content-left') as HTMLElement;
    const h1Element = document.querySelector('.header-left h1') as HTMLElement;
    const thElements = document.querySelectorAll('th');
    thElements.forEach(th => {
      th.style.paddingTop = '0'; 
      th.style.paddingBottom = '12px'; 
    });
  
    const tdElements = document.querySelectorAll('td');
    tdElements.forEach(td => {
      if (td.classList.contains('text-left')) {
        td.style.paddingBottom = '8px'; 
      }
    });
  
    if (contentLeftElement) {
      contentLeftElement.style.paddingTop = '0'; 
    }
    if (h1Element) {
      h1Element.style.paddingBottom = '10px'; 
    }
  
    if (invoiceElement) {
      html2canvas(invoiceElement, { scale: 4 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('portrait', 'mm', 'a4');
        const imgWidth = 210; 
        const pageHeight = pdf.internal.pageSize.height; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width; 
        let heightLeft = imgHeight;
        let position = 0;
  
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save('invoice.pdf');
        thElements.forEach(th => {
          th.style.paddingTop = '';
          th.style.paddingBottom = '';
        });
        tdElements.forEach(td => {
          if (td.classList.contains('text-left')) {
            td.style.paddingBottom = '';
          }
        });
        if (contentLeftElement) {
          contentLeftElement.style.paddingTop = '';
        }
        if (h1Element) {
          h1Element.style.paddingBottom = ''; 
        }
      });
    }
  };
  
  const exportToImage = () => {
    if (!validateInputs()) return;
    const invoiceElement = document.getElementById('invoice');
    const contentLeftElement = document.querySelector('.content-left') as HTMLElement;
    const h1Element = document.querySelector('.header-left h1') as HTMLElement;
    const thElements = document.querySelectorAll('th');
    thElements.forEach(th => {
      th.style.paddingTop = '0'; 
      th.style.paddingBottom = '12px'; 
    });
  
    const tdElements = document.querySelectorAll('td');
    tdElements.forEach(td => {
      if (td.classList.contains('text-left')) {
        td.style.paddingBottom = '8px'; 
      }
    });
  
    if (contentLeftElement) {
      contentLeftElement.style.paddingTop = '0'; 
    }
    if (h1Element) {
      h1Element.style.paddingBottom = '10px'; 
    }
  
    if (invoiceElement) {
      html2canvas(invoiceElement, { scale: 4 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'invoice.png';
        link.click();
        thElements.forEach(th => {
          th.style.paddingTop = '';
          th.style.paddingBottom = '';
        });
        tdElements.forEach(td => {
          if (td.classList.contains('text-left')) {
            td.style.paddingBottom = '';
          }
        });
        if (contentLeftElement) {
          contentLeftElement.style.paddingTop = ''; 
        }
        if (h1Element) {
          h1Element.style.paddingBottom = ''; 
        }
      });
    }
  };
  

  if (!invoiceDetails) {
    return <p>Loading...</p>;
  }

  const totalPrices = invoiceItems.map(item => item.price * item.quantity);
  const totalAmount = totalPrices.reduce((total, price) => total + price, 0);
  const subtotal =
    totalPrices.length > 2
      ? Math.max(totalPrices[0], totalPrices[1])
      : totalPrices.length === 2
      ? totalPrices[0]
      : totalPrices[0] || 0;

  return (
    <div className='w-auto h-full'>
      <div className="flex w-[695px] mx-auto mb-5 space-x-2 mt-10">
        <button 
          onClick={exportToPDF}
          className="p-2 bg-[#1ddaf3] text-black rounded border roboto-bold border-black shadow-[3px_3px_0px_black] transition-transform hover:translate-x-1 hover:translate-y-1">
          Download PDF
        </button>
        <button 
          onClick={exportToImage}
          className="p-2 bg-[#d3f320] text-black rounded border roboto-bold border-black shadow-[3px_3px_0px_black] transition-transform hover:translate-x-1 hover:translate-y-1">
          Download Image
        </button>
        
      </div>
      <div className='w-[695px] mx-auto mb-5 mt-10 flex flex-row space-x-4'>
        <input
          type="text"
          placeholder="Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className={`mt-1 w-full bg-transparent border rounded border-black shadow-[5px_5px_0px_black] p-2 focus:scale-105 focus:outline-none transition-all duration-300 ease-in-out justify-left max-w-[200px] ${!nama && error ? 'border-red-500 shadow-[5px_5px_0px_red]' : ''}`}
        />
        <input
          type="text"
          placeholder="Jabatan"
          value={jabatan}
          onChange={(e) => setJabatan(e.target.value)}
          className={`mt-1 w-full bg-transparent border rounded border-black shadow-[5px_5px_0px_black] p-2 focus:scale-105 focus:outline-none transition-all duration-300 ease-in-out justify-left max-w-[200px] ${!jabatan && error ? 'border-red-500 shadow-[5px_5px_0px_red]' : ''}`}
        />
        
        <input
          id="signatureInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={`mt-1 w-full bg-transparent border rounded border-black shadow-[5px_5px_0px_black] p-2 focus:scale-105 focus:outline-none transition-all duration-300 ease-in-out justify-left max-w-[200px] ${!signature && error ? 'border-red-500 shadow-[5px_5px_0px_red]' : ''}`}
          placeholder='Tanda Tangan' 
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>

      <div className="w-[794px] h-[1123px] background-images justify-center mx-auto" id="invoice">
        <div className="main w-full h-full pt-[160px] px-[80px] space-x-2 flex">
          <div className="content-left w-[215px] text-[#50723e] ml-5 pt-[10px]">
            <div className="header-left mb-6 w-full">
              <h1 className="uppercase text-4xl roboto-bold">Invoice</h1>
              <p className="uppercase text-[0.73rem] roboto-bold">CV. Tuai Dimensi Kreasi</p>
            </div>
            <div className="w-full text-xs roboto-reguler">
              <p>Jln. Wijaya Kusuma <br/> No. 11 Komp IPB <br/> Sindang Barang 1<br/> Bogor 16117</p>
              <p className='my-8'>+62857.7123.1888</p>
              <p>tuai.ide@gmail.com</p>
              <div className="space-y-0.5 roboto-bold mt-5">
                <p>Rekening Pembayaran</p> 
                <p>{invoiceDetails.bank_name}</p> 
                <p>{invoiceDetails.account_number}</p> 
                <p>{invoiceDetails.account_holder_name}</p> 
              </div>
            </div>
          </div>

          <div className="content-right w-full pt-[10px]">
            <div className="mb-6 ">  
              <h1 className="text-[0.8rem] roboto-bold text-gray-500">Ditujukan kepada Yth:</h1>
              <p className="uppercase text-[0.85rem] roboto-bold text-gray-500">{invoiceDetails.recipient_name}</p> 
              <p className="text-xs text-gray-500 roboto-reguler">{invoiceDetails.address}</p> 
            </div>

            <div className="mb-6">
              <h1 className="text-[0.8rem] roboto-bold text-gray-500">Jenis Pekerjaan</h1>
              <p className="text-xs text-gray-500 roboto-reguler">{invoiceDetails.job_description}</p>
            </div>

            <div className="mb-6">
              <p className="text-xs text-gray-500 ">
                <span className="text-[0.8rem] roboto-bold mr-1">No Invoice:</span> {invoiceDetails.invoice_number}
              </p> 
              <p className="text-xs text-gray-500">
                <span className="text-[0.8rem] roboto-bold mr-1">Tanggal:</span> {new Date(invoiceDetails.invoice_date).toLocaleDateString()}
              </p> 
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white border-gray-200 border-x">
                <thead className="bg-[#faa92e] p-0">
                  <tr className="text-center text-white text-[0.78rem] roboto-bold p-0">
                    <th className="px-1 py-1.5 border-gray-200 border-x">Keterangan</th>
                    <th className="px-1 py-1.5 border-gray-200 border-x">Quantity</th>
                    <th className="px-1 py-1.5 border-gray-200 border-x">Harga (Rp)</th>
                    <th className="px-1 py-1.5 border-gray-200 border-x">Total Harga (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceItems.map(item => {
                    const itemTotalPrice = item.price * item.quantity;
                    return (
                      <tr key={item.id} className="content-table">
                        <td className="px-1 border-b border-gray-200 text-left roboto-reguler whitespace-pre">
                          {item.description}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-center border-x border-dotted roboto-reguler">{item.quantity}</td>
                        <td className="py-2 px-4 border-b border-gray-200 text-center border-x border-dotted roboto-reguler">{item.price.toLocaleString()}</td>
                        <td className="py-2 px-1 border-b border-gray-200 text-right border-x border-dotted roboto-reguler">IDR {itemTotalPrice.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                  <tr className="text-[0.7rem]">
                    <td className="py-1 px-4 border-gray-200 border-l"></td>
                    <td className="py-1 px-4 border-b border-gray-200 border-x border-dotted"></td>
                    <td className="py-1 px-1 border-b border-gray-200 border-x border-dotted text-left roboto-reguler">Subtotal</td>
                    <td className="py-1 px-1 border-b border-gray-200 border-x border-dotted text-right roboto-reguler">IDR {subtotal.toLocaleString()}</td>
                  </tr>
                  <tr className="text-[0.7rem] border-y border-black">
                    <td className="py-1 px-4 border-gray-200 border-l"></td>
                    <td className="py-1 px-4 border-gray-200 border-x border-dotted"></td>
                    <td className="py-1 px-1 border-gray-200 border-x border-dotted text-left roboto-reguler">Total</td>
                    <td className="py-1 px-1 border-gray-200 border-x border-dotted text-right roboto-reguler">IDR {totalAmount.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="roboto-bold text-gray-500 text-[0.67rem] my-1">Harga Helum Termasuk Pajak</p>
            <p className="roboto-reguler text-gray-500 text-[0.58rem] mt-6">
              Demikian invoice ini kami sampaikan, semoga kerjasama ini terjalin baik dan berkesinambungan.<br/>
              Atas perhatiannya kami ucapkan terima kasih.
            </p>
            <p className="roboto-reguler text-gray-500 text-[0.58rem] mb-6 mt-8">Dengan Hormat</p>
            <div className="w-[160px] h-[90px] roboto-reguler text-gray-500 text-[0.58rem]">
            {signature ? (
              <img 
                src={signature} 
                alt="Tanda Tangan" 
                className="w-full h-full cursor-pointer" 
                onClick={() => document.getElementById('signatureInput')?.click()} 
              />
            ) : (
              <p className="cursor-pointer" onClick={() => document.getElementById('signatureInput')?.click()}>
                Tanda Tangan Belum Diunggah
              </p>
            )}
            
            <p>{nama}</p>
            <p>{jabatan}</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Invoice;
