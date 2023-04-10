import React, { useState } from 'react';
import CriarEmpresa from './CriarEmpresa';
import CriarFornecedor from './CriarFornecedor';
import CompanyList from './CompanyList';
import SupplierList from './SupplierList';

const HomePage = () => {
  const [showCreateCompany, setShowCreateCompany] = useState(false);
  const [showCreateSupplier, setShowCreateSupplier] = useState(false);

  const toggleCreateCompany = () => {
    setShowCreateCompany(!showCreateCompany);
  };

  const toggleCreateSupplier = () => {
    setShowCreateSupplier(!showCreateSupplier);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <button onClick={toggleCreateCompany}>
            {showCreateCompany ? 'Fechar' : 'Criar Empresa'}
          </button>
          {showCreateCompany && <CriarEmpresa />}
        </div>
        <div>
          <button onClick={toggleCreateSupplier}>
            {showCreateSupplier ? 'Fechar' : 'Criar Fornecedor'}
          </button>
          {showCreateSupplier && <CriarFornecedor />}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div>
          <CompanyList />
        </div>
        <div>
          <SupplierList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
