import React from 'react';

const CreateButton = ({ onClick }) => {
  return (
    <div className="create-button">
      <button onClick={onClick}>Criar Empresa</button>
    </div>
  );
};

export default CreateButton;
