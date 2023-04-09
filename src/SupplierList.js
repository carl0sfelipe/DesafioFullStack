import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeletarRegistro from './DeletarRegistro';
import AtualizarFornecedor from './AtualizarFornecedor';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('https://dev168084.service-now.com/api/x_802938_backend_0/empresa_fornecedor_api/pegar-fornecedor', {
          headers: {
            'Content-Type': 'application/json',
            // Add other headers if necessary
          },
        });
        //console.log(response.data)
        setSuppliers(response.data.result.fornecedores);
        //console.log(suppliers);
      } catch (error) {
        console.error('Error while fetching suppliers:', error);
      }
    };

    const fetchEmpresas = async () => {
      try {
        const response2 = await axios.get('https://dev168084.service-now.com/api/x_802938_backend_0/empresa_fornecedor_api/pegar-empresa', {
          headers: {
            'Content-Type': 'application/json',
            // Adicione outros cabeçalhos, se necessário
          },
        });
      //  console.log(response.data)
        setEmpresas(response2.data.result.empresas);
      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
      }
    };
    fetchEmpresas();
    fetchSuppliers();
  }, []);

  return (
    <div>
      <h1>Supplier List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CEP</th>
          </tr>
        </thead>
        <tbody>
        {suppliers.map((supplier) => (
          <div>
            <tr key={supplier.id}>
              <td>{supplier.id}</td>
              <td>{supplier.nome}</td>
              <td>{supplier.email}</td>
              <td>{supplier.cep}</td>
            </tr>
            <DeletarRegistro id={supplier.id} tabela="fornecedor" />
            <AtualizarFornecedor id={supplier.id} companies={empresas}/>
            </div>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierList;
