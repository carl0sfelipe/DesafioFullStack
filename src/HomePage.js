import React, { useState } from 'react';
import CriarEmpresa from './CriarEmpresa';
import CriarFornecedor from './CriarFornecedor';
import CompanyList from './CompanyList';
import SupplierList from './SupplierList';
import './HomePage.css'; // Importar o arquivo CSS

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
      <div className="action-buttons">
        <button onClick={toggleCreateCompany}>
          {showCreateCompany ? 'Fechar' : 'Criar Empresa'}
        </button>
        {showCreateCompany && <CriarEmpresa fetchData={fetchData}/>}
        <div className="separator"></div>
        <button onClick={toggleCreateSupplier}>
          {showCreateSupplier ? 'Fechar' : 'Criar Fornecedor'}
        </button>
        {showCreateSupplier && <CriarFornecedor fetchData={fetchData}/>}
      </div>
      <div className="content" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div className="companyList">
          <CompanyList key={shouldFetchData}/>
        </div>
        <div className="separator"></div>
        <div className="supplierList">
          <SupplierList key={shouldFetchData}/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
