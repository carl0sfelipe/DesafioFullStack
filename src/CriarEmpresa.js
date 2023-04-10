import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  validarCNPJ, validarCEP , formatCNPJ} from './validations';


const CriarEmpresa = ({fetchData}) => {
  const [companyName, setCompanyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cep, setCep] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('https://dev168084.service-now.com/api/x_802938_backend_0/empresa_fornecedor_api/pegar-fornecedor', {
          headers: {
            'Content-Type': 'application/json',
            // Adicione outros cabeçalhos, se necessário
          },
        });
        setSuppliers(response.data.result.fornecedores);
      } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();


    if (!validarCNPJ(cnpj)) {
      alert('Por favor, insira um CNPJ válido.');
      return;
    }

    const cepValido = await validarCEP(cep);
    if (!cepValido) {
      alert('Por favor, insira um CEP válido.');
      return;
    }

    const data = {
      nomeFantasia: companyName,
      cnpj: cnpj,
      cep: cep,
      fornecedores: selectedSupplier
    };

    try {
      const response = await axios.post('https://dev168084.service-now.com/api/x_802938_backend_0/empresa_fornecedor_api/criar-empresa', data, {
        headers: {
          'Content-Type': 'application/json',
          // Adicione outros cabeçalhos, se necessário
        },
      });
      console.log('Empresa criada com sucesso:', response.data);
      fetchData();
    } catch (error) {
      console.error('Erro ao criar empresa:', error);
    }
  };

  return (
    <div>
      <h1>Criar Empresa</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyName">Nome Fantasia:</label>
          <input type="text" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="cnpj">CNPJ:</label>
          <input type="text" value={cnpj} onChange={(e) => {
              const cnpjFormatado = formatCNPJ(e.target.value);
              setCnpj(cnpjFormatado)}} />        </div>
        <div>
          <label htmlFor="cep">CEP:</label>
          <input type="text" id="cep" value={cep} onChange={(e) => setCep(e.target.value)} />
        </div>
        <div>
          <label htmlFor="supplier">Fornecedor:</label>
          <select id="supplier" value={selectedSupplier} onChange={(e) => setSelectedSupplier(e.target.value)}>
            <option value="">Nenhum</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>{supplier.nome}</option>
            ))}
          </select>
        </div>
        <button type="submit">Criar Empresa</button>
      </form>
    </div>
  );
};

export default CriarEmpresa;