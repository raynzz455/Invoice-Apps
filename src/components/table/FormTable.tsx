import React, { useState } from 'react';

interface Product {
  description: string;
  company: string;
  startDate: string;
  endDate: string;
  quantity: number;
  price: number;
}

const formatCurrency = (value: number, showDecimals: boolean = false): string => {
  // Format currency with or without decimal places based on the showDecimals flag
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR', 
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(value);
};

const parseCurrency = (value: string): number => {
  // Remove non-numeric characters except for commas
  return parseFloat(value.replace(/[^0-9]/g, '')) || 0;
};

const FormTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      description: '',
      company: '',
      startDate: '',
      endDate: '',
      quantity: 1,
      price: 0,
    },
  ]);

  const handleProductChange = (index: number, key: keyof Product, value: any) => {
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], [key]: value };
    setProducts(newProducts);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        description: '',
        company: '',
        startDate: '',
        endDate: '',
        quantity: 1,
        price: 0,
      },
    ]);
  };

  const calculateTotalPrice = () => {
    return products.reduce((total, product) => total + product.quantity * product.price, 0);
  };

  const calculateSubtotal = () => {
    const totalPrices = products.map(p => p.quantity * p.price);
    return totalPrices.length > 1 ? totalPrices.slice(0, 2).reduce((sum, price) => sum + price, 0) : totalPrices[0] || 0;
  };

  const total = calculateTotalPrice();
  const subtotal = calculateSubtotal();

  return (
    <div className="mx-auto max-w-[50vw]">
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
          {products.map((product, index) => (
            <tr key={index} className="text-[0.7rem]">
              <td className="px-2 border-b border-gray-200 text-left roboto-medium flex flex-col">
                <input
                  type="text"
                  value={product.description}
                  onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                  placeholder="Keterangan Produk"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  value={product.company}
                  onChange={(e) => handleProductChange(index, 'company', e.target.value)}
                  placeholder="Perusahaan Produk"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md mt-1"
                />
                <input
                  type="text"
                  value={product.startDate}
                  onChange={(e) => handleProductChange(index, 'startDate', e.target.value)}
                  placeholder="Tanggal Awal"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md mt-1"
                />
                <input
                  type="text"
                  value={product.endDate}
                  onChange={(e) => handleProductChange(index, 'endDate', e.target.value)}
                  placeholder="Tanggal Akhir"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md mt-1"
                />
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-center border-x border-dotted roboto-reguler">
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleProductChange(index, 'quantity', Number(e.target.value))}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md"
                />
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-center border-x border-dotted roboto-reguler">
                <input
                  type="text"
                  value={formatCurrency(product.price)}
                  onChange={(e) => handleProductChange(index, 'price', parseCurrency(e.target.value))}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md"
                  placeholder="Harga (IDR)"
                />
              </td>
              <td className="py-2 px-1 border-b border-gray-200 text-right border-x border-dotted roboto-reguler">
                {formatCurrency(product.quantity * product.price)}
              </td>
            </tr>
          ))}
          <tr className="text-[0.7rem]">
            <td className="py-1 px-4 border-gray-200 border-l"></td>
            <td className="py-1 px-4 border-b border-gray-200 border-x border-dotted"></td>
            <td className="py-1 px-4 border-b border-gray-200 border-x border-dotted text-left roboto-reguler">
              Subtotal
            </td>
            <td className="py-1 px-1 border-b border-gray-200 border-x border-dotted text-right roboto-reguler">
              {formatCurrency(subtotal, true)}
            </td>
          </tr>
          <tr className="text-[0.7rem] border-y border-black">
            <td className="py-1 px-4 border-gray-200 border-l"></td>
            <td className="py-1 px-4 border-b border-gray-200 border-x border-dotted"></td>
            <td className="py-1 px-4 border-b border-gray-200 border-x border-dotted text-left roboto-reguler">
              Total
            </td>
            <td className="py-1 px-1 border-b border-gray-200 border-x border-dotted text-right roboto-reguler">
              {formatCurrency(total, true)}
            </td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={addProduct}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Product
      </button>
    </div>
  );
};

export default FormTable;
