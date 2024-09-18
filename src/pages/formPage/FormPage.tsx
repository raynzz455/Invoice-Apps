import React, { useState } from 'react';
import Form from '../../components/form/form';
import FormTable from '../../components/table/FormTable';

const FormPage: React.FC = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [folderName, setFolderName] = useState('');

  const handleFormSubmit = () => {
    setIsFormSubmitted(true);
  };

  return (
    <div>
      <div className="my-4 roboto-bold max-w-3xl mx-auto text-left">
        <p>Folder Name: <span className="mx-4">{folderName || ''}</span></p>
      </div>
      {isFormSubmitted ? (
        <FormTable folderName={folderName} />
      ) : (
        <Form setFolderName={setFolderName} onFormSubmit={handleFormSubmit} />
      )}
    </div>
  );
};

export default FormPage;
