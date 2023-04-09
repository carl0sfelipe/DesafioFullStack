import React from 'react';

const CompanyCard = ({ company }) => {
  return (
    <div className="company-card">
      <h3>{company.nomeFantasia}</h3>
      <p>CNPJ: {company.cnpj}</p>
      <p>Endereço: {company.cep}</p>
    </div>
  );
};

export default CompanyCard;
