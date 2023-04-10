import React, { useState } from 'react';
import CriarEmpresa from './CriarEmpresa';
import CriarFornecedor from './CriarFornecedor';
import CompanyList from './CompanyList';
import SupplierList from './SupplierList';

const HomePage = () => {
  const [showCreateCompany, setShowCreateCompany] = useState(false);
  const [showCreateSupplier, setShowCreateSupplier] = useState(false);
  const [shouldFetchData, setShouldFetchData] = useState(false);

  const fetchData = () => {
    setShouldFetchData(!shouldFetchData);
  };

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
          {showCreateCompany && <CriarEmpresa fetchData={fetchData}/>}
        </div>
        <div>
          <button onClick={toggleCreateSupplier}>
            {showCreateSupplier ? 'Fechar' : 'Criar Fornecedor'}
          </button>
          {showCreateSupplier && <CriarFornecedor fetchData={fetchData}/>}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div>
          <CompanyList key={shouldFetchData}/>
        </div>
        <div>
          <SupplierList key={shouldFetchData}/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
