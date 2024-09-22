import React from 'react';

const Convert = () => {
  return (
    <div className='w-auto h-full'>
      <div className="w-[695px] h-[983px] background-images justify-center mx-auto bg-white" id="invoice">
        <div className="w-full h-full pt-[15vh] pl-[4.5vw] pr-[3.5vw] space-x-3 flex">
          <div className="w-[215px] text-[#50723e] ml-4">
            <div className="my-6 mt-0 p-0 w-full">
              <h1 className="uppercase text-4xl roboto-bold mt-0 p-0">Invoice</h1>
              <p className="uppercase text-[0.73rem] roboto-bold">CV. Tuai Dimensi Kreasi</p>
            </div>
            <div className="w-full space-y-5 text-xs roboto-reguler">
              <p>Jln. Wijaya Kusuma <br /> No. 11 Komp IPB <br /> Sindang Barang 1<br /> Bogor 16117</p>
              <p>+62857.7123.1888</p>
              <p>tuai.ide@gmail.com</p>
              <div className="space-y-0.5 roboto-bold">
                <p>Rekening Pembayaran</p> 
                <p>Nama Bank</p> 
                <p>Nomor Rekening</p> 
                <p>Nama Pemegang Rekening</p> 
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="mb-6">  
              <h1 className="text-[0.8rem] roboto-bold text-gray-500">Ditujukan kepada Yth:</h1>
              <p className="uppercase text-[0.9rem] roboto-bold text-gray-500">Nama Penerima</p> 
              <p className="text-xs text-gray-500 roboto-reguler">Alamat Penerima</p> 
            </div>

            <div className="mb-6">
              <h1 className="text-[0.8rem] roboto-bold text-gray-500">Jenis Pekerjaan</h1>
              <p className="text-xs text-gray-500 roboto-reguler">Deskripsi Pekerjaan</p>
            </div>

            <div className="mb-6">
              <p className="text-xs text-gray-500 ">
                <span className="text-[0.8rem] roboto-bold mr-1">No Invoice:</span> INV-123456
              </p> 
              <p className="text-xs text-gray-500">
                <span className="text-[0.8rem] roboto-bold mr-1">Tanggal:</span> 21/09/2024
              </p> 
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white border-gray-200 border-x">
                <thead className="bg-[#faa92e] p-0">
                  <tr className="text-center text-white text-[0.78rem] roboto-bold p-0">
                    <th className="px-1 pb-1.5 border-gray-200 border-x">Keterangan</th>
                    <th className="px-1 pb-1.5 border-gray-200 border-x">Quantity</th>
                    <th className="px-1 pb-1.5 border-gray-200 border-x">Harga (Rp)</th>
                    <th className="px-1 pb-1.5 border-gray-200 border-x">Total Harga (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-[0.7rem]">
                    <td className="px-1 border-b border-gray-200 text-left roboto-medium flex flex-col">
                      <p>Deskripsi Item</p>
                      <p className="text-[0.65rem]">Nama Perusahaan</p>
                      <p>(Tanggal Dimulai - Tanggal Berakhir)</p>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-center border-x border-dotted roboto-reguler">1</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-center border-x border-dotted roboto-reguler">100,000</td>
                    <td className="py-2 px-1 border-b border-gray-200 text-right border-x border-dotted roboto-reguler">IDR 100,000</td>
                  </tr>
                  <tr className="text-[0.7rem]">
                    <td className="py-1 px-4 border-gray-200 border-l"></td>
                    <td className="py-1 px-4 border-b border-gray-200 border-x border-dotted"></td>
                    <td className="py-1 px-4 border-b border-gray-200 border-x border-dotted text-left roboto-reguler">Subtotal</td>
                    <td className="py-1 px-1 border-b border-gray-200 border-x border-dotted text-right roboto-reguler">IDR 100,000</td>
                  </tr>
                  <tr className="text-[0.7rem] border-y border-black">
                    <td className="py-1 px-4 border-gray-200 border-l"></td>
                    <td className="py-1 px-4 border-gray-200 border-x border-dotted"></td>
                    <td className="py-1 px-4 border-gray-200 border-x border-dotted text-left roboto-reguler">Total</td>
                    <td className="py-1 px-1 border-gray-200 border-x border-dotted text-right roboto-reguler">IDR 100,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="roboto-bold text-gray-500 text-[0.67rem] my-1">Harga Belum Termasuk Pajak</p>
            <p className="roboto-reguler text-gray-500 text-[0.58rem] mt-6">
              Demikian invoice ini kami sampaikan, semoga kerjasama ini terjalin baik dan berkesinambungan.<br/>
              Atas perhatiannya kami ucapkan terima kasih.
            </p>
            <p className="roboto-reguler text-gray-500 text-[0.58rem] mb-6 mt-8">Dengan Hormat</p>
            <div className="w-[160px] h-[90px] roboto-reguler text-gray-500 text-[0.58rem]">    
              <img src="" alt='tandatangan ' className='w-[160px] h-[90px]' />     
              <p className="mt-2 w-full">nama</p>
              <p className="mt-2 w-full">(jabatan)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Convert;
