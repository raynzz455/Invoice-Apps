import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

interface FormProps {
  setFolderName: (name: string) => void;
  onFormSubmit?: () => void;
}

const Form: React.FC<FormProps> = ({ setFolderName, onFormSubmit }) => {
  const [folderName, setLocalFolderName] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [address, setAddress] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const errors: string[] = [];
    if (!folderName) errors.push('Folder Name is required.');
    if (!bankName) errors.push('Bank Name is required.');
    if (!accountNumber) errors.push('Account Number is required.');
    if (!accountHolderName) errors.push('Account Holder Name is required.');
    if (!recipientName) errors.push('Recipient Name is required.');
    if (!address) errors.push('Address is required.');
    if (!jobDescription) errors.push('Job Description is required.');
    if (!invoiceNumber) errors.push('Invoice Number is required.');
    if (!date) errors.push('Date is required.');

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalFolderName(value);
    setFolderName(value);
  };

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

  const handleRecipientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientName(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobDescription(e.target.value);
  };

  const handleInvoiceNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvoiceNumber(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase.from('invoice_details').insert([{
        folder_name: folderName,
        bank_name: bankName,
        account_number: accountNumber,
        account_holder_name: accountHolderName,
        recipient_name: recipientName,
        address: address,
        job_description: jobDescription,
        invoice_number: invoiceNumber,
        invoice_date: date
      }]);

      if (error) {
        setError('Failed to submit data: ' + error.message);
      } else {
        setSuccess('Data successfully submitted!');
        setFolderName(folderName);
        setLocalFolderName(folderName); 

        if (onFormSubmit) {
          setTimeout(() => {
            onFormSubmit(); 
          }, 2000); 
        }
        setIsSubmitted(true);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError('Error: ' + err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border-4 border-black rounded-md max-w-3xl mx-auto mt-10 bg-white shadow-[7px_7px_0px_black]">
      <div className="flex">
        {/* Bagian Kiri */}
        <div className="flex flex-col flex-1 pr-4">
          <div className="flex flex-col justify-start mb-6">
            <label htmlFor="folderName" className="block text-xs roboto-medium text-black">
              Folder Name
            </label>
            <input
              id="folderName"
              type="text"
              value={folderName}
              onChange={handleFolderNameChange}
              disabled={isSubmitted}
              className={`mt-1 block w-full max-w-[50%] px-3 py-2 border-2 border-black rounded-md sm:text-xs ${validationErrors.includes('Folder Name is required.') ? 'border-red-500 shadow-[2.5px_2.5px_0px_red]' : 'border-black shadow-[3px_3px_0px_black]'}`}
            />
            {validationErrors.includes('Folder Name is required.') && <p className="text-red-500 text-xs">Folder Name is required.</p>}
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col">
              <label htmlFor="bankName" className="block text-xs roboto-medium text-black">
                Nama Bank
              </label>
              <input
                id="bankName"
                type="text"
                value={bankName}
                onChange={handleBankNameChange}
                className={`mt-1 block w-full px-3 py-2 border-2 border-black rounded-md shadow-md sm:text-xs ${validationErrors.includes('Bank Name is required.') ? 'border-red-500 shadow-[2.5px_2.5px_0px_red]' : 'border-black shadow-[3px_3px_0px_black]'}`}
              />
              {validationErrors.includes('Bank Name is required.') && <p className="text-red-500 text-xs">Bank Name is required.</p>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="accountNumber" className="block text-xs roboto-medium text-black">
                Nomor Rekening
              </label>
              <input
                id="accountNumber"
                type="text"
                value={accountNumber}
                onChange={handleAccountNumberChange}
                maxLength={14}
                className={`mt-1 block w-full px-3 py-2 border-2 border-black rounded-md shadow-md sm:text-xs ${validationErrors.includes('Account Number is required.') ? 'border-red-500 shadow-[2.5px_2.5px_0px_red]' : 'border-black shadow-[3px_3px_0px_black]'}`}
              />
              {validationErrors.includes('Account Number is required.') && <p className="text-red-500 text-xs">Account Number is required.</p>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="accountHolderName" className="block text-xs roboto-medium text-black">
                Nama Pemilik Perusahaan
              </label>
              <input
                id="accountHolderName"
                type="text"
                value={accountHolderName}
                onChange={handleAccountHolderNameChange}
                className={`mt-1 block w-full px-3 py-2 border-2 border-black rounded-md shadow-md sm:text-xs ${validationErrors.includes('Account Holder Name is required.') ? 'border-red-500 shadow-[2.5px_2.5px_0px_red]' : 'border-black shadow-[3px_3px_0px_black]'}`}
              />
              {validationErrors.includes('Account Holder Name is required.') && <p className="text-red-500 text-xs">Account Holder Name is required.</p>}
            </div>
          </div>

          <div className="flex justify-start">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border-2 border-black text-md font-medium rounded-md shadow-[5px_5px_0px_black] transition-transform  text-white bg-blue-600 hover:bg-blue-700 focus:translate-x-2 focus:translate-y-2"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l4 4-4 4v-4a8 8 0 01-8-8z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </div>

        {/* Bagian Kanan */}
        <div className="flex flex-col flex-1 pl-4">
          <div className="flex flex-col mb-6">
            <label htmlFor="recipientName" className="block text-xs roboto-medium text-black">
              Ditujukan kepada Yth:
            </label>
            <input
              id="recipientName"
              type="text"
              value={recipientName}
              onChange={handleRecipientNameChange}
              className={`mt-1 block w-full px-3 py-2 border-2 border-black rounded-md shadow-md sm:text-xs ${validationErrors.includes('Recipient Name is required.') ? 'border-red-500 shadow-[2.5px_2.5px_0px_red]' : 'border-black shadow-[3px_3px_0px_black]'}`}
            />
            {validationErrors.includes('Recipient Name is required.') && <p className="text-red-500 text-xs">Recipient Name is required.</p>}
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex flex-col flex-1">
              <label htmlFor="address" className="block text-xs roboto-medium text-black">
                Alamat
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={handleAddressChange}
                className={`mt-1 block w-full px-3 py-2 border-2 border-black rounded-md shadow-md sm:text-xs ${validationErrors.includes('Address is required.') ? 'border-red-500 shadow-[2.5px_2.5px_0px_red]' : 'border-black shadow-[3px_3px_0px_black]'}`}
              />
              {validationErrors.includes('Address is required.') && <p className="text-red-500 text-xs">Address is required.</p>}
            </div>

            <div className="flex flex-col flex-1">
              <label htmlFor="jobDescription" className="block text-xs roboto-medium text-black">
                Uraian Pekerjaan
              </label>
              <input
                id="jobDescription"
                type="text"
                value={jobDescription}
                onChange={handleJobDescriptionChange}
                className={`mt-1 block w-full px-3 py-2 border-2 border-black rounded-md shadow-md sm:text-xs ${validationErrors.includes('Job Description is required.') ? 'border-red-500 shadow-[2.5px_2.5px_0px_red]' : 'border-black shadow-[3px_3px_0px_black]'}`}
              />
              {validationErrors.includes('Job Description is required.') && <p className="text-red-500 text-xs">Job Description is required.</p>}
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex flex-col flex-1">
              <label htmlFor="invoiceNumber" className="block text-xs roboto-medium text-black">
                No. Invoice
              </label>
              <input
                id="invoiceNumber"
                type="text"
                value={invoiceNumber}
                onChange={handleInvoiceNumberChange}
                className={`mt-1 block w-full px-3 py-2 border-2 border-black rounded-md shadow-md sm:text-xs ${validationErrors.includes('Invoice Number is required.') ? 'border-red-500 shadow-[2.5px_2.5px_0px_red]' : 'border-black shadow-[3px_3px_0px_black]'}`}
              />
              {validationErrors.includes('Invoice Number is required.') && <p className="text-red-500 text-xs">Invoice Number is required.</p>}
            </div>

            <div className="flex flex-col flex-1">
              <label htmlFor="date" className="block text-xs roboto-medium text-black">
                Tanggal
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={handleDateChange}
                className={`mt-1 block w-full px-3 py-2 border-2 border-black rounded-md shadow-md sm:text-xs ${validationErrors.includes('Date is required.') ? 'border-red-500 shadow-[2.5px_2.5px_0px_red]' : 'border-black shadow-[3px_3px_0px_black]'}`}
              />
              {validationErrors.includes('Date is required.') && <p className="text-red-500 text-xs">Date is required.</p>}
            </div>
          </div>
        </div>
      </div>

      {error && <div className="text-red-500 text-xs">{error}</div>}
      {success && <div className="text-green-500 text-xs">{success}</div>}
    </form>
  );
};

export default Form;
