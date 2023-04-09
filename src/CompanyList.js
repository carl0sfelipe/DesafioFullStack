import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeletarRegistro from './DeletarRegistro';
import AtualizarEmpresa from './AtualizarEmpresa'
const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('https://dev168084.service-now.com/api/x_802938_backend_0/empresa_fornecedor_api/pegar-empresa', {
          headers: {
            'Content-Type': 'application/json',
            // Adicione outros cabeçalhos, se necessário
          },
        });
        //console.log(response.data)
        setCompanies(response.data.result.empresas);
        //        console.log(companies)

        const response2 = await axios.get('https://dev168084.service-now.com/api/x_802938_backend_0/empresa_fornecedor_api/pegar-fornecedor', {
          headers: {
            'Content-Type': 'application/json',
            // Adicione outros cabeçalhos, se necessário
          },
        });
        //console.log(response.data)
        setSuppliers(response2.data.result.fornecedores);
        //        console.log(companies)


      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>CNPJ</th>
            <th>Nome Fantasia</th>
            <th>CEP</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <div>
              <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.cnpj}</td>
                <td>{company.nomeFantasia}</td>
                <td>{company.cep}</td>
              </tr>              
              <div>
                <DeletarRegistro id={company.id} tabela="empresa" />
               
               <AtualizarEmpresa suppliers={suppliers} id={company.id}/> </div>
            </div>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
