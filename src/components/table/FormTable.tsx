import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

interface Product {
  description: string;
  company: string;
  tanggal_dimulai: string;
  tanggal_berakhir: string; 
  quantity: number;
  price: number;
  folder_name: string; 
}

const formatCurrency = (value: number, showDecimals: boolean = false): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(value);
};

const parseCurrency = (value: string): number => {
  return parseFloat(value.replace(/[^0-9]/g, '')) || 0;
};

const FormTable: React.FC<{ folderName: string }> = ({ folderName }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      description: '',
      company: '',
      tanggal_dimulai: '',
      tanggal_berakhir: '', 
      quantity: 1,
      price: 0,
      folder_name: folderName, 
    },
  ]);

  const handleProductChange = (index: number, key: keyof Omit<Product, 'folder_name'>, value: any) => {
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
        tanggal_dimulai: '',
        tanggal_berakhir: '',
        quantity: 1,
        price: 0,
        folder_name: folderName, 
      },
    ]);
  };

  const deleteProduct = (index: number) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let valid = true;
    products.forEach((product, index) => {
      if (new Date(product.tanggal_berakhir) < new Date(product.tanggal_dimulai)) { 
        valid = false;
        alert(`Error: Tanggal Berakhir cannot be earlier than Tanggal Dimulai for product ${index + 1}`);
      }
    });

    if (valid) {
      try {
        const { error } = await supabase.from('table_invoice').insert(products);
        if (error) {
          alert('Failed to submit data: ' + error.message);
        } else {
          alert('Data successfully submitted!');
          setProducts([
            {
              description: '',
              company: '',
              tanggal_dimulai: '',
              tanggal_berakhir: '', 
              quantity: 1,
              price: 0,
              folder_name: folderName, 
            },
          ]);
        }
      } catch (err) {
        if (err instanceof Error) {
          alert('Error: ' + err.message);
        } else {
          alert('An unknown error occurred');
        }
      }
    }
  };

  const total = products.reduce((total, product) => total + product.quantity * product.price, 0);
  const topProducts = products.slice(0, 2);
  const subtotal = topProducts.reduce((subtotal, product) => subtotal + product.quantity * product.price, 0);

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-[50vw]">
      <table className="min-w-full bg-white border-gray-200 border-x">
        <thead className="bg-[#faa92e]">
          <tr className="text-center text-white text-[0.7rem] roboto-bold">
            <th className="p-1 border-gray-200 border-x">Keterangan</th>
            <th className="p-1 border-gray-200 border-x">Quantity</th>
            <th className="p-1 border-gray-200 border-x">Harga (Rp)</th>
            <th className="p-1 border-gray-200 border-x">Total Harga (Rp)</th>
            <th className="p-1 border-gray-200 border-x">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="text-[0.7rem]">
              <td className="px-2 py-2 border-b border-gray-200 text-left roboto-medium flex flex-col space-y-2">
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
                  type="date"
                  value={product.tanggal_dimulai}
                  onChange={(e) => handleProductChange(index, 'tanggal_dimulai', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md mt-1"
                  placeholder='Tanggal Dimulai'
                />
                <input
                  type="date"
                  value={product.tanggal_berakhir} 
                  onChange={(e) => handleProductChange(index, 'tanggal_berakhir', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md mt-1"
                  placeholder='Tanggal Berakhir'
                />
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-center border-x border-dotted roboto-reguler">
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleProductChange(index, 'quantity', Number(e.target.value))}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md"
                  placeholder='Jumlah'
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
              <td className="py-2 px-4 border-b border-gray-200 text-center border-x border-dotted roboto-reguler">
                <button
                  type="button"
                  onClick={() => deleteProduct(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
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
            <td className="py-1 px-4 border-gray-200 border-r"></td>
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
            <td className="py-1 px-4 border-gray-200 border-r"></td>
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        onClick={addProduct}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Add Product
      </button>
      <button
        type="submit"
        className="mt-4 ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
      >
        Submit
      </button>
    </form>
  );
};

export default FormTable;
