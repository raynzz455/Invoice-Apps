import React from 'react';

const Invoice: React.FC = () => {
  return (
    <div className="w-[695px] h-[983px] justify-center mx-auto border">
      <div className="w-full h-auto relative">
        {/* Logo T-Tuaide */}
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
          <div className="w-full space-y-5 text-xs">
            <p>Jln. Wijaya Kusuma <br/>No. 11 Komp IPB <br/> Sindang Barang 1<br/>Bogor 16117</p>
            <p>+62857.7123.1888</p>
            <p>tuai.ide@gmail.com</p>
            <div className="space-y-0.5 roboto-bold">
              <p>Rekening Pembayaran</p>
              <p>BSI</p>
              <p>25 01 88 60 06</p>
              <p>CV Tuai Dimensi Kreasi</p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mb-6">  
            <h1 className="text-[0.8rem] roboto-bold text-gray-500">Ditujukan kepada Yth:</h1>
            <p className="uppercase text-[0.9rem] roboto-bold text-gray-500">pt. techpack asia</p>
            <p className="text-xs text-gray-500">Jl. Raya Karangawen KM 18 DEMAK 59566</p>
          </div>

          <div className="mb-6">
            <h1 className="text-[0.8rem] roboto-bold text-gray-500">Jenis Pekerjaan</h1>
            <p className="text-xs text-gray-500">Digital Marketing Albea Indonesia</p>
          </div>

          <div className="mb-6">
            <p className="text-xs text-gray-500 "><span className="text-[0.8rem] roboto-bold mr-1">No Invoice:</span> 01/Albea/0724</p>
            <p className="text-xs text-gray-500"><span className="text-[0.8rem] roboto-bold mr-1">Tanggal:</span> 15 July 2024</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-gray-200 border-x">
              <thead className="bg-[#faa92e]">
                <tr className="text-center text-white text-[0.7rem] roboto-bold">
                  <th className="p-1 border-gray-200 border-x">Keterangan</th>
                  <th className="p-1 border-gray-200 border-x">Quantity</th>
                  <th className="p-1 border-gray-200 border-x">Harga (Rp)</th>
                  <th className="p-1 border-gray-200 border-x">Total Harga (Rp)</th>
                </tr>
              </thead>
              <tbody>
                <tr  className="text-[0.7rem]">
                  <td className="px-2 border-b border-gray-200 text-left roboto-medium flex flex-col">
                    <p>NvmePre - 20 GB - IIX -</p><p className="text-[0.65rem]">albea.group.id</p><p>(09/07/2024-08/07/2025)</p></td>
                  <td className="py-2 px-4 border-b border-gray-200 text-center border-x border-dotted">1</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-center border-x border-dotted">1.800.000</td>
                  <td className="py-2 px-1 border-b border-gray-200 text-right border-x border-dotted">IDR 1.800.000,00</td>
                </tr>
                <tr  className="text-[0.7rem]">
                  <td className="py-1 px-4 border-gray-200 border-l"></td>
                  <td className="py-1 px-4 border-b border-gray-200 border-x border-dotted"></td>
                  <td className="py-1 px-4 border-b border-gray-200 border-x border-dotted text-left">Subtotal</td>
                  <td className="py-1 px-1 border-b border-gray-200 border-x border-dotted text-right">IDR 1.800.000,00</td>
                </tr>
                <tr className="text-[0.7rem] border-y border-black">
                  <td className="py-1 px-4 border-gray-200 border-l"></td>
                  <td className="py-1 px-4 border-b border-gray-200 border-x border-dotted"></td>
                  <td className="py-1 px-4 border-b border-gray-200 border-x border-dotted text-left">Total</td>
                  <td className="py-1 px-1 border-b border-gray-200 border-x border-dotted text-right">IDR 1.800.000,00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="roboto-bold text-gray-500 text-[0.67rem] my-1">Harga Helum Termasuk Pajak</p>
          <p className="roboto-reguler text-gray-500 text-[0.58rem] ">Demikian invoice ini kami sampaikan, semoga kerjasama ini terjalin baik dan berkesinambungan.<br/>Atas perhatiannya kami ucapkan terima kasih.</p>
          <p className="roboto-reguler text-gray-500 text-[0.58rem] my-10 text-top mt-8">Dengan Hormat</p>
          <div className="w-[160px] h-[90px] border roboto-reguler text-gray-500 text-[0.58rem]">            
            <img src={`${process.env.PUBLIC_URL}/assets/`} alt="Tanda Tangan" className="w-full h-full" />
            <p className="mt-10">Nama</p>
            <p className="mx-1">(Jabatan)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
