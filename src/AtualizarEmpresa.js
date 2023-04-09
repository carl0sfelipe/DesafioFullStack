import React, { useState } from 'react';
import axios from 'axios';

const AtualizarEmpresa = ({ companyId, suppliers }) => {
  const [expanded, setExpanded] = useState(false);
  const [cnpj, setCnpj] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cep, setCep] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const updateCompany = async () => {
    try {
      const response = await axios.put(
        `https://dev168084.service-now.com//api/x_802938_backend_0/empresa_fornecedor_api/atualizar-empresa${companyId}`,
        {
          cnpj,
          nomeFantasia,
          cep,
          fornecedores: selectedSupplier,
        }
      );
      alert('Empresa atualizada com sucesso');
    } catch (error) {
      alert('Erro ao atualizar a empresa');
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={toggleExpand}>{expanded ? 'Fechar' : 'Expandir'}</button>
      {expanded && (
        <div>
          <label>
            CNPJ:
            <input
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
          </label>
          <label>
            Nome Fantasia:
            <input
              type="text"
              value={nomeFantasia}
              onChange={(e) => setNomeFantasia(e.target.value)}
            />
          </label>
          <label>
            CEP:
            <input
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
          </label>
          <label>
            Fornecedores:
            <select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
            >
              <option value="">Selecione um fornecedor</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.nome}
                </option>
              ))}
            </select>
          </label>
          <button onClick={updateCompany}>Atualizar Empresa</button>
        </div>
      )}
    </div>
  );
};

export default AtualizarEmpresa;
