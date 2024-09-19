import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


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
  company: string;
  tanggal_dimulai: string;
  tanggal_berakhir: string;
}

interface InvoiceTProps {
  folderName: string;
}

const Invoice: React.FC<InvoiceTProps> = ({ folderName }) => {
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails | null>(null);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [signature, setSignature] = useState<string | null>(null);

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

  const handleDownload = async (format: 'pdf' | 'img') => {
    const invoiceElement = document.getElementById('invoice');
    if (!invoiceElement) return;

    const body = document.body;
    body.style.overflow = 'hidden'; 
    const canvas = await html2canvas(invoiceElement, { scale: 5, useCORS: true });
    const imgData = canvas.toDataURL('image/png');

    if (format === 'pdf') {
      const pdf = new jsPDF('portrait', 'pt', [695, 983]);
      const imgWidth = 695;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('invoice.pdf');
    } else if (format === 'img') {
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'invoice.png';
      link.click();
    }

    body.style.overflow = '';
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
      <div className="flex space-x-2 mt-10">
        <button 
          onClick={() => handleDownload('pdf')} 
          className="p-2 bg-blue-500 text-white rounded"
        >
          Download PDF
        </button>
        <button 
          onClick={() => handleDownload('img')} 
          className="p-2 bg-green-500 text-white rounded"
        >
          Download Image
        </button>
      </div>
      <div className="w-[695px] h-[983px] justify-center mx-auto bg-white" id="invoice">
        <div className="w-full h-auto relative">
          <div className="w-[234.6px] h-[369.6px] absolute opacity-40">
            <img src={`${process.env.PUBLIC_URL}/assets/t-logo.png`} alt="Icon" className="w-full h-full" />
          </div>
          <div className="w-full">
            <div className="w-[172.5px] h-[186.9px] justify-right top-0 right-0 absolute">
              <img src={`${process.env.PUBLIC_URL}/assets/tuaide.png`} alt="Icon" className="w-full h-full" />
            </div>
          </div>
        </div>

        <div className="w-full h-full pt-[15vh] pl-[4.5vw] pr-[3.5vw] space-x-3 flex">
          <div className="w-[215px] text-[#50723e] ml-4">
            <div className="mb-8 w-full">
              <h1 className="uppercase text-4xl roboto-bold">invoice</h1>
              <p className="uppercase text-[0.73rem] roboto-bold">cv. tuai dimensi kreasi</p>
            </div>
            <div className="w-full space-y-5 text-xs roboto-reguler">
              <p>Jln. Wijaya Kusuma <br/>No. 11 Komp IPB <br/> Sindang Barang 1<br/>Bogor 16117</p>
              <p>+62857.7123.1888</p>
              <p>tuai.ide@gmail.com</p>
              <div className="space-y-0.5 roboto-bold">
                <p>Rekening Pembayaran</p> 
                <p>{invoiceDetails.bank_name}</p> 
                <p>{invoiceDetails.account_number}</p> 
                <p>{invoiceDetails.account_holder_name}</p> 
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="mb-6">  
              <h1 className="text-[0.8rem] roboto-bold text-gray-500">Ditujukan kepada Yth:</h1>
              <p className="uppercase text-[0.9rem] roboto-bold text-gray-500">{invoiceDetails.recipient_name}</p> 
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
                <thead className="bg-[#faa92e]">
                  <tr className="text-center text-white text-[0.7rem] roboto-bold">
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
                      <tr key={item.id} className="text-[0.7rem]">
                        <td className="px-1 border-b border-gray-200 text-left roboto-medium flex flex-col">
                          <p>{item.description}</p>
                          <p className="text-[0.65rem]">{item.company}</p>
                          <p>({new Date(item.tanggal_dimulai).toLocaleDateString()}-{new Date(item.tanggal_berakhir).toLocaleDateString()})</p>
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
                    <td className="py-1 px-4 border-b border-gray-200 border-x border-dotted text-left roboto-reguler">Subtotal</td>
                    <td className="py-1 px-1 border-b border-gray-200 border-x border-dotted text-right roboto-reguler">IDR {subtotal.toLocaleString()}</td>
                  </tr>
                  <tr className="text-[0.7rem] border-y border-black">
                    <td className="py-1 px-4 border-gray-200 border-l"></td>
                    <td className="py-1 px-4 border-gray-200 border-x border-dotted"></td>
                    <td className="py-1 px-4 border-gray-200 border-x border-dotted text-left roboto-reguler">Total</td>
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
                <p className="cursor-pointer" onClick={() => document.getElementById('signatureInput')?.click()}>Tanda Tangan Belum Diunggah</p>
              )}
  
              <input
                id="signatureInput" 
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden" 
              />
              
              <input
                type="text"
                placeholder="Nama"
                className="mt-2 w-full bg-transparent border-transparent focus:border-transparent focus:outline-none"
              />
              
              <input
                type="text"
                placeholder="(Jabatan)"
                className="mt-1 w-full bg-transparent border-transparent focus:border-transparent focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
