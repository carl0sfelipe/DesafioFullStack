import React from 'react';
import CompanyCard from './CompanyCard';

const CompanyLista = ({ companies }) => {
  return (
    <div className="company-lista">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};

export default CompanyLista;
