import React from 'react';
import axios from 'axios';

const DeletarRegistro = ({ tabela, id }) => {

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://dev168084.service-now.com/api/x_802938_backend_0/empresa_fornecedor_api/deletar-${tabela}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          // Adicione outros cabeçalhos, se necessário
        },
      });
      console.log(`Registro com id ${id} deletado da tabela ${tabela} com sucesso!`);
    } catch (error) {
      console.error(`Erro ao deletar registro com id ${id} da tabela ${tabela}:`, error);
    }
  };

  return (
    <button onClick={handleDelete}>Deletar</button>
  );
};

export default DeletarRegistro;
