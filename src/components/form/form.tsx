import React, { useState } from 'react';

const Form: React.FC = () => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');

  const handleBankNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankName(e.target.value);
  };

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value
      .replace(/\D/g, '') 
      .match(/.{1,2}/g) 
      ?.join(' '); 
    setAccountNumber(formattedValue || '');
  };

  const handleAccountHolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountHolderName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Bank Name:', bankName);
    console.log('Account Number:', accountNumber);
    console.log('Account Holder Name:', accountHolderName);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md max-w-md mx-auto">
      <div>
        <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
          Nama Bank
        </label>
        <input
          id="bankName"
          type="text"
          value={bankName}
          onChange={handleBankNameChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
          Nomor Rekening
        </label>
        <input
          id="accountNumber"
          type="text"
          value={accountNumber}
          onChange={handleAccountNumberChange}
          maxLength={14}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700">
          Nama Pemilik Perusahaan
        </label>
        <input
          id="accountHolderName"
          type="text"
          value={accountHolderName}
          onChange={handleAccountHolderNameChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Kirim
        </button>
      </div>
    </form>
  );
};

export default Form;
