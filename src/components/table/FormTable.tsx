import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface Product {
  description: string;
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
      quantity: 1,
      price: 0,
      folder_name: folderName,
    },
  ]);
  
  const navigate = useNavigate();

  const handleProductChange = (index: number, key: keyof Omit<Product, 'folder_name'>, value: any) => {
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], [key]: value };
    setProducts(newProducts);
  };

  const handleDescriptionKeyDown = (index: number, event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      handleProductChange(index, 'description', products[index].description + '\n'); // Add a newline
    }
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        description: '',
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
    try {
      const { error } = await supabase.from('table_invoice').insert(products);
      if (error) {
        Swal.fire('Failed', 'Failed to submit data: ' + error.message, 'error');
      } else {
        Swal.fire({
          title: 'Success!',
          text: 'Data successfully submitted!',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate('/');
        }, 1000);

        // Resetting the form after submission
        setProducts([
          {
            description: '',
            quantity: 1,
            price: 0,
            folder_name: folderName,
          },
        ]);
      }
    } catch (err) {
      Swal.fire('Error', 'An unknown error occurred', 'error');
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
              <td className="px-2 py-2 border-b border-gray-200 text-left roboto-medium">
                <textarea
                  value={product.description}
                  onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                  onKeyDown={(e) => handleDescriptionKeyDown(index, e)}
                  placeholder="Keterangan Produk"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md resize-none"
                  rows={3} // Adjust rows for initial height
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
