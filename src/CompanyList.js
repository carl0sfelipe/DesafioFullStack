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
  console.log(companies);

  return (
    <div>
      <h1>Lista de Empresas</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>CNPJ</th>
            <th>Nome Fantasia</th>
            <th>CEP</th>
            <th>Fornecedores</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
          companies.map((company) => (
            <tr key={company.id}>
<td className="id-cell">{company.id.slice(0, 4) + (company.id.length > 4 ? '...' : '')}</td>
              <td>{company.cnpj}</td>
              <td>{company.nomeFantasia}</td>
              <td>{company.cep}</td>
              <td className="id-cell">{company.fornecedores ? (company.fornecedores.slice(0, 4) + (company.fornecedores.length > 4 ? '...' : '')) : ''}</td>
              <td>
                <DeletarRegistro id={company.id} tabela="empresa" />
                <AtualizarEmpresa suppliers={suppliers} id={company.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
