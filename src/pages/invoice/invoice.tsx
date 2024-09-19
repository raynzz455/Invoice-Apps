import React from 'react';
import { useLocation } from 'react-router-dom';
import InvoiceT from '../../components/invoice/invoiceT';

interface LocationState {
  folderName: string;
}

const Invoice: React.FC = () => {
  const location = useLocation();
  const folderName = (location.state as LocationState)?.folderName || 'Default Folder Name';

  return (
    <div className="invoice-page p-6 bg-gray-100 min-h-screen">
      <InvoiceT folderName={folderName} />
    </div>
  );
};

export default Invoice;
