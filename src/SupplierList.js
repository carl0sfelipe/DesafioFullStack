import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

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
            <tr key={supplier.id}>
              <td>{supplier.id}</td>
              <td>{supplier.nome}</td>
              <td>{supplier.email}</td>
              <td>{supplier.cep}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierList;
